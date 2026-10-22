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

export interface VariantSpecification {
  label: string;
  value: string;
}

export interface TreatmentVariant {
  id: string;
  name: string;
  code?: string;
  tagline: string;
  methodology: string;
  sessions: string;
  duration: string;
  downtime: string;
  badge?: string;
  recommendedFor: string[];
  specifications: VariantSpecification[];
  inclusions: string[];
  clinicalHighlights: string[];
  doctorVerdict?: string;
}

export interface ClinicalCase {
  id: string;
  title: string;
  patientProfile?: string;
  timeline: string;
  concernName: string;
  beforeImage: string;
  afterImage: string;
  metrics: { label: string; value: string }[];
  doctorNote?: string;
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
  code?: string;
  variants?: TreatmentVariant[];
  cases?: ClinicalCase[];
  protocolSummary?: string;
  downtimeSummary?: string;
  sessionsSummary?: string;
  invasiveness?: 'Non-Invasive' | 'Minimally Invasive' | 'Surgical';
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
