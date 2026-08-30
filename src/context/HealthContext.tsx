import React, { createContext, useContext, useState } from 'react';
import { VitalRecord, Medication, Appointment, ChatMessage, HealthAlert, Patient } from '../types';
import { initialPatients, initialVitalsHistory, initialMedications, initialAppointments, initialChatMessages, initialAlerts } from '../data/mockData';

interface HealthContextType {
  patients: Patient[];
  vitalsHistory: VitalRecord[];
  medications: Medication[];
  appointments: Appointment[];
  chatMessages: ChatMessage[];
  alerts: HealthAlert[];
  isVitalsModalOpen: boolean;
  isReportModalOpen: boolean;
  isAppointmentModalOpen: boolean;
  openVitalsModal: () => void;
  closeVitalsModal: () => void;
  openReportModal: () => void;
  closeReportModal: () => void;
  openAppointmentModal: () => void;
  closeAppointmentModal: () => void;
  addVitalRecord: (record: Omit<VitalRecord, 'id'>) => void;
  toggleMedication: (id: string) => void;
  addMedication: (med: Omit<Medication, 'id'>) => void;
  addAppointment: (app: Omit<Appointment, 'id' | 'patientId' | 'patientName'>) => void;
  sendChatMessage: (text: string, sender?: 'user' | 'ai' | 'doctor') => void;
  markAlertAsRead: (id: string) => void;
  clearAllAlerts: () => void;
  updatePatientNotes: (patientId: string, notes: string) => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [vitalsHistory, setVitalsHistory] = useState<VitalRecord[]>(initialVitalsHistory);
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [alerts, setAlerts] = useState<HealthAlert[]>(initialAlerts);

  const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const openVitalsModal = () => setIsVitalsModalOpen(true);
  const closeVitalsModal = () => setIsVitalsModalOpen(false);
  const openReportModal = () => setIsReportModalOpen(true);
  const closeReportModal = () => setIsReportModalOpen(false);
  const openAppointmentModal = () => setIsAppointmentModalOpen(true);
  const closeAppointmentModal = () => setIsAppointmentModalOpen(false);

  const addVitalRecord = (record: Omit<VitalRecord, 'id'>) => {
    const newRecord: VitalRecord = {
      ...record,
      id: `v-${Date.now()}`
    };

    setVitalsHistory(prev => [newRecord, ...prev]);

    // Check for alerts
    if (record.systolic >= 140 || record.diastolic >= 90) {
      const newAlert: HealthAlert = {
        id: `alt-${Date.now()}`,
        patientId: 'p1',
        patientName: 'Robert Vance',
        type: 'High Blood Pressure',
        severity: record.systolic >= 160 ? 'critical' : 'high',
        timestamp: 'Just now',
        read: false,
        message: `High BP recorded: ${record.systolic}/${record.diastolic} mmHg.`
      };
      setAlerts(prev => [newAlert, ...prev]);
    }

    if (record.glucose >= 160) {
      const newAlert: HealthAlert = {
        id: `alt-${Date.now() + 1}`,
        patientId: 'p1',
        patientName: 'Robert Vance',
        type: 'Elevated Glucose',
        severity: record.glucose >= 200 ? 'critical' : 'medium',
        timestamp: 'Just now',
        read: false,
        message: `Elevated Glucose level recorded: ${record.glucose} mg/dL.`
      };
      setAlerts(prev => [newAlert, ...prev]);
    }

    // Auto-generate AI nurse response in chat
    setTimeout(() => {
      let aiResponse = `I have received your vitals for ${record.date} at ${record.timestamp}. `;
      if (record.status === 'normal') {
        aiResponse += `Everything looks optimal! BP ${record.systolic}/${record.diastolic} mmHg, Glucose ${record.glucose} mg/dL, and Heart Rate ${record.heartRate} bpm are all within your target ranges. Great job staying consistent with your health routine!`;
      } else if (record.status === 'warning') {
        aiResponse += `Note: Your BP (${record.systolic}/${record.diastolic}) or Glucose (${record.glucose} mg/dL) shows a slight elevation. Please stay hydrated, take prescribed medications, and re-check in 2 hours. I have logged this for Dr. Sarah Jenkins.`;
      } else {
        aiResponse += `⚠️ Alert: Your reading indicates critical elevation (${record.systolic}/${record.diastolic} mmHg). Please rest, sit upright, and contact emergency services if you experience chest pain or severe shortness of breath. Dr. Sarah Jenkins has been notified automatically.`;
      }

      sendChatMessage(aiResponse, 'ai');
    }, 1000);
  };

  const toggleMedication = (id: string) => {
    setMedications(prev =>
      prev.map(m => (m.id === id ? { ...m, taken: !m.taken } : m))
    );
  };

  const addMedication = (med: Omit<Medication, 'id'>) => {
    const newMed: Medication = {
      ...med,
      id: `m-${Date.now()}`
    };
    setMedications(prev => [...prev, newMed]);
  };

  const addAppointment = (app: Omit<Appointment, 'id' | 'patientId' | 'patientName'>) => {
    const newApp: Appointment = {
      ...app,
      id: `app-${Date.now()}`,
      patientId: 'p1',
      patientName: 'Robert Vance'
    };
    setAppointments(prev => [...prev, newApp]);
  };

  const sendChatMessage = (text: string, sender: 'user' | 'ai' | 'doctor' = 'user') => {
    const newMessage: ChatMessage = {
      id: `c-${Date.now()}`,
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'general'
    };

    setChatMessages(prev => [...prev, newMessage]);

    // If sent by user, simulate AI Nurse intelligent reasoning
    if (sender === 'user') {
      setTimeout(() => {
        let reply = '';
        const lower = text.toLowerCase();

        if (lower.includes('bp') || lower.includes('blood pressure') || lower.includes('headache')) {
          reply = "I understand your concern about blood pressure. Based on your latest reading of 142/92 mmHg, mild pressure in the temples can be associated with slight hypertension. Remember to take your Lisinopril 10mg with breakfast and limit sodium intake today.";
        } else if (lower.includes('sugar') || lower.includes('glucose') || lower.includes('diabetes')) {
          reply = "Your glucose trend over the last 7 days averages 138 mg/dL. For your condition (Type 2 Diabetes), post-prandial targets are under 140 mg/dL. Staying hydrated and adding a light 15-minute walk after meals significantly aids insulin sensitivity.";
        } else if (lower.includes('doctor') || lower.includes('appointment')) {
          reply = "Dr. Sarah Jenkins is your assigned lead cardiologist/endocrinologist. You have an upcoming Virtual Consultation scheduled for Sep 02 at 10:30 AM. Would you like me to add custom prep notes for her to review?";
        } else {
          reply = "Thank you for reaching out to CareMate AI Nurse. I am continuously tracking your vitals, medication adherence, and doctor recommendations. Feel free to log your latest readings or ask any questions about your care plan!";
        }

        const aiMsg: ChatMessage = {
          id: `c-${Date.now() + 1}`,
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'vital_analysis',
          recommendedAction: 'View Vitals History'
        };
        setChatMessages(prev => [...prev, aiMsg]);
      }, 1200);
    }
  };

  const markAlertAsRead = (id: string) => {
    setAlerts(prev => prev.map(a => (a.id === id ? { ...a, read: true } : a)));
  };

  const clearAllAlerts = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  const updatePatientNotes = (patientId: string, notes: string) => {
    setPatients(prev => prev.map(p => (p.id === patientId ? { ...p, notes } : p)));
  };

  return (
    <HealthContext.Provider
      value={{
        patients,
        vitalsHistory,
        medications,
        appointments,
        chatMessages,
        alerts,
        isVitalsModalOpen,
        isReportModalOpen,
        isAppointmentModalOpen,
        openVitalsModal,
        closeVitalsModal,
        openReportModal,
        closeReportModal,
        openAppointmentModal,
        closeAppointmentModal,
        addVitalRecord,
        toggleMedication,
        addMedication,
        addAppointment,
        sendChatMessage,
        markAlertAsRead,
        clearAllAlerts,
        updatePatientNotes
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
