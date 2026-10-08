import React from 'react';

export function Badge({ children, variant = 'default', size = 'md' }) {
  const variantStyles = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    brand: 'bg-y2k-pink/20 text-y2k-pink border-y2k-pink/40 shadow-neon-pink/20',
    success: 'bg-y2k-lime/20 text-y2k-lime border-y2k-lime/40 shadow-neon-lime/20',
    warning: 'bg-y2k-yellow/20 text-y2k-yellow border-y2k-yellow/40',
    danger: 'bg-y2k-pink/20 text-y2k-pink border-y2k-pink/40 shadow-neon-pink/20',
    purple: 'bg-y2k-purple/20 text-y2k-purple border-y2k-purple/40 shadow-neon-purple/20',
    cyan: 'bg-y2k-cyan/20 text-y2k-cyan border-y2k-cyan/40 shadow-neon-cyan/20'
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[9px]',
    md: 'px-2.5 py-1 text-[11px]',
    lg: 'px-3 py-1.5 text-xs'
  };

  return (
    <span className={`inline-flex items-center font-black rounded-xl border uppercase tracking-wider ${variantStyles[variant] || variantStyles.default} ${sizeStyles[size] || sizeStyles.md}`}>
      {children}
    </span>
  );
}

export function LoadingSpinner({ size = 'md' }) {
  const sizeMap = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className="flex justify-center items-center p-8">
      <div className={`${sizeMap[size]} border-4 border-y2k-pink/30 border-t-y2k-cyan rounded-full animate-spin shadow-neon-cyan`} />
    </div>
  );
}

export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[#13112a] border-t border-y2k-pink/20 rounded-b-3xl">
      <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
        PAGE <span className="text-y2k-cyan font-black">{currentPage}</span> OF <span className="text-y2k-cyan font-black">{totalPages}</span>
      </div>
      <div className="flex space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1.5 text-xs font-black rounded-xl border border-y2k-pink/40 text-y2k-pink hover:bg-y2k-pink/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all uppercase"
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1.5 text-xs font-black rounded-xl border border-y2k-cyan/40 text-y2k-cyan hover:bg-y2k-cyan/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all uppercase"
        >
          Next
        </button>
      </div>
    </div>
  );
}
