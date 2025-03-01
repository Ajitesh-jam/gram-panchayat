import { getVillageCitizen } from '@/src/components/sql/mysql';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {    
    const { searchParams } = new URL(req.url);
    const village_id = searchParams.get("village_id");

    const citizens = await getVillageCitizen(village_id);

    if (!citizens) {
      return NextResponse.json({ error: "Citizen not found" }, { status: 404 });
    }

    return NextResponse.json(citizens, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}