import crypto from 'crypto';
import { connectToDatabase } from '@/lib/db';
import { UserModel, hashPassword, verifyPassword, UserDocument } from '@/lib/models/User';
import { User, UserRole } from '@/types';

const AUTH_SECRET = process.env.AUTH_SECRET || 'nila-clinic-tablet-secret-session-key-2026';

export const INITIAL_USERS = [
  {
    name: 'Dr. Nila (Attending Dermatologist)',
    username: 'doctor',
    password: 'doctor123',
    role: 'doctor' as UserRole,
  },
  {
    name: 'Clinical Reception Staff',
    username: 'staff',
    password: 'staff123',
    role: 'staff' as UserRole,
  },
  {
    name: 'Clinic Director (Admin)',
    username: 'admin',
    password: 'admin123',
    role: 'admin' as UserRole,
  }
];

export async function seedInitialUsers(): Promise<number> {
  const conn = await connectToDatabase();
  if (!conn) return 0;

  try {
    const count = await UserModel.countDocuments();
    if (count > 0) return count;

    for (const u of INITIAL_USERS) {
      await UserModel.create({
        name: u.name,
        username: u.username.toLowerCase(),
        passwordHash: hashPassword(u.password),
        role: u.role,
        active: true,
      });
    }
    return INITIAL_USERS.length;
  } catch (err) {
    console.error('Failed to seed initial users:', err);
    return 0;
  }
}

export async function authenticateUser(
  username: string,
  pass: string
): Promise<User | null> {
  await connectToDatabase();
  await seedInitialUsers();

  const user = await UserModel.findOne({
    username: username.trim().toLowerCase(),
    active: true,
  });

  if (!user) {
    return null;
  }

  const isMatch = verifyPassword(pass, user.passwordHash);
  if (!isMatch) {
    return null;
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  return {
    id: user._id.toString(),
    name: user.name,
    username: user.username,
    role: user.role,
    active: user.active,
    lastLogin: user.lastLogin.toISOString(),
  };
}

// -------------------------------------------------------------
// Secure Session Token Creation & Verification (HMAC-SHA256)
// -------------------------------------------------------------
export interface SessionPayload {
  userId: string;
  username: string;
  name: string;
  role: UserRole;
  exp: number;
}

export function createSessionToken(user: User, durationHours = 24): string {
  const payload: SessionPayload = {
    userId: user.id || user._id || '',
    username: user.username,
    name: user.name,
    role: user.role,
    exp: Date.now() + durationHours * 3600 * 1000,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    if (!token || !token.includes('.')) return null;
    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) return null;

    const expectedSig = crypto
      .createHmac('sha256', AUTH_SECRET)
      .update(payloadB64)
      .digest('base64url');

    if (signature !== expectedSig) return null;

    const json = Buffer.from(payloadB64, 'base64url').toString('utf8');
    const payload: SessionPayload = JSON.parse(json);

    if (Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch (err) {
    return null;
  }
}

// -------------------------------------------------------------
// Dynamic User Management (CRUD for Admin portal)
// -------------------------------------------------------------
export async function getAllUsers(): Promise<User[]> {
  await connectToDatabase();
  await seedInitialUsers();

  const docs = await UserModel.find({}).sort({ createdAt: -1 }).lean();
  return docs.map((d: any) => ({
    id: d._id?.toString(),
    name: d.name,
    username: d.username,
    role: d.role as UserRole,
    active: d.active,
    lastLogin: d.lastLogin ? new Date(d.lastLogin).toISOString() : undefined,
    createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : undefined,
  }));
}

export async function createUser(data: {
  name: string;
  username: string;
  password: string;
  role: UserRole;
}): Promise<User> {
  await connectToDatabase();

  const existing = await UserModel.findOne({ username: data.username.toLowerCase().trim() });
  if (existing) {
    throw new Error('A user with this username already exists');
  }

  const doc = await UserModel.create({
    name: data.name.trim(),
    username: data.username.toLowerCase().trim(),
    passwordHash: hashPassword(data.password),
    role: data.role,
    active: true,
  });

  return {
    id: doc._id.toString(),
    name: doc.name,
    username: doc.username,
    role: doc.role,
    active: doc.active,
    createdAt: doc.createdAt.toISOString(),
  };
}

export async function deleteUser(id: string): Promise<boolean> {
  await connectToDatabase();
  const res = await UserModel.findByIdAndDelete(id);
  return Boolean(res);
}

export async function toggleUserActive(id: string): Promise<User | null> {
  await connectToDatabase();
  const user = await UserModel.findById(id);
  if (!user) return null;

  user.active = !user.active;
  await user.save();

  return {
    id: user._id.toString(),
    name: user.name,
    username: user.username,
    role: user.role,
    active: user.active,
  };
}
