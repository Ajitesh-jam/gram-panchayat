import { getadmin } from "@/src/components/sql/mysql";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const admin_id = searchParams.get("admin_id");
    const password = searchParams.get("password");

    if (!admin_id || !password) {
      return NextResponse.json({ error: "Missing admin_id or password" }, { status: 400 });
    }

    // Fetch admin from DB (includes the hashed password)
    const admin = await getadmin(admin_id,password);

    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Compare provided password with hashed password from DB
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Remove password before sending response
    delete admin.password;

    return NextResponse.json(admin, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
