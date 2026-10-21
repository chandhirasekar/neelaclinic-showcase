export type CategoryType = 'skin' | 'hair';

export interface ConcernItem {
  id: string;
  name: string;
  description?: string;
  recommendedTreatments?: string[];
  beforeImage?: string;
  afterImage?: string;
  useIllustration?: boolean;
}

export interface Treatment {
  id: string;
  name: string;
  category: CategoryType;
  doctorNote?: string;
  concerns: ConcernItem[];
  order?: number;
  badge?: string;
  isGuide?: boolean;
}

export interface ConsultationNote {
  _id?: string;
  id?: string;
  patientName: string;
  patientPhone?: string;
  category: CategoryType;
  treatmentName: string;
  concernName: string;
  doctorNotes?: string;
  createdAt: string;
}

export interface ClinicSettings {
  name: string;
  tagline: string;
  disclaimer: string;
  phone?: string;
}
