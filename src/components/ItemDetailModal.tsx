import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Terminal, 
  AlertTriangle, 
  FileCode, 
  HardDrive, 
  ShieldCheck, 
  Tag, 
  Info 
} from 'lucide-react';
import { AuditItem } from '../types';

interface ItemDetailModalProps {
  item: AuditItem | null;
  onClose: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose }) => {
  const [copiedBash, setCopiedBash] = useState(false);
  const [copiedPowerShell, setCopiedPowerShell] = useState(false);
  const [copiedPath, setCopiedPath] = useState(false);

  if (!item) return null;

  const handleCopyBash = () => {
    if (item.commandBash) {
      navigator.clipboard.writeText(item.commandBash);
      setCopiedBash(true);
      setTimeout(() => setCopiedBash(false), 1500);
    }
  };

  const handleCopyPowerShell = () => {
    if (item.commandPowerShell) {
      navigator.clipboard.writeText(item.commandPowerShell);
      setCopiedPowerShell(true);
      setTimeout(() => setCopiedPowerShell(false), 1500);
    }
  };

  const handleCopyPath = () => {
    navigator.clipboard.writeText(item.path);
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 1500);
  };

  const getStatusBadge = () => {
    switch (item.status) {
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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl border border-black/10 w-full max-w-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.18)] space-y-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-100 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${getStatusBadge()}`}>
                {item.status}
              </span>

              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-100 text-zinc-600">
                {item.category}
              </span>

              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-100 text-zinc-600">
                Confidence: {item.confidence}
              </span>

              {item.size && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-red-50 text-red-700 border border-red-200/60">
                  {item.size}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <h3 className="text-base sm:text-lg font-semibold text-zinc-900 font-mono break-all">
                {item.path}
              </h3>
              <button
                onClick={handleCopyPath}
                className="p-1 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors shrink-0 cursor-pointer"
                title="Copy path"
              >
                {copiedPath ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200/80 text-zinc-500 hover:text-zinc-800 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-5 sm:px-6 pb-2 space-y-4 overflow-y-auto text-xs text-zinc-700 font-sans">
          
          {/* Reason / Evidence */}
          <div>
            <span className="text-[11px] uppercase font-semibold text-zinc-400 tracking-wider block mb-1.5">
              Audit Finding & Evidence
            </span>
            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100 text-zinc-800 leading-relaxed text-xs">
              {item.reason}
            </div>
          </div>

          {/* Files count or additional detail */}
          {item.filesCount && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-zinc-50 border border-zinc-100 text-xs text-zinc-600">
              <HardDrive className="w-4 h-4 text-zinc-500" />
              <span>
                Contains approximately <strong className="text-zinc-900">{item.filesCount.toLocaleString()} files</strong> inside the directory structure.
              </span>
            </div>
          )}

          {/* Recommendation */}
          {item.recommendation && (
            <div>
              <span className="text-[11px] uppercase font-semibold text-zinc-400 tracking-wider block mb-1.5">
                Recommendation
              </span>
              <div className="p-3.5 rounded-2xl bg-blue-50/40 border border-blue-200/60 text-zinc-800 leading-relaxed">
                {item.recommendation}
              </div>
            </div>
          )}

          {/* Terminal Commands */}
          {(item.commandBash || item.commandPowerShell) && (
            <div className="space-y-3 pt-1">
              <span className="text-[11px] uppercase font-semibold text-zinc-400 tracking-wider block">
                Cleanup Command
              </span>

              {item.commandBash && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-zinc-500">
                    <span>Bash / Linux / macOS:</span>
                    <button
                      onClick={handleCopyBash}
                      className="text-[#0071E3] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedBash ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedBash ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-[#1E1E20] rounded-xl font-mono text-zinc-200 text-[11px] overflow-x-auto border border-zinc-800">
                    {item.commandBash}
                  </pre>
                </div>
              )}

              {item.commandPowerShell && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-zinc-500">
                    <span>Windows PowerShell:</span>
                    <button
                      onClick={handleCopyPowerShell}
                      className="text-[#0071E3] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedPowerShell ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPowerShell ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-[#1E1E20] rounded-xl font-mono text-zinc-200 text-[11px] overflow-x-auto border border-zinc-800">
                    {item.commandPowerShell}
                  </pre>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-zinc-100 bg-zinc-50/60 flex items-center justify-between">
          <span className="text-[11px] text-zinc-500">
            {item.isSafeToRemove ? "✓ Verified safe to delete without runtime side effects" : "⚠️ Review context before modifying"}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium transition-colors shadow-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
