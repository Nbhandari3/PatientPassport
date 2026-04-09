export type Tab = 'dashboard' | 'lab-interpreter' | 'risk-prediction' | 'emergency-qr' | 'doctor-hub' | 'share-records' | 'ai-recommendations';

export interface PatientProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  bloodType: string;
  allergies: string[];
  medications: string[];
  chronicConditions: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  lifestyle: string;
}
