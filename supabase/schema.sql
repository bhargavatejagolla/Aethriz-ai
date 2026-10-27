-- =============================================================================
-- AETHRIZ AI Healthcare And Advanced Research Private Limited
-- Official Database Migration & Role-Based Security Schema (Ref: AAHAAR/NTC/2026-27/02)
-- Target Platform: Supabase PostgreSQL 15+
-- =============================================================================

-- 1. Create User Role Enum
CREATE TYPE user_role AS ENUM ('admin', 'doctor', 'nurse', 'patient');
CREATE TYPE review_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE consultation_mode AS ENUM ('telehealth', 'in-person');

-- 2. Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'patient',
  avatar_url TEXT,
  department TEXT,
  license_no TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- 3. Step 4: Clinician & Faculty Applications (Join the Team)
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  role TEXT NOT NULL,
  license_no TEXT NOT NULL,
  hospital_affiliation TEXT NOT NULL,
  years_experience INT DEFAULT 0,
  cv_url TEXT,
  statement TEXT,
  status review_status DEFAULT 'pending',
  reviewer_id UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an application (public)
CREATE POLICY "Anyone can submit a join-team application"
  ON public.applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only Admins can view and review applications
CREATE POLICY "Admins can view and manage applications"
  ON public.applications FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- 4. Step 6: Articles and Experience Sharing Submissions
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- 'icu', 'surgery', 'recovery', 'near-death', 'chronic'
  author_name TEXT NOT NULL,
  email TEXT NOT NULL,
  hospital_or_doctor TEXT,
  story TEXT NOT NULL,
  status review_status DEFAULT 'pending',
  reviewer_id UUID REFERENCES public.profiles(id),
  published_at TIMESTAMPTZ,
  likes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved articles
CREATE POLICY "Anyone can view approved articles"
  ON public.articles FOR SELECT
  USING (status = 'approved');

-- Anyone can submit an article for review
CREATE POLICY "Anyone can submit an article"
  ON public.articles FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admins and Doctors can review articles
CREATE POLICY "Admins and Doctors can manage article submissions"
  ON public.articles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'doctor')
    )
  );

-- 5. Step 7: Doctor Consultations
CREATE TABLE IF NOT EXISTS public.consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_code TEXT UNIQUE NOT NULL,
  doctor_id TEXT NOT NULL,
  doctor_name TEXT NOT NULL,
  patient_id UUID REFERENCES public.profiles(id),
  patient_name TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_age INT,
  mode consultation_mode NOT NULL DEFAULT 'telehealth',
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  symptoms TEXT,
  clinical_notes TEXT,
  status TEXT DEFAULT 'Confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- Patients can view their own consultations
CREATE POLICY "Patients view own consultations"
  ON public.consultations FOR SELECT
  TO authenticated
  USING (patient_email = auth.email() OR patient_id = auth.uid());

-- Doctors and Admins can view all consultations
CREATE POLICY "Clinical staff view consultations"
  ON public.consultations FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'doctor', 'nurse')
    )
  );

-- 6. Trigger to automatically create profile on Supabase Auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'patient'::user_role)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
