import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FolderKanban, Calendar, Users, CheckSquare, Sparkles, ShieldAlert } from 'lucide-react';
import { projectApi } from '../services';
import { Badge, LoadingSpinner } from '../components/common/Badge';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await projectApi.getById(id);
        if (res.success && res.data) setProject(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <LoadingSpinner size="lg" />;

  if (!project) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-slate-500">Project record not found.</p>
        <button onClick={() => navigate('/projects')} className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold">
          Back to Projects
        </button>
      </div>
    );
  }

  const risk = project.ai_risk_assessment || { risk_level: 'LOW', delay_probability_pct: 12, mitigation_suggestion: 'Maintain current trajectory.' };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/projects')}
        className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Projects Portfolio</span>
      </button>

      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-extrabold text-slate-900">{project.name}</h1>
              <Badge variant={project.status === 'COMPLETED' ? 'success' : 'brand'}>{project.status}</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">{project.department_name} • Managed by <strong>{project.manager_name}</strong></p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 font-medium">Completion Progress</span>
            <p className="text-2xl font-extrabold text-brand-600">{project.progress}%</p>
          </div>
        </div>

        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div className="bg-brand-600 h-full rounded-full transition-all" style={{ width: `${project.progress}%` }} />
        </div>

        <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
          {project.description || 'No detailed description provided.'}
        </p>

        <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-500">
          <span>Start Date: <strong className="text-slate-800">{project.start_date}</strong></span>
          <span>Deadline: <strong className="text-slate-800">{project.deadline}</strong></span>
          <span>Priority: <strong className="text-slate-800">{project.priority}</strong></span>
        </div>
      </div>

      {/* AI Risk Assessment Widget */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-brand-950 p-6 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-brand-400 font-bold text-xs">
            <Sparkles className="w-4 h-4" />
            <span>AI Predictive Project Risk Engine</span>
          </div>
          <p className="text-sm font-semibold text-slate-200">
            Calculated Risk Level: <span className="font-extrabold text-white uppercase">{risk.risk_level}</span> ({risk.delay_probability_pct}% delay likelihood)
          </p>
          <p className="text-xs text-slate-400">{risk.mitigation_suggestion}</p>
        </div>
      </div>

      {/* Team Members & Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Users className="w-5 h-5 text-brand-600" />
            <span>Assigned Team Members ({project.members?.length || 0})</span>
          </h3>
          <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
            {project.members?.length === 0 ? (
              <p className="text-xs text-slate-400 py-4">No team members assigned.</p>
            ) : (
              project.members?.map(m => (
                <div key={m.id} className="py-2.5 flex items-center space-x-3">
                  <img src={m.avatar_url} alt={m.name} className="w-8 h-8 rounded-full border border-slate-200" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">{m.name}</p>
                    <p className="text-[11px] text-slate-400">{m.position}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-indigo-600" />
            <span>Project Tasks ({project.tasks?.length || 0})</span>
          </h3>
          <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
            {project.tasks?.length === 0 ? (
              <p className="text-xs text-slate-400 py-4">No tasks linked to this project.</p>
            ) : (
              project.tasks?.map(t => (
                <div key={t.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800">{t.title}</p>
                    <p className="text-[11px] text-slate-400">Assigned: {t.assigned_to}</p>
                  </div>
                  <Badge size="sm" variant={t.status === 'COMPLETED' ? 'success' : 'default'}>{t.status}</Badge>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
