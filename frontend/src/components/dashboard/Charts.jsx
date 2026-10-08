import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

export function AttendanceChart({ data = [] }) {
  return (
    <div className="y2k-card p-6 rounded-3xl border border-y2k-pink/30 shadow-2xl h-80">
      <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center space-x-2">
        <span className="w-2.5 h-2.5 rounded-full bg-y2k-cyan shadow-neon-cyan inline-block" />
        <span>CYBER ATTENDANCE OVERVIEW (7 DAYS)</span>
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#13112a', borderRadius: '16px', border: '1px solid #ff007f', color: '#fff', fontSize: '12px' }} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="Present" fill="#39ff14" radius={[6, 6, 0, 0]} />
          <Bar dataKey="Late" fill="#ffe600" radius={[6, 6, 0, 0]} />
          <Bar dataKey="Absent" fill="#ff007f" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TaskDistributionChart({ data = [] }) {
  const COLORS = ['#9d4edf', '#00f0ff', '#ffe600', '#39ff14'];

  return (
    <div className="y2k-card p-6 rounded-3xl border border-y2k-cyan/30 shadow-2xl h-80">
      <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center space-x-2">
        <span className="w-2.5 h-2.5 rounded-full bg-y2k-pink shadow-neon-pink inline-block" />
        <span>TASK VELOCITY BREAKDOWN</span>
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={6}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#0a0817" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#13112a', borderRadius: '16px', border: '1px solid #00f0ff', color: '#fff', fontSize: '12px' }} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PerformanceTrendChart() {
  const trendData = [
    { month: 'May', Engineering: 88, Product: 85, Sales: 90 },
    { month: 'Jun', Engineering: 90, Product: 87, Sales: 92 },
    { month: 'Jul', Engineering: 92, Product: 89, Sales: 88 },
    { month: 'Aug', Engineering: 91, Product: 92, Sales: 94 },
    { month: 'Sep', Engineering: 94, Product: 90, Sales: 95 },
    { month: 'Oct', Engineering: 96, Product: 94, Sales: 96 },
  ];

  return (
    <div className="y2k-card p-6 rounded-3xl border border-y2k-purple/30 shadow-2xl h-80">
      <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center space-x-2">
        <span className="w-2.5 h-2.5 rounded-full bg-y2k-lime shadow-neon-lime inline-block" />
        <span>PERFORMANCE METRICS MATRIX</span>
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={trendData}>
          <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
          <YAxis domain={[70, 100]} stroke="#94a3b8" fontSize={12} />
          <Tooltip contentStyle={{ backgroundColor: '#13112a', borderRadius: '16px', border: '1px solid #9d4edf', color: '#fff', fontSize: '12px' }} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line type="monotone" dataKey="Engineering" stroke="#ff007f" strokeWidth={3} dot={{ r: 5, fill: '#ff007f' }} />
          <Line type="monotone" dataKey="Product" stroke="#00f0ff" strokeWidth={3} dot={{ r: 5, fill: '#00f0ff' }} />
          <Line type="monotone" dataKey="Sales" stroke="#39ff14" strokeWidth={3} dot={{ r: 5, fill: '#39ff14' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
