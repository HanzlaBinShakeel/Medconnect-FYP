import { NextResponse } from 'next/server';
import { config } from '@/lib/config';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, address } = body;

    // Validate required fields (email is optional for patients)
    if (!name || !password || !phone || !address) {
      return NextResponse.json(
        { message: 'All required fields are missing' },
        { status: 400 }
      );
    }

    // Send to backend API
    const response = await fetch(`${config.backendUrl}/api/patients/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, phone, address }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || 'Failed to register patient' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error registering patient:', error);
    return NextResponse.json(
      { message: 'Failed to register patient' },
      { status: 500 }
    );
  }
} 