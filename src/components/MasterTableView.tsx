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
  ChevronRight,
  SlidersHorizontal
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
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

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

  // Copy selected cleanup commands
  const handleCopySelectedCommands = () => {
    const selected = MASTER_AUDIT_ITEMS.filter(i => selectedItemIds.has(i.id));
    const commands = selected
      .map(i => i.commandBash)
      .filter(Boolean)
      .join('\n');

    if (commands) {
      navigator.clipboard.writeText(commands);
      setCopiedId('selected-commands');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const getStatusBadge = (status: Status) => {
    switch (status) {
      case 'Definitely unused':
        return 'bg-red-50 text-red-700 border-red-200/80';
      case 'Probably unused':
        return 'bg-amber-50 text-amber-800 border-amber-200/80';
      case 'Broken':
        return 'bg-red-100 text-red-800 border-red-300 font-semibold';
      case 'Needs verification':
        return 'bg-purple-50 text-purple-700 border-purple-200/80';
      case 'Keep':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  const getConfidenceBadge = (confidence: Confidence) => {
    switch (confidence) {
      case 'High':
        return 'text-red-700 font-medium';
      case 'Medium':
        return 'text-amber-700 font-medium';
      case 'Low':
        return 'text-zinc-600';
      default:
        return 'text-zinc-500';
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300" id="master-table-section">
      
      {/* Controls & Filter Bar (Apple-style segmented filter surface) */}
      <div className="bg-white rounded-2xl border border-black/[0.06] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Mobile Filter Toggle & Quick Info */}
          <div className="flex md:hidden items-center justify-between">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-800 text-xs font-medium cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
              <span>Filter Options ({statusFilter !== 'All' || confidenceFilter !== 'All' || categoryFilter !== 'All' ? 'Active' : 'All'})</span>
            </button>
            <span className="text-xs text-zinc-500">
              <strong className="text-zinc-900">{filteredItems.length}</strong> items
            </span>
          </div>

          {/* Desktop Filter Pills / Mobile Collapsible Panel */}
          <div className={`flex flex-col sm:flex-row sm:items-center gap-2.5 flex-wrap ${showMobileFilters ? 'flex' : 'hidden md:flex'}`}>
            
            {/* Status Select */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Status:</span>
              <select
                id="filter-status-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-zinc-100 hover:bg-zinc-200/70 border border-transparent rounded-full px-2.5 py-1 text-xs text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 cursor-pointer transition-colors"
              >
                <option value="All">All Statuses</option>
                <option value="Definitely unused">Definitely unused (25)</option>
                <option value="Probably unused">Probably unused (11)</option>
                <option value="Needs verification">Needs verification (7)</option>
                <option value="Broken">Broken (1)</option>
                <option value="Keep">Keep / Verified (3)</option>
              </select>
            </div>

            {/* Confidence Select */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Confidence:</span>
              <select
                id="filter-confidence-select"
                value={confidenceFilter}
                onChange={(e) => setConfidenceFilter(e.target.value)}
                className="bg-zinc-100 hover:bg-zinc-200/70 border border-transparent rounded-full px-2.5 py-1 text-xs text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 cursor-pointer transition-colors"
              >
                <option value="All">All Confidences</option>
                <option value="High">High (25)</option>
                <option value="Medium">Medium (11)</option>
                <option value="Low">Low (5)</option>
              </select>
            </div>

            {/* Category Select */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Category:</span>
              <select
                id="filter-category-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-zinc-100 hover:bg-zinc-200/70 border border-transparent rounded-full px-2.5 py-1 text-xs text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 cursor-pointer transition-colors"
              >
                <option value="All">All Categories</option>
                <option value="Build Artifacts">Build Artifacts</option>
                <option value="Temporary Scripts">Temporary Scripts</option>
                <option value="Dead Code">Dead Code</option>
                <option value="Documentation">Documentation</option>
                <option value="Dependencies">Dependencies</option>
                <option value="Configuration">Configuration</option>
              </select>
            </div>

            {(statusFilter !== 'All' || confidenceFilter !== 'All' || categoryFilter !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setStatusFilter('All');
                  setConfidenceFilter('All');
                  setCategoryFilter('All');
                  setSearchQuery('');
                }}
                className="text-xs text-[#0071E3] hover:underline font-medium px-1 cursor-pointer self-start sm:self-auto"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              onClick={selectAllSafe}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200/80 active:bg-zinc-200 text-zinc-700 text-xs font-medium border border-black/[0.04] transition-colors cursor-pointer"
            >
              <CheckSquare className="w-3.5 h-3.5 text-zinc-600" />
              <span>Select Safe</span>
            </button>

            {selectedItemIds.size > 0 && (
              <>
                <button
                  onClick={handleCopySelectedCommands}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-medium transition-all shadow-xs cursor-pointer"
                >
                  {copiedId === 'selected-commands' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy ({selectedItemIds.size})</span>
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
          <div className="hidden sm:block text-[11px] text-zinc-400">
            Click any item to inspect audit evidence and cleanup commands
          </div>
        </div>
      </div>

      {/* MOBILE LIST CARD VIEW (<md screens) */}
      <div className="block md:hidden space-y-2.5">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-black/[0.06] p-8 text-center text-zinc-400">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-zinc-300" />
            <p className="text-sm font-medium text-zinc-600">No matching audit findings</p>
            <p className="text-xs text-zinc-400 mt-1">Try clearing filters or search query</p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isSelected = selectedItemIds.has(item.id);
            return (
              <div 
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`bg-white rounded-2xl border p-3.5 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)] active:bg-zinc-50 cursor-pointer ${
                  isSelected ? 'border-[#0071E3] bg-blue-50/20' : 'border-black/[0.06]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div 
                      onClick={(e) => toggleSelect(item.id, e)}
                      className="pt-0.5 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="rounded border-zinc-300 text-[#0071E3] focus:ring-[#0071E3] w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-xs font-semibold text-zinc-900 break-all">
                        {item.path}
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap mt-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getStatusBadge(item.status)}`}>
                          {item.status}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-100 text-zinc-600">
                          {item.category}
                        </span>
                        {item.size && (
                          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-red-50 text-red-700">
                            {item.size}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0 mt-1" />
                </div>

                <p className="text-xs text-zinc-600 mt-2 line-clamp-2 leading-relaxed">
                  {item.reason}
                </p>

                <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Confidence: <strong className={getConfidenceBadge(item.confidence)}>{item.confidence}</strong></span>
                  <span className="text-[#0071E3] font-medium">Inspect Details →</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* DESKTOP TABLE VIEW (>=md screens) */}
      <div className="hidden md:block bg-white rounded-2xl border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
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
                          className="rounded border-zinc-300 text-[#0071E3] focus:ring-[#0071E3] w-3.5 h-3.5 cursor-pointer"
                        />
                      </td>

                      {/* Path */}
                      <td className="p-3 font-mono font-medium text-zinc-900 break-all max-w-[240px]">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate">{item.path}</span>
                          <button
                            onClick={(e) => handleCopyPath(e, item.path, item.id)}
                            className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-zinc-600 p-0.5 rounded transition-all shrink-0 cursor-pointer"
                            title="Copy path"
                          >
                            {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-100 text-zinc-600">
                          {item.category}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-3 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${getStatusBadge(item.status)}`}>
                          {item.status}
                        </span>
                      </td>

                      {/* Confidence */}
                      <td className={`p-3 whitespace-nowrap text-xs ${getConfidenceBadge(item.confidence)}`}>
                        {item.confidence}
                      </td>

                      {/* Size */}
                      <td className="p-3 font-mono text-zinc-600 whitespace-nowrap">
                        {item.size ? (
                          <span className="font-medium text-red-600 bg-red-50 px-1.5 py-0.5 rounded text-[11px]">
                            {item.size}
                          </span>
                        ) : (
                          <span className="text-zinc-300">—</span>
                        )}
                      </td>

                      {/* Reason */}
                      <td className="p-3 text-zinc-600 leading-relaxed max-w-md">
                        <p className="line-clamp-2">{item.reason}</p>
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-center">
                        <span className="p-1 rounded-full text-zinc-400 group-hover:text-[#0071E3] transition-colors inline-block">
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
