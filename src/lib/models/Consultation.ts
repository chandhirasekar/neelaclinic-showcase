import mongoose, { Schema, Document, Model } from 'mongoose';
import { ConsultationNote as IConsultationNote } from '@/types';

export interface ConsultationDocument extends Omit<IConsultationNote, '_id'>, Document {}

const ConsultationSchema = new Schema<ConsultationDocument>({
  patientName: { type: String, required: true },
  patientPhone: { type: String },
  category: { type: String, enum: ['skin', 'hair'], required: true },
  treatmentName: { type: String, required: true },
  concernName: { type: String, required: true },
  doctorNotes: { type: String },
}, {
  timestamps: true,
});

export const ConsultationModel: Model<ConsultationDocument> =
  mongoose.models.Consultation || mongoose.model<ConsultationDocument>('Consultation', ConsultationSchema);
