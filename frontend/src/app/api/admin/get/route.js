
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
    console.log("Fetching admin:", admin_id);
    console.log("Fetching admin:", password);
    //check with the hardcode value
    const isIdMatch = admin_id === "admin";
    // Compare provided password with hashed password from DB
    const isPasswordMatch = password === "dbms";

    if (!isIdMatch || !isPasswordMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    return NextResponse.json(admin_id, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
