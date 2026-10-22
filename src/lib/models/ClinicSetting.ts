import mongoose, { Schema, Document, Model } from 'mongoose';
import { ClinicSettings as IClinicSettings } from '@/types';

export interface ClinicSettingDocument extends IClinicSettings, Document {}

const ClinicSettingSchema = new Schema<ClinicSettingDocument>({
  name: { type: String, required: true, default: 'Nila Clinic' },
  tagline: { type: String, default: 'Skin & Hair Care' },
  disclaimer: {
    type: String,
    default: 'Results vary from person to person. Every person’s skin and hair is different, so your doctor will plan your treatment and timeline after a consultation.'
  },
  phone: { type: String, default: '+91 81222 64556' },
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

export const ClinicSettingModel: Model<ClinicSettingDocument> =
  mongoose.models.ClinicSetting || mongoose.model<ClinicSettingDocument>('ClinicSetting', ClinicSettingSchema);
