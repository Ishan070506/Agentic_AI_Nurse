import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { X, Calendar as CalendarIcon, Clock, User, FileText, CheckCircle2 } from 'lucide-react';

export const AppointmentModal: React.FC = () => {
  const { isAppointmentModalOpen, closeAppointmentModal, addAppointment } = useHealth();

  const [date, setDate] = useState('2026-09-05');
  const [time, setTime] = useState('10:00 AM');
  const [type, setType] = useState<'Virtual Consultation' | 'In-Person Checkup' | 'Routine Follow-up' | 'AI Triage Review'>('Virtual Consultation');
  const [doctorName, setDoctorName] = useState('Dr. Sarah Jenkins');
  const [notes, setNotes] = useState('');

  if (!isAppointmentModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAppointment({
      doctorName,
      date,
      time,
      type,
      status: 'upcoming',
      notes: notes.trim() || 'Scheduled via CareMate Care Portal'
    });
    closeAppointmentModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-slide-up">
        
        <div className="bg-gradient-to-r from-teal-600 to-primary-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <CalendarIcon className="w-6 h-6 text-white" />
            <div>
              <h3 className="font-bold text-lg">Schedule Consultation</h3>
              <p className="text-xs text-teal-100">Book virtual or clinical appointment</p>
            </div>
          </div>
          <button
            onClick={closeAppointmentModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Assigned Physician</label>
            <select
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins (Cardiology & Primary Care)</option>
              <option value="Dr. Michael Chen">Dr. Michael Chen (Endocrinology & Diabetes)</option>
              <option value="Dr. Emily Vance">Dr. Emily Vance (Internal Medicine)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Appointment Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Time Slot</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:15 PM">04:15 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Consultation Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="Virtual Consultation">Virtual Telehealth Video Call</option>
              <option value="In-Person Checkup">In-Person Clinic Visit</option>
              <option value="Routine Follow-up">Routine Follow-up & Lab Review</option>
              <option value="AI Triage Review">AI Triage & Vitals Anomaly Review</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Notes for Doctor</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe symptoms or topics you want to cover during consultation..."
              className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          <div className="pt-2 flex items-center space-x-3">
            <button
              type="button"
              onClick={closeAppointmentModal}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-500/20 transition-all"
            >
              Confirm Booking
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
