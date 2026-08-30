import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { Pill, CheckCircle2, PlusCircle, AlertCircle, Clock } from 'lucide-react';

export const MedicationsPage: React.FC = () => {
  const { medications, toggleMedication, addMedication } = useHealth();
  const [showAddForm, setShowAddForm] = useState(false);

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Once daily (Morning)');
  const [time, setTime] = useState('08:00 AM');
  const [instructions, setInstructions] = useState('');

  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dosage) return;

    addMedication({
      name,
      dosage,
      frequency,
      time,
      taken: false,
      instructions: instructions || 'Take with water as directed.',
      remainingDays: 30
    });

    setName('');
    setDosage('');
    setInstructions('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 pb-12">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Pill className="w-6 h-6 text-teal-600" />
            Medication Adherence & Prescriptions
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Track daily dosages, timing reminders, and refill status.</p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-all flex items-center space-x-1.5 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showAddForm ? 'Close Form' : 'Add Medication'}</span>
        </button>
      </div>

      {/* Add Medication Form */}
      {showAddForm && (
        <form onSubmit={handleAddMed} className="bg-white rounded-3xl border border-teal-200 p-6 shadow-md space-y-4 animate-slide-up">
          <h3 className="font-bold text-sm text-teal-900">Add New Prescription</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Medication Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Lisinopril"
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Dosage</label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="e.g. 10 mg"
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Once daily (Morning)">Once daily (Morning)</option>
                <option value="Twice daily (Morning & Night)">Twice daily (Morning & Night)</option>
                <option value="Once daily (Bedtime)">Once daily (Bedtime)</option>
                <option value="As needed for symptoms">As needed for symptoms</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Scheduled Time</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 08:30 AM"
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Special Instructions</label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Take with food or large glass of water"
              className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            Save Prescription
          </button>
        </form>
      )}

      {/* Medication Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {medications.map((med) => (
          <div
            key={med.id}
            className={`p-6 rounded-3xl border transition-all space-y-4 ${
              med.taken
                ? 'bg-slate-50 border-slate-200'
                : 'bg-white border-slate-200 shadow-sm hover:border-teal-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                  med.taken ? 'bg-emerald-100 text-emerald-700' : 'bg-teal-50 text-teal-600'
                }`}>
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{med.name}</h3>
                  <span className="text-xs text-slate-500 font-medium">{med.dosage} • {med.frequency}</span>
                </div>
              </div>

              <button
                onClick={() => toggleMedication(med.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                  med.taken
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'border border-slate-200 text-slate-700 hover:border-teal-500'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{med.taken ? 'Taken' : 'Mark Taken'}</span>
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-slate-100 text-xs space-y-1 text-slate-600">
              <div className="flex items-center space-x-1.5 font-semibold text-slate-800">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>Schedule: {med.time}</span>
              </div>
              <p className="text-[11px] leading-relaxed">{med.instructions}</p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Refill Remaining: {med.remainingDays} days</span>
              <span className="text-teal-600 font-bold">Rx #482910</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
