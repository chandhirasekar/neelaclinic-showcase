import { NextResponse } from 'next/server';
import { getAllConsultations, addConsultation, deleteConsultation } from '@/lib/treatmentService';

export async function GET() {
  try {
    const notes = await getAllConsultations();
    return NextResponse.json({ success: true, data: notes });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.patientName || !body.category || !body.treatmentName || !body.concernName) {
      return NextResponse.json({ success: false, error: 'patientName, category, treatmentName, and concernName are required' }, { status: 400 });
    }
    const created = await addConsultation(body);
    return NextResponse.json({ success: true, data: created });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'id parameter is required' }, { status: 400 });
    }
    await deleteConsultation(id);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
