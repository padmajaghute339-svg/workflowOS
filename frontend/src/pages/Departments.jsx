import React, { useState, useEffect } from 'react';
import { Building2, Plus, Users, UserCheck, Cpu, Edit2, Trash2 } from 'lucide-react';
import { departmentApi, employeeApi } from '../services';
import { Badge, LoadingSpinner } from '../components/common/Badge';
import Modal from '../components/common/Modal';

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', code: '', description: '', manager_id: '' });

  const fetchDepts = async () => {
    try {
      const res = await departmentApi.getAll();
      if (res.success && res.data) setDepartments(r.data || res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepts();
    employeeApi.getAll().then(r => r.success && setEmployees(r.data)).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      manager_id: formData.manager_id ? parseInt(formData.manager_id) : null
    };

    if (editingId) {
      await departmentApi.update(editingId, payload);
    } else {
      await departmentApi.create(payload);
    }
    setShowModal(false);
    setEditingId(null);
    setFormData({ name: '', code: '', description: '', manager_id: '' });
    fetchDepts();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      await departmentApi.delete(id);
      fetchDepts();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Department Management</h1>
          <p className="text-xs text-slate-500 mt-1">Organize operational divisions, managers, and workforce allocation.</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ name: '', code: '', description: '', manager_id: '' });
            setShowModal(true);
          }}
          className="flex items-center space-x-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Department</span>
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => {
            const aiWorkload = dept.ai_workload || { capacity_status: 'OPTIMAL', tasks_per_employee: 3.5 };
            return (
              <div key={dept.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm border border-brand-100">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{dept.name}</h3>
                        <span className="text-[11px] font-mono font-bold text-slate-400">{dept.code}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => {
                          setEditingId(dept.id);
                          setFormData({ name: dept.name, code: dept.code, description: dept.description || '', manager_id: dept.manager_id || '' });
                          setShowModal(true);
                        }}
                        className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded-lg"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(dept.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">
                    {dept.description || 'No description provided.'}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Department Head:</span>
                      <span className="font-bold text-slate-800">{dept.manager_name || 'Unassigned'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Headcount:</span>
                      <span className="font-bold text-brand-600">{dept.employee_count} Employees</span>
                    </div>
                  </div>
                </div>

                {/* AI Capacity Badge */}
                <div className="mt-5 p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-indigo-500" />
                    <span className="text-[11px] font-bold text-slate-700">Workload Capacity</span>
                  </div>
                  <Badge variant={aiWorkload.capacity_status === 'OVER_CAPACITY' ? 'danger' : 'success'} size="sm">
                    {aiWorkload.capacity_status}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Form */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingId ? "Edit Department" : "Create Department"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Department Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Department Code</label>
            <input
              type="text"
              required
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="e.g. ENG, HR, MKT"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Department Manager</label>
            <select
              value={formData.manager_id}
              onChange={(e) => setFormData({ ...formData, manager_id: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
            >
              <option value="">Select Manager</option>
              {employees.map(e => (
                <option key={e.id} value={e.id}>{e.first_name} {e.last_name} ({e.position})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-600/20 mt-4"
          >
            {editingId ? "Save Changes" : "Create Department"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
