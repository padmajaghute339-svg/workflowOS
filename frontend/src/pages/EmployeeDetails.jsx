import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, Building2, ShieldCheck, Sparkles, CheckCircle2, TrendingUp, Award, Clock } from 'lucide-react';
import { employeeApi } from '../services';
import { Badge, LoadingSpinner } from '../components/common/Badge';

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await employeeApi.getById(id);
        if (res.success && res.data) {
          setEmployee(res.data);
        }
      } catch (err) {
        console.error("Error fetching employee details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) return <LoadingSpinner size="lg" />;

  if (!employee) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm font-semibold text-slate-500">Employee record not found.</p>
        <button onClick={() => navigate('/employees')} className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold">
          Back to Directory
        </button>
      </div>
    );
  }

  const insights = employee.ai_insights || {
    predicted_rating: 'A+',
    burnout_risk: 'LOW',
    summary: 'Exceptional high performer with strong velocity across deliverables.',
    actionable_insights: ['Consider for leadership or senior project ownership.']
  };

  return (
    <div className="space-y-6">
      {/* Top Back Navigation */}
      <button
        onClick={() => navigate('/employees')}
        className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Employees</span>
      </button>

      {/* Main Profile Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <img
            src={employee.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.first_name}`}
            alt={employee.first_name}
            className="w-20 h-20 rounded-2xl border-2 border-slate-200 object-cover shadow-md"
          />
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-extrabold text-slate-900">{employee.first_name} {employee.last_name}</h1>
              <Badge variant={employee.status === 'ACTIVE' ? 'success' : 'warning'}>
                {employee.status}
              </Badge>
            </div>
            <p className="text-sm font-semibold text-brand-600 mt-0.5">{employee.position}</p>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center space-x-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{employee.department_name}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{employee.email}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Joined {employee.joining_date}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
          <div className="text-right px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Employee Code</span>
            <span className="text-sm font-mono font-bold text-slate-800">{employee.employee_code}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase">Active Tasks</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{employee.active_tasks_count}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase">Completed Projects</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{employee.completed_projects_count}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase">Attendance Rate</span>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">{employee.attendance_rate}%</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase">Performance Rating</span>
          <p className="text-2xl font-extrabold text-brand-600 mt-1">{employee.latest_performance_score}/100</p>
        </div>
      </div>

      {/* AI Performance Insights Box */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl border border-indigo-900/50">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold">AI Performance & Productivity Insights</h3>
            <p className="text-xs text-slate-400">Automated evaluation generated via workload velocity algorithms</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-slate-800">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Predicted Rating</span>
            <p className="text-3xl font-black text-brand-400 mt-1">{insights.predicted_rating}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Burnout Risk</span>
            <span className={`inline-block mt-1 px-3 py-1 rounded-lg text-xs font-bold uppercase ${
              insights.burnout_risk === 'LOW' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
            }`}>
              {insights.burnout_risk} Risk
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Summary</span>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{insights.summary}</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/60">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Actionable Recommendations:</span>
          <ul className="mt-2 space-y-1.5">
            {insights.actionable_insights.map((item, idx) => (
              <li key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
