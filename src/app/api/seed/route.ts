import { NextResponse } from 'next/server';
import { seedAllCollections } from '@/lib/treatmentService';

export async function POST() {
  try {
    const result = await seedAllCollections();
    return NextResponse.json({
      success: true,
      message: 'Successfully seeded all Mongoose collections (Treatments, Consultations, and Clinic Settings)',
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
