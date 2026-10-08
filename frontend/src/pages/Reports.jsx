import React, { useState, useEffect } from 'react';
import { FileBarChart, Download, Printer, Filter, RefreshCw } from 'lucide-react';
import { reportApi } from '../services';
import { LoadingSpinner } from '../components/common/Badge';

export default function Reports() {
  const [reportType, setReportType] = useState('employees');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await reportApi.getSummary(reportType);
      if (res.success && res.data) setReportData(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [reportType]);

  const handleExportCSV = () => {
    if (!reportData || !reportData.records || reportData.records.length === 0) return;
    const records = reportData.records;
    const headers = Object.keys(records[0]).join(',');
    const rows = records.map(r => Object.values(r).map(v => `"${v}"`).join(','));
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `WorkFlowOS_${reportType}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Enterprise Reports & Analytics</h1>
          <p className="text-xs text-slate-500 mt-1">Export high-level organizational telemetry, audit trails, and data sheets.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print PDF</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {['employees', 'projects', 'tasks', 'attendance', 'leaves', 'performance'].map((t) => (
          <button
            key={t}
            onClick={() => setReportType(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              reportType === t
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Report Summary Box */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 capitalize">{reportType} Summary Report</h3>
          <span className="text-xs font-semibold text-slate-400">Total Records: {reportData?.total_records || 0}</span>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="overflow-x-auto">
            <pre className="p-4 bg-slate-900 text-emerald-400 rounded-2xl text-xs font-mono max-h-96 overflow-y-auto">
              {JSON.stringify(reportData?.records || [], null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
