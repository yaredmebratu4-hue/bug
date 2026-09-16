import React, { useState } from 'react';
import { 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  FileCode, 
  Database, 
  Cpu, 
  Monitor, 
  ExternalLink,
  Shield,
  HelpCircle
} from 'lucide-react';
import { ARCHITECTURE_LAYERS } from '../data/auditData';

export const ArchitectureMapView: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>('renderer');

  const selectedLayer = ARCHITECTURE_LAYERS.find(l => l.id === selectedLayerId) || ARCHITECTURE_LAYERS[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300" id="architecture-map-section">
      
      {/* Intro Header */}
      <div className="bg-white p-5 rounded-2xl border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-1.5">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-zinc-600" />
          <h2 className="text-base font-semibold text-zinc-900">
            System Architecture & Reachability Graph
          </h2>
        </div>
        <p className="text-xs text-zinc-500 max-w-4xl leading-relaxed">
          The audit performed full entry-point tracing through Electron’s renderer and main processes. Items classified as unused sit <strong>completely outside</strong> this execution graph with zero import edges or IPC channel invocations.
        </p>
      </div>

      {/* Visual Flow Diagram (Apple Flow Nodes) */}
      <div className="rounded-2xl border border-black/[0.06] bg-white p-5 overflow-x-auto shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="min-w-[720px] flex items-center justify-between gap-3 text-xs">
          
          {/* Node 1: Renderer */}
          <div 
            onClick={() => setSelectedLayerId('renderer')}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex-1 ${
              selectedLayerId === 'renderer'
                ? 'bg-blue-50/40 border-[#0071E3] shadow-xs'
                : 'bg-zinc-50/70 border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Renderer UI</span>
              <Monitor className="w-4 h-4 text-zinc-700" />
            </div>
            <div className="font-semibold text-zinc-900 text-sm">React 19 + Vite</div>
            <div className="text-[11px] text-zinc-500 mt-1">
              9 Active Pages · HashRouter · Tailwind v4
            </div>
            <div className="mt-2.5 text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/70 inline-block font-medium">
              PlaceholderPage orphaned
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" />

          {/* Node 2: IPC & Preload */}
          <div 
            onClick={() => setSelectedLayerId('preload')}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex-1 ${
              selectedLayerId === 'preload'
                ? 'bg-blue-50/40 border-[#0071E3] shadow-xs'
                : 'bg-zinc-50/70 border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Security Bridge</span>
              <Shield className="w-4 h-4 text-zinc-700" />
            </div>
            <div className="font-semibold text-zinc-900 text-sm">Preload IPC</div>
            <div className="text-[11px] text-zinc-500 mt-1">
              window.pharmacyApi · 20 Controller Channels
            </div>
            <div className="mt-2.5 text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/70 inline-block font-medium">
              useConfirmPassword dead
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" />

          {/* Node 3: Main Process */}
          <div 
            onClick={() => setSelectedLayerId('main')}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex-1 ${
              selectedLayerId === 'main'
                ? 'bg-blue-50/40 border-[#0071E3] shadow-xs'
                : 'bg-zinc-50/70 border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Main Process</span>
              <Cpu className="w-4 h-4 text-zinc-700" />
            </div>
            <div className="font-semibold text-zinc-900 text-sm">Electron 33 Host</div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Auto-updater · Sync Engine · Drive Backup
            </div>
            <div className="mt-2.5 text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/70 inline-block font-medium">
              Domain stub unused
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" />

          {/* Node 4: Database Layer */}
          <div 
            onClick={() => setSelectedLayerId('db')}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex-1 ${
              selectedLayerId === 'db'
                ? 'bg-blue-50/40 border-[#0071E3] shadow-xs'
                : 'bg-zinc-50/70 border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Data Persistence</span>
              <Database className="w-4 h-4 text-zinc-700" />
            </div>
            <div className="font-semibold text-zinc-900 text-sm">SQLite + Drizzle</div>
            <div className="text-[11px] text-zinc-500 mt-1">
              14 Schemas · Repositories · Migrations 0000-0012
            </div>
            <div className="mt-2.5 text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/70 inline-block font-medium">
              0013 migration unjournaled
            </div>
          </div>

        </div>
      </div>

      {/* Layer Deep Dive Detail View */}
      <div className="rounded-2xl border border-black/[0.06] bg-white p-5 space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">
              {selectedLayer.title}
            </h3>
            <p className="text-xs font-mono text-zinc-500 mt-0.5">
              Entry Path: {selectedLayer.entry}
            </p>
          </div>
          <span className="text-xs text-zinc-500 font-medium">
            {selectedLayer.items.length} Subcomponents Inspected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {selectedLayer.items.map((item, idx) => {
            const isOrphaned = item.status === 'Orphaned' || item.status === 'Untracked in Journal';
            return (
              <div 
                key={idx}
                className={`p-3.5 rounded-xl border ${
                  isOrphaned 
                    ? 'bg-amber-50/40 border-amber-200/70' 
                    : 'bg-zinc-50/60 border-zinc-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-zinc-900">{item.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                    isOrphaned 
                      ? 'bg-amber-50 text-amber-800 border-amber-200' 
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="text-zinc-400 font-mono text-[11px] truncate mb-1.5">
                  {item.path}
                </div>
                {item.note && (
                  <p className="text-zinc-600 text-[11px] leading-relaxed">
                    {item.note}
                  </p>
                )}
                {item.alert && (
                  <p className="text-amber-800 text-[11px] font-medium mt-1">
                    ⚠️ {item.alert}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* The Orphaned Zone Box */}
      <div className="rounded-2xl border border-red-200/80 bg-white p-5 space-y-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <h3 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
            Items Cut Off from the Graph (100% Dead / Zero Invocations)
          </h3>
        </div>
        <p className="text-xs text-zinc-500 leading-relaxed">
          These assets have no incoming edges from any entry point, are not invoked by dynamic IPC handlers (<code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">ipcRenderer.invoke</code>), are not referenced by configuration manifests, and are safe to eliminate:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-700">
            <span className="text-red-700 font-mono font-medium block">asar-extract-release/</span>
            <span className="text-[11px] text-zinc-500">129.4 MB old build extraction</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-700">
            <span className="text-red-700 font-mono font-medium block">asar-extract-temp/</span>
            <span className="text-[11px] text-zinc-500">51.3 MB preload/index.js era extraction</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-700">
            <span className="text-red-700 font-mono font-medium block">*.gif (2 files, 13 MB)</span>
            <span className="text-[11px] text-zinc-500">Template starter demo screen recordings</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-700">
            <span className="text-red-700 font-mono font-medium block">docx & @radix-ui/tooltip</span>
            <span className="text-[11px] text-zinc-500">Zero imports across entire repo</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-700">
            <span className="text-red-700 font-mono font-medium block">temp_*.py (6 scripts)</span>
            <span className="text-[11px] text-zinc-500">One-off patches already executed</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-700">
            <span className="text-red-700 font-mono font-medium block">PlaceholderPage.tsx</span>
            <span className="text-[11px] text-zinc-500">Unused stub imported in routes.tsx</span>
          </div>
        </div>
      </div>

    </div>
  );
};
