import { enrollCitizenInScheme } from '@/src/components/sql/mysql';
import { NextResponse } from 'next/server';
export async function POST(req) {
  try {
    const {citizen_id,scheme_id} = await req.json();
    console.log(citizen_id,scheme_id);
    const newCitizen = await enrollCitizenInScheme(scheme_id,citizen_id);

    return NextResponse.json(newCitizen, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}