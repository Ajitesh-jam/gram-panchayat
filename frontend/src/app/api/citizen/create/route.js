import { createCitizen } from '@/src/components/sql/mysql';
export async function POST(req) {
  try {
    const citizen = await req.json();
    const newCitizen = await createCitizen(citizen);

    return NextResponse.json(newCitizen, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}