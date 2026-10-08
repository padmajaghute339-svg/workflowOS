import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, trend, trendLabel, color = 'pink' }) {
  const colorMap = {
    brand: 'bg-y2k-pink/20 text-y2k-pink border-y2k-pink/40 shadow-neon-pink',
    pink: 'bg-y2k-pink/20 text-y2k-pink border-y2k-pink/40 shadow-neon-pink',
    cyan: 'bg-y2k-cyan/20 text-y2k-cyan border-y2k-cyan/40 shadow-neon-cyan',
    emerald: 'bg-y2k-lime/20 text-y2k-lime border-y2k-lime/40 shadow-neon-lime',
    purple: 'bg-y2k-purple/20 text-y2k-purple border-y2k-purple/40 shadow-neon-purple',
    amber: 'bg-y2k-yellow/20 text-y2k-yellow border-y2k-yellow/40',
    rose: 'bg-y2k-pink/20 text-y2k-pink border-y2k-pink/40'
  };

  return (
    <div className="y2k-card y2k-card-hover p-6 rounded-3xl border relative overflow-hidden">
      {/* Gloss Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-y2k-pink via-y2k-purple to-y2k-cyan opacity-80" />

      <div className="flex items-center justify-between">
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-2xl border ${colorMap[color] || colorMap.pink}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-3xl font-black tracking-tight text-white">{value}</span>
        {trend !== undefined && (
          <span className={`inline-flex items-center text-xs font-extrabold px-2.5 py-1 rounded-xl uppercase tracking-wider ${
            trend >= 0 ? 'bg-y2k-lime/20 text-y2k-lime border border-y2k-lime/40' : 'bg-y2k-pink/20 text-y2k-pink border border-y2k-pink/40'
          }`}>
            {trend >= 0 ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>

      {trendLabel && (
        <p className="mt-2 text-[11px] text-slate-400 font-bold uppercase tracking-wider">{trendLabel}</p>
      )}
    </div>
  );
}
