import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Mail, Lock, ArrowRight, AlertCircle, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@workflowos.com');
  const [password, setPassword] = useState('Admin123!');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message || 'Login failed. Please check credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0817] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Neon Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-y2k-pink/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-y2k-cyan/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <div className="inline-flex items-center space-x-3 bg-[#13112a] border border-y2k-pink/40 px-5 py-2.5 rounded-full shadow-neon-pink mb-4">
          <Zap className="w-6 h-6 text-y2k-pink animate-pulse" />
          <span className="text-2xl font-black tracking-wider text-white">WorkFlow<span className="y2k-gradient-text">OS</span> ★ 2000</span>
        </div>
        <h2 className="text-center text-xl font-black uppercase tracking-widest text-white mt-2">
          AUTHENTICATE CYBER MATRIX ACCOUNT
        </h2>
        <p className="mt-1 text-center text-xs text-y2k-cyan font-bold uppercase tracking-wider">
          Enterprise Workflow & Personnel Management
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="y2k-card py-8 px-6 shadow-2xl rounded-3xl border border-y2k-pink/40 sm:px-10">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-y2k-pink/10 border border-y2k-pink/40 flex items-center space-x-3 text-y2k-pink text-xs font-bold">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[11px] font-black text-slate-300 uppercase tracking-widest mb-2">
                WORK EMAIL
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-y2k-cyan" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@workflowos.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#18153b] border border-y2k-purple/40 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-y2k-pink transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-300 uppercase tracking-widest mb-2">
                CYBER PASSWORD
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-y2k-cyan" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#18153b] border border-y2k-purple/40 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-y2k-pink transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 cursor-pointer text-slate-300 font-bold">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-900 border-y2k-pink text-y2k-pink focus:ring-y2k-pink"
                />
                <span>Remember session</span>
              </label>

              <Link to="/forgot-password" className="text-y2k-cyan hover:text-white font-bold transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 y2k-btn-primary text-xs font-black rounded-2xl flex items-center justify-center space-x-2 uppercase tracking-widest"
            >
              <span>{loading ? 'Authenticating Matrix...' : 'INITIALIZE SYSTEM SESSION'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400 font-semibold">
            Need a corporate ID?{' '}
            <Link to="/signup" className="text-y2k-pink font-extrabold hover:underline">
              Create Cyber Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
