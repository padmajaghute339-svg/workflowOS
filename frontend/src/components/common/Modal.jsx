import React, { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-xl' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0817]/80 backdrop-blur-md animate-in fade-in">
      <div className={`bg-[#13112a] rounded-3xl shadow-2xl border border-y2k-pink/40 w-full ${maxWidth} overflow-hidden transform transition-all shadow-neon-pink/20`}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-y2k-purple/20 flex items-center justify-between bg-[#191636]">
          <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-y2k-cyan" />
            <span>{title}</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-y2k-pink hover:bg-y2k-pink/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto text-slate-200">
          {children}
        </div>
      </div>
    </div>
  );
}
