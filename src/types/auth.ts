export type UserRole = 'admin' | 'doctor' | 'nurse' | 'patient';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
  licenseNo?: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isSupabaseActive: boolean;
  login: (role: UserRole, email?: string) => void;
  loginWithSupabase?: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getRoleRedirectPath: (role: UserRole) => string;
  detectRoleFromCredentials: (email: string) => UserRole;
  registerUser: (profile: UserProfile) => void;
}
