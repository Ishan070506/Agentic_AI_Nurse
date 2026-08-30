import React from 'react';
import { useHealth } from '../context/HealthContext';
import { Calendar as CalendarIcon, Clock, PlusCircle, Video, UserCheck, CheckCircle2 } from 'lucide-react';

export const AppointmentsPage: React.FC = () => {
  const { appointments, openAppointmentModal } = useHealth();

  return (
    <div className="space-y-6 pb-12">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-indigo-600" />
            Clinical Consultations & Calendar
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage virtual telehealth visits and in-person doctor appointments.</p>
        </div>

        <button
          onClick={openAppointmentModal}
          className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center space-x-1.5 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {appointments.map(app => (
          <div key={app.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 hover:border-indigo-300 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{app.type}</h3>
                  <p className="text-xs text-slate-500">{app.doctorName}</p>
                </div>
              </div>

              <span className="text-[10px] uppercase font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {app.status}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 text-slate-700">
                <CalendarIcon className="w-4 h-4 text-indigo-600" />
                <span className="font-bold">{app.date}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span className="font-bold">{app.time}</span>
              </div>
            </div>

            {app.notes && (
              <p className="text-xs text-slate-600 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50 italic">
                "{app.notes}"
              </p>
            )}

            <div className="pt-2 flex items-center space-x-2">
              <button className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all text-center">
                Join Telehealth Link
              </button>
              <button className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                Reschedule
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
