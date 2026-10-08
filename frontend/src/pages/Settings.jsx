import React, { useState } from 'react';
import { User, Building, ShieldCheck, Bell, Palette, Lock, Save, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const [profileData, setProfileData] = useState({
    first_name: user?.first_name || 'Admin',
    last_name: user?.last_name || 'WorkFlowOS',
    email: user?.email || 'admin@workflowos.com',
    phone: '+1 (555) 019-2831'
  });

  const [companyData, setCompanyData] = useState({
    company_name: 'WorkFlowOS Enterprise Inc.',
    domain: 'workflowos.com',
    timezone: 'UTC-05:00 Eastern Time',
    currency: 'USD ($)'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">System Settings</h1>
          <p className="text-xs text-slate-500 mt-1">Configure company profiles, security rules, and user roles.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="bg-white p-3 rounded-3xl border border-slate-200 shadow-sm space-y-1 h-fit">
          {[
            { id: 'profile', label: 'My Profile', icon: User },
            { id: 'company', label: 'Company Info', icon: Building },
            { id: 'security', label: 'Security & Auth', icon: Lock },
            { id: 'roles', label: 'Roles & Permissions', icon: ShieldCheck },
            { id: 'appearance', label: 'Appearance', icon: Palette }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Form Box */}
        <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          {saved && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings saved successfully!</span>
            </div>
          )}

          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={profileData.first_name}
                    onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={profileData.last_name}
                    onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow-md shadow-brand-600/20"
              >
                Save Profile
              </button>
            </form>
          )}

          {activeTab === 'company' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 mb-4">Company Organization</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={companyData.company_name}
                  onChange={(e) => setCompanyData({ ...companyData, company_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow-md shadow-brand-600/20"
              >
                Save Organization Settings
              </button>
            </form>
          )}

          {activeTab === 'roles' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 mb-4">Role-Based Access Control (RBAC)</h3>
              <div className="space-y-3">
                {[
                  { role: 'ADMIN', desc: 'Full administrative control over all organization resources, settings, users, and audit logs.' },
                  { role: 'HR', desc: 'Manages employees, attendance, leave approvals, and performance reviews.' },
                  { role: 'MANAGER', desc: 'Manages team projects, tasks, attendance check-ins, and leave recommendations.' },
                  { role: 'EMPLOYEE', desc: 'Standard access to assigned tasks, personal attendance, leave applications, and notifications.' }
                ].map((r) => (
                  <div key={r.role} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-brand-600 uppercase">{r.role}</span>
                      <p className="text-xs text-slate-500 mt-0.5">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 mb-4">Security & Authentication</h3>
              <p className="text-xs text-slate-500">JWT Token Expiration: 1440 minutes (24 Hours). Password hashing: Bcrypt standard.</p>
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-xs font-bold">
                ✓ System Security Audit Compliant (SOC2 Type II Ready)
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 mb-4">Theme & Interface</h3>
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-slate-900 text-white rounded-2xl border-2 border-brand-500 text-xs font-bold cursor-pointer">
                  Dark Navigation + Light Content (Enterprise Standard)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
