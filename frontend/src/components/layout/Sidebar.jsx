import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  FolderKanban,
  CheckSquare,
  Clock,
  CalendarDays,
  TrendingUp,
  FileBarChart,
  Bell,
  Settings,
  LogOut,
  Zap,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Employees', href: '/employees', icon: Users },
  { name: 'Departments', href: '/departments', icon: Building2 },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Attendance', href: '/attendance', icon: Clock },
  { name: 'Leaves', href: '/leaves', icon: CalendarDays },
  { name: 'Performance', href: '/performance', icon: TrendingUp },
  { name: 'Reports', href: '/reports', icon: FileBarChart },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0d0b21] text-slate-300 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col border-r border-y2k-pink/30 shadow-[5px_0_30px_rgba(255,0,127,0.15)]`}>
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-y2k-pink/20 bg-[#120f2e]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl y2k-gradient-bg flex items-center justify-center shadow-neon-pink">
            <Zap className="w-6 h-6 text-white animate-pulse" />
          </div>
          <span className="text-xl font-black tracking-wider text-white">
            WorkFlow<span className="y2k-gradient-text">OS</span>
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-black text-y2k-cyan uppercase tracking-widest flex items-center justify-between">
          <span>CYBER SYSTEM v2.0</span>
          <Sparkles className="w-3 h-3 text-y2k-pink animate-spin" />
        </div>

        {navigation.map((item) => {
          const isActive = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? 'y2k-gradient-bg text-white shadow-neon-pink font-black border border-white/30 scale-[1.02]'
                  : 'text-slate-400 hover:text-y2k-cyan hover:bg-y2k-card border border-transparent hover:border-y2k-cyan/30'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-y2k-pink'}`} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Role & Profile Footer */}
      <div className="p-4 border-t border-y2k-pink/20 bg-[#0d0b21]">
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#171439] border border-y2k-purple/40">
          <div className="flex items-center space-x-3 min-w-0">
            <img
              src={user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.first_name || 'Admin'}`}
              alt="User Avatar"
              className="w-9 h-9 rounded-full bg-slate-800 border-2 border-y2k-cyan object-cover shadow-neon-cyan"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">
                {user?.first_name || 'Admin'} {user?.last_name || ''}
              </p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black bg-y2k-pink/20 text-y2k-pink border border-y2k-pink/40 uppercase tracking-widest">
                ★ {user?.role || 'ADMIN'}
              </span>
            </div>
          </div>
          <button
            onClick={logout}
            title="Sign out"
            className="p-1.5 rounded-xl text-slate-400 hover:text-y2k-pink hover:bg-y2k-pink/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
