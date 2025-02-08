import { deleteCitizen } from '@/src/components/sql/mysql';
// ❌ DELETE - Remove a citizen
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const aadhar = searchParams.get("aadhar");

    if (!aadhar) {
      return NextResponse.json({ error: "Aadhar is required for deletion" }, { status: 400 });
    }

    const deletedCitizen = await deleteCitizen(aadhar);

    if (!deletedCitizen) {
      return NextResponse.json({ error: "Citizen not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Citizen deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}