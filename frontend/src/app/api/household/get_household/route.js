import { getHousehold } from '@/src/components/sql/mysql';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const household_id = searchParams.get("household_id");

    if (!household_id) {
      return NextResponse.json({ error: "household_id is required" }, { status: 400 });
    }

    const household = await getHousehold(household_id);

    if (!household) {
      return NextResponse.json({ error: "household not found" }, { status: 404 });
    }

    return NextResponse.json(household, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
