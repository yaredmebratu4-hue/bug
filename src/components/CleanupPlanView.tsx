import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertTriangle, 
  FolderMinus, 
  PackageX, 
  Code2, 
  CheckSquare, 
  Square,
  FileCode,
  HardDrive
} from 'lucide-react';
import { MASTER_AUDIT_ITEMS, DEPENDENCY_AUDIT_LIST } from '../data/auditData';

export const CleanupPlanView: React.FC = () => {
  const [shellType, setShellType] = useState<'bash' | 'powershell'>('bash');
  const [copiedPhase1, setCopiedPhase1] = useState(false);
  const [copiedPhase2, setCopiedPhase2] = useState(false);
  const [copiedPhase3, setCopiedPhase3] = useState(false);
  const [copiedPhase4, setCopiedPhase4] = useState(false);
  const [copiedFull, setCopiedFull] = useState(false);

  // Checkbox selections for batch cleanup
  const [selectedDebris, setSelectedDebris] = useState<Record<string, boolean>>({
    'asar-release': true,
    'asar-temp': true,
    'debug-gif': true,
    'react-gif': true,
    'update-docs': true,
    'updater-types': true,
    'template-logos': true,
    'temp-py-scripts': true,
    'tmp-queries': true,
    'untracked-utils': true,
    'scratch-files': true,
    'old-configs': true,
    'chinese-readme': true,
    'public-book': true,
    'template-e2e': true,
    'domain-stub': true
  });

  const toggleDebris = (key: string) => {
    setSelectedDebris(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const selectAll = () => {
    const all: Record<string, boolean> = {};
    Object.keys(selectedDebris).forEach(k => all[k] = true);
    setSelectedDebris(all);
  };

  const deselectAll = () => {
    const none: Record<string, boolean> = {};
    Object.keys(selectedDebris).forEach(k => none[k] = false);
    setSelectedDebris(none);
  };

  // Generate Bash commands for selected debris
  const generateDebrisBash = () => {
    const lines: string[] = [];
    if (selectedDebris['asar-release']) lines.push('rm -rf asar-extract-release/ && git rm -f asar-extract-release/package.json 2>/dev/null || true');
    if (selectedDebris['asar-temp']) lines.push('rm -rf asar-extract-temp/ && git rm -f asar-extract-temp/package.json 2>/dev/null || true');
    if (selectedDebris['debug-gif']) lines.push('rm -f electron-vite-react-debug.gif');
    if (selectedDebris['react-gif']) lines.push('rm -f electron-vite-react.gif');
    if (selectedDebris['update-docs']) lines.push('rm -rf src/components/update/');
    if (selectedDebris['updater-types']) lines.push('rm -f src/type/electron-updater.d.ts');
    if (selectedDebris['template-logos']) lines.push('rm -f src/assets/logo-electron.svg src/assets/logo-tailwindcss.svg src/assets/logo-v1.svg src/assets/logo-vite.svg src/assets/tailwlindcss.svg');
    if (selectedDebris['temp-py-scripts']) lines.push('rm -f temp_check.py temp_create_ico.py temp_create_repo.py temp_script.py temp_update_backup_section.py temp_update_index.py');
    if (selectedDebris['tmp-queries']) lines.push('rm -f tmp_check_price.cjs tmp_query_dispatcher.py');
    if (selectedDebris['untracked-utils']) lines.push('rm -f check-db.cjs fix_redirect.py generate-doc.cjs');
    if (selectedDebris['scratch-files']) lines.push('rm -rf tsc-check.txt task-list.md report_parts/');
    if (selectedDebris['old-configs']) lines.push('rm -f .playwright.config.txt .vite.config.flat.txt');
    if (selectedDebris['chinese-readme']) lines.push('rm -f README.zh-CN.md');
    if (selectedDebris['public-book']) lines.push('rm -f public/book.jpg');
    if (selectedDebris['template-e2e']) lines.push('rm -rf test/e2e/');
    if (selectedDebris['domain-stub']) lines.push('rm -rf electron/main/domain/');
    return lines.join('\n');
  };

  const generateDebrisPowerShell = () => {
    const lines: string[] = [];
    if (selectedDebris['asar-release']) lines.push('Remove-Item -Recurse -Force asar-extract-release; git rm -f asar-extract-release/package.json');
    if (selectedDebris['asar-temp']) lines.push('Remove-Item -Recurse -Force asar-extract-temp; git rm -f asar-extract-temp/package.json');
    if (selectedDebris['debug-gif']) lines.push('Remove-Item -Force electron-vite-react-debug.gif');
    if (selectedDebris['react-gif']) lines.push('Remove-Item -Force electron-vite-react.gif');
    if (selectedDebris['update-docs']) lines.push('Remove-Item -Recurse -Force src/components/update');
    if (selectedDebris['updater-types']) lines.push('Remove-Item -Force src/type/electron-updater.d.ts');
    if (selectedDebris['template-logos']) lines.push('Remove-Item -Force src/assets/logo-*.svg, src/assets/tailwlindcss.svg');
    if (selectedDebris['temp-py-scripts']) lines.push('Remove-Item -Force temp_*.py');
    if (selectedDebris['tmp-queries']) lines.push('Remove-Item -Force tmp_check_price.cjs, tmp_query_dispatcher.py');
    if (selectedDebris['untracked-utils']) lines.push('Remove-Item -Force check-db.cjs, fix_redirect.py, generate-doc.cjs');
    if (selectedDebris['scratch-files']) lines.push('Remove-Item -Recurse -Force tsc-check.txt, task-list.md, report_parts');
    if (selectedDebris['old-configs']) lines.push('Remove-Item -Force .playwright.config.txt, .vite.config.flat.txt');
    if (selectedDebris['chinese-readme']) lines.push('Remove-Item -Force README.zh-CN.md');
    if (selectedDebris['public-book']) lines.push('Remove-Item -Force public/book.jpg');
    if (selectedDebris['template-e2e']) lines.push('Remove-Item -Recurse -Force test/e2e');
    if (selectedDebris['domain-stub']) lines.push('Remove-Item -Recurse -Force electron/main/domain');
    return lines.join('\n');
  };

  const phase1Script = `# Phase 1: Fix TS18002 Broken Typecheck in tsconfig.json
# Inspect diff first:
git diff tsconfig.json

# If you don't use project references, revert the uncommitted 'files: []':
git checkout tsconfig.json

# Verify typecheck works:
npm run typecheck`;

  const phase3Script = `# Phase 3: Prune Unused & Redundant Dependencies
# 1. Uninstall unused runtime dependencies (0 imports in project):
npm uninstall docx @radix-ui/react-tooltip

# 2. Uninstall unused/redundant devDependencies:
npm uninstall -D electron-rebuild vite-plugin-electron-renderer @types/bcryptjs`;

  const phase4Script = `# Phase 4: Code Cleanups & Secret Rotation
# 1. Remove dead PlaceholderPage import and file:
rm -f src/pages/PlaceholderPage.tsx
# In src/routes.tsx line 5: delete "import { PlaceholderPage } from './pages/PlaceholderPage';"

# 2. Delete unused hook:
rm -f src/hooks/useConfirmPassword.ts

# 3. Clean debug preload path logging in electron/main/index.ts (lines 103-109):
# Remove the fs.writeFileSync(preloadResolvedPath, ...) block

# 4. Clean .env and rotate plaintext Google Drive credentials`;

  const fullCleanupScript = `${phase1Script}

# Phase 2: Batch Remove Debris (~195 MB)
${generateDebrisBash()}

${phase3Script}

${phase4Script}

# Final Verification
npm run typecheck
npm run build`;

  const copyToClipboard = (text: string, setCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300" id="cleanup-plan-section">
      
      {/* Intro Card with Shell Selector (Apple Style) */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-sm sm:text-base font-semibold text-zinc-900">
            Four-Phase Remediation Roadmap
          </h2>
          <p className="text-xs text-zinc-500 mt-1 max-w-2xl leading-relaxed">
            Follow these sequential phases to safely clean 195 MB of debris, resolve the TS18002 compile failure, prune 5 packages, and secure credentials without breaking runtime features.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0 flex-wrap">
          <div className="bg-zinc-100 p-0.5 rounded-full inline-flex border border-black/[0.04]">
            <button
              onClick={() => setShellType('bash')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                shellType === 'bash'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              Bash / Zsh
            </button>
            <button
              onClick={() => setShellType('powershell')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                shellType === 'powershell'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              PowerShell
            </button>
          </div>

          <button
            onClick={() => copyToClipboard(fullCleanupScript, setCopiedFull)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-xs shadow-xs transition-all cursor-pointer"
          >
            {copiedFull ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedFull ? "Copied" : "Copy Full Script"}</span>
          </button>
        </div>
      </div>

      {/* Phase 1: Fix TS18002 */}
      <div className="bg-white rounded-2xl border border-black/[0.06] p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-red-50 text-red-700 font-semibold text-xs flex items-center justify-center border border-red-200/60 shrink-0">
              1
            </span>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-900">
              Phase 1: Fix Broken Typecheck (TS18002) in <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono text-zinc-800">tsconfig.json</code>
            </h3>
          </div>
          <button
            onClick={() => copyToClipboard(phase1Script, setCopiedPhase1)}
            className="inline-flex items-center gap-1 text-xs text-[#0071E3] hover:underline font-medium cursor-pointer self-start sm:self-auto"
          >
            {copiedPhase1 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{copiedPhase1 ? "Copied" : "Copy Phase 1"}</span>
          </button>
        </div>

        <p className="text-xs text-zinc-600 leading-relaxed">
          Someone made an uncommitted change to <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono text-zinc-800">tsconfig.json</code> adding <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono text-zinc-800">"files": []</code> without project references. Reverting this immediately restores the TypeScript build so you can safely verify subsequent cleanups.
        </p>

        <div className="bg-[#1E1E20] rounded-xl p-3 sm:p-3.5 font-mono text-xs text-zinc-200 border border-zinc-800 overflow-x-auto">
          <pre className="text-zinc-200 whitespace-pre-wrap leading-relaxed text-[11px] sm:text-xs">{phase1Script}</pre>
        </div>
      </div>

      {/* Phase 2: Batch Remove Debris (~195 MB) */}
      <div className="bg-white rounded-2xl border border-black/[0.06] p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-800 font-semibold text-xs flex items-center justify-center border border-zinc-200 shrink-0">
              2
            </span>
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-zinc-900">
                Phase 2: Customize & Remove Debris Artifacts (~194.8 MB)
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Toggle items below to generate the exact cleanup command for your workspace.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              onClick={selectAll}
              className="text-xs text-[#0071E3] hover:underline font-medium cursor-pointer"
            >
              Select All
            </button>
            <span className="text-zinc-300">·</span>
            <button
              onClick={deselectAll}
              className="text-xs text-zinc-500 hover:text-zinc-800 font-medium cursor-pointer"
            >
              Deselect All
            </button>
            <span className="text-zinc-300">·</span>
            <button
              onClick={() => copyToClipboard(shellType === 'bash' ? generateDebrisBash() : generateDebrisPowerShell(), setCopiedPhase2)}
              className="inline-flex items-center gap-1 text-xs text-[#0071E3] hover:underline font-medium cursor-pointer ml-1"
            >
              {copiedPhase2 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
              <span>{copiedPhase2 ? "Copied" : "Copy Phase 2"}</span>
            </button>
          </div>
        </div>

        {/* Checkbox item grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-1">
          {[
            { key: 'asar-release', label: 'asar-extract-release/', size: '129.4 MB', desc: 'Old unpacked production ASAR' },
            { key: 'asar-temp', label: 'asar-extract-temp/', size: '51.3 MB', desc: 'Older preload/index.js build extraction' },
            { key: 'debug-gif', label: 'electron-vite-react-debug.gif', size: '9.64 MB', desc: 'Vite template demo recording' },
            { key: 'react-gif', label: 'electron-vite-react.gif', size: '3.41 MB', desc: 'Template demo animation' },
            { key: 'update-docs', label: 'src/components/update/', size: '8.7 KB', desc: 'Dead sample update modal' },
            { key: 'updater-types', label: 'src/type/electron-updater.d.ts', size: '381 B', desc: 'Redundant d.ts declaration' },
            { key: 'template-logos', label: 'Unused template SVGs in src/assets/', size: '4.8 KB', desc: 'logo-electron, tailwlindcss, etc.' },
            { key: 'temp-py-scripts', label: 'temp_*.py (6 root python patches)', size: '12.4 KB', desc: 'One-off migration patch scripts' },
            { key: 'tmp-queries', label: 'tmp_check_price.cjs & query_dispatcher.py', size: '4.1 KB', desc: 'Temporary query debugging tools' },
            { key: 'untracked-utils', label: 'check-db.cjs, fix_redirect.py, doc.cjs', size: '6.2 KB', desc: 'Scratch diagnostic utilities' },
            { key: 'scratch-files', label: 'tsc-check.txt, task-list.md, report_parts/', size: '42.1 KB', desc: 'Debris from prior developer sessions' },
            { key: 'old-configs', label: '.playwright.config.txt, .vite.config.flat.txt', size: '2.5 KB', desc: 'Backup config scratchpads' },
            { key: 'chinese-readme', label: 'README.zh-CN.md', size: '4.2 KB', desc: 'Unused Chinese template translation' },
            { key: 'public-book', label: 'public/book.jpg', size: '942 KB', desc: 'Unused stock illustration in public' },
            { key: 'template-e2e', label: 'test/e2e/e2e.spec.ts', size: '1.2 KB', desc: 'Template test asserting "Vite + React"' },
            { key: 'domain-stub', label: 'electron/main/domain/ (stub)', size: '200 B', desc: 'Empty directory with orphan stub' },
          ].map((item) => (
            <div 
              key={item.key}
              onClick={() => toggleDebris(item.key)}
              className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-colors ${
                selectedDebris[item.key]
                  ? 'bg-blue-50/20 border-blue-200/70'
                  : 'bg-zinc-50/60 border-zinc-100 hover:bg-zinc-50'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedDebris[item.key] || false}
                onChange={() => {}}
                className="mt-0.5 rounded border-zinc-300 text-[#0071E3] focus:ring-0 cursor-pointer"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-mono text-zinc-900 text-xs font-medium truncate">
                    {item.label}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-zinc-500 bg-zinc-100 px-1.5 py-0.2 rounded shrink-0">
                    {item.size}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic code preview */}
        <div className="bg-[#1E1E20] rounded-xl p-3 sm:p-3.5 font-mono text-xs text-zinc-200 border border-zinc-800 overflow-x-auto">
          <div className="text-[11px] text-zinc-500 mb-2">
            Generated command ({shellType}):
          </div>
          <pre className="text-zinc-200 whitespace-pre-wrap leading-relaxed text-[11px] sm:text-xs">
            {shellType === 'bash' ? generateDebrisBash() : generateDebrisPowerShell()}
          </pre>
        </div>
      </div>

      {/* Phase 3: Prune Dependencies */}
      <div className="bg-white rounded-2xl border border-black/[0.06] p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-800 font-semibold text-xs flex items-center justify-center border border-zinc-200 shrink-0">
              3
            </span>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-900">
              Phase 3: Uninstall Unused & Redundant Dependencies (5 Packages)
            </h3>
          </div>
          <button
            onClick={() => copyToClipboard(phase3Script, setCopiedPhase3)}
            className="inline-flex items-center gap-1 text-xs text-[#0071E3] hover:underline font-medium cursor-pointer self-start sm:self-auto"
          >
            {copiedPhase3 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{copiedPhase3 ? "Copied" : "Copy Phase 3"}</span>
          </button>
        </div>

        <p className="text-xs text-zinc-600 leading-relaxed">
          The following packages have 0 import references across all source trees and can be safely uninstalled:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
            <div className="font-semibold text-zinc-900 mb-1">Unused dependencies (2):</div>
            <p className="font-mono text-zinc-700 text-[11px]">docx, @radix-ui/react-tooltip</p>
            <p className="text-[11px] text-zinc-500 mt-1">Receipts and reports use custom PDF / XLSX export instead of docx; no tooltip primitives are imported.</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
            <div className="font-semibold text-zinc-900 mb-1">Redundant devDependencies (3):</div>
            <p className="font-mono text-zinc-700 text-[11px]">electron-rebuild, vite-plugin-electron-renderer, @types/bcryptjs</p>
            <p className="text-[11px] text-zinc-500 mt-1">better-sqlite3 is rebuilt via electron-builder; renderer plugin is superseded; bcryptjs already includes embedded types.</p>
          </div>
        </div>

        <div className="bg-[#1E1E20] rounded-xl p-3 sm:p-3.5 font-mono text-xs text-zinc-200 border border-zinc-800 overflow-x-auto">
          <pre className="text-zinc-200 whitespace-pre-wrap leading-relaxed text-[11px] sm:text-xs">{phase3Script}</pre>
        </div>
      </div>

      {/* Phase 4: Code Cleanups & Secret Rotation */}
      <div className="bg-white rounded-2xl border border-black/[0.06] p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-800 font-semibold text-xs flex items-center justify-center border border-zinc-200 shrink-0">
              4
            </span>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-900">
              Phase 4: Dead Source Code Cleanups & Secret Rotation
            </h3>
          </div>
          <button
            onClick={() => copyToClipboard(phase4Script, setCopiedPhase4)}
            className="inline-flex items-center gap-1 text-xs text-[#0071E3] hover:underline font-medium cursor-pointer self-start sm:self-auto"
          >
            {copiedPhase4 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{copiedPhase4 ? "Copied" : "Copy Phase 4"}</span>
          </button>
        </div>

        <p className="text-xs text-zinc-600 leading-relaxed">
          Remove the dead <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono text-zinc-800">PlaceholderPage.tsx</code> import, remove unused <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono text-zinc-800">useConfirmPassword.ts</code>, remove runtime write debug file log in <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono text-zinc-800">electron/main/index.ts</code>, and rotate the plaintext Google Drive secret.
        </p>

        <div className="bg-[#1E1E20] rounded-xl p-3 sm:p-3.5 font-mono text-xs text-zinc-200 border border-zinc-800 overflow-x-auto">
          <pre className="text-zinc-200 whitespace-pre-wrap leading-relaxed text-[11px] sm:text-xs">{phase4Script}</pre>
        </div>
      </div>

    </div>
  );
};
