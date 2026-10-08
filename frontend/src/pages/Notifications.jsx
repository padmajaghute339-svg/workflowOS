import React, { useState, useEffect } from 'react';
import { Bell, CheckCheck, Clock, ShieldAlert } from 'lucide-react';
import { notificationApi } from '../services';
import { Badge, LoadingSpinner } from '../components/common/Badge';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifs = async () => {
    try {
      const res = await notificationApi.getAll();
      if (res.success && res.data) setNotifications(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  const handleMarkAllRead = async () => {
    await notificationApi.markAllRead();
    fetchNotifs();
  };

  const handleMarkRead = async (id) => {
    await notificationApi.markRead(id);
    fetchNotifs();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Notification Center</h1>
          <p className="text-xs text-slate-500 mt-1">Audit log alerts, task assignments, and leave notifications.</p>
        </div>
        <button
          onClick={handleMarkAllRead}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
        >
          <CheckCheck className="w-4 h-4 text-brand-600" />
          <span>Mark All as Read</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
        {loading ? (
          <LoadingSpinner />
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">No notifications available.</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleMarkRead(n.id)}
              className={`p-5 flex items-start justify-between gap-4 cursor-pointer transition-colors ${
                !n.is_read ? 'bg-brand-50/40' : 'hover:bg-slate-50/60'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2.5 rounded-xl border mt-0.5 ${!n.is_read ? 'bg-brand-500 text-white border-brand-600' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                    <Badge size="sm" variant={n.type === 'SYSTEM' ? 'brand' : 'purple'}>{n.type}</Badge>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{n.message}</p>
                  <span className="text-[11px] text-slate-400 mt-2 block font-medium">
                    {new Date(n.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              {!n.is_read && (
                <span className="w-2.5 h-2.5 rounded-full bg-brand-600 shrink-0 mt-2" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
