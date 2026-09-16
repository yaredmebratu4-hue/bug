import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  HardDrive, 
  PackageX, 
  FileCode2, 
  FileWarning, 
  Terminal, 
  ArrowRight, 
  ShieldAlert, 
  Check, 
  Copy,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  Database,
  Lock,
  ChevronRight
} from 'lucide-react';
import { PROJECT_METADATA } from '../data/auditData';

interface OverviewViewProps {
  onNavigateToTable: () => void;
  onNavigateToPlan: () => void;
  onNavigateToFull: () => void;
  onNavigateToArch: () => void;
  onSelectCategoryFilter: (category: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigateToTable,
  onNavigateToPlan,
  onNavigateToFull,
  onNavigateToArch,
}) => {
  const [copiedAction, setCopiedAction] = React.useState(false);

  const quickActionScript = `# 1. Fix broken typecheck (TS18002) in tsconfig.json
git checkout tsconfig.json

# 2. Batch remove heavy debris (~195 MB)
rm -rf asar-extract-release asar-extract-temp electron-vite-react*.gif temp_*.py tmp_* check-db.cjs fix_redirect.py

# 3. Uninstall dead dependencies
npm uninstall docx @radix-ui/react-tooltip
npm uninstall -D electron-rebuild vite-plugin-electron-renderer @types/bcryptjs`;

  const handleCopyAction = () => {
    navigator.clipboard.writeText(quickActionScript);
    setCopiedAction(true);
    setTimeout(() => setCopiedAction(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Priority Notice: Apple-style Card Banner */}
      <div className="rounded-2xl border border-red-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]" id="urgent-actions-banner">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-red-50 text-red-600 shrink-0 border border-red-100">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-red-50 text-red-700 border border-red-200/60">
                  Priority Attention
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-zinc-900">
                  Broken TypeScript Build & Dead Plaintext Credential Detected
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-3xl leading-relaxed">
                <strong className="text-zinc-900 font-medium">1. TS18002:</strong> An uncommitted <code className="text-[11px] bg-zinc-100 px-1.5 py-0.5 rounded font-mono text-zinc-800">tsconfig.json</code> edit sets <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded font-mono text-zinc-800">"files": []</code> without references, failing <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded font-mono text-zinc-800">npm run typecheck</code>.
                <br />
                <strong className="text-zinc-900 font-medium">2. Unused Secret:</strong> <code className="text-[11px] bg-zinc-100 px-1 py-0.5 rounded font-mono text-zinc-800">.env</code> stores Google Drive credentials, but the app runtime queries the local SQLite database.
              </p>
            </div>
          </div>

          <div className="shrink-0 self-end md:self-center">
            <button
              onClick={onNavigateToPlan}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs transition-colors shadow-xs cursor-pointer"
            >
              <span>View Fix Plan</span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid (Apple Minimalist Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="overview-metrics-grid">
        
        {/* Card 1: Reclaimable Disk Space */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">Reclaimable Debris</span>
            <div className="p-2 rounded-xl bg-zinc-100 text-zinc-700">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-semibold text-zinc-900 tracking-tight">
              ~{PROJECT_METADATA.stats.totalReclaimableDiskMb} <span className="text-sm font-normal text-zinc-400">MB</span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              99.8% from old asar extractions & demo GIFs
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Largest folder:</span>
            <span className="font-mono text-zinc-700 font-medium">129.4 MB</span>
          </div>
        </div>

        {/* Card 2: Unused Files & Artifacts */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">Definitely Unused</span>
            <div className="p-2 rounded-xl bg-zinc-100 text-zinc-700">
              <FileWarning className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-semibold text-zinc-900 tracking-tight">
              {PROJECT_METADATA.stats.definitelyUnusedCount} <span className="text-sm font-normal text-zinc-400">Items</span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              High confidence: 0 references in code & configs
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Plus medium confidence:</span>
            <span className="font-mono text-zinc-700 font-medium">11 items</span>
          </div>
        </div>

        {/* Card 3: Dead & Redundant Dependencies */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">Dead Dependencies</span>
            <div className="p-2 rounded-xl bg-zinc-100 text-zinc-700">
              <PackageX className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-semibold text-zinc-900 tracking-tight">
              {PROJECT_METADATA.stats.deadDependenciesCount} <span className="text-sm font-normal text-zinc-400">Packages</span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              2 unused deps + 3 redundant devDependencies
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Zero imports:</span>
            <span className="font-mono text-zinc-700 font-medium">docx, @radix-ui/tooltip</span>
          </div>
        </div>

        {/* Card 4: Verified Core Application Health */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">Core Reachability</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-semibold text-emerald-700 tracking-tight">
              100% <span className="text-sm font-normal text-zinc-400">Wired</span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              All 20 IPC controllers, 14 schemas & 9 pages intact
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Renderer & Main:</span>
            <span className="text-emerald-700 font-medium">Fully Validated</span>
          </div>
        </div>

      </div>

      {/* Suggested First Action Card (Apple Blue Pill & macOS Terminal Styling) */}
      <div className="rounded-2xl border border-black/[0.06] bg-white p-5 lg:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)]" id="suggested-first-action-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-[#0071E3] border border-blue-200/60">
                Recommended Action
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-zinc-900">
                First Steps When Cleanup Is Approved
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed max-w-3xl">
              1. <strong>Restore Typecheck:</strong> Revert uncommitted empty files array in <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono text-zinc-800">tsconfig.json</code>.
              <br />
              2. <strong>Prune ~195 MB Debris:</strong> Batch-remove obsolete asar unpack folders, demo GIFs, and temporary Python/CJS patch scripts.
              <br />
              3. <strong>Uninstall Dead Packages:</strong> Remove unimported <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono text-zinc-800">docx</code>, <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono text-zinc-800">@radix-ui/react-tooltip</code>, and redundant dev tools.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2">
            <button
              onClick={handleCopyAction}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] active:bg-[#0062C4] text-white font-medium text-xs transition-all shadow-xs cursor-pointer"
            >
              {copiedAction ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAction ? "Copied" : "Copy Quick Script"}</span>
            </button>
            <button
              onClick={onNavigateToPlan}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200/80 active:bg-zinc-200 text-zinc-800 font-medium text-xs border border-black/[0.04] transition-colors cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-zinc-500" />
              <span>Interactive Generator</span>
            </button>
          </div>
        </div>

        {/* macOS Terminal-style code preview */}
        <div className="mt-4 pt-3 border-t border-zinc-100">
          <div className="bg-[#1E1E20] rounded-xl p-3.5 font-mono text-xs text-zinc-300 overflow-x-auto shadow-inner border border-zinc-800">
            <div className="flex items-center gap-1.5 mb-2.5 pb-2 border-b border-zinc-800 text-[11px] text-zinc-500">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2">terminal — bash</span>
            </div>
            <pre className="text-zinc-200 whitespace-pre-wrap leading-relaxed">{quickActionScript}</pre>
          </div>
        </div>
      </div>

      {/* Two Column Section: Debris Breakdown & Trace Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Debris Distribution Breakdown */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-zinc-500" />
              <h3 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
                Debris Volume Breakdown (~194.8 MB)
              </h3>
            </div>
            <span className="text-[11px] text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">100% Non-Essential</span>
          </div>

          <div className="space-y-3 pt-1">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-600 font-mono text-[11px]">asar-extract-release/ (extracted build)</span>
                <span className="text-zinc-900 font-medium">129.4 MB (66.4%)</span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: '66.4%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-600 font-mono text-[11px]">asar-extract-temp/ (older preload era)</span>
                <span className="text-zinc-900 font-medium">51.3 MB (26.3%)</span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: '26.3%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-600 font-mono text-[11px]">electron-vite-react-debug.gif (template)</span>
                <span className="text-zinc-900 font-medium">9.64 MB (4.9%)</span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '4.9%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-600 font-mono text-[11px]">electron-vite-react.gif (template demo)</span>
                <span className="text-zinc-900 font-medium">3.41 MB (1.8%)</span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                <div className="bg-yellow-500 h-full rounded-full" style={{ width: '1.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-600 font-mono text-[11px]">public/book.jpg & patch scripts</span>
                <span className="text-zinc-900 font-medium">~1.0 MB (0.6%)</span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                <div className="bg-zinc-400 h-full rounded-full" style={{ width: '0.6%' }} />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-100">
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              *Note: Only the <code className="font-mono text-zinc-700">package.json</code> files inside <code className="font-mono text-zinc-700">asar-extract-*/</code> are tracked in git; the remaining ~180 MB is untracked local debris that wastes disk space and IDE indexing CPU.
            </p>
          </div>
        </div>

        {/* Right: Codebase Trace Results */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-zinc-500" />
              <h3 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
                Codebase Reachability Trace
              </h3>
            </div>
            <button
              onClick={onNavigateToArch}
              className="text-xs text-[#0071E3] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Layers</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
              <span className="text-zinc-500 block text-[11px]">Renderer Routes</span>
              <span className="text-base font-semibold text-zinc-900">9 Active</span>
              <p className="text-zinc-500 text-[11px] mt-1 leading-normal">Dashboard, Sales, Store, Dispatcher, Reports, Catalog, Logs, Book, Settings</p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
              <span className="text-zinc-500 block text-[11px]">IPC Handlers</span>
              <span className="text-base font-semibold text-zinc-900">20 Groups</span>
              <p className="text-zinc-500 text-[11px] mt-1 leading-normal">All controllers registered via contextBridge window.pharmacyApi</p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
              <span className="text-zinc-500 block text-[11px]">Database Schema</span>
              <span className="text-base font-semibold text-zinc-900">14 Tables</span>
              <p className="text-zinc-500 text-[11px] mt-1 leading-normal">better-sqlite3 + Drizzle ORM; migrations up to 0012</p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
              <span className="text-zinc-500 block text-[11px]">Background Services</span>
              <span className="text-base font-semibold text-zinc-900">Active</span>
              <p className="text-zinc-500 text-[11px] mt-1 leading-normal">Sync worker, conflict resolver, Google Drive backup, auto-update</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/70 text-xs text-amber-800 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span className="text-[11px] leading-relaxed">
              <strong>Orphaned Application Files:</strong> <code className="font-mono bg-amber-100/60 px-1 py-0.5 rounded text-amber-900">PlaceholderPage.tsx</code> (imported but never routed) and <code className="font-mono bg-amber-100/60 px-1 py-0.5 rounded text-amber-900">useConfirmPassword.ts</code> (zero imports).
            </span>
          </div>
        </div>

      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="quick-navigation-tiles">
        <button
          onClick={onNavigateToTable}
          className="text-left p-4 rounded-2xl border border-black/[0.06] bg-white hover:border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-zinc-400 group-hover:text-zinc-900 transition-colors">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Master Catalog</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
          </div>
          <h4 className="text-sm font-semibold text-zinc-900 mt-2">Filter & Search 34+ Findings</h4>
          <p className="text-xs text-zinc-500 mt-1">
            Sort by size, status, and category with tailored bash/powershell commands.
          </p>
        </button>

        <button
          onClick={onNavigateToPlan}
          className="text-left p-4 rounded-2xl border border-black/[0.06] bg-white hover:border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-zinc-400 group-hover:text-zinc-900 transition-colors">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Action Plan</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
          </div>
          <h4 className="text-sm font-semibold text-zinc-900 mt-2">Interactive Script Generator</h4>
          <p className="text-xs text-zinc-500 mt-1">
            Toggle checkboxes to generate customized Bash or PowerShell cleanup commands.
          </p>
        </button>

        <button
          onClick={onNavigateToFull}
          className="text-left p-4 rounded-2xl border border-black/[0.06] bg-white hover:border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-zinc-400 group-hover:text-zinc-900 transition-colors">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Full Audit Report</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
          </div>
          <h4 className="text-sm font-semibold text-zinc-900 mt-2">Comprehensive 9-Section Doc</h4>
          <p className="text-xs text-zinc-500 mt-1">
            Full documentation preserved with table of contents and verification notes.
          </p>
        </button>
      </div>

    </div>
  );
};
