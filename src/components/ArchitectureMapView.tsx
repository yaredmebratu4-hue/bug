import React, { useState } from 'react';
import { 
  Layers, 
  ArrowRight, 
  ArrowDown,
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
    <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300" id="architecture-map-section">
      
      {/* Intro Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-1.5">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-zinc-600" />
          <h2 className="text-sm sm:text-base font-semibold text-zinc-900">
            System Architecture & Reachability Graph
          </h2>
        </div>
        <p className="text-xs text-zinc-500 max-w-4xl leading-relaxed">
          The audit performed full entry-point tracing through Electron’s renderer and main processes. Items classified as unused sit <strong>completely outside</strong> this execution graph with zero import edges or IPC channel invocations. Tap any layer below to inspect its components.
        </p>
      </div>

      {/* Visual Flow Diagram: Responsive (Vertical stack on mobile, Horizontal on md+) */}
      <div className="rounded-2xl border border-black/[0.06] bg-white p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          
          {/* Node 1: Renderer */}
          <div 
            onClick={() => setSelectedLayerId('renderer')}
            className={`p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all flex-1 ${
              selectedLayerId === 'renderer'
                ? 'bg-blue-50/40 border-[#0071E3] shadow-xs ring-1 ring-[#0071E3]/20'
                : 'bg-zinc-50/70 border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Renderer UI</span>
              <Monitor className="w-4 h-4 text-zinc-700" />
            </div>
            <div className="font-semibold text-zinc-900 text-sm">React 19 + Vite</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">
              9 Active Pages · HashRouter
            </div>
            <div className="mt-2 text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/70 inline-block font-medium">
              PlaceholderPage orphaned
            </div>
          </div>

          {/* Arrow: Down on mobile, Right on desktop */}
          <div className="flex items-center justify-center py-0.5 md:py-0">
            <ArrowDown className="w-4 h-4 text-zinc-400 md:hidden" />
            <ArrowRight className="w-4 h-4 text-zinc-400 hidden md:block shrink-0" />
          </div>

          {/* Node 2: IPC & Preload */}
          <div 
            onClick={() => setSelectedLayerId('preload')}
            className={`p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all flex-1 ${
              selectedLayerId === 'preload'
                ? 'bg-blue-50/40 border-[#0071E3] shadow-xs ring-1 ring-[#0071E3]/20'
                : 'bg-zinc-50/70 border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Security Bridge</span>
              <Shield className="w-4 h-4 text-zinc-700" />
            </div>
            <div className="font-semibold text-zinc-900 text-sm">Preload IPC</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">
              window.pharmacyApi · 20 Groups
            </div>
            <div className="mt-2 text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/70 inline-block font-medium">
              useConfirmPassword dead
            </div>
          </div>

          {/* Arrow: Down on mobile, Right on desktop */}
          <div className="flex items-center justify-center py-0.5 md:py-0">
            <ArrowDown className="w-4 h-4 text-zinc-400 md:hidden" />
            <ArrowRight className="w-4 h-4 text-zinc-400 hidden md:block shrink-0" />
          </div>

          {/* Node 3: Main Process */}
          <div 
            onClick={() => setSelectedLayerId('main')}
            className={`p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all flex-1 ${
              selectedLayerId === 'main'
                ? 'bg-blue-50/40 border-[#0071E3] shadow-xs ring-1 ring-[#0071E3]/20'
                : 'bg-zinc-50/70 border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Main Process</span>
              <Cpu className="w-4 h-4 text-zinc-700" />
            </div>
            <div className="font-semibold text-zinc-900 text-sm">Electron 33 Host</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">
              Sync Engine · Auto-Updater
            </div>
            <div className="mt-2 text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/70 inline-block font-medium">
              Domain stub unused
            </div>
          </div>

          {/* Arrow: Down on mobile, Right on desktop */}
          <div className="flex items-center justify-center py-0.5 md:py-0">
            <ArrowDown className="w-4 h-4 text-zinc-400 md:hidden" />
            <ArrowRight className="w-4 h-4 text-zinc-400 hidden md:block shrink-0" />
          </div>

          {/* Node 4: Database Layer */}
          <div 
            onClick={() => setSelectedLayerId('db')}
            className={`p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all flex-1 ${
              selectedLayerId === 'db'
                ? 'bg-blue-50/40 border-[#0071E3] shadow-xs ring-1 ring-[#0071E3]/20'
                : 'bg-zinc-50/70 border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Persistence</span>
              <Database className="w-4 h-4 text-zinc-700" />
            </div>
            <div className="font-semibold text-zinc-900 text-sm">SQLite + Drizzle</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">
              14 Schemas · Repositories
            </div>
            <div className="mt-2 text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/70 inline-block font-medium">
              0013 unjournaled
            </div>
          </div>

        </div>
      </div>

      {/* Layer Deep Dive Detail View */}
      <div className="rounded-2xl border border-black/[0.06] bg-white p-4 sm:p-5 space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        
        {/* Layer Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-100 gap-2">
          <div>
            <span className="text-[11px] uppercase font-semibold text-zinc-400 tracking-wider">
              Inspecting Layer Deep Dive
            </span>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900">
              {selectedLayer.title}
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80 self-start sm:self-auto">
            100% Core Reachable
          </span>
        </div>

        {/* Entry Point Banner */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold uppercase text-zinc-400 tracking-wider block">
            Entry Point Wiring Trace
          </span>
          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 font-mono text-xs text-zinc-800 break-all">
            {selectedLayer.entry}
          </div>
        </div>

        {/* Items List (Active vs Orphaned) */}
        <div className="space-y-2 pt-1">
          <span className="text-[11px] font-semibold uppercase text-zinc-400 tracking-wider block">
            Components & Modules in Layer ({selectedLayer.items.length} Tracked)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {selectedLayer.items.map((item, idx) => {
              const isOrphan = item.status === 'Orphaned' || item.status === 'Untracked in Journal';
              return (
                <div 
                  key={idx}
                  className={`p-3 rounded-xl border transition-colors ${
                    isOrphan 
                      ? 'bg-rose-50/40 border-rose-200/70' 
                      : 'bg-zinc-50/70 border-zinc-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold text-zinc-900 text-xs font-mono break-all">
                      {item.name}
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0 ${
                      isOrphan 
                        ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-zinc-500 mt-1 break-all">
                    {item.path}
                  </div>

                  {item.note && (
                    <p className="text-[11px] text-zinc-600 mt-1.5 leading-relaxed">
                      {item.note}
                    </p>
                  )}

                  {item.alert && (
                    <div className="mt-1.5 p-1.5 bg-rose-50 border border-rose-200/60 rounded-lg text-[10px] text-rose-800 font-medium">
                      ⚠ {item.alert}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
