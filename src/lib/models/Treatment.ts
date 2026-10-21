import mongoose, { Schema, Document, Model } from 'mongoose';
import { Treatment as ITreatment, ConcernItem as IConcernItem } from '@/types';

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

const TreatmentSchema = new Schema<TreatmentDocument>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, enum: ['skin', 'hair'], required: true },
  doctorNote: { type: String },
  badge: { type: String },
  isGuide: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  concerns: [ConcernItemSchema],
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
