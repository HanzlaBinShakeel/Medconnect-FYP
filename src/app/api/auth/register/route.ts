import { NextResponse } from 'next/server';
import { config } from '@/lib/config';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, address, role, specialization, licenseNumber } = body;

    // Validate required fields
    if (!name || !password || !phone || !address || !role) {
      return NextResponse.json(
        { message: 'All required fields are missing' },
        { status: 400 }
      );
    }

    // Validate email for doctors
    if (role === 'doctor' && !email) {
      return NextResponse.json(
        { message: 'Email is required for doctor registration' },
        { status: 400 }
      );
    }

    // Additional validation for doctors
    if (role === 'doctor' && (!specialization || !licenseNumber)) {
      return NextResponse.json(
        { message: 'Specialization and license number are required for doctors' },
        { status: 400 }
      );
    }

    // Determine the correct endpoint based on role
    const endpoint = role === 'patient' 
      ? `${config.backendUrl}/api/patients/register`
      : `${config.backendUrl}/api/doctors/register`;

    // Send to backend API
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phone,
        address,
        ...(role === 'doctor' && { specialization, licenseNumber })
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || errorData.message || 'Failed to register user' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { message: 'Failed to register user' },
      { status: 500 }
    );
  }
} 