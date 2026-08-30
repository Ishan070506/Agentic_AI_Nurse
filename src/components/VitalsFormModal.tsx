import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { X, Heart, Activity, Droplet, Thermometer, CheckCircle2, AlertCircle } from 'lucide-react';

export const VitalsFormModal: React.FC = () => {
  const { isVitalsModalOpen, closeVitalsModal, addVitalRecord } = useHealth();

  const [systolic, setSystolic] = useState<number>(120);
  const [diastolic, setDiastolic] = useState<number>(80);
  const [glucose, setGlucose] = useState<number>(115);
  const [heartRate, setHeartRate] = useState<number>(72);
  const [spo2, setSpo2] = useState<number>(98);
  const [temperature, setTemperature] = useState<number>(98.6);
  const [notes, setNotes] = useState<string>('');

  if (!isVitalsModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let status: 'normal' | 'warning' | 'critical' = 'normal';
    if (systolic >= 140 || diastolic >= 90 || glucose >= 160 || spo2 < 95) {
      status = 'warning';
    }
    if (systolic >= 160 || diastolic >= 100 || glucose >= 220 || spo2 < 90) {
      status = 'critical';
    }

    addVitalRecord({
      date: today,
      timestamp: timeStr,
      systolic,
      diastolic,
      glucose,
      heartRate,
      spo2,
      temperature,
      notes: notes.trim() || 'Daily self-logged reading.',
      status
    });

    closeVitalsModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-slide-up">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-teal-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Activity className="w-6 h-6 text-white" />
            <div>
              <h3 className="font-bold text-lg">Log Daily Vitals</h3>
              <p className="text-xs text-primary-100">CareMate Agentic AI will analyze these instantly</p>
            </div>
          </div>
          <button
            onClick={closeVitalsModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* BP Input */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <label className="text-xs font-bold text-slate-700 flex items-center space-x-2 mb-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Blood Pressure (mmHg)</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-slate-500 font-semibold block mb-1">Systolic (Top)</span>
                <input
                  type="number"
                  min="70"
                  max="240"
                  value={systolic}
                  onChange={(e) => setSystolic(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  required
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-semibold block mb-1">Diastolic (Bottom)</span>
                <input
                  type="number"
                  min="40"
                  max="150"
                  value={diastolic}
                  onChange={(e) => setDiastolic(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Blood Glucose & Heart Rate */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5 mb-1.5">
                <Droplet className="w-4 h-4 text-amber-500" />
                <span>Glucose (mg/dL)</span>
              </label>
              <input
                type="number"
                min="40"
                max="500"
                value={glucose}
                onChange={(e) => setGlucose(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-primary-500 outline-none"
                required
              />
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5 mb-1.5">
                <Activity className="w-4 h-4 text-rose-500" />
                <span>Heart Rate (BPM)</span>
              </label>
              <input
                type="number"
                min="40"
                max="200"
                value={heartRate}
                onChange={(e) => setHeartRate(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-primary-500 outline-none"
                required
              />
            </div>
          </div>

          {/* SpO2 & Temp */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5 mb-1.5">
                <Activity className="w-4 h-4 text-cyan-500" />
                <span>SpO2 Oxygen (%)</span>
              </label>
              <input
                type="number"
                min="70"
                max="100"
                value={spo2}
                onChange={(e) => setSpo2(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-primary-500 outline-none"
                required
              />
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5 mb-1.5">
                <Thermometer className="w-4 h-4 text-orange-500" />
                <span>Temp (°F)</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="94"
                max="106"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-primary-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Symptoms or Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Mild headache after morning walk, took medication at 8 AM"
              className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center space-x-3">
            <button
              type="button"
              onClick={closeVitalsModal}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-md shadow-primary-500/20 transition-all"
            >
              Submit & Run AI Triage
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
