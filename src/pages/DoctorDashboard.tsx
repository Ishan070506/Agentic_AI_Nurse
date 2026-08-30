import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { Patient } from '../types';
import { 
  Users, 
  AlertTriangle, 
  Search, 
  Filter, 
  Activity, 
  Heart, 
  Droplet, 
  Stethoscope, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  FileEdit,
  Sparkles
} from 'lucide-react';

export const DoctorDashboard: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const { patients, alerts, updatePatientNotes } = useHealth();
  const [selectedPatient, setSelectedPatient] = useState<Patient>(patients[0]);
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [noteInput, setNoteInput] = useState<string>(selectedPatient.notes || '');

  const filteredPatients = patients.filter(p => {
    const matchesRisk = filterRisk === 'all' || p.riskLevel === filterRisk;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.condition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  const criticalCount = patients.filter(p => p.riskLevel === 'critical').length;
  const attentionCount = patients.filter(p => p.riskLevel === 'attention').length;

  const handleSaveNotes = () => {
    updatePatientNotes(selectedPatient.id, noteInput);
    setSelectedPatient(prev => ({ ...prev, notes: noteInput }));
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Stethoscope className="w-4 h-4 text-teal-400" />
            <span>Clinical Triage & Agentic Oversight</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Doctor Command Center
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Monitoring active panel of chronic care patients. <span className="text-red-400 font-bold">{criticalCount} Critical</span> & <span className="text-amber-400 font-bold">{attentionCount} Attention Needed</span>.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="bg-slate-800 px-4 py-2 rounded-2xl border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Patients</span>
            <span className="text-xl font-extrabold text-white">{patients.length}</span>
          </div>
          <div className="bg-slate-800 px-4 py-2 rounded-2xl border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Active Alerts</span>
            <span className="text-xl font-extrabold text-amber-400">{alerts.length}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Patient List vs Patient Details Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Patient Roster & Triage Filters */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
          
          {/* Search & Risk Filter Tabs */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search patient name or diagnosis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div className="flex items-center space-x-1.5 p-1 bg-slate-100 rounded-xl">
              {['all', 'critical', 'attention', 'stable'].map((level) => (
                <button
                  key={level}
                  onClick={() => setFilterRisk(level)}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold capitalize transition-all ${
                    filterRisk === level
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Cards List */}
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredPatients.map((p) => {
              const isSelected = selectedPatient.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedPatient(p);
                    setNoteInput(p.notes || '');
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-teal-50/70 border-teal-400 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{p.name}</h4>
                        <p className="text-[10px] text-slate-500">{p.age} Yrs • {p.gender}</p>
                      </div>
                    </div>

                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      p.riskLevel === 'critical' ? 'bg-red-100 text-red-700 border border-red-200' :
                      p.riskLevel === 'attention' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                      'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    }`}>
                      {p.riskLevel}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-[9px] text-slate-400 block">BP</span>
                      <span className="font-bold text-slate-800">{p.bp} mmHg</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block">Glucose</span>
                      <span className="font-bold text-slate-800">{p.glucose} mg/dL</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Detailed Patient Inspection */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          
          {/* Selected Patient Bio */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center space-x-4">
              <img
                src={selectedPatient.avatar}
                alt={selectedPatient.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-teal-500 shadow-sm"
              />
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedPatient.name}</h3>
                <p className="text-xs text-slate-500">{selectedPatient.condition}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Last Logged Vitals: {selectedPatient.lastUpdated}</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('chat')}
              className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Chat</span>
            </button>
          </div>

          {/* Vitals Breakdown Cards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Current Vitals Diagnostic Breakdown
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-500 block">Blood Pressure</span>
                <span className="text-lg font-extrabold text-slate-900">{selectedPatient.bp}</span>
                <span className="text-[10px] text-slate-500 block">mmHg</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-500 block">Blood Glucose</span>
                <span className="text-lg font-extrabold text-amber-700">{selectedPatient.glucose}</span>
                <span className="text-[10px] text-slate-500 block">mg/dL</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-500 block">Pulse / SpO2</span>
                <span className="text-lg font-extrabold text-teal-700">{selectedPatient.heartRate} bpm / {selectedPatient.spo2}%</span>
                <span className="text-[10px] text-slate-500 block">Normal</span>
              </div>
            </div>
          </div>

          {/* Physician Care Notes & Action Plan */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <FileEdit className="w-4 h-4 text-teal-600" />
                <span>Physician Care Plan & Clinical Notes</span>
              </h4>
              <button
                onClick={handleSaveNotes}
                className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200 hover:bg-teal-100 transition-colors"
              >
                Save Notes
              </button>
            </div>

            <textarea
              rows={4}
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Add medical assessment notes, dosage updates, or lifestyle guidance..."
              className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 outline-none resize-none leading-relaxed"
            />
          </div>

          {/* AI Agent Automated Summary */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-primary-50 border border-teal-200 space-y-1.5 text-xs">
            <div className="flex items-center space-x-1.5 font-bold text-teal-900">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>CareMate AI Agent Risk Analysis</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Patient exhibits mild hypertension. Glucose trajectory shows a 12% increase after evening meals. Medication adherence is optimal. Recommended next step: Schedule telehealth checkup for medication titration review.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
