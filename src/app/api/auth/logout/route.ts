import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });

  response.cookies.delete('nila_session');
  response.cookies.delete('nila_role');
  response.cookies.delete('nila_name');

  return response;
}
