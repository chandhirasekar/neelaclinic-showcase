import { NextResponse } from 'next/server';
import { getAllTreatments, saveTreatment } from '@/lib/treatmentService';
import { isMongoConfigured } from '@/lib/db';

export async function GET() {
  try {
    const treatments = await getAllTreatments();
    return NextResponse.json({
      success: true,
      data: treatments,
      mongoConnected: isMongoConfigured(),
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.id || !body.name || !body.category) {
      return NextResponse.json({ success: false, error: 'id, name, and category are required' }, { status: 400 });
    }
    const saved = await saveTreatment(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
