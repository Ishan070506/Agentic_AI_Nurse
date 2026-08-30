import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { Activity, Heart, Droplet, Thermometer, PlusCircle, Filter, Calendar } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

export const VitalsPage: React.FC = () => {
  const { vitalsHistory, openVitalsModal } = useHealth();
  const [activeMetric, setActiveMetric] = useState<'bp' | 'glucose' | 'heartRate'>('bp');

  const chartData = [...vitalsHistory].reverse().map(v => ({
    date: v.date.split('-').slice(1).join('/'),
    systolic: v.systolic,
    diastolic: v.diastolic,
    glucose: v.glucose,
    heartRate: v.heartRate
  }));

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary-600" />
            Vitals History & Analytical Trends
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Continuous tracking of blood pressure, glucose, and heart rate parameters.</p>
        </div>

        <button
          onClick={openVitalsModal}
          className="px-4 py-2.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs shadow-md shadow-primary-500/20 transition-all flex items-center space-x-1.5 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Log New Vitals</span>
        </button>
      </div>

      {/* Metric Selector Tabs */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveMetric('bp')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMetric === 'bp' ? 'bg-white text-primary-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Blood Pressure
            </button>
            <button
              onClick={() => setActiveMetric('glucose')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMetric === 'glucose' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Blood Glucose
            </button>
            <button
              onClick={() => setActiveMetric('heartRate')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMetric === 'heartRate' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Heart Rate & SpO2
            </button>
          </div>
        </div>

        {/* Dynamic Chart Display */}
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            {activeMetric === 'bp' ? (
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} domain={[50, 180]} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#FFF', fontSize: '12px' }} />
                <Line type="monotone" dataKey="systolic" stroke="#2563EB" strokeWidth={3} name="Systolic (mmHg)" />
                <Line type="monotone" dataKey="diastolic" stroke="#60A5FA" strokeWidth={2} name="Diastolic (mmHg)" />
              </LineChart>
            ) : activeMetric === 'glucose' ? (
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} domain={[50, 220]} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#FFF', fontSize: '12px' }} />
                <Bar dataKey="glucose" fill="#F59E0B" radius={[6, 6, 0, 0]} name="Glucose (mg/dL)" />
              </BarChart>
            ) : (
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} domain={[50, 120]} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#FFF', fontSize: '12px' }} />
                <Line type="monotone" dataKey="heartRate" stroke="#E11D48" strokeWidth={3} name="Heart Rate (BPM)" dot={{ r: 4 }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Vitals Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Historical Vitals Log</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[10px]">
              <tr>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Blood Pressure</th>
                <th className="p-3">Glucose</th>
                <th className="p-3">Heart Rate</th>
                <th className="p-3">SpO2</th>
                <th className="p-3">Temp</th>
                <th className="p-3">Status</th>
                <th className="p-3">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vitalsHistory.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-800">
                    {v.date} <span className="text-[10px] text-slate-400 font-normal block">{v.timestamp}</span>
                  </td>
                  <td className="p-3 font-bold text-slate-900">{v.systolic}/{v.diastolic} <span className="text-[10px] text-slate-400 font-normal">mmHg</span></td>
                  <td className="p-3 font-bold text-amber-700">{v.glucose} <span className="text-[10px] text-slate-400 font-normal">mg/dL</span></td>
                  <td className="p-3 font-semibold text-slate-800">{v.heartRate} bpm</td>
                  <td className="p-3 font-semibold text-slate-800">{v.spo2}%</td>
                  <td className="p-3 text-slate-600">{v.temperature}°F</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                      v.status === 'normal' ? 'bg-emerald-100 text-emerald-800' :
                      v.status === 'warning' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500 max-w-xs truncate">{v.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
