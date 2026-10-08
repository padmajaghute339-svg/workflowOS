import React, { useState, useEffect } from 'react';
import {
  Users,
  FolderKanban,
  CheckSquare,
  UserX,
  TrendingUp,
  Clock,
  Sparkles,
  Zap,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/dashboard/StatCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import ProjectProgress from '../components/dashboard/ProjectProgress';
import { AttendanceChart, TaskDistributionChart, PerformanceTrendChart } from '../components/dashboard/Charts';
import { dashboardApi } from '../services';
import {
  mockStats,
  mockAttendanceChart,
  mockTaskStats,
  mockProjectProgress,
  mockRecentActivity
} from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState(mockStats);
  const [attendanceChart, setAttendanceChart] = useState(mockAttendanceChart);
  const [taskStats, setTaskStats] = useState(mockTaskStats);
  const [projectProgress, setProjectProgress] = useState(mockProjectProgress);
  const [recentActivity, setRecentActivity] = useState(mockRecentActivity);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [sRes, aRes, tRes, pRes, actRes] = await Promise.all([
          dashboardApi.getStats(),
          dashboardApi.getAttendanceChart(),
          dashboardApi.getTaskStatistics(),
          dashboardApi.getProjectProgress(),
          dashboardApi.getRecentActivity()
        ]);

        if (sRes.success && sRes.data) setStats(sRes.data);
        if (aRes.success && aRes.data) setAttendanceChart(aRes.data);
        if (tRes.success && tRes.data) setTaskStats(tRes.data);
        if (pRes.success && pRes.data) setProjectProgress(pRes.data);
        if (actRes.success && actRes.data) setRecentActivity(actRes.data);
      } catch (err) {
        console.log("Using rich fallback dataset for local presentation", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Y2K Cyber Banner */}
      <div className="relative overflow-hidden p-8 rounded-3xl y2k-card border border-y2k-pink/40 shadow-neon-pink/20">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-y2k-pink/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 bg-y2k-cyan/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-y2k-pink/20 border border-y2k-pink/40 text-y2k-pink text-[10px] font-black uppercase tracking-widest mb-3">
              <Zap className="w-3.5 h-3.5 text-y2k-pink animate-pulse" />
              <span>CYBER COMMAND CENTER ★ WORKFLOW 2000</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              SYSTEM ONLINE, <span className="y2k-gradient-text">{user?.first_name || 'ADMIN'}</span> ⚡
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 font-semibold">
              Here's what's happening across your enterprise matrix today.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => navigate('/projects')}
              className="y2k-btn-primary px-5 py-2.5 rounded-2xl text-xs uppercase tracking-wider flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>+ New Project</span>
            </button>
            <button
              onClick={() => navigate('/employees')}
              className="y2k-btn-cyan px-5 py-2.5 rounded-2xl text-xs uppercase tracking-wider flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Add Employee</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Personnel"
          value={stats.total_employees}
          icon={Users}
          trend={4.2}
          trendLabel="vs last cycle"
          color="pink"
        />
        <StatCard
          title="Active Projects"
          value={stats.active_projects}
          icon={FolderKanban}
          trend={12.0}
          trendLabel="On schedule"
          color="purple"
        />
        <StatCard
          title="Pending Tasks"
          value={stats.pending_tasks}
          icon={CheckSquare}
          trend={-2.5}
          trendLabel="Completion target"
          color="amber"
        />
        <StatCard
          title="On Leave"
          value={stats.employees_on_leave}
          icon={UserX}
          trend={0.0}
          trendLabel="Approved requests"
          color="rose"
        />
        <StatCard
          title="Attendance Rate"
          value={`${stats.attendance_rate}%`}
          icon={TrendingUp}
          trend={1.8}
          trendLabel="7-day matrix"
          color="emerald"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart data={attendanceChart} />
        <TaskDistributionChart data={taskStats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProjectProgress projects={projectProgress} />
        </div>
        <div>
          <ActivityFeed activities={recentActivity} />
        </div>
      </div>

      {/* Performance Trend Chart */}
      <PerformanceTrendChart />
    </div>
  );
}
