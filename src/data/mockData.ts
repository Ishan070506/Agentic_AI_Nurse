import { Patient, VitalRecord, Medication, Appointment, ChatMessage, HealthAlert } from '../types';

export const initialPatients: Patient[] = [
  {
    id: 'p1',
    name: 'Robert Vance',
    age: 62,
    gender: 'Male',
    condition: 'Type 2 Diabetes & Hypertension',
    bp: '142/92',
    glucose: 168,
    heartRate: 78,
    spo2: 97,
    lastUpdated: '10 mins ago',
    riskLevel: 'attention',
    assignedDoctor: 'Dr. Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    notes: 'Morning glucose elevated. Recommended reducing carb intake at dinner.'
  },
  {
    id: 'p2',
    name: 'Eleanor Vance',
    age: 58,
    gender: 'Female',
    condition: 'Congestive Heart Failure',
    bp: '158/102',
    glucose: 135,
    heartRate: 92,
    spo2: 93,
    lastUpdated: '2 hours ago',
    riskLevel: 'critical',
    assignedDoctor: 'Dr. Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    notes: 'Fluid retention symptoms reported. BP persistently elevated.'
  },
  {
    id: 'p3',
    name: 'Marcus Brody',
    age: 45,
    gender: 'Male',
    condition: 'Stage 1 Hypertension',
    bp: '124/82',
    glucose: 98,
    heartRate: 68,
    spo2: 99,
    lastUpdated: 'Yesterday',
    riskLevel: 'stable',
    assignedDoctor: 'Dr. Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    notes: 'Responding well to Lisinopril and daily walks.'
  },
  {
    id: 'p4',
    name: 'Sophia Patel',
    age: 39,
    gender: 'Female',
    condition: 'Gestational Diabetes',
    bp: '118/76',
    glucose: 112,
    heartRate: 74,
    spo2: 98,
    lastUpdated: '5 hours ago',
    riskLevel: 'stable',
    assignedDoctor: 'Dr. Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    notes: 'Post-prandial glucose stable within target limits.'
  }
];

export const initialVitalsHistory: VitalRecord[] = [
  {
    id: 'v1',
    date: '2026-08-30',
    timestamp: '08:30 AM',
    systolic: 142,
    diastolic: 92,
    glucose: 168,
    heartRate: 78,
    spo2: 97,
    temperature: 98.6,
    status: 'warning',
    notes: 'Fasting glucose slightly high after dinner dessert.'
  },
  {
    id: 'v2',
    date: '2026-08-29',
    timestamp: '08:15 AM',
    systolic: 138,
    diastolic: 88,
    glucose: 145,
    heartRate: 76,
    spo2: 98,
    temperature: 98.4,
    status: 'warning',
    notes: 'Took morning medication as prescribed.'
  },
  {
    id: 'v3',
    date: '2026-08-28',
    timestamp: '08:45 AM',
    systolic: 126,
    diastolic: 82,
    glucose: 118,
    heartRate: 72,
    spo2: 99,
    temperature: 98.6,
    status: 'normal',
    notes: 'Felt energetic after morning walk.'
  },
  {
    id: 'v4',
    date: '2026-08-27',
    timestamp: '09:00 AM',
    systolic: 130,
    diastolic: 84,
    glucose: 128,
    heartRate: 74,
    spo2: 98,
    temperature: 98.5,
    status: 'normal',
    notes: 'Vitals stable.'
  },
  {
    id: 'v5',
    date: '2026-08-26',
    timestamp: '08:20 AM',
    systolic: 145,
    diastolic: 94,
    glucose: 172,
    heartRate: 82,
    spo2: 96,
    temperature: 98.8,
    status: 'warning',
    notes: 'Mild headache in the morning.'
  },
  {
    id: 'v6',
    date: '2026-08-25',
    timestamp: '08:10 AM',
    systolic: 124,
    diastolic: 80,
    glucose: 115,
    heartRate: 70,
    spo2: 99,
    temperature: 98.2,
    status: 'normal',
    notes: 'Great sleep quality.'
  },
  {
    id: 'v7',
    date: '2026-08-24',
    timestamp: '08:35 AM',
    systolic: 122,
    diastolic: 78,
    glucose: 110,
    heartRate: 68,
    spo2: 99,
    temperature: 98.4,
    status: 'normal',
    notes: 'Normal readings.'
  }
];

export const initialMedications: Medication[] = [
  {
    id: 'm1',
    name: 'Metformin Hydrochloride',
    dosage: '500 mg',
    frequency: 'Twice daily with meals',
    time: '08:00 AM',
    taken: true,
    instructions: 'Take after breakfast and dinner to manage blood sugar level.',
    remainingDays: 14
  },
  {
    id: 'm2',
    name: 'Lisinopril',
    dosage: '10 mg',
    frequency: 'Once daily (Morning)',
    time: '08:30 AM',
    taken: true,
    instructions: 'Take in morning for blood pressure control.',
    remainingDays: 22
  },
  {
    id: 'm3',
    name: 'Atorvastatin',
    dosage: '20 mg',
    frequency: 'Once daily (Bedtime)',
    time: '09:30 PM',
    taken: false,
    instructions: 'Take before sleep for lipid management.',
    remainingDays: 18
  },
  {
    id: 'm4',
    name: 'Glipizide',
    dosage: '5 mg',
    frequency: 'Once daily (Before Breakfast)',
    time: '07:45 AM',
    taken: true,
    instructions: 'Take 30 minutes before first meal of day.',
    remainingDays: 9
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    patientName: 'Robert Vance',
    doctorName: 'Dr. Sarah Jenkins',
    date: '2026-09-02',
    time: '10:30 AM',
    type: 'Virtual Consultation',
    status: 'upcoming',
    notes: 'Quarterly chronic care review for BP and HbA1c trajectory.'
  },
  {
    id: 'a2',
    patientId: 'p1',
    patientName: 'Robert Vance',
    doctorName: 'Dr. Sarah Jenkins',
    date: '2026-09-15',
    time: '02:00 PM',
    type: 'In-Person Checkup',
    status: 'upcoming',
    notes: 'Routine blood panel lab review and physical examination.'
  },
  {
    id: 'a3',
    patientId: 'p2',
    patientName: 'Eleanor Vance',
    doctorName: 'Dr. Sarah Jenkins',
    date: '2026-08-31',
    time: '11:15 AM',
    type: 'AI Triage Review',
    status: 'upcoming',
    notes: 'Follow-up on elevated systolic blood pressure readings.'
  }
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'c1',
    sender: 'ai',
    text: "Good morning, Robert! I am CareMate AI, your dedicated agentic nurse assistant. I noticed your morning glucose reading was 168 mg/dL and your blood pressure was 142/92 mmHg. How are you feeling right now?",
    timestamp: '08:32 AM',
    category: 'vital_analysis',
    recommendedAction: 'Log Symptoms or Request Advice'
  },
  {
    id: 'c2',
    sender: 'user',
    text: "I have a slight headache around my temples and felt a bit sluggish this morning.",
    timestamp: '08:35 AM',
    category: 'general'
  },
  {
    id: 'c3',
    sender: 'ai',
    text: "Thank you for sharing. Mild headaches can be connected to elevated blood pressure (142/92). Please ensure you drink a large glass of water and take your prescribed Lisinopril 10mg. I have updated Dr. Sarah Jenkins with a flag so she can review your trends. Would you like me to schedule a quick 10-minute telehealth check-in for tomorrow?",
    timestamp: '08:36 AM',
    category: 'triage',
    recommendedAction: 'Schedule Telehealth Checkup'
  }
];

export const initialAlerts: HealthAlert[] = [
  {
    id: 'alt1',
    patientId: 'p2',
    patientName: 'Eleanor Vance',
    type: 'High Blood Pressure',
    severity: 'critical',
    timestamp: '2 hours ago',
    read: false,
    message: 'Systolic blood pressure reached 158 mmHg. Immediate medical review suggested.'
  },
  {
    id: 'alt2',
    patientId: 'p1',
    patientName: 'Robert Vance',
    type: 'Elevated Glucose',
    severity: 'medium',
    timestamp: '10 mins ago',
    read: false,
    message: 'Fasting glucose recorded at 168 mg/dL (Target < 130 mg/dL).'
  },
  {
    id: 'alt3',
    patientId: 'p1',
    patientName: 'Robert Vance',
    type: 'Missed Medication',
    severity: 'low',
    timestamp: 'Yesterday',
    read: true,
    message: 'Atorvastatin bedtime dose logged 45 mins late.'
  }
];
