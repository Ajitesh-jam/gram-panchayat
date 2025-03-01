import { getAScheme_of_a_village } from '@/src/components/sql/mysql';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const village_id = searchParams.get("village_id");
    const scheme_id = searchParams.get("scheme_id");

    if (!village_id || ! scheme_id) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }

    const scheme = await getAScheme_of_a_village(scheme_id,village_id);

    if (!scheme) {
      return NextResponse.json({ message: "Scheme not found" }, { status: 200 });
    }

    return NextResponse.json(scheme, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
