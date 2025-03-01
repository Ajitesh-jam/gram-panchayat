import { getCitizen } from "@/src/components/sql/mysql";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const citizen_id = searchParams.get("aadhar");
    const password = searchParams.get("password");

    if (!citizen_id || !password) {
      return NextResponse.json({ error: "Missing citizen_id or password" }, { status: 400 });
    }
    console.log("citizen_id, password", citizen_id, password);

    // Fetch citizen from DB (includes the hashed password)
    const citizen = await getCitizen(citizen_id);

    if (!citizen) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Compare provided password with hashed password from DB

    const isMatch = await bcrypt.compare(password, citizen.password_hash);

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Remove password before sending response
    delete citizen.password;

    return NextResponse.json(citizen, { status: 200 });
  } catch (error) {
    console.error("Error fetching citizen:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
