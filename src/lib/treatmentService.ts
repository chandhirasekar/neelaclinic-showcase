import { Treatment, ConsultationNote } from '@/types';
import { INITIAL_TREATMENTS } from '@/data/treatmentsData';
import { connectToDatabase } from '@/lib/db';
import { TreatmentModel } from '@/lib/models/Treatment';
import { ConsultationModel } from '@/lib/models/Consultation';
import fs from 'fs';
import path from 'path';

const LOCAL_STORE_PATH = path.join(process.cwd(), 'src', 'data', 'local-treatments.json');
const LOCAL_NOTES_PATH = path.join(process.cwd(), 'src', 'data', 'local-consultations.json');

function getLocalTreatments(): Treatment[] {
  try {
    if (fs.existsSync(LOCAL_STORE_PATH)) {
      const data = fs.readFileSync(LOCAL_STORE_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading local treatments file:', err);
  }
  return INITIAL_TREATMENTS;
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
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading local consultations file:', err);
  }
  return [];
}

function saveLocalConsultations(notes: ConsultationNote[]) {
  try {
    fs.writeFileSync(LOCAL_NOTES_PATH, JSON.stringify(notes, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local consultations file:', err);
  }
}

export async function getAllTreatments(): Promise<Treatment[]> {
  const mongooseInstance = await connectToDatabase();
  if (mongooseInstance) {
    try {
      const docs = await TreatmentModel.find({}).sort({ order: 1 }).lean();
      if (docs && docs.length > 0) {
        return docs.map(d => ({
          id: d.id,
          name: d.name,
          category: d.category as 'skin' | 'hair',
          doctorNote: d.doctorNote,
          badge: d.badge,
          isGuide: d.isGuide,
          order: d.order,
          concerns: d.concerns || []
        }));
      }
      // If DB is empty, seed it
      await TreatmentModel.insertMany(INITIAL_TREATMENTS);
      return INITIAL_TREATMENTS;
    } catch (err) {
      console.warn('Mongoose query failed, using local fallback:', err);
    }
  }
  return getLocalTreatments();
}

export async function getTreatmentById(id: string): Promise<Treatment | null> {
  const all = await getAllTreatments();
  return all.find(t => t.id === id) || null;
}

export async function saveTreatment(treatment: Treatment): Promise<Treatment> {
  const mongooseInstance = await connectToDatabase();
  if (mongooseInstance) {
    try {
      await TreatmentModel.findOneAndUpdate(
        { id: treatment.id },
        treatment,
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

export async function resetToDefaultTreatments(): Promise<Treatment[]> {
  const mongooseInstance = await connectToDatabase();
  if (mongooseInstance) {
    try {
      await TreatmentModel.deleteMany({});
      await TreatmentModel.insertMany(INITIAL_TREATMENTS);
    } catch (err) {
      console.warn('Mongoose reset failed:', err);
    }
  }
  saveLocalTreatments(INITIAL_TREATMENTS);
  return INITIAL_TREATMENTS;
}

// Consultations (Doctor tablet notes)
export async function getAllConsultations(): Promise<ConsultationNote[]> {
  const mongooseInstance = await connectToDatabase();
  if (mongooseInstance) {
    try {
      const docs = await ConsultationModel.find({}).sort({ createdAt: -1 }).lean();
      return docs.map(d => ({
        id: (d as any)._id?.toString() || '',
        patientName: d.patientName,
        patientPhone: d.patientPhone,
        category: d.category as 'skin' | 'hair',
        treatmentName: d.treatmentName,
        concernName: d.concernName,
        doctorNotes: d.doctorNotes,
        createdAt: (d as any).createdAt ? new Date((d as any).createdAt).toISOString() : new Date().toISOString()
      }));
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
  const filtered = list.filter(n => n.id !== id);
  saveLocalConsultations(filtered);
  return true;
}
