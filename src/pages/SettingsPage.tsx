import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Phone, Mail, ShieldCheck, Bell, Heart, Stethoscope, Lock } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, role } = useAuth();

  return (
    <div className="space-y-6 pb-12">
      
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
        <img
          src={user?.avatar}
          alt={user?.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-primary-500 shadow-md"
        />
        <div>
          <h1 className="text-xl font-bold text-slate-900">{user?.name}</h1>
          <p className="text-xs text-slate-500 capitalize">{role} Account • {user?.email}</p>
          <span className="inline-block text-[10px] font-bold text-primary-700 bg-primary-50 border border-primary-200 px-2.5 py-0.5 rounded-full mt-1">
            HIPAA Compliant Data Encryption Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Medical Profile Info */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            Chronic Condition & Demographics
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Diagnosed Condition</span>
              <span className="font-bold text-slate-900">{user?.condition || 'Type 2 Diabetes & HTN'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Age / Gender</span>
              <span className="font-bold text-slate-900">{user?.age || 62} Years / {user?.gender || 'Male'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Primary Physician</span>
              <span className="font-bold text-slate-900">{user?.primaryDoctor || 'Dr. Sarah Jenkins'}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Emergency Phone</span>
              <span className="font-bold text-slate-900">{user?.phone || '+1 (555) 234-5678'}</span>
            </div>
          </div>
        </div>

        {/* System & Notification Settings */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary-600" />
            AI Agent & Alert Preferences
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <span className="font-bold text-slate-800 block">Real-time Vitals Anomaly Alert</span>
                <span className="text-[10px] text-slate-500">Push notification when BP &gt; 140/90</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 rounded" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <span className="font-bold text-slate-800 block">Medication Reminders</span>
                <span className="text-[10px] text-slate-500">Alert 15 mins prior to dosage time</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 rounded" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <span className="font-bold text-slate-800 block">Doctor Telehealth Invites</span>
                <span className="text-[10px] text-slate-500">SMS & Email appointment reminders</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 rounded" />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
