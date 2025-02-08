import { updateCitizen } from '@/src/components/sql/mysql';

// ✏️ PUT - Update an existing citizen
export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const aadhar = searchParams.get("aadhar");

    if (!aadhar) {
      return NextResponse.json({ error: "Aadhar is required for update" }, { status: 400 });
    }

    const updates = await req.json();
    const updatedCitizen = await updateCitizen(aadhar, updates);

    if (!updatedCitizen) {
      return NextResponse.json({ error: "Citizen not found" }, { status: 404 });
    }

    return NextResponse.json(updatedCitizen, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}