import { NextResponse } from 'next/server';
import { getTreatmentById, saveTreatment } from '@/lib/treatmentService';
import { ConcernItem } from '@/types';

// Update or add a concern within a treatment
export async function POST(req: Request) {
  try {
    const { treatmentId, concern } = await req.json();
    if (!treatmentId || !concern || !concern.id || !concern.name) {
      return NextResponse.json({ success: false, error: 'treatmentId and concern (id, name) are required' }, { status: 400 });
    }

    const treatment = await getTreatmentById(treatmentId);
    if (!treatment) {
      return NextResponse.json({ success: false, error: 'Treatment not found' }, { status: 404 });
    }

    const concerns = treatment.concerns || [];
    const existingIndex = concerns.findIndex(c => c.id === concern.id);

    if (existingIndex >= 0) {
      concerns[existingIndex] = { ...concerns[existingIndex], ...concern };
    } else {
      concerns.push(concern);
    }

    treatment.concerns = concerns;
    await saveTreatment(treatment);
    return NextResponse.json({ success: true, data: treatment });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Delete a concern from a treatment
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const treatmentId = searchParams.get('treatmentId');
    const concernId = searchParams.get('concernId');

    if (!treatmentId || !concernId) {
      return NextResponse.json({ success: false, error: 'treatmentId and concernId query params are required' }, { status: 400 });
    }

    const treatment = await getTreatmentById(treatmentId);
    if (!treatment) {
      return NextResponse.json({ success: false, error: 'Treatment not found' }, { status: 404 });
    }

    treatment.concerns = (treatment.concerns || []).filter(c => c.id !== concernId);
    await saveTreatment(treatment);
    return NextResponse.json({ success: true, data: treatment });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
