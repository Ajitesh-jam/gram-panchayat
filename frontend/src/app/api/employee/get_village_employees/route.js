import { getVillageEmployee } from '@/src/components/sql/mysql';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {    
    const { searchParams } = new URL(req.url);
    const village_id = searchParams.get("village_id");

    const Employees = await getVillageEmployee(village_id);

    if (!Employees) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json(Employees, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}