export const mockUser = {
  id: 1,
  email: 'admin@workflowos.com',
  first_name: 'Admin',
  last_name: 'WorkFlowOS',
  role: 'ADMIN',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
};

export const mockStats = {
  total_employees: 48,
  active_projects: 8,
  pending_tasks: 34,
  employees_on_leave: 3,
  attendance_rate: 96.4,
  completed_projects: 12,
  total_departments: 6
};

export const mockAttendanceChart = [
  { day: 'Mon', Present: 44, Late: 3, Absent: 1 },
  { day: 'Tue', Present: 46, Late: 1, Absent: 1 },
  { day: 'Wed', Present: 45, Late: 2, Absent: 1 },
  { day: 'Thu', Present: 47, Late: 1, Absent: 0 },
  { day: 'Fri', Present: 43, Late: 4, Absent: 1 },
  { day: 'Sat', Present: 12, Late: 0, Absent: 0 },
  { day: 'Sun', Present: 0, Late: 0, Absent: 0 }
];

export const mockTaskStats = [
  { name: 'To Do', value: 14, color: '#64748B' },
  { name: 'In Progress', value: 22, color: '#3B82F6' },
  { name: 'In Review', value: 9, color: '#F59E0B' },
  { name: 'Completed', value: 45, color: '#10B981' }
];

export const mockProjectProgress = [
  { id: 1, name: 'WorkFlowOS Core Platform', progress: 85, status: 'IN_PROGRESS', deadline: '2026-11-15' },
  { id: 2, name: 'AI Analytics Integration', progress: 60, status: 'IN_PROGRESS', deadline: '2026-12-01' },
  { id: 3, name: 'Mobile Companion App', progress: 30, status: 'PLANNING', deadline: '2027-01-20' },
  { id: 4, name: 'Security Audit & ISO27001', progress: 100, status: 'COMPLETED', deadline: '2026-10-01' }
];

export const mockRecentActivity = [
  { id: 1, user_name: 'Sarah Connor', action: 'created project', entity: 'Project', target: 'Mobile Redesign', timestamp: '10 mins ago' },
  { id: 2, user_name: 'Alex Mercer', action: 'completed task', entity: 'Task', target: 'JWT Middleware Setup', timestamp: '35 mins ago' },
  { id: 3, user_name: 'David Miller', action: 'requested leave', entity: 'Leave', target: 'Paid Vacation (3 days)', timestamp: '2 hours ago' },
  { id: 4, user_name: 'Elena Rostova', action: 'updated department', entity: 'Department', target: 'Engineering', timestamp: '4 hours ago' }
];
