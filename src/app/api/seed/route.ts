import { NextResponse } from 'next/server';
import { resetToDefaultTreatments } from '@/lib/treatmentService';

export async function POST() {
  try {
    const treatments = await resetToDefaultTreatments();
    return NextResponse.json({
      success: true,
      message: 'Successfully seeded official Nila Clinic BRD treatments and concerns',
      count: treatments.length
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
