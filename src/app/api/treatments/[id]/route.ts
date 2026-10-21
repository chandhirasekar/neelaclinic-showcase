import { NextResponse } from 'next/server';
import { getTreatmentById, saveTreatment, deleteTreatment } from '@/lib/treatmentService';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const treatment = await getTreatmentById(id);
    if (!treatment) {
      return NextResponse.json({ success: false, error: 'Treatment not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: treatment });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await saveTreatment({ ...body, id });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteTreatment(id);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
