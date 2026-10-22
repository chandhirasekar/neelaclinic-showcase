import { Treatment, ConsultationNote, ClinicSettings } from '@/types';
import { INITIAL_TREATMENTS, CLINIC_SETTINGS } from '@/data/treatmentsData';
import { enrichTreatmentWithVariants } from '@/data/treatmentVariantsData';
import { connectToDatabase, isMongoConfigured, isMongoConnected } from '@/lib/db';
import { TreatmentModel } from '@/lib/models/Treatment';
import { ConsultationModel } from '@/lib/models/Consultation';
import { ClinicSettingModel } from '@/lib/models/ClinicSetting';
import fs from 'fs';
import path from 'path';

const LOCAL_STORE_PATH = path.join(process.cwd(), 'src', 'data', 'local-treatments.json');
const LOCAL_NOTES_PATH = path.join(process.cwd(), 'src', 'data', 'local-consultations.json');

const INITIAL_CONSULTATIONS: ConsultationNote[] = [
  {
    patientName: 'Kavitha Raman',
    patientPhone: '+91 98401 23456',
    category: 'skin',
    treatmentName: 'Q Switch Laser',
    concernName: 'Hyper pigmentation',
    doctorNotes: 'Advised sun protection SPF 50+. Consultation completed on tablet.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    patientName: 'Rajesh Kumar',
    patientPhone: '+91 98412 87654',
    category: 'hair',
    treatmentName: 'PRP Hair Treatment',
    concernName: 'Thinning hair',
    doctorNotes: 'Completed initial scalp trichoscopy. Norwood Grade II. Recommended 3 PRP cycles with 4-week intervals.',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    patientName: 'Priya Sundaram',
    patientPhone: '+91 97908 12345',
    category: 'skin',
    treatmentName: 'Anti Acne Treatments',
    concernName: 'Reduces the acne scar',
    doctorNotes: 'Prescribed topical retinoid and scheduled session 1 chemical peel.',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString()
  },
  {
    patientName: 'Ananya Nair',
    patientPhone: '+91 94440 56789',
    category: 'hair',
    treatmentName: 'Excell GFC',
    concernName: 'Reduces hair fall',
    doctorNotes: 'Started GFC session 1. High density follicle activation observed.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];

export function getFullEnrichedTreatments(): Treatment[] {
  // Read any customized local concerns/images first
  let localMap = new Map<string, Treatment>();
  try {
    if (fs.existsSync(LOCAL_STORE_PATH)) {
      const data = fs.readFileSync(LOCAL_STORE_PATH, 'utf-8');
      const parsed: Treatment[] = JSON.parse(data);
      parsed.forEach(t => localMap.set(t.id, t));
    }
  } catch (err) {
    console.warn('Could not read local treatments for seeding:', err);
  }

  return INITIAL_TREATMENTS.map((base) => {
    const enriched = enrichTreatmentWithVariants(base);
    const local = localMap.get(base.id);

    if (local && local.concerns && local.concerns.length > 0) {
      // Preserve any uploaded before/after photos or customized concern names
      const mergedConcerns = enriched.concerns.map((ec) => {
        const lc = local.concerns.find((c) => c.id === ec.id);
        if (lc) {
          return {
            ...ec,
            name: lc.name || ec.name,
            beforeImage: lc.beforeImage || ec.beforeImage,
            afterImage: lc.afterImage || ec.afterImage,
            useIllustration: lc.useIllustration !== undefined ? lc.useIllustration : ec.useIllustration,
            recommendedTreatments: lc.recommendedTreatments || ec.recommendedTreatments
          };
        }
        return ec;
      });

      return {
        ...enriched,
        name: local.name || enriched.name,
        doctorNote: local.doctorNote || enriched.doctorNote,
        badge: local.badge || enriched.badge,
        concerns: mergedConcerns
      };
    }

    return enriched;
  });
}

function getLocalTreatments(): Treatment[] {
  try {
    if (fs.existsSync(LOCAL_STORE_PATH)) {
      const data = fs.readFileSync(LOCAL_STORE_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading local treatments file:', err);
  }
  return getFullEnrichedTreatments();
}

function saveLocalTreatments(treatments: Treatment[]) {
  try {
    fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify(treatments, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local treatments file:', err);
  }
}

function getLocalConsultations(): ConsultationNote[] {
  try {
    if (fs.existsSync(LOCAL_NOTES_PATH)) {
      const data = fs.readFileSync(LOCAL_NOTES_PATH, 'utf-8');
      const list = JSON.parse(data);
      if (Array.isArray(list) && list.length > 0) {
        return list;
      }
    }
  } catch (err) {
    console.error('Error reading local consultations file:', err);
  }
  return INITIAL_CONSULTATIONS;
}

function saveLocalConsultations(notes: ConsultationNote[]) {
  try {
    fs.writeFileSync(LOCAL_NOTES_PATH, JSON.stringify(notes, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local consultations file:', err);
  }
}

// -------------------------------------------------------------
// Treatments Operations (Mongoose + Local Fallback)
// -------------------------------------------------------------
export async function getAllTreatments(): Promise<Treatment[]> {
  const mongooseInstance = await connectToDatabase();
  if (mongooseInstance) {
    try {
      const docs = await TreatmentModel.find({}).sort({ order: 1 }).lean();
      if (docs && docs.length > 0) {
        return docs.map((d: any) => ({
          id: d.id,
          name: d.name,
          category: d.category as 'skin' | 'hair',
          doctorNote: d.doctorNote,
          badge: d.badge,
          isGuide: d.isGuide,
          order: d.order,
          code: d.code,
          protocolSummary: d.protocolSummary,
          downtimeSummary: d.downtimeSummary,
          sessionsSummary: d.sessionsSummary,
          invasiveness: d.invasiveness,
          concerns: d.concerns || [],
          variants: d.variants || [],
          cases: d.cases || []
        }));
      }

      // If DB is connected but empty, seed all treatments
      const seedList = getFullEnrichedTreatments();
      await TreatmentModel.insertMany(seedList);
      saveLocalTreatments(seedList);
      return seedList;
    } catch (err) {
      console.warn('Mongoose treatments query failed, using local fallback:', err);
    }
  }
  return getLocalTreatments();
}

export async function getTreatmentById(id: string): Promise<Treatment | null> {
  const mongooseInstance = await connectToDatabase();
  if (mongooseInstance) {
    try {
      const doc = await TreatmentModel.findOne({ id }).lean();
      if (doc) {
        const d: any = doc;
        return {
          id: d.id,
          name: d.name,
          category: d.category as 'skin' | 'hair',
          doctorNote: d.doctorNote,
          badge: d.badge,
          isGuide: d.isGuide,
          order: d.order,
          code: d.code,
          protocolSummary: d.protocolSummary,
          downtimeSummary: d.downtimeSummary,
          sessionsSummary: d.sessionsSummary,
          invasiveness: d.invasiveness,
          concerns: d.concerns || [],
          variants: d.variants || [],
          cases: d.cases || []
        };
      }
    } catch (err) {
      console.warn(`Mongoose query for treatment ${id} failed:`, err);
    }
  }

  const all = await getAllTreatments();
  return all.find(t => t.id === id) || null;
}

export async function getTreatmentsByCategory(category: 'skin' | 'hair'): Promise<Treatment[]> {
  const all = await getAllTreatments();
  return all.filter(t => t.category === category);
}

export async function saveTreatment(treatment: Treatment): Promise<Treatment> {
  const mongooseInstance = await connectToDatabase();
  if (mongooseInstance) {
    try {
      await TreatmentModel.findOneAndUpdate(
        { id: treatment.id },
        { $set: treatment },
        { upsert: true, new: true }
      );
    } catch (err) {
      console.warn('Mongoose save failed, saving locally:', err);
    }
  }

  const list = getLocalTreatments();
  const index = list.findIndex(t => t.id === treatment.id);
  if (index >= 0) {
    list[index] = treatment;
  } else {
    list.push(treatment);
  }
  saveLocalTreatments(list);
  return treatment;
}

export async function deleteTreatment(id: string): Promise<boolean> {
  const mongooseInstance = await connectToDatabase();
  if (mongooseInstance) {
    try {
      await TreatmentModel.deleteOne({ id });
    } catch (err) {
      console.warn('Mongoose delete failed:', err);
    }
  }

  const list = getLocalTreatments();
  const filtered = list.filter(t => t.id !== id);
  saveLocalTreatments(filtered);
  return true;
}

// -------------------------------------------------------------
// Consultations Operations (Tablet Patient Notes)
// -------------------------------------------------------------
export async function getAllConsultations(): Promise<ConsultationNote[]> {
  const mongooseInstance = await connectToDatabase();
  if (mongooseInstance) {
    try {
      const docs = await ConsultationModel.find({}).sort({ createdAt: -1 }).lean();
      if (docs && docs.length > 0) {
        return docs.map((d: any) => ({
          id: d._id?.toString() || d.id || '',
          patientName: d.patientName,
          patientPhone: d.patientPhone,
          category: d.category as 'skin' | 'hair',
          treatmentName: d.treatmentName,
          concernName: d.concernName,
          doctorNotes: d.doctorNotes,
          createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : new Date().toISOString()
        }));
      }

      // If consultations collection is empty, seed initial consultations
      await ConsultationModel.insertMany(INITIAL_CONSULTATIONS);
      saveLocalConsultations(INITIAL_CONSULTATIONS);
      return INITIAL_CONSULTATIONS;
    } catch (err) {
      console.warn('Mongoose consultation query failed:', err);
    }
  }
  return getLocalConsultations();
}

export async function addConsultation(note: Omit<ConsultationNote, 'id' | 'createdAt'>): Promise<ConsultationNote> {
  const newNote: ConsultationNote = {
    ...note,
    id: 'cn_' + Date.now(),
    createdAt: new Date().toISOString()
  };

  const mongooseInstance = await connectToDatabase();
  if (mongooseInstance) {
    try {
      const doc = await ConsultationModel.create(note);
      newNote.id = doc._id.toString();
    } catch (err) {
      console.warn('Mongoose consultation create failed:', err);
    }
  }

  const list = getLocalConsultations();
  list.unshift(newNote);
  saveLocalConsultations(list);
  return newNote;
}

export async function deleteConsultation(id: string): Promise<boolean> {
  const mongooseInstance = await connectToDatabase();
  if (mongooseInstance) {
    try {
      await ConsultationModel.findByIdAndDelete(id);
    } catch (err) {
      console.warn('Mongoose consultation delete failed:', err);
    }
  }

  const list = getLocalConsultations();
  const filtered = list.filter(n => n.id !== id && n._id !== id);
  saveLocalConsultations(filtered);
  return true;
}

// -------------------------------------------------------------
// Clinic Settings Operations (Mongoose + Local Fallback)
// -------------------------------------------------------------
export async function getClinicSettings(): Promise<ClinicSettings> {
  const mongooseInstance = await connectToDatabase();
  if (mongooseInstance) {
    try {
      const doc = await ClinicSettingModel.findOne().lean();
      if (doc) {
        const d: any = doc;
        return {
          name: d.name || CLINIC_SETTINGS.name,
          tagline: d.tagline || CLINIC_SETTINGS.tagline,
          disclaimer: d.disclaimer || CLINIC_SETTINGS.disclaimer,
          phone: d.phone || CLINIC_SETTINGS.phone
        };
      }
      // Seed default settings
      await ClinicSettingModel.create(CLINIC_SETTINGS);
      return CLINIC_SETTINGS;
    } catch (err) {
      console.warn('Mongoose settings query failed:', err);
    }
  }
  return CLINIC_SETTINGS;
}

export async function saveClinicSettings(settings: Partial<ClinicSettings>): Promise<ClinicSettings> {
  const mongooseInstance = await connectToDatabase();
  if (mongooseInstance) {
    try {
      const updated = await ClinicSettingModel.findOneAndUpdate(
        {},
        { $set: settings },
        { upsert: true, new: true }
      ).lean();
      const d: any = updated;
      return {
        name: d.name,
        tagline: d.tagline,
        disclaimer: d.disclaimer,
        phone: d.phone
      };
    } catch (err) {
      console.warn('Mongoose settings save failed:', err);
    }
  }
  return { ...CLINIC_SETTINGS, ...settings };
}

// -------------------------------------------------------------
// Global Re-Seed / Sync Collections
// -------------------------------------------------------------
export async function seedAllCollections(): Promise<{
  treatmentsCount: number;
  consultationsCount: number;
  settingsSaved: boolean;
}> {
  const fullTreatments = getFullEnrichedTreatments();
  const consultations = INITIAL_CONSULTATIONS;
  const settings = CLINIC_SETTINGS;

  const mongooseInstance = await connectToDatabase();
  if (mongooseInstance) {
    // 1. Treatments
    await TreatmentModel.deleteMany({});
    await TreatmentModel.insertMany(fullTreatments);

    // 2. Consultations
    await ConsultationModel.deleteMany({});
    await ConsultationModel.insertMany(consultations);

    // 3. Settings
    await ClinicSettingModel.deleteMany({});
    await ClinicSettingModel.create(settings);
  }

  saveLocalTreatments(fullTreatments);
  saveLocalConsultations(consultations);

  return {
    treatmentsCount: fullTreatments.length,
    consultationsCount: consultations.length,
    settingsSaved: true
  };
}

export async function getDatabaseStats() {
  await connectToDatabase();
  const connected = isMongoConnected();
  let treatmentsCount = 0;
  let consultationsCount = 0;
  let hasSettings = false;

  if (connected) {
    try {
      [treatmentsCount, consultationsCount, hasSettings] = await Promise.all([
        TreatmentModel.countDocuments(),
        ConsultationModel.countDocuments(),
        ClinicSettingModel.exists({}).then(res => Boolean(res))
      ]);
    } catch (err) {
      console.warn('Error fetching DB stats:', err);
    }
  } else {
    treatmentsCount = getLocalTreatments().length;
    consultationsCount = getLocalConsultations().length;
    hasSettings = true;
  }

  return {
    connected,
    configured: isMongoConfigured(),
    treatmentsCount,
    consultationsCount,
    hasSettings
  };
}
