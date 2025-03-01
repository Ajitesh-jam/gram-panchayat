import { getGovt } from "@/src/components/sql/mysql";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const govt_id = searchParams.get("govt_id");
    const password = searchParams.get("password");

    if (!govt_id || !password) {
      return NextResponse.json({ error: "Missing govt_id or password" }, { status: 400 });
    }

    // Fetch govt from DB (includes the hashed password)
    const govt = await getGovt(govt_id,password);

    if (!govt) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Compare provided password with hashed password from DB
    const isMatch = await bcrypt.compare(password, govt.password);

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Remove password before sending response
    delete govt.password;

    return NextResponse.json(govt, { status: 200 });
  } catch (error) {
    console.error("Error fetching govt:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
