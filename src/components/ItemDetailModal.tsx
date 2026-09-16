import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertTriangle, 
  ShieldCheck, 
  Trash2, 
  Terminal, 
  CheckSquare, 
  FileCode,
  HardDrive
} from 'lucide-react';
import { AuditItem } from '../types';

interface ItemDetailModalProps {
  item: AuditItem | null;
  onClose: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose }) => {
  const [copiedBash, setCopiedBash] = useState(false);
  const [copiedPs, setCopiedPs] = useState(false);
  const [copiedPath, setCopiedPath] = useState(false);

  if (!item) return null;

  const copyToClipboard = (text: string, type: 'bash' | 'ps' | 'path') => {
    navigator.clipboard.writeText(text);
    if (type === 'bash') {
      setCopiedBash(true);
      setTimeout(() => setCopiedBash(false), 2000);
    } else if (type === 'ps') {
      setCopiedPs(true);
      setTimeout(() => setCopiedPs(false), 2000);
    } else {
      setCopiedPath(true);
      setTimeout(() => setCopiedPath(false), 2000);
    }
  };

  const getStatusBadge = (status: string) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" id="item-detail-modal">
      <div 
        className="w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl border border-black/[0.08] shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* iOS Mobile Sheet Handle */}
        <div className="sm:hidden w-10 h-1 bg-zinc-300 rounded-full mx-auto mt-2.5 mb-1 shrink-0" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-start justify-between gap-3 bg-zinc-50/50 shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(item.status)}`}>
                {item.status}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600">
                {item.category}
              </span>
              <span className="text-xs text-zinc-500 font-medium">
                Confidence: <strong className="text-zinc-800">{item.confidence}</strong>
              </span>
              {item.size && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200/60 font-mono">
                  {item.size}
                </span>
              )}
            </div>

            <h3 className="font-mono text-sm sm:text-base font-bold text-zinc-900 break-all select-all">
              {item.path}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/70 active:bg-zinc-300 transition-colors shrink-0 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs leading-relaxed text-zinc-600">
          
          {/* Finding Rationale & Evidence */}
          <div className="space-y-1.5">
            <span className="text-[11px] uppercase font-semibold text-zinc-400 tracking-wider block">
              Audit Finding & Trace Evidence
            </span>
            <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-100 text-zinc-800 text-xs sm:text-sm leading-relaxed">
              {item.reason}
            </div>
          </div>

          {/* Quick Copy Path button */}
          <div className="flex items-center justify-between p-2.5 bg-zinc-50 rounded-xl border border-zinc-100 text-xs">
            <span className="text-zinc-500 truncate mr-2">File Path:</span>
            <button
              onClick={() => copyToClipboard(item.path, 'path')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white hover:bg-zinc-100 active:bg-zinc-200 border border-zinc-200 text-zinc-700 font-medium transition-colors shrink-0 cursor-pointer"
            >
              {copiedPath ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
              <span>{copiedPath ? "Copied" : "Copy Path"}</span>
            </button>
          </div>

          {/* Removal Command (Bash) */}
          {item.commandBash && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-semibold text-zinc-400 tracking-wider">
                  Cleanup Command (Bash / Linux / macOS / Git Bash)
                </span>
                <button
                  onClick={() => copyToClipboard(item.commandBash || '', 'bash')}
                  className="text-xs text-[#0071E3] hover:underline inline-flex items-center gap-1 font-medium cursor-pointer"
                >
                  {copiedBash ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedBash ? "Copied" : "Copy Bash"}</span>
                </button>
              </div>

              <div className="bg-[#1E1E20] rounded-xl p-3 font-mono text-xs text-zinc-200 overflow-x-auto border border-zinc-800">
                <code>{item.commandBash}</code>
              </div>
            </div>
          )}

          {/* Removal Command (PowerShell) */}
          {item.commandPs && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-semibold text-zinc-400 tracking-wider">
                  Cleanup Command (PowerShell / Windows)
                </span>
                <button
                  onClick={() => copyToClipboard(item.commandPs || '', 'ps')}
                  className="text-xs text-[#0071E3] hover:underline inline-flex items-center gap-1 font-medium cursor-pointer"
                >
                  {copiedPs ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPs ? "Copied" : "Copy PowerShell"}</span>
                </button>
              </div>

              <div className="bg-[#1E1E20] rounded-xl p-3 font-mono text-xs text-zinc-200 overflow-x-auto border border-zinc-800">
                <code>{item.commandPs}</code>
              </div>
            </div>
          )}

          {/* Verification Warning Note */}
          <div className="p-3 bg-zinc-50 border border-zinc-200/80 rounded-xl text-[11px] text-zinc-500 leading-relaxed">
            <strong className="text-zinc-800 font-medium">Safe Verification Workflow:</strong> Run <code className="bg-zinc-200/60 px-1 py-0.5 rounded font-mono text-zinc-700">npm run typecheck</code> and <code className="bg-zinc-200/60 px-1 py-0.5 rounded font-mono text-zinc-700">npm run build</code> after removing this file to verify no unexpected module resolutions fail.
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-zinc-400">
            {item.isSafeToRemove ? "✓ Classified safe for removal" : "⚠ Manual verification recommended"}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 active:bg-black text-white text-xs font-medium transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
