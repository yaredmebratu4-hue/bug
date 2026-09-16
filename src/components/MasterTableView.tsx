import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Copy, 
  Check, 
  Download, 
  CheckSquare, 
  Square, 
  Info, 
  Trash2, 
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { MASTER_AUDIT_ITEMS } from '../data/auditData';
import { AuditItem, Status, Confidence, Category } from '../types';

interface MasterTableViewProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectItem: (item: AuditItem) => void;
}

export const MasterTableView: React.FC<MasterTableViewProps> = ({
  searchQuery,
  setSearchQuery,
  onSelectItem
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [confidenceFilter, setConfidenceFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof AuditItem>('confidence');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Filter items
  const filteredItems = useMemo(() => {
    return MASTER_AUDIT_ITEMS.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery = 
          item.path.toLowerCase().includes(q) ||
          item.reason.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.status.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Status
      if (statusFilter !== 'All' && item.status !== statusFilter) {
        return false;
      }

      // Confidence
      if (confidenceFilter !== 'All' && item.confidence !== confidenceFilter) {
        return false;
      }

      // Category
      if (categoryFilter !== 'All' && item.category !== categoryFilter) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      let valA = a[sortField] || '';
      let valB = b[sortField] || '';

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [searchQuery, statusFilter, confidenceFilter, categoryFilter, sortField, sortAsc]);

  // Handle Sort
  const handleSort = (field: keyof AuditItem) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // Copy Path
  const handleCopyPath = (e: React.MouseEvent, path: string, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(path);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Toggle selection
  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(selectedItemIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedItemIds(next);
  };

  // Select all safe to remove
  const selectAllSafe = () => {
    const safeIds = MASTER_AUDIT_ITEMS.filter(i => i.isSafeToRemove).map(i => i.id);
    setSelectedItemIds(new Set(safeIds));
  };

  // Clear selection
  const clearSelection = () => {
    setSelectedItemIds(new Set());
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Path', 'Category', 'Status', 'Confidence', 'Size', 'Reason'];
    const rows = filteredItems.map(i => [
      `"${i.path.replace(/"/g, '""')}"`,
      `"${i.category}"`,
      `"${i.status}"`,
      `"${i.confidence}"`,
      `"${i.size || ''}"`,
      `"${i.reason.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `dagim-pharmacy-cleanup-audit-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate Bash commands for selected items
  const handleCopySelectedCommands = () => {
    const selected = MASTER_AUDIT_ITEMS.filter(i => selectedItemIds.has(i.id) && i.commandBash);
    if (selected.length === 0) return;
    const commands = selected.map(i => `# ${i.path}\n${i.commandBash}`).join('\n\n');
    navigator.clipboard.writeText(commands);
    setCopiedId('selected-commands');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Apple Status Badge styling helper
  const getStatusBadge = (status: Status) => {
    switch (status) {
      case 'Definitely unused':
        return 'bg-red-50 text-red-700 border-red-200/80';
      case 'Probably unused':
        return 'bg-amber-50 text-amber-800 border-amber-200/80';
      case 'Needs verification':
        return 'bg-purple-50 text-purple-700 border-purple-200/80';
      case 'Broken':
        return 'bg-red-100 text-red-800 border-red-300 font-semibold';
      case 'Keep':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
      case 'Review':
        return 'bg-blue-50 text-blue-700 border-blue-200/80';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300" id="master-catalog-section">
      
      {/* Top Filter Controls Bar (Apple Minimalist Style) */}
      <div className="bg-white p-4 rounded-2xl border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Filter Dropdowns */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-zinc-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-zinc-400" />
              <span>Filter:</span>
            </span>

            {/* Status Dropdown */}
            <select
              id="filter-status-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-zinc-100/80 hover:bg-zinc-100 border border-black/[0.04] rounded-full px-3 py-1.5 text-xs text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 cursor-pointer"
            >
              <option value="All">All Statuses ({MASTER_AUDIT_ITEMS.length})</option>
              <option value="Definitely unused">Definitely unused</option>
              <option value="Probably unused">Probably unused</option>
              <option value="Needs verification">Needs verification</option>
              <option value="Broken">Broken (Bug)</option>
              <option value="Review">Review</option>
              <option value="Keep">Keep</option>
            </select>

            {/* Confidence Dropdown */}
            <select
              id="filter-confidence-select"
              value={confidenceFilter}
              onChange={(e) => setConfidenceFilter(e.target.value)}
              className="bg-zinc-100/80 hover:bg-zinc-100 border border-black/[0.04] rounded-full px-3 py-1.5 text-xs text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 cursor-pointer"
            >
              <option value="All">All Confidences</option>
              <option value="High">High Confidence</option>
              <option value="Medium">Medium Confidence</option>
            </select>

            {/* Category Dropdown */}
            <select
              id="filter-category-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-zinc-100/80 hover:bg-zinc-100 border border-black/[0.04] rounded-full px-3 py-1.5 text-xs text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Folder">Folder</option>
              <option value="File">File</option>
              <option value="Code">Code</option>
              <option value="Dependency">Dependency</option>
              <option value="DevDependency">DevDependency</option>
              <option value="Config">Config</option>
              <option value="Tooling">Tooling</option>
              <option value="Docs">Docs</option>
            </select>

            {(statusFilter !== 'All' || confidenceFilter !== 'All' || categoryFilter !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setStatusFilter('All');
                  setConfidenceFilter('All');
                  setCategoryFilter('All');
                  setSearchQuery('');
                }}
                className="text-xs text-[#0071E3] hover:underline font-medium px-1 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-end md:self-auto flex-wrap">
            <button
              onClick={selectAllSafe}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200/80 active:bg-zinc-200 text-zinc-700 text-xs font-medium border border-black/[0.04] transition-colors cursor-pointer"
            >
              <CheckSquare className="w-3.5 h-3.5 text-zinc-600" />
              <span>Select Safe Items</span>
            </button>

            {selectedItemIds.size > 0 && (
              <>
                <button
                  onClick={handleCopySelectedCommands}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-medium transition-all shadow-xs cursor-pointer"
                >
                  {copiedId === 'selected-commands' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Commands ({selectedItemIds.size})</span>
                </button>
                <button
                  onClick={clearSelection}
                  className="text-xs text-zinc-400 hover:text-zinc-600 px-1 cursor-pointer"
                >
                  Clear
                </button>
              </>
            )}

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 text-xs font-medium border border-black/[0.04] transition-colors cursor-pointer"
              title="Export filtered items to CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5 text-zinc-500" />
              <span>Export CSV</span>
            </button>
          </div>

        </div>

        {/* Results Counter Banner */}
        <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-100">
          <div>
            Showing <strong className="text-zinc-800">{filteredItems.length}</strong> of {MASTER_AUDIT_ITEMS.length} audit entries
            {selectedItemIds.size > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-800 font-medium">
                {selectedItemIds.size} selected
              </span>
            )}
          </div>
          <div className="text-[11px] text-zinc-400">
            Click any row to inspect audit evidence and tailored commands
          </div>
        </div>
      </div>

      {/* Main Table Card (macOS Finder / Table Look) */}
      <div className="bg-white rounded-2xl border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-zinc-50/80 border-b border-zinc-200/80 text-zinc-500 font-medium">
                <th className="p-3 w-10 text-center">
                  <span className="sr-only">Select</span>
                </th>
                <th 
                  onClick={() => handleSort('path')}
                  className="p-3 cursor-pointer hover:text-zinc-900 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Item / Path</span>
                    <ArrowUpDown className="w-3 h-3 text-zinc-400" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('category')}
                  className="p-3 w-28 cursor-pointer hover:text-zinc-900 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Category</span>
                    <ArrowUpDown className="w-3 h-3 text-zinc-400" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('status')}
                  className="p-3 w-36 cursor-pointer hover:text-zinc-900 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Audit Status</span>
                    <ArrowUpDown className="w-3 h-3 text-zinc-400" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('confidence')}
                  className="p-3 w-24 cursor-pointer hover:text-zinc-900 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Confidence</span>
                    <ArrowUpDown className="w-3 h-3 text-zinc-400" />
                  </div>
                </th>
                <th className="p-3 w-24">Size</th>
                <th className="p-3 font-normal">Audit Finding & Evidence</th>
                <th className="p-3 w-14 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-zinc-400">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-zinc-300" />
                    <p className="text-sm font-medium text-zinc-600">No matching audit findings</p>
                    <p className="text-xs text-zinc-400 mt-1">Try clearing filters or search query</p>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const isSelected = selectedItemIds.has(item.id);
                  return (
                    <tr 
                      key={item.id}
                      onClick={() => onSelectItem(item)}
                      className={`hover:bg-zinc-50/80 cursor-pointer transition-colors group ${
                        isSelected ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="p-3 text-center" onClick={(e) => toggleSelect(item.id, e)}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="rounded border-zinc-300 text-[#0071E3] focus:ring-0 cursor-pointer"
                        />
                      </td>

                      {/* Path */}
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-zinc-800 font-medium break-all">
                            {item.path}
                          </span>
                          <button
                            onClick={(e) => handleCopyPath(e, item.path, item.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-zinc-200 text-zinc-400 hover:text-zinc-700 transition-all shrink-0 cursor-pointer"
                            title="Copy path"
                          >
                            {copiedId === item.id ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-3">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-100 text-zinc-600">
                          {item.category}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${getStatusBadge(item.status)}`}>
                          {item.status}
                        </span>
                      </td>

                      {/* Confidence */}
                      <td className="p-3">
                        <span className={`text-[11px] font-medium ${
                          item.confidence === 'High' ? 'text-zinc-800' : 'text-zinc-500'
                        }`}>
                          {item.confidence}
                        </span>
                      </td>

                      {/* Size */}
                      <td className="p-3">
                        {item.size ? (
                          <span className="font-mono text-zinc-700 text-[11px]">
                            {item.size}
                          </span>
                        ) : (
                          <span className="text-zinc-300">—</span>
                        )}
                      </td>

                      {/* Reason */}
                      <td className="p-3 text-zinc-600 leading-relaxed max-w-md">
                        <p className="line-clamp-2">
                          {item.reason}
                        </p>
                      </td>

                      {/* Action Chevron */}
                      <td className="p-3 text-center">
                        <span className="p-1 rounded-full text-zinc-400 group-hover:text-zinc-800 transition-colors inline-block">
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
