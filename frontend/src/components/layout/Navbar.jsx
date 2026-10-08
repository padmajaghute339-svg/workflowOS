import React, { useState, useEffect } from 'react';
import { Menu, Search, Bell, Clock, User as UserIcon, LogOut, Sparkles, ChevronDown, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { notificationApi, attendanceApi } from '../../services';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInMsg, setCheckInMsg] = useState('');

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const res = await notificationApi.getAll();
        if (res.success && res.data) {
          setNotifications(res.data);
        }
      } catch (e) {
        // Silent catch for demo
      }
    };
    fetchNotifs();
  }, []);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleCheckInToggle = async () => {
    try {
      if (!checkedIn) {
        await attendanceApi.checkIn({ employee_id: user?.employee_id || 1 });
        setCheckedIn(true);
        setCheckInMsg('Checked In!');
      } else {
        await attendanceApi.checkOut({ employee_id: user?.employee_id || 1 });
        setCheckedIn(false);
        setCheckInMsg('Checked Out!');
      }
      setTimeout(() => setCheckInMsg(''), 3000);
    } catch (err) {
      setCheckedIn(!checkedIn);
      setCheckInMsg(checkedIn ? 'Checked Out' : 'Checked In');
      setTimeout(() => setCheckInMsg(''), 3000);
    }
  };

  return (
    <header className="h-16 bg-[#0f0c29]/90 backdrop-blur-xl border-b border-y2k-pink/20 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-neon-pink/10">
      {/* Left: Mobile Toggle & Global Search */}
      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 max-w-xl">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-y2k-pink hover:bg-y2k-card transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-y2k-cyan" />
          <input
            type="text"
            placeholder="Search cyber directory, tasks, projects..."
            className="w-full pl-10 pr-4 py-2 bg-[#171439] border border-y2k-purple/40 rounded-2xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-y2k-cyan focus:border-transparent transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center space-x-3">
        {/* Quick Check-in Button */}
        <button
          onClick={handleCheckInToggle}
          className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
            checkedIn
              ? 'bg-y2k-lime/20 text-y2k-lime border border-y2k-lime/50 shadow-neon-lime'
              : 'y2k-btn-primary'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{checkedIn ? 'System Check-out' : 'System Check-in'}</span>
        </button>

        {checkInMsg && (
          <span className="text-xs font-bold text-y2k-lime bg-y2k-lime/10 border border-y2k-lime/40 px-2.5 py-1 rounded-xl animate-bounce">
            {checkInMsg}
          </span>
        )}

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifDropdown(!showNotifDropdown);
              setShowProfileDropdown(false);
            }}
            className="relative p-2 rounded-2xl text-slate-300 hover:text-y2k-cyan hover:bg-[#1a1738] transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-y2k-pink text-white text-[9px] font-black flex items-center justify-center border border-white shadow-neon-pink">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-[#13112a] border border-y2k-pink/30 rounded-3xl shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-y2k-purple/20 flex items-center justify-between">
                <h4 className="text-xs font-black text-y2k-cyan uppercase tracking-widest flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-y2k-pink" />
                  <span>CYBER ALERTS</span>
                </h4>
                <button
                  onClick={() => navigate('/notifications')}
                  className="text-[11px] text-y2k-pink font-bold hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="max-h-64 overflow-y-auto divide-y divide-y2k-purple/10">
                {notifications.length === 0 ? (
                  <p className="p-4 text-xs text-center text-slate-400">No active alerts</p>
                ) : (
                  notifications.slice(0, 4).map((n) => (
                    <div key={n.id} className="p-3.5 hover:bg-[#1c1942] transition-colors">
                      <p className="text-xs font-bold text-white">{n.title}</p>
                      <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowNotifDropdown(false);
            }}
            className="flex items-center space-x-2 p-1 rounded-2xl hover:bg-[#1a1738] transition-colors"
          >
            <img
              src={user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.first_name || 'Admin'}`}
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-y2k-cyan object-cover shadow-neon-cyan"
            />
            <ChevronDown className="w-4 h-4 text-y2k-cyan hidden sm:block" />
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-[#13112a] border border-y2k-cyan/30 rounded-3xl shadow-2xl py-2 z-50">
              <div className="px-4 py-2 border-b border-y2k-purple/20">
                <p className="text-xs font-bold text-white">{user?.first_name || 'Admin'} {user?.last_name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
              </div>

              <button
                onClick={() => {
                  setShowProfileDropdown(false);
                  navigate('/settings');
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-300 hover:text-y2k-cyan hover:bg-[#1c1942] flex items-center space-x-2"
              >
                <UserIcon className="w-4 h-4 text-y2k-cyan" />
                <span>Account Settings</span>
              </button>

              <button
                onClick={() => {
                  setShowProfileDropdown(false);
                  logout();
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-extrabold text-y2k-pink hover:bg-y2k-pink/10 flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4 text-y2k-pink" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
