export type UserRole = 'patient' | 'doctor' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  age?: number;
  gender?: string;
  condition?: string;
  primaryDoctor?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  bp: string;
  glucose: number;
  heartRate: number;
  spo2: number;
  lastUpdated: string;
  riskLevel: 'stable' | 'attention' | 'critical';
  assignedDoctor: string;
  avatar: string;
  notes?: string;
}

export interface VitalRecord {
  id: string;
  date: string;
  timestamp: string;
  systolic: number;
  diastolic: number;
  glucose: number;
  heartRate: number;
  spo2: number;
  temperature: number;
  notes?: string;
  status: 'normal' | 'warning' | 'critical';
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  taken: boolean;
  instructions: string;
  remainingDays: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'Virtual Consultation' | 'In-Person Checkup' | 'Routine Follow-up' | 'AI Triage Review';
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'doctor';
  text: string;
  timestamp: string;
  category?: 'general' | 'vital_analysis' | 'triage' | 'medication';
  recommendedAction?: string;
}

export interface HealthAlert {
  id: string;
  patientId: string;
  patientName: string;
  type: 'High Blood Pressure' | 'Elevated Glucose' | 'Low SpO2' | 'Missed Medication' | 'Symptom Flag';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  read: boolean;
  message: string;
}

export interface CarePlan {
  id: string;
  patientId: string;
  goals: string[];
  dietaryNotes: string;
  exerciseTarget: string;
  vitalsFrequency: string;
  nextReviewDate: string;
}
