import React, { useState, useEffect } from 'react';
import { TrendingUp, Plus, Award, CheckCircle2, Star } from 'lucide-react';
import { performanceApi, employeeApi } from '../services';
import { Badge, LoadingSpinner } from '../components/common/Badge';
import Modal from '../components/common/Modal';

export default function Performance() {
  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: '',
    review_period: 'Q3 2026',
    productivity_score: 90,
    attendance_score: 95,
    task_completion_score: 92,
    project_contribution_score: 88,
    feedback: ''
  });

  const fetchPerformance = async () => {
    try {
      const res = await performanceApi.getAll();
      if (res.success && res.data) setRecords(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformance();
    employeeApi.getAll().then(r => r.success && setEmployees(r.data)).catch(() => {});
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await performanceApi.create({
        ...formData,
        employee_id: parseInt(formData.employee_id),
        productivity_score: parseFloat(formData.productivity_score),
        attendance_score: parseFloat(formData.attendance_score),
        task_completion_score: parseFloat(formData.task_completion_score),
        project_contribution_score: parseFloat(formData.project_contribution_score)
      });
      setShowModal(false);
      fetchPerformance();
    } catch (err) {
      alert(err.message || 'Failed to submit performance review');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Performance Evaluations</h1>
          <p className="text-xs text-slate-500 mt-1">Review employee productivity, attendance, and sprint contributions.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Review</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Employee</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Period</th>
                  <th className="py-3.5 px-4">Productivity</th>
                  <th className="py-3.5 px-4">Attendance</th>
                  <th className="py-3.5 px-4">Tasks</th>
                  <th className="py-3.5 px-4">Overall Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">No performance evaluations recorded yet.</td>
                  </tr>
                ) : (
                  records.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{p.employee_name}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-600">{p.department_name}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-600">{p.review_period}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">{p.productivity_score}%</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">{p.attendance_score}%</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">{p.task_completion_score}%</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${
                          p.overall_score >= 90 ? 'bg-emerald-50 text-emerald-700' : 'bg-brand-50 text-brand-700'
                        }`}>
                          {p.overall_score} / 100
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Record Performance Review">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Employee</label>
            <select
              required
              value={formData.employee_id}
              onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
            >
              <option value="">Select Employee</option>
              {employees.map(e => (
                <option key={e.id} value={e.id}>{e.first_name} {e.last_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Review Period</label>
            <input
              type="text"
              required
              value={formData.review_period}
              onChange={(e) => setFormData({ ...formData, review_period: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Productivity Score (0-100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.productivity_score}
                onChange={(e) => setFormData({ ...formData, productivity_score: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Attendance Score (0-100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.attendance_score}
                onChange={(e) => setFormData({ ...formData, attendance_score: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Task Score (0-100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.task_completion_score}
                onChange={(e) => setFormData({ ...formData, task_completion_score: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Project Score (0-100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.project_contribution_score}
                onChange={(e) => setFormData({ ...formData, project_contribution_score: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Feedback</label>
            <textarea
              rows={3}
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              placeholder="Qualitative review comments..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-600/20 mt-4"
          >
            Save Performance Record
          </button>
        </form>
      </Modal>
    </div>
  );
}
