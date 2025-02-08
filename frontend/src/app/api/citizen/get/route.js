import { getCitizenByAadhar } from '@/src/components/sql/mysql';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const aadhar = searchParams.get("aadhar");

    if (!aadhar) {
      return NextResponse.json({ error: "Aadhar is required" }, { status: 400 });
    }

    const citizen = await getCitizenByAadhar(aadhar);

    if (!citizen) {
      return NextResponse.json({ error: "Citizen not found" }, { status: 404 });
    }

    return NextResponse.json(citizen, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
