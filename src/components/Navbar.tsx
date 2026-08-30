import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useHealth } from '../context/HealthContext';
import { 
  Heart, 
  Bell, 
  PlusCircle, 
  FileText, 
  UserCheck, 
  Stethoscope, 
  X,
  AlertTriangle,
  Sparkles,
  LogOut,
  KeyRound
} from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const { user, role, setRole, logout, isAuthenticated } = useAuth();
  const { alerts, markAlertAsRead, openVitalsModal, openReportModal } = useHealth();
  const [showAlertsDropdown, setShowAlertsDropdown] = useState(false);

  const unreadAlerts = alerts.filter(a => !a.read);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-teal-500 flex items-center justify-center shadow-md shadow-primary-500/20 text-white font-bold text-xl">
              <Heart className="w-6 h-6 fill-white text-primary-600 animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                CareMate
                <span className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-semibold border border-teal-200 flex items-center gap-1">
                  <KeyRound className="w-3 h-3 text-teal-600" /> JWT Auth
                </span>
              </span>
              <p className="text-xs text-slate-500 hidden sm:block">Chronic Care & Remote Monitoring</p>
            </div>
          </div>

          {/* Role Switcher Pill */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setRole('patient')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                role === 'patient'
                  ? 'bg-white text-primary-700 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Patient View</span>
            </button>

            <button
              onClick={() => setRole('doctor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                role === 'doctor'
                  ? 'bg-white text-teal-700 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Doctor View</span>
            </button>
          </div>

          {/* Quick Actions & User Profile */}
          <div className="flex items-center space-x-3">
            {role === 'patient' && (
              <>
                <button
                  onClick={openVitalsModal}
                  className="hidden md:flex items-center space-x-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-md shadow-primary-500/20 transition-all hover:scale-[1.02]"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Log Vitals</span>
                </button>

                <button
                  onClick={openReportModal}
                  className="hidden md:flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 transition-all"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Report</span>
                </button>
              </>
            )}

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowAlertsDropdown(!showAlertsDropdown)}
                className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadAlerts.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadAlerts.length}
                  </span>
                )}
              </button>

              {showAlertsDropdown && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-slide-up">
                  <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-primary-600" />
                      <span className="font-semibold text-sm text-slate-800">Health Alerts & Triage</span>
                    </div>
                    <button
                      onClick={() => setShowAlertsDropdown(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {alerts.length === 0 ? (
                      <p className="p-4 text-xs text-slate-500 text-center">No alerts at this time.</p>
                    ) : (
                      alerts.map(alert => (
                        <div
                          key={alert.id}
                          onClick={() => markAlertAsRead(alert.id)}
                          className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition-colors ${
                            !alert.read ? 'bg-amber-50/50' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-2.5">
                            <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${
                              alert.severity === 'critical' ? 'text-red-600' :
                              alert.severity === 'high' ? 'text-amber-600' : 'text-blue-500'
                            }`} />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-800">{alert.type}</span>
                                <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                              </div>
                              <p className="text-slate-600 mt-0.5 leading-relaxed">{alert.message}</p>
                              <span className="text-[10px] text-slate-500 mt-1 block">Patient: {alert.patientName}</span>
                            </div>
                            {!alert.read && (
                              <span className="w-2 h-2 rounded-full bg-primary-600 shrink-0 mt-1"></span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Avatar Profile & Auth Action */}
            {user ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-primary-500 shadow-sm"
                />
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold text-slate-800 leading-tight">{user.name}</p>
                  <p className="text-[10px] font-medium text-teal-700 capitalize">JWT Authenticated</p>
                </div>
                <button
                  onClick={onOpenAuth}
                  title="Switch User / Auth Portal"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 rounded-xl bg-primary-600 text-white font-bold text-xs hover:bg-primary-700 transition-all shadow-sm"
              >
                Sign In
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
