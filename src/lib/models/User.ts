import mongoose, { Schema, Document, Model } from 'mongoose';
import crypto from 'crypto';
import { UserRole } from '@/types';

export interface UserDocument extends Document {
  name: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  active: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) return false;
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch (err) {
    return false;
  }
}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['doctor', 'staff', 'admin'], default: 'doctor', required: true },
  active: { type: Boolean, default: true },
  lastLogin: { type: Date },
}, {
  timestamps: true,
  toJSON: {
    transform(_doc, ret) {
      (ret as any).id = (ret as any)._id?.toString();
      delete (ret as any).passwordHash;
      delete (ret as any)._id;
      delete (ret as any).__v;
      return ret;
    }
  }
});

export const UserModel: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);
