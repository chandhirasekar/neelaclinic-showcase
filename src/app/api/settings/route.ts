import { NextResponse } from 'next/server';
import { getClinicSettings, saveClinicSettings, getDatabaseStats } from '@/lib/treatmentService';

export async function GET() {
  try {
    const [settings, stats] = await Promise.all([
      getClinicSettings(),
      getDatabaseStats(),
    ]);

    return NextResponse.json({
      success: true,
      data: settings,
      stats,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const updated = await saveClinicSettings(body);
    return NextResponse.json({
      success: true,
      data: updated,
      message: 'Clinic settings updated successfully',
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
