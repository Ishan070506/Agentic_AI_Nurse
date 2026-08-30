import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HealthProvider } from './context/HealthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { VitalsFormModal } from './components/VitalsFormModal';
import { HealthReportModal } from './components/HealthReportModal';
import { AppointmentModal } from './components/AppointmentModal';

import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { PatientDashboard } from './pages/PatientDashboard';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { VitalsPage } from './pages/VitalsPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { MedicationsPage } from './pages/MedicationsPage';
import { ChatPage } from './pages/ChatPage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { role, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [currentView, setCurrentView] = useState<'app' | 'landing' | 'auth'>('app');

  if (currentView === 'auth' || !isAuthenticated) {
    return <AuthPage onSuccess={() => setCurrentView('app')} />;
  }

  if (currentView === 'landing') {
    return <LandingPage onGetStarted={() => setCurrentView('app')} />;
  }

  const renderTabContent = () => {
    if (role === 'doctor' && (activeTab === 'dashboard' || activeTab === 'doctor-dashboard')) {
      return <DoctorDashboard setActiveTab={setActiveTab} />;
    }

    switch (activeTab) {
      case 'dashboard':
      case 'patient-dashboard':
        return <PatientDashboard setActiveTab={setActiveTab} />;
      case 'doctor-dashboard':
        return <DoctorDashboard setActiveTab={setActiveTab} />;
      case 'vitals':
        return <VitalsPage />;
      case 'appointments':
        return <AppointmentsPage />;
      case 'medications':
        return <MedicationsPage />;
      case 'chat':
        return <ChatPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return role === 'doctor' ? (
          <DoctorDashboard setActiveTab={setActiveTab} />
        ) : (
          <PatientDashboard setActiveTab={setActiveTab} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
      <Navbar onOpenAuth={() => setCurrentView('auth')} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 min-w-0 md:pl-6">
          {renderTabContent()}
        </main>
      </div>

      {/* Global Action Modals */}
      <VitalsFormModal />
      <HealthReportModal />
      <AppointmentModal />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <HealthProvider>
        <AppContent />
      </HealthProvider>
    </AuthProvider>
  );
}

export default App;
