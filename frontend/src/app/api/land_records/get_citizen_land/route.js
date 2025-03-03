import { getLandRecordsOfCitizen } from '@/src/components/sql/mysql';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {    
    const { searchParams } = new URL(req.url);
    const citizen_id = searchParams.get("citizen_id");
    const LandRecords = await getLandRecordsOfCitizen(citizen_id);

    if (!LandRecords) {
      return NextResponse.json({ error: "LandRecord not found" }, { status: 404 });
    }

    return NextResponse.json(LandRecords, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}