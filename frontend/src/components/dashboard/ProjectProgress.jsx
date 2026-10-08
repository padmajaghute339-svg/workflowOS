import React from 'react';
import { FolderKanban, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProjectProgress({ projects = [] }) {
  const navigate = useNavigate();

  return (
    <div className="y2k-card p-6 rounded-3xl border border-y2k-purple/30 shadow-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-y2k-purple/20">
        <div className="flex items-center space-x-2">
          <FolderKanban className="w-5 h-5 text-y2k-cyan" />
          <h3 className="text-sm font-black text-white uppercase tracking-widest">ACTIVE PROJECT PROGRESS MATRIX</h3>
        </div>
        <button
          onClick={() => navigate('/projects')}
          className="text-xs font-black text-y2k-pink hover:text-y2k-cyan flex items-center space-x-1 uppercase tracking-wider transition-colors"
        >
          <span>VIEW PORTFOLIO</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {projects.length === 0 ? (
          <p className="py-6 text-center text-xs text-slate-400">No active projects found in matrix.</p>
        ) : (
          projects.map((proj) => (
            <div key={proj.id} className="p-3.5 bg-[#171439] rounded-2xl border border-y2k-purple/30">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-white truncate max-w-[200px]">{proj.name}</span>
                <span className="text-y2k-cyan font-black">{proj.progress}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-700">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    proj.progress === 100
                      ? 'bg-y2k-lime shadow-neon-lime'
                      : proj.progress > 60
                      ? 'y2k-gradient-bg shadow-neon-pink'
                      : 'bg-y2k-yellow'
                  }`}
                  style={{ width: `${proj.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold mt-2">
                <span>STATUS: <strong className="text-y2k-pink uppercase">{proj.status}</strong></span>
                <span>DEADLINE: {proj.deadline}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
