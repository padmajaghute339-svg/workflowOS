import React from 'react';
import { Zap, Clock } from 'lucide-react';

export default function ActivityFeed({ activities = [] }) {
  return (
    <div className="y2k-card p-6 rounded-3xl border border-y2k-pink/30 shadow-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-y2k-purple/20">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-y2k-pink animate-pulse" />
          <h3 className="text-sm font-black text-white uppercase tracking-widest">CYBER ACTIVITY LOG</h3>
        </div>
        <span className="text-[10px] font-black text-y2k-cyan uppercase tracking-widest px-2 py-0.5 rounded-full bg-y2k-cyan/10 border border-y2k-cyan/30">
          LIVE FEED
        </span>
      </div>

      <div className="mt-4 divide-y divide-y2k-purple/10 max-h-80 overflow-y-auto">
        {activities.length === 0 ? (
          <p className="py-6 text-center text-xs text-slate-400">No telemetry logged yet.</p>
        ) : (
          activities.map((act) => (
            <div key={act.id} className="py-3 flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full y2k-gradient-bg text-white flex items-center justify-center font-black text-xs shrink-0 shadow-neon-pink/30 border border-white/40">
                {act.user_name ? act.user_name.charAt(0) : 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-200">
                  <span className="font-bold text-white">{act.user_name}</span>{' '}
                  <span className="text-slate-400">{act.action}</span>{' '}
                  <span className="font-bold text-y2k-cyan">"{act.target}"</span>
                </p>
                <div className="flex items-center space-x-1 mt-1 text-[10px] text-y2k-pink font-semibold">
                  <Clock className="w-3 h-3" />
                  <span>{act.timestamp}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
