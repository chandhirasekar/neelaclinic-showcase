import { NextResponse } from 'next/server';
import { getAllUsers, createUser, deleteUser, toggleUserActive } from '@/lib/authService';

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.username || !body.password || !body.role) {
      return NextResponse.json(
        { success: false, error: 'Name, username, password, and role are required' },
        { status: 400 }
      );
    }

    const created = await createUser({
      name: body.name,
      username: body.username,
      password: body.password,
      role: body.role,
    });

    return NextResponse.json({
      success: true,
      message: 'User created successfully in MongoDB',
      data: created,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const action = searchParams.get('action');

    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    if (action === 'toggle') {
      const updated = await toggleUserActive(id);
      return NextResponse.json({ success: true, data: updated });
    }

    await deleteUser(id);
    return NextResponse.json({ success: true, message: 'User deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
