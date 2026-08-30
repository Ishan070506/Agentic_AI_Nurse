import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Activity, 
  Pill, 
  Calendar, 
  Bot, 
  Users, 
  Settings,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { role } = useAuth();

  const patientNavItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'vitals', label: 'Vitals & Analytics', icon: Activity },
    { id: 'chat', label: 'AI Nurse Chat', icon: Bot, badge: 'Agent' },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'settings', label: 'Profile & Settings', icon: Settings },
  ];

  const doctorNavItems = [
    { id: 'doctor-dashboard', label: 'Patients Triage', icon: Users, badge: '4 Patients' },
    { id: 'vitals', label: 'Vitals Analytics', icon: Activity },
    { id: 'chat', label: 'Patient Chat', icon: Bot },
    { id: 'appointments', label: 'Clinical Calendar', icon: Calendar },
    { id: 'settings', label: 'Clinic Settings', icon: Settings },
  ];

  const navItems = role === 'doctor' ? doctorNavItems : patientNavItems;

  return (
    <aside className="w-64 shrink-0 hidden md:block bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-6">

        {/* Role Banner */}
        <div className={`p-3 rounded-xl border flex items-center space-x-3 ${
          role === 'doctor' 
            ? 'bg-teal-50 border-teal-200 text-teal-800' 
            : 'bg-primary-50 border-primary-200 text-primary-800'
        }`}>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white ${
            role === 'doctor' ? 'bg-teal-600' : 'bg-primary-600'
          }`}>
            {role === 'doctor' ? <Stethoscope className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
          </div>
          <div>
            <p className="text-xs font-bold capitalize">{role} Portal</p>
            <p className="text-[10px] opacity-80">
              {role === 'doctor' ? 'Clinical Triage & Notes' : 'Personal Care & AI Nurse'}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* AI Agent Quick Status Box */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Agentic AI Active</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Continuous vitals monitoring & abnormal trend detection is online.
          </p>
          <button
            onClick={() => setActiveTab('chat')}
            className="w-full text-center py-1.5 bg-primary-600 hover:bg-primary-500 rounded-lg text-xs font-bold text-white transition-colors"
          >
            Consult AI Nurse
          </button>
        </div>

      </div>
    </aside>
  );
};
