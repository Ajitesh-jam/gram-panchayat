import { getSchemesByCitizen } from '@/src/components/sql/mysql';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {    
    const { searchParams } = new URL(req.url);
    const citizen_id = searchParams.get("citizen_id");

    if (!citizen_id) {
      return NextResponse.json({ error: "Citizen ID is required" }, { status: 400 });
    }

    const schemes = await getSchemesByCitizen(citizen_id);

    if (!schemes || schemes.length === 0) {
      return NextResponse.json({ error: "No schemes found for this citizen" }, { status: 404 });
    }

    return NextResponse.json(schemes, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
