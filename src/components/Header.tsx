import React from 'react';
import { 
  ShieldAlert, 
  Trash2, 
  HardDrive, 
  PackageX, 
  Copy, 
  Check, 
  Layers, 
  FileText, 
  LayoutDashboard, 
  ListOrdered, 
  Terminal, 
  GitBranch, 
  ExternalLink,
  Search,
  Sparkles
} from 'lucide-react';
import { PROJECT_METADATA } from '../data/auditData';

interface HeaderProps {
  activeTab: 'overview' | 'table' | 'plan' | 'arch' | 'full';
  setActiveTab: (tab: 'overview' | 'table' | 'plan' | 'arch' | 'full') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  copiedScript: boolean;
  onCopyFullScript: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  copiedScript,
  onCopyFullScript
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-black/[0.08]" id="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-3">
        
        {/* Top Row: App Title & Apple-Style Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          
          {/* Identity */}
          <div className="flex items-center gap-3">
            {/* Apple-style minimalist app icon */}
            <div className="h-9 w-9 rounded-[10px] bg-gradient-to-b from-zinc-800 to-zinc-950 text-white shadow-xs flex items-center justify-center font-semibold text-sm tracking-tight border border-black/10 shrink-0">
              DP
            </div>
            
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-semibold text-zinc-900 tracking-tight">
                  {PROJECT_METADATA.name}
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-100 text-zinc-600 border border-zinc-200/60">
                  {PROJECT_METADATA.shortName}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono text-zinc-500 bg-zinc-100/70">
                  <GitBranch className="w-3 h-3 text-zinc-400" />
                  {PROJECT_METADATA.branch} · {PROJECT_METADATA.headCommit}
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Codebase Cleanup Audit · {PROJECT_METADATA.auditDate}
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions in Apple Pill Style */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200/70 text-rose-700 text-xs font-medium">
              <HardDrive className="w-3 h-3 text-rose-500" />
              <span>~{PROJECT_METADATA.stats.totalReclaimableDiskMb} MB Debris</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/70 text-amber-700 text-xs font-medium">
              <PackageX className="w-3 h-3 text-amber-500" />
              <span>{PROJECT_METADATA.stats.deadDependenciesCount} Dead Deps</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              <ShieldAlert className="w-3 h-3 text-red-500" />
              <span>TS18002 Fix</span>
            </div>

            <button
              id="header-copy-script-btn"
              onClick={onCopyFullScript}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] active:bg-[#0062C4] text-white font-medium text-xs transition-all shadow-xs cursor-pointer"
              title="Copy shell script to cleanup safe items"
            >
              {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedScript ? "Copied" : "Copy Cleanup Script"}</span>
            </button>

            <a
              href={PROJECT_METADATA.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200/80 active:bg-zinc-200 text-zinc-700 text-xs font-medium transition-colors border border-black/[0.04]"
              title="Open GitHub Repository"
            >
              <ExternalLink className="w-3 h-3 text-zinc-500" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Bottom Row: Apple Segmented Control + Search Input */}
        <div className="mt-3 pt-2.5 border-t border-black/[0.05] flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          
          {/* Apple Segmented Control Pill Container */}
          <nav className="bg-zinc-200/60 p-0.5 rounded-full inline-flex items-center gap-0.5 overflow-x-auto max-w-full" aria-label="Tabs">
            <button
              id="tab-overview"
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-white text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_1px_1px_rgba(0,0,0,0.04)]'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Overview
            </button>

            <button
              id="tab-table"
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'table'
                  ? 'bg-white text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_1px_1px_rgba(0,0,0,0.04)]'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Catalog ({PROJECT_METADATA.stats.definitelyUnusedCount + PROJECT_METADATA.stats.probablyUnusedCount + 5})
            </button>

            <button
              id="tab-plan"
              onClick={() => setActiveTab('plan')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'plan'
                  ? 'bg-white text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_1px_1px_rgba(0,0,0,0.04)]'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Script Generator
            </button>

            <button
              id="tab-arch"
              onClick={() => setActiveTab('arch')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'arch'
                  ? 'bg-white text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_1px_1px_rgba(0,0,0,0.04)]'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Architecture Map
            </button>

            <button
              id="tab-full"
              onClick={() => setActiveTab('full')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'full'
                  ? 'bg-white text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_1px_1px_rgba(0,0,0,0.04)]'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Full Report
            </button>
          </nav>

          {/* Apple-style minimalist search field */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Search audit entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-7 py-1 bg-zinc-100/80 hover:bg-zinc-100 focus:bg-white border border-transparent focus:border-black/10 focus:ring-2 focus:ring-[#0071E3]/20 rounded-full text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-zinc-200/80"
              >
                ✕
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
