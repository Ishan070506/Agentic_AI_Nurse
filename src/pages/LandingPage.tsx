import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Heart, 
  ShieldCheck, 
  Activity, 
  Bot, 
  Calendar, 
  Stethoscope, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Users 
} from 'lucide-react';

export const LandingPage: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  const { loginAsPatient, loginAsDoctor } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans overflow-hidden relative">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-teal-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary-600 to-teal-400 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <Heart className="w-6 h-6 fill-white text-primary-600" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight text-white flex items-center gap-2">
              CareMate <span className="text-xs bg-primary-500/20 text-primary-300 border border-primary-500/30 px-2 py-0.5 rounded-full">AI Nurse</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => { loginAsPatient(); onGetStarted(); }}
            className="text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 transition-all"
          >
            Patient Demo
          </button>
          <button
            onClick={() => { loginAsDoctor(); onGetStarted(); }}
            className="text-xs font-bold px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-teal-500 text-white shadow-lg shadow-primary-600/30 hover:opacity-95 transition-all flex items-center space-x-1.5"
          >
            <span>Doctor Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-slate-800/80 border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs text-teal-300 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <span>Autonomous Agentic Health Assistance</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15]">
            AI-Powered <span className="gradient-text">Chronic Care & Remote</span> Nurse Monitoring
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            CareMate bridges patients and physicians with continuous vitals monitoring, real-time agentic AI symptom analysis, medication adherence tracking, and seamless clinical triage.
          </p>

          {/* Call to Actions */}
          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => { loginAsPatient(); onGetStarted(); }}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary-600 to-teal-500 text-white font-bold text-sm shadow-xl shadow-primary-600/30 hover:scale-[1.02] transition-all flex items-center space-x-2"
            >
              <span>Explore Patient Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => { loginAsDoctor(); onGetStarted(); }}
              className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm transition-all flex items-center space-x-2"
            >
              <Stethoscope className="w-4 h-4 text-teal-400" />
              <span>Launch Clinical Triage</span>
            </button>
          </div>

          {/* Key Metric Highlights */}
          <div className="pt-8 border-t border-slate-800 grid grid-cols-3 gap-6">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">99.4%</p>
              <p className="text-xs text-slate-400 mt-0.5">Anomaly Detection</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">24/7</p>
              <p className="text-xs text-slate-400 mt-0.5">AI Nurse Triage</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">4.9/5</p>
              <p className="text-xs text-slate-400 mt-0.5">Patient Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Hero Card Visual Preview */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl bg-slate-800/90 border border-slate-700 p-6 shadow-2xl space-y-4 backdrop-blur-xl">
            
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
                  alt="Robert Vance"
                  className="w-10 h-10 rounded-full border-2 border-primary-500"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">Robert Vance</h4>
                  <p className="text-[10px] text-slate-400">Type 2 Diabetes & Hypertension</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold">
                Vitals Stable
              </span>
            </div>

            {/* Vitals Grid Preview */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-700">
                <span className="text-[10px] text-slate-400 block">Blood Pressure</span>
                <span className="text-lg font-bold text-white">124/82 <span className="text-[10px] font-normal text-slate-400">mmHg</span></span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-700">
                <span className="text-[10px] text-slate-400 block">Blood Glucose</span>
                <span className="text-lg font-bold text-amber-400">118 <span className="text-[10px] font-normal text-slate-400">mg/dL</span></span>
              </div>
            </div>

            {/* AI Nurse Agent Chat Snippet */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-primary-900/40 to-teal-900/40 border border-primary-500/30 space-y-2">
              <div className="flex items-center space-x-2 text-primary-300 font-bold text-xs">
                <Bot className="w-4 h-4 text-teal-400" />
                <span>CareMate AI Agent:</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed italic">
                "Good morning Robert! Your blood pressure is down 8 mmHg from yesterday. Lisinopril adherence is logged at 100%. Keep up the 20-min daily walks!"
              </p>
            </div>

          </div>
        </div>

      </section>

      {/* Features Grid */}
      <section className="bg-slate-950 py-20 border-t border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-white">Everything You Need for Proactive Care</h2>
            <p className="text-slate-400 text-sm">Designed with clinicians and chronic care specialists in mind.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-primary-600/20 text-primary-400 flex items-center justify-center font-bold">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Vitals & Analytics</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Log blood pressure, glucose, heart rate, SpO2, and temperature with interactive trajectory graphs.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-teal-600/20 text-teal-400 flex items-center justify-center font-bold">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Agentic AI Nurse</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instant anomaly detection, empathetic symptom triage, and automated physician notifications.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Doctor Triage Portal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clinicians monitor high-risk patients, inspect vitals trends, add care notes, and manage telehealth schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
