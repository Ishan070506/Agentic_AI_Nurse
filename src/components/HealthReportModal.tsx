import React from 'react';
import { useHealth } from '../context/HealthContext';
import { useAuth } from '../context/AuthContext';
import { X, Printer, Download, ShieldCheck, Heart, Activity, FileText, CheckCircle2 } from 'lucide-react';

export const HealthReportModal: React.FC = () => {
  const { isReportModalOpen, closeReportModal, vitalsHistory, medications, appointments } = useHealth();
  const { user } = useAuth();

  if (!isReportModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const latestVital = vitalsHistory[0];
  const avgSystolic = Math.round(vitalsHistory.reduce((acc, v) => acc + v.systolic, 0) / vitalsHistory.length);
  const avgDiastolic = Math.round(vitalsHistory.reduce((acc, v) => acc + v.diastolic, 0) / vitalsHistory.length);
  const avgGlucose = Math.round(vitalsHistory.reduce((acc, v) => acc + v.glucose, 0) / vitalsHistory.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-slide-up max-h-[90vh] flex flex-col print:shadow-none print:border-none print:max-w-none">
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary-400" />
            <h3 className="font-bold text-base">Comprehensive Patient Health Summary</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={closeReportModal}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Report Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 print:overflow-visible">
          
          {/* Institution Header */}
          <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-xl">
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">CareMate Medical Network</h1>
                <p className="text-xs text-slate-500">Continuous Chronic Care Monitoring & Telehealth</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full border border-primary-200">
                Official EHR Summary
              </span>
              <p className="text-[10px] text-slate-400 mt-1">Generated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Patient Bio Box */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Patient Name</span>
              <span className="font-bold text-slate-900">{user?.name || 'Robert Vance'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Age / Gender</span>
              <span className="font-bold text-slate-900">{user?.age || 62} Yrs / {user?.gender || 'Male'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Condition</span>
              <span className="font-bold text-slate-900">{user?.condition || 'Type 2 Diabetes & HTN'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Attending Physician</span>
              <span className="font-bold text-slate-900">{user?.primaryDoctor || 'Dr. Sarah Jenkins'}</span>
            </div>
          </div>

          {/* Vitals Summary Averages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center space-x-1.5">
              <Activity className="w-4 h-4 text-primary-600" />
              <span>7-Day Vitals Trajectory</span>
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-center">
                <span className="text-[10px] text-slate-500 block">Avg Blood Pressure</span>
                <span className="text-lg font-extrabold text-blue-900">{avgSystolic}/{avgDiastolic}</span>
                <span className="text-[10px] text-blue-600 block mt-0.5">mmHg (Stage 1 HTN)</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100 text-center">
                <span className="text-[10px] text-slate-500 block">Avg Blood Glucose</span>
                <span className="text-lg font-extrabold text-amber-900">{avgGlucose}</span>
                <span className="text-[10px] text-amber-600 block mt-0.5">mg/dL (Fasting Target)</span>
              </div>
              <div className="p-3 rounded-xl bg-teal-50/50 border border-teal-100 text-center">
                <span className="text-[10px] text-slate-500 block">Latest SpO2 / HR</span>
                <span className="text-lg font-extrabold text-teal-900">{latestVital?.spo2}% / {latestVital?.heartRate}</span>
                <span className="text-[10px] text-teal-600 block mt-0.5">BPM (Normal)</span>
              </div>
            </div>
          </div>

          {/* Active Prescriptions Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Active Prescriptions & Adherence
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-500 uppercase font-semibold">
                  <tr>
                    <th className="p-2.5">Medication</th>
                    <th className="p-2.5">Dosage</th>
                    <th className="p-2.5">Frequency</th>
                    <th className="p-2.5">Today Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {medications.map(med => (
                    <tr key={med.id}>
                      <td className="p-2.5 font-bold text-slate-800">{med.name}</td>
                      <td className="p-2.5 text-slate-600">{med.dosage}</td>
                      <td className="p-2.5 text-slate-600">{med.frequency}</td>
                      <td className="p-2.5">
                        {med.taken ? (
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Logged
                          </span>
                        ) : (
                          <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Agentic AI Nurse Assessment Summary */}
          <div className="bg-gradient-to-r from-primary-50 to-teal-50 p-4 rounded-2xl border border-primary-200 text-xs">
            <h4 className="font-bold text-primary-900 flex items-center space-x-1.5 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-primary-600" />
              <span>CareMate AI Agentic Clinical Note</span>
            </h4>
            <p className="text-slate-700 leading-relaxed">
              Patient exhibits mild hypertension (average 135/87 mmHg) and fasting glucose variance (average 138 mg/dL). Vitals adherence is 100% over the last 7 days. AI Nurse agent recommends maintaining current Lisinopril 10mg regimen and scheduling quarterly HbA1c lab review.
            </p>
          </div>

          {/* Signature Line */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div>
              <p className="font-semibold text-slate-700">Dr. Sarah Jenkins, MD</p>
              <p className="text-[10px]">Board Certified Cardiology & Primary Care</p>
            </div>
            <div className="text-right">
              <div className="font-serif italic text-base text-slate-800">S. Jenkins MD</div>
              <p className="text-[10px]">Electronic Signature Verified</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
