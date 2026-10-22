import mongoose, { Schema, Document, Model } from 'mongoose';
import {
  Treatment as ITreatment,
  ConcernItem as IConcernItem,
  TreatmentVariant as ITreatmentVariant,
  ClinicalCase as IClinicalCase,
  VariantSpecification as IVariantSpecification
} from '@/types';

export interface TreatmentDocument extends Omit<ITreatment, 'id'>, Document {
  id: string;
}

const ConcernItemSchema = new Schema<IConcernItem>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  recommendedTreatments: [{ type: String }],
  beforeImage: { type: String },
  afterImage: { type: String },
  useIllustration: { type: Boolean, default: true },
}, { _id: false });

const VariantSpecificationSchema = new Schema<IVariantSpecification>({
  label: { type: String, required: true },
  value: { type: String, required: true },
}, { _id: false });

const TreatmentVariantSchema = new Schema<ITreatmentVariant>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  code: { type: String },
  tagline: { type: String },
  methodology: { type: String },
  sessions: { type: String },
  duration: { type: String },
  downtime: { type: String },
  badge: { type: String },
  recommendedFor: [{ type: String }],
  specifications: [VariantSpecificationSchema],
  inclusions: [{ type: String }],
  clinicalHighlights: [{ type: String }],
  doctorVerdict: { type: String }
}, { _id: false });

const ClinicalCaseSchema = new Schema<IClinicalCase>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  patientProfile: { type: String },
  timeline: { type: String },
  concernName: { type: String },
  beforeImage: { type: String },
  afterImage: { type: String },
  metrics: [VariantSpecificationSchema],
  doctorNote: { type: String }
}, { _id: false });

const TreatmentSchema = new Schema<TreatmentDocument>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, enum: ['skin', 'hair'], required: true },
  doctorNote: { type: String },
  badge: { type: String },
  isGuide: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  code: { type: String },
  protocolSummary: { type: String },
  downtimeSummary: { type: String },
  sessionsSummary: { type: String },
  invasiveness: { type: String, enum: ['Non-Invasive', 'Minimally Invasive', 'Surgical'] },
  concerns: [ConcernItemSchema],
  variants: [TreatmentVariantSchema],
  cases: [ClinicalCaseSchema]
}, {
  timestamps: true,
  toJSON: {
    transform(_doc, ret) {
      delete (ret as any)._id;
      delete (ret as any).__v;
      return ret;
    }
  }
});

export const TreatmentModel: Model<TreatmentDocument> =
  mongoose.models.Treatment || mongoose.model<TreatmentDocument>('Treatment', TreatmentSchema);
