import { getVillage } from '@/src/components/sql/mysql';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const Village_id = searchParams.get("village_id");

    if (!Village_id) {
      return NextResponse.json({ error: "Village_id is required" }, { status: 400 });
    }

    const Village = await getVillage(Village_id);

    if (!Village) {
      return NextResponse.json({ error: "Village not found" }, { status: 404 });
    }

    return NextResponse.json(Village, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
