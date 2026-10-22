import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Connection URI from env or default Atlas replicaSet
const MONGODB_URI = process.env.MONGODB_URI || 
  'mongodb://chandhirasekar76_db_user:chandhirasekar%407620@ac-oewk9ja-shard-00-00.uwhh84c.mongodb.net:27017,ac-oewk9ja-shard-00-01.uwhh84c.mongodb.net:27017,ac-oewk9ja-shard-00-02.uwhh84c.mongodb.net:27017/Neelaclinic?ssl=true&replicaSet=atlas-sfvqm2-shard-0&authSource=admin';

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

// 1. Schemas
const ConcernItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  recommendedTreatments: [{ type: String }],
  beforeImage: { type: String },
  afterImage: { type: String },
  useIllustration: { type: Boolean, default: true },
}, { _id: false });

const VariantSpecificationSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
}, { _id: false });

const TreatmentVariantSchema = new mongoose.Schema({
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

const ClinicalCaseSchema = new mongoose.Schema({
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

const TreatmentSchema = new mongoose.Schema({
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
}, { timestamps: true });

const ConsultationSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientPhone: { type: String },
  category: { type: String, enum: ['skin', 'hair'], required: true },
  treatmentName: { type: String, required: true },
  concernName: { type: String, required: true },
  doctorNotes: { type: String },
}, { timestamps: true });

const ClinicSettingSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Nila Clinic' },
  tagline: { type: String, default: 'Skin & Hair Care' },
  disclaimer: { type: String, default: 'Results vary from person to person. Every person’s skin and hair is different, so your doctor will plan your treatment and timeline after a consultation.' },
  phone: { type: String, default: '+91 81222 64556' }
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['doctor', 'staff', 'admin'], default: 'doctor', required: true },
  active: { type: Boolean, default: true },
  lastLogin: { type: Date }
}, { timestamps: true });

const TreatmentModel = mongoose.models.Treatment || mongoose.model('Treatment', TreatmentSchema);
const ConsultationModel = mongoose.models.Consultation || mongoose.model('Consultation', ConsultationSchema);
const ClinicSettingModel = mongoose.models.ClinicSetting || mongoose.model('ClinicSetting', ClinicSettingSchema);
const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

// Initial consultations
const INITIAL_CONSULTATIONS = [
  {
    patientName: 'Kavitha Raman',
    patientPhone: '+91 98401 23456',
    category: 'skin',
    treatmentName: 'Q Switch Laser',
    concernName: 'Hyper pigmentation',
    doctorNotes: 'Advised sun protection SPF 50+. Consultation completed on tablet.'
  },
  {
    patientName: 'Rajesh Kumar',
    patientPhone: '+91 98412 87654',
    category: 'hair',
    treatmentName: 'PRP Hair Treatment',
    concernName: 'Thinning hair',
    doctorNotes: 'Completed initial scalp trichoscopy. Norwood Grade II. Recommended 3 PRP cycles with 4-week intervals.'
  },
  {
    patientName: 'Priya Sundaram',
    patientPhone: '+91 97908 12345',
    category: 'skin',
    treatmentName: 'Anti Acne Treatments',
    concernName: 'Reduces the acne scar',
    doctorNotes: 'Prescribed topical retinoid and scheduled session 1 chemical peel.'
  },
  {
    patientName: 'Ananya Nair',
    patientPhone: '+91 94440 56789',
    category: 'hair',
    treatmentName: 'Excell GFC',
    concernName: 'Reduces hair fall',
    doctorNotes: 'Started GFC session 1. High density follicle activation observed.'
  }
];

const CLINIC_SETTINGS = {
  name: 'Nila Clinic',
  tagline: 'Skin & Hair Care',
  disclaimer: 'Results vary from person to person. Every person’s skin and hair is different, so your doctor will plan your treatment and timeline after a consultation.',
  phone: '+91 81222 64556'
};

const INITIAL_USERS = [
  {
    name: 'Dr. Nila (Attending Dermatologist)',
    username: 'doctor',
    password: 'doctor123',
    role: 'doctor'
  },
  {
    name: 'Clinical Reception Staff',
    username: 'staff',
    password: 'staff123',
    role: 'staff'
  },
  {
    name: 'Clinic Director (Admin)',
    username: 'admin',
    password: 'admin123',
    role: 'admin'
  }
];

async function seed() {
  console.log('Connecting to MongoDB Atlas...');
  console.log('Target Database: Neelaclinic');

  await mongoose.connect(MONGODB_URI, {
    dbName: 'Neelaclinic',
  });
  console.log('Connected successfully to MongoDB Atlas!');

  // Check if we have local-treatments.json to import rich treatments with uploaded images
  const localTreatmentsPath = path.join(process.cwd(), 'src', 'data', 'local-treatments.json');
  let treatmentsToSeed = [];

  if (fs.existsSync(localTreatmentsPath)) {
    try {
      const data = fs.readFileSync(localTreatmentsPath, 'utf8');
      treatmentsToSeed = JSON.parse(data);
      console.log(`Loaded ${treatmentsToSeed.length} treatments from local-treatments.json (preserving uploaded photos)`);
    } catch (e) {
      console.warn('Failed reading local treatments, using defaults');
    }
  }

  // 1. Seed Treatments
  console.log('\n--- Seeding Treatments Collection ---');
  await TreatmentModel.deleteMany({});
  const insertedTreatments = await TreatmentModel.insertMany(treatmentsToSeed);
  console.log(`Successfully seeded ${insertedTreatments.length} treatments into Neelaclinic.treatments`);

  // 2. Seed Consultations
  console.log('\n--- Seeding Consultations Collection ---');
  await ConsultationModel.deleteMany({});
  const insertedConsultations = await ConsultationModel.insertMany(INITIAL_CONSULTATIONS);
  console.log(`Successfully seeded ${insertedConsultations.length} consultations into Neelaclinic.consultations`);

  // 3. Seed Clinic Settings
  console.log('\n--- Seeding Clinic Settings Collection ---');
  await ClinicSettingModel.deleteMany({});
  await ClinicSettingModel.create(CLINIC_SETTINGS);
  console.log('Successfully seeded clinic settings into Neelaclinic.clinicsettings');

  // 4. Seed Dynamic Users
  console.log('\n--- Seeding Authorized Users Collection ---');
  await UserModel.deleteMany({});
  for (const u of INITIAL_USERS) {
    await UserModel.create({
      name: u.name,
      username: u.username.toLowerCase(),
      passwordHash: hashPassword(u.password),
      role: u.role,
      active: true,
    });
  }
  console.log(`Successfully seeded ${INITIAL_USERS.length} authorized users (Doctor, Staff, Admin) into Neelaclinic.users`);

  // Verify counts
  const [tCount, cCount, sCount, uCount] = await Promise.all([
    TreatmentModel.countDocuments(),
    ConsultationModel.countDocuments(),
    ClinicSettingModel.countDocuments(),
    UserModel.countDocuments()
  ]);

  console.log('\n=== MONGODB ATLAS VERIFICATION ===');
  console.log(`Treatments in DB:    ${tCount}`);
  console.log(`Consultations in DB: ${cCount}`);
  console.log(`Settings in DB:      ${sCount}`);
  console.log(`Users in DB:         ${uCount}`);

  await mongoose.disconnect();
  console.log('\nDisconnected cleanly. All Mongoose collections created and populated successfully!');
}

seed().catch((err) => {
  console.error('Seeding failed with error:', err);
  process.exit(1);
});
