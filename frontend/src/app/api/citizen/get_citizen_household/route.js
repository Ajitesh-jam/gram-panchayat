import { getCitizenByHousehold } from '@/src/components/sql/mysql';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {    
    const { searchParams } = new URL(req.url);
    const household_id = searchParams.get("household_id");

    const citizens = await getCitizenByHousehold(household_id);

    if (!citizens) {
      return NextResponse.json({ error: "Citizen not found" }, { status: 404 });
    }

    return NextResponse.json(citizens, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}