'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  Heart, 
  Activity, 
  Search, 
  RotateCw, 
  RotateCcw, 
  Pause, 
  Focus, 
  Sliders, 
  X, 
  Layers, 
  ShieldCheck, 
  Eye, 
  ChevronRight,
  Info,
  Sparkles,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { 
  SYSTEMS, 
  CLINICAL_DEFAULT_VISIBLE, 
  CLINICAL_PRESETS, 
  getStructureExplanation,
  type Atlas, 
  type Concept, 
  type SceneState, 
  type SystemId, 
  type View 
} from './anatomy';

// Dynamic import with ssr: false so WebGL/Three.js never runs on the server during Vercel build!
const AnatomyScene = dynamic(() => import('./AnatomyScene'), { ssr: false });

const initialState: SceneState = {
  explode: 0,
  visible: CLINICAL_DEFAULT_VISIBLE,
  selected: [],
  isolate: false,
  view: 'three-quarter',
  rotate: false,
  reset: 0
};

export default function AnatomyViewer() {
  const [atlas, setAtlas] = useState<Atlas | null>(null);
  const [state, setState] = useState<SceneState>(initialState);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [chosen, setChosen] = useState<Concept | null>(null);
  const [activePreset, setActivePreset] = useState<string>('clinical_all');

  // Load atlas.json from public/models/
  useEffect(() => {
    const abort = new AbortController();
    setProgress(0);
    setError('');
    fetch('/models/atlas.json', { signal: abort.signal })
      .then(res => {
        if (!res.ok) throw new Error('Anatomy catalogue could not be loaded.');
        return res.json();
      })
      .then(data => {
        setAtlas(data as Atlas);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Error loading anatomical catalogue.');
        }
      });

    return () => abort.abort();
  }, []);

  const parts = useMemo(() => new Map(atlas?.parts.map(p => [p.id, p])), [atlas]);

  const selectedParts = state.selected.map(id => parts.get(id)).filter(p => !!p);
  const selected = selectedParts[0];
  const system = SYSTEMS.find(s => s.id === selected?.system);

  // Search Results
  const searchResults = useMemo(() => {
    if (!atlas) return [];
    const term = query.toLowerCase().trim();
    if (!term) {
      return ['heart', 'brain', 'liver', 'stomach', 'spleen', 'pancreas', 'urinary bladder', 'trachea']
        .map(name => atlas.concepts.find(c => c.name.toLowerCase() === name))
        .filter((x): x is Concept => !!x);
    }
    return atlas.concepts
      .filter(c => c.name.toLowerCase().includes(term) || c.id.toLowerCase().includes(term))
      .slice(0, 15);
  }, [atlas, query]);

  const handleSelectConcept = (c: Concept) => {
    setChosen(c);
    setState(s => ({
      ...s,
      selected: c.elements,
      isolate: false,
      rotate: false
    }));
    setSearchOpen(false);
  };

  const handleSelectPart = (id: string) => {
    const p = parts.get(id);
    if (!p) return;
    setChosen({ id: p.conceptId, name: p.name, elements: [id] });
    setState(s => ({
      ...s,
      selected: [id],
      isolate: false,
      rotate: false
    }));
  };

  const handleApplyPreset = (presetId: string, systems: SystemId[]) => {
    setActivePreset(presetId);
    setState(s => ({
      ...s,
      visible: systems,
      selected: [],
      isolate: false
    }));
    setChosen(null);
  };

  const handleToggleSystem = (sysId: SystemId) => {
    setState(s => {
      const isVisible = s.visible.includes(sysId);
      const nextVisible = isVisible ? s.visible.filter(id => id !== sysId) : [...s.visible, sysId];
      return {
        ...s,
        visible: nextVisible,
        selected: [],
        isolate: false
      };
    });
  };

  const handleReset = () => {
    setState(s => ({
      ...initialState,
      visible: CLINICAL_DEFAULT_VISIBLE,
      reset: s.reset + 1
    }));
    setActivePreset('clinical_all');
    setChosen(null);
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-gray-800 bg-gradient-to-b from-[#06080F] via-[#0B0F1A] to-[#04060A] shadow-2xl flex flex-col min-h-[680px] sm:min-h-[740px]">
      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 z-0">
        {atlas && (
          <AnatomyScene
            atlas={atlas}
            state={{
              ...state,
              inspectorOpen: !!chosen && selectedParts.length > 0
            }}
            onSelect={handleSelectPart}
            onProgress={n => setProgress(n)}
            onError={err => setError(err)}
          />
        )}
      </div>

      {/* Top Clinical HUD Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-auto gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest bg-red-950/80 border border-red-800/80 px-2.5 py-0.5 rounded-full">
              3D CLINICAL ANATOMY ENGINE &bull; BODYPARTS3D MALE REFERENCE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight flex items-center gap-2">
            Interactive 3D Anatomical Atlas
          </h2>
        </div>

        {/* Search Bar Trigger */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 px-3.5 py-2 bg-gray-900/90 border border-gray-700 hover:border-red-500 text-gray-200 text-xs font-mono rounded-xl backdrop-blur-md transition-all shadow-md cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-red-500" />
              <span>{chosen ? chosen.name : 'Search Organ or Structure...'}</span>
              <kbd className="px-1.5 py-0.5 text-[9px] bg-gray-800 border border-gray-700 rounded text-gray-400">
                ⌘K
              </kbd>
            </button>

            {/* Instant Search Dropdown */}
            {searchOpen && (
              <div className="absolute right-0 top-12 w-80 max-h-80 overflow-y-auto bg-gray-950 border border-gray-700 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl">
                <input
                  type="text"
                  placeholder="Type 'Heart', 'Brain', 'Liver'..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  autoFocus
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs font-mono text-white placeholder-gray-500 outline-none focus:border-red-500 mb-2"
                />
                <div className="space-y-1">
                  {searchResults.map(c => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectConcept(c)}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-mono text-gray-200 hover:bg-red-950 hover:text-white flex items-center justify-between transition-all cursor-pointer"
                    >
                      <span className="capitalize font-bold">{c.name}</span>
                      <span className="text-[10px] text-gray-500">{c.elements.length} parts</span>
                    </button>
                  ))}
                  {searchResults.length === 0 && (
                    <div className="p-3 text-xs text-gray-500 text-center font-mono">
                      No matching structures found.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleReset}
            title="Reset View"
            className="p-2.5 bg-gray-900/90 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white rounded-xl backdrop-blur-md transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset Action Strip: Important Meshes & Organs */}
      <div className="relative z-20 px-4 sm:px-6 pointer-events-auto">
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-gray-950/70 border border-gray-800/80 rounded-2xl backdrop-blur-md max-w-full overflow-x-auto">
          {CLINICAL_PRESETS.map(preset => {
            const isActive = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset.id, preset.systems)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Floating Camera Perspective Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5 p-1.5 bg-gray-950/80 border border-gray-800 rounded-2xl backdrop-blur-md shadow-xl pointer-events-auto">
        {(['three-quarter', 'front', 'side', 'back'] as View[]).map((v, i) => (
          <button
            key={v}
            onClick={() => setState(s => ({ ...s, view: v, reset: s.reset + 1, rotate: false }))}
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              state.view === v
                ? 'bg-red-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            title={`${v} perspective`}
          >
            {['¾', 'F', 'S', 'B'][i]}
          </button>
        ))}

        <div className="w-full h-px bg-gray-800 my-1" />

        <button
          onClick={() => setState(s => ({ ...s, rotate: !s.rotate }))}
          className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-mono transition-all cursor-pointer ${
            state.rotate ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
          title={state.rotate ? 'Pause Auto-Spin' : 'Auto 360° Rotation'}
        >
          {state.rotate ? <Pause className="w-4 h-4" /> : <RotateCw className="w-4 h-4" />}
        </button>
      </div>

      {/* Left System Layer Badges */}
      <div className="hidden lg:flex flex-col gap-1.5 absolute left-4 top-40 z-20 p-3 bg-gray-950/80 border border-gray-800 rounded-2xl backdrop-blur-md shadow-xl pointer-events-auto max-h-[380px] overflow-y-auto w-52">
        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 pb-1 border-b border-gray-800 flex items-center justify-between">
          <span>Active Layers</span>
          <span className="text-red-500 font-extrabold">{state.visible.length}</span>
        </div>
        <div className="space-y-1">
          {SYSTEMS.slice(0, 10).map(sys => {
            const isVisible = state.visible.includes(sys.id);
            return (
              <button
                key={sys.id}
                onClick={() => handleToggleSystem(sys.id)}
                className={`w-full text-left px-2 py-1.5 rounded-lg text-[11px] font-mono flex items-center justify-between transition-all cursor-pointer ${
                  isVisible ? 'text-white bg-gray-900/90' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: sys.color }}
                  />
                  <span className="truncate">{sys.name.split('/')[0]}</span>
                </div>
                <span className="text-[9px] font-bold">
                  {isVisible ? 'ON' : 'OFF'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading Overlay */}
      {progress < 100 && !error && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-gray-950/80 backdrop-blur-md space-y-4">
          <div className="w-12 h-12 rounded-full border-3 border-red-500/20 border-t-red-500 animate-spin" />
          <div className="text-center space-y-1 font-mono">
            <div className="text-sm font-bold text-white uppercase tracking-wider">
              Assembling 3D Human Anatomy
            </div>
            <div className="text-xs text-red-400">
              {progress}% &bull; Parsing biological geometry buffers
            </div>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="absolute inset-x-6 top-24 z-30 p-4 bg-red-950/90 border border-red-800 rounded-2xl text-xs font-mono text-red-200 text-center">
          {error}
        </div>
      )}

      {/* Floating Selected Organ Telemetry Card */}
      {chosen && selected && (
        <div className="absolute left-4 right-4 sm:left-6 sm:right-auto sm:w-96 bottom-24 sm:bottom-28 z-20 p-5 bg-gray-950/90 border border-gray-800 rounded-2xl backdrop-blur-xl shadow-2xl space-y-3 pointer-events-auto text-white animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: system?.color || '#DC2626' }}
              />
              <span className="text-[10px] font-mono uppercase font-bold text-gray-400">
                {system?.name}
              </span>
            </div>
            <button
              onClick={() => {
                setChosen(null);
                setState(s => ({ ...s, selected: [], isolate: false }));
              }}
              className="p-1 text-gray-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <h3 className="text-lg font-black font-mono text-white capitalize">{chosen.name}</h3>
            <p className="text-xs text-gray-300 font-medium leading-relaxed mt-1">
              {getStructureExplanation(chosen.name, selected.system)}
            </p>
          </div>

          <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-[11px] font-mono">
            <span className="text-gray-400">
              Mesh Units: <strong className="text-white">{state.selected.length}</strong>
            </span>
            <button
              onClick={() => setState(s => ({ ...s, isolate: !s.isolate, explode: 0 }))}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                state.isolate
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/30'
              }`}
            >
              <Focus className="w-3.5 h-3.5" />
              <span>{state.isolate ? 'Show Surrounding Anatomy' : 'Isolate 3D Structure'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Explode Control Deck */}
      <div className="relative z-20 mt-auto p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Explode Slider */}
        <div className="w-full sm:max-w-md flex items-center gap-4 bg-gray-950/80 border border-gray-800/80 px-4 py-2.5 rounded-2xl backdrop-blur-md">
          <Sliders className="w-4 h-4 text-red-500 flex-shrink-0" />
          <div className="flex-grow space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-gray-300">
              <span>Explode Anatomy Layers</span>
              <span className="text-red-400 font-bold">{Math.round(state.explode * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={state.explode * 100}
              onChange={e => {
                const val = parseFloat(e.target.value) / 100;
                setState(s => ({
                  ...s,
                  explode: val,
                  view: val > 0.8 ? 'front' : s.view,
                  rotate: false
                }));
              }}
              className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
          </div>
        </div>

        {/* Status Hint */}
        <div className="text-[11px] font-mono text-gray-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Drag to Orbit &bull; Scroll to Zoom &bull; Click any organ to inspect</span>
        </div>
      </div>
    </div>
  );
}
