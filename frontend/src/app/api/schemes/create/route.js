import { createScheme } from '@/src/components/sql/mysql';
export async function POST(req) {
  try {
    const scheme = await req.json();
    const newScheme = await createScheme(scheme);

    return NextResponse.json(newScheme, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}