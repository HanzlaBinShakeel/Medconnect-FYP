import { NextResponse } from 'next/server';
import { config } from '@/lib/config';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, specialization, licenseNumber, address, experience } = body;

    // Validate required fields
    if (!name || !email || !password || !phone || !specialization || !licenseNumber || !address) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Send to backend API
    const response = await fetch(`${config.backendUrl}/api/doctors/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, phone, specialization, licenseNumber, address, experience }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || 'Failed to register doctor' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error registering doctor:', error);
    return NextResponse.json(
      { message: 'Failed to register doctor' },
      { status: 500 }
    );
  }
} 