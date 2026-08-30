import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { decodeToken } from '../utils/jwt';
import { 
  Heart, 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  Sparkles, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  Stethoscope, 
  UserCheck,
  Eye,
  EyeOff
} from 'lucide-react';

export const AuthPage: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { login, signup, jwtToken } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [role, setRoleState] = useState<UserRole>('patient');

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(55);
  const [gender, setGender] = useState('Male');
  const [condition, setCondition] = useState('Type 2 Diabetes & Hypertension');
  const [showTokenPreview, setShowTokenPreview] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      login(email || (role === 'doctor' ? 'dr.jenkins@caremate-health.org' : 'robert.vance@example.com'), role, name);
    } else {
      signup({
        name: name || 'New Patient',
        email: email || 'patient@example.com',
        role,
        age,
        gender,
        condition
      });
    }
    onSuccess();
  };

  const handleDemoPatient = () => {
    login('robert.vance@example.com', 'patient', 'Robert Vance');
    onSuccess();
  };

  const handleDemoDoctor = () => {
    login('dr.jenkins@caremate-health.org', 'doctor', 'Dr. Sarah Jenkins');
    onSuccess();
  };

  const decodedPayload = jwtToken ? decodeToken(jwtToken) : null;

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-primary-600/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-teal-500/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Side: Brand Info & JWT Live Preview */}
        <div className="md:col-span-5 space-y-6">
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-teal-400 flex items-center justify-center shadow-lg shadow-primary-500/30">
              <Heart className="w-7 h-7 fill-white text-primary-600 animate-pulse" />
            </div>
            <div>
              <h1 className="font-extrabold text-2xl tracking-tight text-white flex items-center gap-2">
                CareMate
                <span className="text-xs bg-primary-500/20 text-primary-300 border border-primary-500/30 px-2 py-0.5 rounded-full font-bold">
                  JWT Secured
                </span>
              </h1>
              <p className="text-xs text-slate-400">Agentic AI Healthcare Platform</p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-100">
              Secure Role-Based Portal
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              CareMate uses JWT (JSON Web Tokens) with HS256 HMAC encryption to securely store patient health records and physician credentials in session state.
            </p>
          </div>

          {/* Quick Demo Logins */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2.5 backdrop-blur-md">
            <span className="text-[10px] font-extrabold text-teal-300 uppercase tracking-wider block">
              ⚡ Instant One-Click Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoPatient}
                className="py-2.5 px-3 rounded-xl bg-primary-600/90 hover:bg-primary-600 text-white text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-md"
              >
                <UserCheck className="w-4 h-4" />
                <span>Patient Demo</span>
              </button>

              <button
                type="button"
                onClick={handleDemoDoctor}
                className="py-2.5 px-3 rounded-xl bg-teal-600/90 hover:bg-teal-600 text-white text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-md"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Doctor Demo</span>
              </button>
            </div>
          </div>

          {/* Live JWT Inspection Toggle */}
          <div className="pt-2">
            <button
              onClick={() => setShowTokenPreview(!showTokenPreview)}
              className="text-xs font-bold text-slate-400 hover:text-teal-300 flex items-center space-x-1.5 transition-colors"
            >
              <KeyRound className="w-4 h-4 text-teal-400" />
              <span>{showTokenPreview ? 'Hide JWT Debug Token' : 'Inspect JWT Session Token'}</span>
            </button>

            {showTokenPreview && jwtToken && (
              <div className="mt-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-[10px] font-mono space-y-2 animate-slide-up">
                <span className="text-teal-400 font-bold block">JWT Token String:</span>
                <p className="text-slate-400 break-all bg-slate-900 p-2 rounded-lg border border-slate-800">
                  {jwtToken}
                </p>
                {decodedPayload && (
                  <div className="space-y-1">
                    <span className="text-emerald-400 font-bold block">Decoded Claims Payload:</span>
                    <pre className="text-slate-300 bg-slate-900 p-2 rounded-lg border border-slate-800 overflow-x-auto text-[9px]">
                      {JSON.stringify(decodedPayload, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Auth Form */}
        <div className="md:col-span-7 bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          
          {/* Login / Sign Up Tabs */}
          <div className="flex items-center p-1 bg-slate-900 rounded-2xl border border-slate-700">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-primary-600 to-teal-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-primary-600 to-teal-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Role Selection */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Account Role</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRoleState('patient')}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                    role === 'patient'
                      ? 'bg-primary-600/20 border-primary-500 text-primary-300'
                      : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Patient</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRoleState('doctor')}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                    role === 'doctor'
                      ? 'bg-teal-600/20 border-teal-500 text-teal-300'
                      : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Doctor / Clinician</span>
                </button>
              </div>
            </div>

            {/* Name input for signup */}
            {mode === 'signup' && (
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={role === 'doctor' ? 'Dr. Sarah Jenkins' : 'Robert Vance'}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 rounded-xl border border-slate-700 text-xs text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'doctor' ? 'dr.jenkins@caremate-health.org' : 'robert.vance@example.com'}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 rounded-xl border border-slate-700 text-xs text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-900 rounded-xl border border-slate-700 text-xs text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Additional Patient Fields for Signup */}
            {mode === 'signup' && role === 'patient' && (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 rounded-xl border border-slate-700 text-xs text-white outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Chronic Condition</label>
                  <input
                    type="text"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    placeholder="Hypertension"
                    className="w-full px-3 py-2 bg-slate-900 rounded-xl border border-slate-700 text-xs text-white outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-primary-600 to-teal-500 text-white font-bold text-xs shadow-xl shadow-primary-600/30 hover:opacity-95 transition-all flex items-center justify-center space-x-2 mt-4"
            >
              <KeyRound className="w-4 h-4" />
              <span>{mode === 'login' ? 'Authenticate & Issue JWT Token' : 'Register & Generate JWT'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};
