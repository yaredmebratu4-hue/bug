import React, { useState } from 'react';
import { 
  FileText, 
  ChevronDown, 
  ChevronRight, 
  Check, 
  Copy, 
  AlertCircle, 
  ExternalLink, 
  Hash, 
  HelpCircle,
  Database,
  Layers,
  Code2,
  Package,
  Trash2,
  CheckCircle,
  ShieldAlert
} from 'lucide-react';
import { 
  PROJECT_METADATA, 
  MASTER_AUDIT_ITEMS, 
  DUPLICATE_GROUPS, 
  VERIFICATION_ITEMS, 
  DEAD_CODE_ITEMS, 
  DEPENDENCY_AUDIT_LIST 
} from '../data/auditData';

export const FullReportView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('sec-all');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 1500);
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-300" id="full-report-container">
      
      {/* Table of Contents Sticky Sidebar on Desktop (Apple HIG Style) */}
      <aside className="lg:w-64 shrink-0">
        <div className="sticky top-20 bg-white/90 border border-black/[0.06] rounded-2xl p-4 space-y-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-2 pb-2 border-b border-zinc-100">
            <FileText className="w-3.5 h-3.5 text-zinc-500" />
            <span>Document Outline</span>
          </div>

          <nav className="space-y-0.5 text-xs">
            <button
              onClick={() => scrollTo('sec-overview')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors truncate cursor-pointer ${
                activeSection === 'sec-overview' ? 'bg-zinc-100 text-zinc-900 font-semibold' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              1. Project Overview
            </button>

            <button
              onClick={() => scrollTo('sec-definitely')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors truncate cursor-pointer ${
                activeSection === 'sec-definitely' ? 'bg-zinc-100 text-zinc-900 font-semibold' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              2. Definitely Unused (25)
            </button>

            <button
              onClick={() => scrollTo('sec-probably')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors truncate cursor-pointer ${
                activeSection === 'sec-probably' ? 'bg-zinc-100 text-zinc-900 font-semibold' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              3. Probably Unused (11)
            </button>

            <button
              onClick={() => scrollTo('sec-verification')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors truncate cursor-pointer ${
                activeSection === 'sec-verification' ? 'bg-zinc-100 text-zinc-900 font-semibold' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              4. Needs Manual Verification (7)
            </button>

            <button
              onClick={() => scrollTo('sec-duplicates')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors truncate cursor-pointer ${
                activeSection === 'sec-duplicates' ? 'bg-zinc-100 text-zinc-900 font-semibold' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              5. Duplicate / Redundant (8)
            </button>

            <button
              onClick={() => scrollTo('sec-deps')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors truncate cursor-pointer ${
                activeSection === 'sec-deps' ? 'bg-zinc-100 text-zinc-900 font-semibold' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              6. Unused Dependencies
            </button>

            <button
              onClick={() => scrollTo('sec-dead-code')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors truncate cursor-pointer ${
                activeSection === 'sec-dead-code' ? 'bg-zinc-100 text-zinc-900 font-semibold' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              7. Dead / Legacy Code (9)
            </button>

            <button
              onClick={() => scrollTo('sec-recommendations')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors truncate cursor-pointer ${
                activeSection === 'sec-recommendations' ? 'bg-zinc-100 text-zinc-900 font-semibold' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              8. Cleanup Recommendations
            </button>

            <button
              onClick={() => scrollTo('sec-map')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors truncate cursor-pointer ${
                activeSection === 'sec-map' ? 'bg-zinc-100 text-zinc-900 font-semibold' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              9. Dependency & Reference Map
            </button>

            <button
              onClick={() => scrollTo('sec-summary-table')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors truncate cursor-pointer ${
                activeSection === 'sec-summary-table' ? 'bg-zinc-100 text-zinc-900 font-semibold' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              Final Summary Master Table
            </button>

            <button
              onClick={() => scrollTo('sec-first-action')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors truncate text-[#0071E3] font-medium hover:bg-blue-50 cursor-pointer`}
            >
              Suggested First Action
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Report Content Column */}
      <main className="flex-1 space-y-6 min-w-0">
        
        {/* Document Header (Apple Editorial Style) */}
        <section className="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            <Hash className="w-3.5 h-3.5" />
            <span>Official Codebase Audit Report</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
            Codebase Cleanup Audit Report
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-zinc-50 p-4 rounded-xl border border-zinc-100">
            <div>
              <span className="text-zinc-400">Project:</span>{' '}
              <strong className="text-zinc-800">{PROJECT_METADATA.name} ({PROJECT_METADATA.shortName})</strong>
            </div>
            <div>
              <span className="text-zinc-400">Repository:</span>{' '}
              <a href={PROJECT_METADATA.repo} target="_blank" rel="noreferrer" className="text-[#0071E3] hover:underline font-mono">
                {PROJECT_METADATA.repo}
              </a>
            </div>
            <div>
              <span className="text-zinc-400">Branch & HEAD:</span>{' '}
              <span className="text-zinc-700 font-mono">{PROJECT_METADATA.branch}, HEAD {PROJECT_METADATA.headCommit}</span>
            </div>
            <div>
              <span className="text-zinc-400">Audit Date:</span>{' '}
              <span className="text-zinc-700">{PROJECT_METADATA.auditDate}</span>
            </div>
          </div>

          <div className="text-xs text-zinc-600 space-y-2 leading-relaxed">
            <p>
              <strong className="text-zinc-900 font-medium">Scope:</strong> {PROJECT_METADATA.scope}
            </p>
            <div className="p-3 bg-zinc-50 border-l-2 border-zinc-400 text-zinc-600 rounded-r-xl">
              <strong className="text-zinc-800 font-medium">Method:</strong> {PROJECT_METADATA.method}
            </div>
          </div>
        </section>

        {/* Section 1: Project Overview */}
        <section id="sec-overview" className="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <h2 className="text-base font-semibold text-zinc-900 flex items-center gap-2 pb-2 border-b border-zinc-100">
            <span className="text-zinc-400 font-mono">1.</span> Project Overview
          </h2>

          <div className="space-y-3.5 text-xs leading-relaxed text-zinc-600">
            <div>
              <strong className="text-zinc-900 block text-xs font-semibold mb-1">What it does:</strong>
              <p>
                A local-first Windows desktop app for pharmacy operations — sales (with bank/wallet payment providers and PDF receipts), store and dispatcher inventory, medicine catalog with multi-unit pricing, receiving/transfers/adjustments, returns, reports, audit logs, prescription registration book, role-based auth, Google Drive backup, cloud sync, and auto-update.
              </p>
            </div>

            <div>
              <strong className="text-zinc-900 block text-xs font-semibold mb-1">Stack:</strong>
              <p className="font-mono bg-zinc-50 p-2.5 rounded-xl border border-zinc-100 text-zinc-800">
                Electron 33 + React 19 + TypeScript + Vite 8 (vite-plugin-electron) + Tailwind CSS 4 + shadcn-style UI + better-sqlite3 + Drizzle ORM + electron-updater + googleapis.
              </p>
            </div>

            <div>
              <strong className="text-zinc-900 block text-xs font-semibold mb-1">Entry points:</strong>
              <ul className="list-disc list-inside space-y-1.5 pl-1 text-zinc-600">
                <li>
                  <strong className="text-zinc-800">Renderer:</strong> <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">index.html</code> → <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">src/main.tsx</code> → <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">src/App.tsx</code> → <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">src/routes.tsx</code> (HashRouter; routes: <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">/</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">/sales</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">/store</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">/dispatcher</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">/reports</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">/medicines</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">/audit-logs</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">/prescription-book</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">/settings</code>)
                </li>
                <li>
                  <strong className="text-zinc-800">Main process:</strong> <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">electron/main/index.ts</code> → <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">runMigrations()</code> → <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">registerIpcHandlers()</code> (20 controllers) → <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">initializeSync()</code> → auto-update
                </li>
                <li>
                  <strong className="text-zinc-800">Preload:</strong> <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">electron/preload/index.cjs</code> (contextBridge <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">window.pharmacyApi</code>)
                </li>
                <li>
                  <strong className="text-zinc-800">Build:</strong> <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">vite.config.ts</code> (copies migrations + preload, externalizes <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">dependencies</code>); packaging via <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">electron-builder.json</code>
                </li>
              </ul>
            </div>

            <div>
              <strong className="text-zinc-900 block text-xs font-semibold mb-1">Main structure:</strong>
              <p>
                <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">electron/main/&#123;db, ipc/controllers, repositories, services, sync, session, utils&#125;</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">src/&#123;components, pages, providers, hooks, lib, config&#125;</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">shared/types/</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">scripts/</code>, plus documentation folders (<code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">pharmacy/</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">mobile app/</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">docs/</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">.kiro/</code>) and a large amount of debug/temp debris (~193 MB) at the repository root.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Definitely Unused */}
        <section id="sec-definitely" className="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <h2 className="text-base font-semibold text-zinc-900 flex items-center gap-2">
              <span className="text-zinc-400 font-mono">2.</span> Definitely Unused (Confidence: High)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200/60">
              25 Items Verified
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-zinc-100 font-mono">
              <thead>
                <tr className="bg-zinc-50/70 text-zinc-500 font-sans">
                  <th className="p-2.5 w-10">#</th>
                  <th className="p-2.5">Path</th>
                  <th className="p-2.5 w-24">Type</th>
                  <th className="p-2.5 font-sans">Why Unused (Evidence)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {MASTER_AUDIT_ITEMS.filter(i => i.status === 'Definitely unused').map((item, idx) => (
                  <tr key={item.id} className="hover:bg-zinc-50/80">
                    <td className="p-2.5 text-zinc-400">{idx + 1}</td>
                    <td className="p-2.5 text-zinc-900 font-medium">{item.path}</td>
                    <td className="p-2.5">
                      <span className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 text-[10px]">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-2.5 font-sans text-zinc-600 leading-relaxed">
                      {item.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Probably Unused */}
        <section id="sec-probably" className="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <h2 className="text-base font-semibold text-zinc-900 flex items-center gap-2">
              <span className="text-zinc-400 font-mono">3.</span> Probably Unused (Confidence: Medium)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/60">
              11 Items Identified
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-zinc-100 font-mono">
              <thead>
                <tr className="bg-zinc-50/70 text-zinc-500 font-sans">
                  <th className="p-2.5 w-10">#</th>
                  <th className="p-2.5">Path</th>
                  <th className="p-2.5 font-sans">Why (Detailed Rationale)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {MASTER_AUDIT_ITEMS.filter(i => i.status === 'Probably unused').map((item, idx) => (
                  <tr key={item.id} className="hover:bg-zinc-50/80">
                    <td className="p-2.5 text-zinc-400">{idx + 1}</td>
                    <td className="p-2.5 text-zinc-900 font-medium">{item.path}</td>
                    <td className="p-2.5 font-sans text-zinc-600 leading-relaxed">
                      {item.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Needs Manual Verification */}
        <section id="sec-verification" className="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <h2 className="text-base font-semibold text-zinc-900 flex items-center gap-2">
              <span className="text-zinc-400 font-mono">4.</span> Needs Manual Verification
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200/60">
              7 Key Questions
            </span>
          </div>

          <div className="space-y-3 font-sans text-xs">
            {VERIFICATION_ITEMS.map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-zinc-50 border border-zinc-100 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-mono font-semibold text-zinc-900">
                    {item.item}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    item.impact === 'High' ? 'bg-red-50 text-red-700 border border-red-200' :
                    item.impact === 'Medium' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                    'bg-zinc-100 text-zinc-600'
                  }`}>
                    {item.impact} Impact
                  </span>
                </div>
                <p className="text-zinc-600 leading-relaxed">
                  <strong className="text-zinc-800 font-medium">Question to resolve:</strong> {item.question}
                </p>
                <div className="p-2.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 leading-relaxed font-mono text-[11px]">
                  <strong>Action:</strong> {item.action}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Duplicate / Redundant Code */}
        <section id="sec-duplicates" className="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <h2 className="text-base font-semibold text-zinc-900 flex items-center gap-2">
              <span className="text-zinc-400 font-mono">5.</span> Duplicate / Redundant Code
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-700">
              8 Groups
            </span>
          </div>

          <div className="space-y-3 font-sans text-xs">
            {DUPLICATE_GROUPS.map((grp) => (
              <div key={grp.id} className="p-4 rounded-xl bg-zinc-50 border border-zinc-100 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-200 text-zinc-800 font-mono font-semibold text-xs">
                    {grp.id}
                  </span>
                  <h3 className="font-semibold text-zinc-900 text-xs sm:text-sm">{grp.title}</h3>
                </div>
                <p className="text-zinc-600 leading-relaxed">{grp.description}</p>
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200 font-mono text-[11px] text-zinc-700 space-y-0.5">
                  {grp.files.map((f, i) => (
                    <div key={i}>• {f}</div>
                  ))}
                </div>
                <div className="text-zinc-700 text-[11px] font-mono">
                  <strong>Recommendation:</strong> {grp.recommendation}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Unused Dependencies */}
        <section id="sec-deps" className="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <h2 className="text-base font-semibold text-zinc-900 flex items-center gap-2">
              <span className="text-zinc-400 font-mono">6.</span> Unused Dependencies
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200/60">
              Full Dependency Audit
            </span>
          </div>

          <p className="text-xs text-zinc-600 leading-relaxed font-sans">
            Searched every source tree (<code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">electron/</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">src/</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">shared/</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">scripts/</code>, configs) for imports, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">createRequire(...)</code> calls, and <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">require()</code>:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-zinc-100 font-mono">
              <thead>
                <tr className="bg-zinc-50/70 text-zinc-500 font-sans">
                  <th className="p-2.5">Package</th>
                  <th className="p-2.5 w-28">Verdict</th>
                  <th className="p-2.5 font-sans">Evidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {DEPENDENCY_AUDIT_LIST.filter(d => d.status !== 'Confirmed Used').map((dep, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/80">
                    <td className="p-2.5 font-semibold text-zinc-900">{dep.name}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        dep.status === 'Unused' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {dep.status}
                      </span>
                    </td>
                    <td className="p-2.5 font-sans text-zinc-600">{dep.evidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 space-y-2 text-xs font-sans">
            <div className="text-zinc-900 font-semibold font-mono">Confirmed used (keep):</div>
            <p className="text-zinc-600 font-mono text-[11px] leading-relaxed">
              better-sqlite3, drizzle-orm, bcryptjs, dotenv, electron-updater, googleapis, react-router-dom, recharts, lucide-react, clsx, tailwind-merge, class-variance-authority, ulid, xlsx, @radix-ui/react-&#123;dropdown-menu, scroll-area, separator, slot&#125;, tailwindcss, tw-animate-css, @tailwindcss/vite, @vitejs/plugin-react, vite-plugin-electron, vite, typescript, vitest, electron, electron-builder, drizzle-kit, @types/&#123;better-sqlite3, react, react-dom&#125;, @playwright/test.
            </p>
            <div className="text-zinc-500 text-[11px] pt-1.5 border-t border-zinc-200/80">
              <strong>Note on React in devDependencies:</strong> react / react-dom sit in devDependencies — unusual in standard web apps, but correct here, since the renderer is fully bundled by Vite and only main-process dependencies are externalized into the production asar.
            </div>
          </div>
        </section>

        {/* Section 7: Dead / Legacy Code */}
        <section id="sec-dead-code" className="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <h2 className="text-base font-semibold text-zinc-900 flex items-center gap-2">
              <span className="text-zinc-400 font-mono">7.</span> Dead / Legacy Code
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200/60">
              9 Items Logged
            </span>
          </div>

          <div className="space-y-2.5 font-sans text-xs">
            {DEAD_CODE_ITEMS.map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-zinc-400 font-semibold">{item.id}.</span>
                    <h3 className="font-semibold text-zinc-900">{item.title}</h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    item.severity === 'Critical' ? 'bg-red-50 text-red-700 border border-red-200' :
                    item.severity === 'Moderate' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                    'bg-zinc-100 text-zinc-600'
                  }`}>
                    {item.severity}
                  </span>
                </div>
                <div className="font-mono text-zinc-600 text-[11px]">{item.location}</div>
                <p className="text-zinc-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Cleanup Recommendations */}
        <section id="sec-recommendations" className="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <h2 className="text-base font-semibold text-zinc-900 flex items-center gap-2 pb-2 border-b border-zinc-100">
            <span className="text-zinc-400 font-mono">8.</span> Cleanup Recommendations
          </h2>

          <div className="space-y-4 text-xs font-sans">
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/70 space-y-2">
              <h3 className="font-semibold text-emerald-900 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Safe to remove (~195 MB + dead deps)</span>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-zinc-700 leading-relaxed font-mono text-[11px]">
                <li>asar-extract-release/, asar-extract-temp/, both GIFs, tsc-check.txt, task-list.md, report_parts/, .playwright.config.txt, .vite.config.flat.txt, README.zh-CN.md, src/components/update/, src/type/electron-updater.d.ts, unused src/assets/logo-*.svg + tailwlindcss.svg, src/hooks/useConfirmPassword.ts, electron/main/domain/ (stub), public/book.jpg</li>
                <li>All temp_*.py, tmp_*.py/.cjs, root check-db.cjs, fix_redirect.py (patches already applied)</li>
                <li>Duplicates: keep the .cjs variants of cleanup-duplicate-medicines / cleanup-medicines; drop the .ts / .py twins and migrate-destination-column.* (superseded by migrate.ts)</li>
                <li>Dependencies: docx, @radix-ui/react-tooltip, electron-rebuild, vite-plugin-electron-renderer, @types/bcryptjs</li>
                <li>test/e2e/e2e.spec.ts (replace with a real spec if e2e is planned)</li>
                <li>Untrack asar-extract-*/package.json and DOCUMENTATION.doc</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 space-y-2">
              <h3 className="font-semibold text-amber-900 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Review before removing</span>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-zinc-700 leading-relaxed font-mono text-[11px]">
                <li>0013_add_destination_column.sql (keep while ensureDestinationColumn() is the enforcement point)</li>
                <li>playwright.config.ts + @playwright/test + test/index.test.ts (test-strategy decision)</li>
                <li>tsconfig.node.json (wire it via references — which also fixes the broken typecheck — or delete)</li>
                <li>Template CI workflows (.github/workflows/ci.yml, pr-guard.yml)</li>
                <li>Docs consolidation (DOCUMENTATION.md / DATABASE_DOCUMENTATION.md / docs/* / mobile app/ / pharmacy/ / .kiro/)</li>
                <li>.env plaintext credentials (rotate the secret; remove dead vars; fix .env.example + DEPLOYMENT.md)</li>
                <li>.neon / skills-lock.json / .agents/</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
              <h3 className="font-semibold text-zinc-900 text-sm flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-zinc-600" />
                <span>Keep (Verified Crucial)</span>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-zinc-700 leading-relaxed font-mono text-[11px]">
                <li>All of electron/, src/, shared/ application code (verified fully wired)</li>
                <li>build/, public/logo/*, favicon.ico, components.json</li>
                <li>scripts/&#123;clean-preload.cjs, generate-icons.js&#125; (npm-wired)</li>
                <li>scripts/* docs and diagnostic .cjs tools, if you still service installed builds</li>
                <li>.vscode/&#123;settings, launch&#125;.json</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 9: Dependency & Reference Map */}
        <section id="sec-map" className="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <h2 className="text-base font-semibold text-zinc-900 flex items-center gap-2 pb-2 border-b border-zinc-100">
            <span className="text-zinc-400 font-mono">9.</span> Dependency and File Reference Map
          </h2>

          <div className="bg-[#1E1E20] p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
            <pre className="text-zinc-200 leading-relaxed whitespace-pre">
{`index.html ──► src/main.tsx ──► App.tsx ──► providers/{auth, theme} ──► routes.tsx
routes.tsx ──► pages/* (Dashboard, Sales, Store + {ReceiveStock, Transfer, AdjustStock,
             ImportExcel, PendingIssues, StoreStockView}, Dispatcher, Reports,
             Medicines + {List, Categories, Units, FormModal, PriceUpdate, MedicineUnitsPanel},
             AuditLogs, PrescriptionRegistration,
             Settings + {Profile, Users, ChangePassword, Markup, Backup, ClearData})
             └─► components/{layout, auth, dashboard, medicines, operations, ui} ──► hooks/usePharmacyApi
             WARNING: PlaceholderPage — imported but NOT rendered

electron/main/index.ts ──► db/{connection, migrate (migrations + journal, ensureDestinationColumn, seed)}
                       ──► ipc/register-handlers ──► 20 controllers ──► services/* ──► repositories/* ──► db/schema/index.ts (14 schema files, all re-exported)
                       ──► sync/{index → service, worker, status-tracker, conflict-resolver}
                             ──► services/{cloud-api-client, network-service, device-registration}
                       ──► services/auto-update-service (electron-updater)
                       ──► services/backup-service ──► google-drive-service (googleapis; credentials from DB, NOT env)
electron/preload/index.cjs ── mirrors every IPC channel (all 20 controller groups used)
vite.config.ts ──► copies migrations + preload; externalizes package.json "dependencies"
electron-builder.json ──► build/icon.ico, dist-electron/*, dist/*, extraResources: migrations + public/logo
scripts/ ── only clean-preload.cjs (dist:*) and generate-icons.js (npm script) are wired; rest are one-off DB tools/docs`}
            </pre>
          </div>

          <p className="text-xs text-zinc-600 font-sans leading-relaxed">
            Items classified as unused sit <strong>outside</strong> this graph: no import edge from any entry point, not referenced by configs (<code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">tsconfig*</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">vite.config.ts</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">electron-builder.json</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">.github/</code>), and not matched by dynamic patterns (<code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">createRequire</code>, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">ipcRenderer.invoke</code> channel names, <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">./logo/...</code> runtime paths).
          </p>
        </section>

        {/* Final Summary Master Table */}
        <section id="sec-summary-table" className="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <h2 className="text-base font-semibold text-zinc-900 flex items-center gap-2 pb-2 border-b border-zinc-100">
            Final Summary Table
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-zinc-100 font-mono">
              <thead>
                <tr className="bg-zinc-50/70 text-zinc-500 font-sans">
                  <th className="p-2.5">Path</th>
                  <th className="p-2.5 w-24">Category</th>
                  <th className="p-2.5 w-32">Status</th>
                  <th className="p-2.5 w-24">Confidence</th>
                  <th className="p-2.5 font-sans">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {MASTER_AUDIT_ITEMS.map((row) => (
                  <tr key={row.id} className="hover:bg-zinc-50/80">
                    <td className="p-2.5 text-zinc-900 font-medium">{row.path}</td>
                    <td className="p-2.5 text-zinc-500">{row.category}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        row.status === 'Definitely unused' ? 'bg-red-50 text-red-700 border border-red-200' :
                        row.status === 'Probably unused' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        row.status === 'Broken' ? 'bg-red-100 text-red-800 border border-red-300 font-semibold' :
                        row.status === 'Needs verification' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        row.status === 'Keep' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                        'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-2.5 text-zinc-500">{row.confidence}</td>
                    <td className="p-2.5 font-sans text-zinc-600">{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Suggested First Action Footer */}
        <section id="sec-first-action" className="bg-white p-6 rounded-2xl border border-blue-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
          <div className="flex items-center gap-2 text-zinc-900 font-semibold text-sm">
            <CheckCircle className="w-4 h-4 text-[#0071E3]" />
            <span>Suggested First Action Callout</span>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Suggested first action when cleanup is approved: fix the broken <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">tsconfig.json</code> state (restore typecheck, ideally with project references), then batch-delete the ~195 MB of extraction/temp artifacts, then uninstall the 5 dead dependencies (<code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">npm uninstall docx @radix-ui/react-tooltip</code> and <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">npm uninstall -D electron-rebuild vite-plugin-electron-renderer @types/bcryptjs</code>), and re-run <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">npm run typecheck</code> + <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">npm run build</code> to confirm.
          </p>
        </section>

      </main>

    </div>
  );
};
