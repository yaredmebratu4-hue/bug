import React, { useState } from 'react';
import { Header } from './components/Header';
import { OverviewView } from './components/OverviewView';
import { MasterTableView } from './components/MasterTableView';
import { CleanupPlanView } from './components/CleanupPlanView';
import { ArchitectureMapView } from './components/ArchitectureMapView';
import { FullReportView } from './components/FullReportView';
import { ItemDetailModal } from './components/ItemDetailModal';
import { AuditItem } from './types';
import { PROJECT_METADATA } from './data/auditData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'table' | 'plan' | 'arch' | 'full'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<AuditItem | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);

  // Quick action script for one-click header copy
  const fullBashScript = `# === Dagim Pharmacy Codebase Cleanup Batch Script ===
# 1. Restore tsconfig.json typechecking (revert "files": [] uncommitted change)
git checkout tsconfig.json
npm run typecheck

# 2. Batch delete ~195 MB of unreferenced debris & old asar extractions
rm -rf asar-extract-release/ asar-extract-temp/
rm -f electron-vite-react-debug.gif electron-vite-react.gif
rm -rf src/components/update/
rm -f src/type/electron-updater.d.ts
rm -f src/assets/logo-electron.svg src/assets/logo-tailwindcss.svg src/assets/logo-v1.svg src/assets/logo-vite.svg src/assets/tailwlindcss.svg
rm -f temp_*.py tmp_check_price.cjs tmp_query_dispatcher.py
rm -f check-db.cjs fix_redirect.py generate-doc.cjs
rm -rf tsc-check.txt task-list.md report_parts/
rm -f .playwright.config.txt .vite.config.flat.txt README.zh-CN.md public/book.jpg
rm -rf test/e2e/ electron/main/domain/

# 3. Uninstall dead & redundant dependencies
npm uninstall docx @radix-ui/react-tooltip
npm uninstall -D electron-rebuild vite-plugin-electron-renderer @types/bcryptjs

# 4. Remove unrendered placeholder page and unused hook
rm -f src/pages/PlaceholderPage.tsx src/hooks/useConfirmPassword.ts

# 5. Verify build integrity
npm run typecheck
npm run build
`;

  const handleCopyFullScript = () => {
    navigator.clipboard.writeText(fullBashScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleSelectCategoryFromOverview = (cat: string) => {
    setActiveTab('table');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-zinc-900 flex flex-col font-sans selection:bg-blue-500/20 selection:text-blue-900">
      
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (q && activeTab !== 'table') {
            setActiveTab('table');
          }
        }}
        copiedScript={copiedScript}
        onCopyFullScript={handleCopyFullScript}
      />

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {activeTab === 'overview' && (
          <OverviewView
            onNavigateToTable={() => setActiveTab('table')}
            onNavigateToPlan={() => setActiveTab('plan')}
            onNavigateToFull={() => setActiveTab('full')}
            onNavigateToArch={() => setActiveTab('arch')}
            onSelectCategoryFilter={handleSelectCategoryFromOverview}
          />
        )}

        {activeTab === 'table' && (
          <MasterTableView
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectItem={(item) => setSelectedItem(item)}
          />
        )}

        {activeTab === 'plan' && (
          <CleanupPlanView />
        )}

        {activeTab === 'arch' && (
          <ArchitectureMapView />
        )}

        {activeTab === 'full' && (
          <FullReportView />
        )}

      </div>

      {/* Modal Drawer for Item Inspection */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* Apple-style minimalist Footer */}
      <footer className="border-t border-black/[0.06] bg-white/60 py-6 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap text-zinc-500">
            <span className="font-semibold text-zinc-800 tracking-tight">Dagim Pharmacy</span>
            <span>·</span>
            <span>Codebase Cleanup Audit Report</span>
            <span>·</span>
            <span>{PROJECT_METADATA.auditDate}</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-500">
            <button
              onClick={() => setActiveTab('overview')}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Catalog
            </button>
            <button
              onClick={() => setActiveTab('plan')}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Script Generator
            </button>
            <button
              onClick={() => setActiveTab('full')}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Audit Doc
            </button>
            <a
              href={PROJECT_METADATA.repo}
              target="_blank"
              rel="noreferrer"
              className="text-[#0071E3] hover:underline transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
