import React from 'react';
import { useHealth } from '../context/HealthContext';
import { useAuth } from '../context/AuthContext';
import { 
  Heart, 
  Droplet, 
  Activity, 
  Thermometer, 
  Pill, 
  Calendar, 
  PlusCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Bot, 
  FileText, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface PatientDashboardProps {
  setActiveTab: (tab: string) => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ setActiveTab }) => {
  const { user } = useAuth();
  const { 
    vitalsHistory, 
    medications, 
    appointments, 
    openVitalsModal, 
    openReportModal, 
    openAppointmentModal,
    toggleMedication 
  } = useHealth();

  const latestVital = vitalsHistory[0] || {
    systolic: 142,
    diastolic: 92,
    glucose: 168,
    heartRate: 78,
    spo2: 97,
    temperature: 98.6,
    status: 'warning'
  };

  // Format Recharts data (reverse to show chronological left to right)
  const chartData = [...vitalsHistory].reverse().map(v => ({
    date: v.date.split('-').slice(1).join('/'),
    systolic: v.systolic,
    diastolic: v.diastolic,
    glucose: v.glucose,
    heartRate: v.heartRate
  }));

  const upcomingAppointments = appointments.filter(a => a.status === 'upcoming');
  const takenMedsCount = medications.filter(m => m.taken).length;
  const adherenceRate = Math.round((takenMedsCount / medications.length) * 100);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-white/15 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
              <Bot className="w-4 h-4 text-teal-300" />
              <span>CareMate AI Agent Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good Morning, {user?.name || 'Robert'} 👋
            </h1>
            <p className="text-primary-100 text-xs sm:text-sm max-w-xl leading-relaxed">
              Your overall vitals stability is <span className="font-bold text-white">Good</span>. 1 vital parameter requires attention (Systolic BP: 142 mmHg).
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={openVitalsModal}
              className="px-4 py-2.5 rounded-2xl bg-white text-primary-700 font-bold text-xs shadow-lg hover:bg-slate-50 transition-all flex items-center space-x-1.5"
            >
              <PlusCircle className="w-4 h-4 text-primary-600" />
              <span>Log Vitals</span>
            </button>
            <button
              onClick={openReportModal}
              className="px-4 py-2.5 rounded-2xl bg-white/15 border border-white/20 hover:bg-white/25 text-white font-bold text-xs transition-all flex items-center space-x-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>View Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vitals Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* BP Card */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Blood Pressure</span>
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-extrabold text-slate-900">{latestVital.systolic}/{latestVital.diastolic}</span>
              <span className="text-xs text-slate-500 font-medium">mmHg</span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-[11px] font-semibold text-amber-700">Stage 1 HTN</span>
            </div>
          </div>
        </div>

        {/* Glucose Card */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Blood Glucose</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Droplet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-extrabold text-slate-900">{latestVital.glucose}</span>
              <span className="text-xs text-slate-500 font-medium">mg/dL</span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-[11px] font-semibold text-amber-700">Elevated Fasting</span>
            </div>
          </div>
        </div>

        {/* Heart Rate Card */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Heart Rate</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-extrabold text-slate-900">{latestVital.heartRate}</span>
              <span className="text-xs text-slate-500 font-medium">BPM</span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[11px] font-semibold text-emerald-700">Normal Rhythm</span>
            </div>
          </div>
        </div>

        {/* SpO2 Card */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Oxygen (SpO2)</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-extrabold text-slate-900">{latestVital.spo2}%</span>
              <span className="text-xs text-slate-500 font-medium">Sat</span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[11px] font-semibold text-emerald-700">Optimal Oxygenation</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid: Charts & Medication Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Vitals Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary-600" />
                Vitals Trajectory (7-Day Trend)
              </h3>
              <p className="text-xs text-slate-500">Systolic & Diastolic BP vs. Glucose level</p>
            </div>
            <button
              onClick={() => setActiveTab('vitals')}
              className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              <span>Full Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: 'none', color: '#FFF', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="systolic" stroke="#3B82F6" strokeWidth={2.5} name="Systolic BP (mmHg)" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="diastolic" stroke="#93C5FD" strokeWidth={2} name="Diastolic BP (mmHg)" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="glucose" stroke="#F59E0B" strokeWidth={2} name="Glucose (mg/dL)" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Medications Today */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Pill className="w-5 h-5 text-teal-600" />
                Today's Medication
              </h3>
              <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                {adherenceRate}% Logged
              </span>
            </div>

            <div className="space-y-2">
              {medications.map(med => (
                <div
                  key={med.id}
                  onClick={() => toggleMedication(med.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    med.taken
                      ? 'bg-slate-50 border-slate-200 text-slate-400'
                      : 'bg-white border-slate-200 hover:border-primary-300 text-slate-800 shadow-xs'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className={`text-xs font-bold block ${med.taken ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {med.name}
                    </span>
                    <span className="text-[10px] text-slate-500 block">{med.dosage} • {med.time}</span>
                  </div>
                  <button
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      med.taken ? 'bg-emerald-500 text-white' : 'border-2 border-slate-300 hover:border-teal-500'
                    }`}
                  >
                    {med.taken && <CheckCircle2 className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('medications')}
            className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors text-center"
          >
            Manage Prescriptions
          </button>
        </div>

      </div>

      {/* Bottom Grid: Appointments & AI Nurse Chat Prompt */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Appointments Widget */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              Upcoming Clinical Appointments
            </h3>
            <button
              onClick={openAppointmentModal}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </button>
          </div>

          <div className="space-y-3">
            {upcomingAppointments.length === 0 ? (
              <p className="text-xs text-slate-500">No upcoming consultations.</p>
            ) : (
              upcomingAppointments.map(app => (
                <div key={app.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block">{app.type}</span>
                    <span className="text-[11px] text-slate-600 block">With {app.doctorName}</span>
                    <p className="text-[10px] text-slate-400 mt-1">{app.notes}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 block">
                      {app.date}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold mt-1 block">{app.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* AI Agent Banner Card */}
        <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-bold">
              <Bot className="w-4 h-4 text-teal-400" />
              <span>CareMate Agentic AI Triage</span>
            </div>
            <h4 className="text-lg font-bold">Have Questions About Your Vitals?</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              CareMate AI Nurse analyzes your blood pressure, glucose spikes, and medication adherence in real time to give personalized triage guidance and update your primary doctor.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('chat')}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-primary-600 to-teal-500 text-white font-bold text-xs shadow-lg hover:opacity-95 transition-all text-center flex items-center justify-center space-x-2"
          >
            <span>Start AI Nurse Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
