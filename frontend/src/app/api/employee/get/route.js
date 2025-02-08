import { getEmployee } from "@/src/components/sql/mysql";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const employee_id = searchParams.get("employee_id");
    const password = searchParams.get("password");

    if (!employee_id || !password) {
      return NextResponse.json({ error: "Missing employee_id or password" }, { status: 400 });
    }

    // Fetch employee from DB (includes the hashed password)
    const employee = await getEmployee(employee_id,password);

    if (!employee) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Compare provided password with hashed password from DB
    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Remove password before sending response
    delete employee.password;

    return NextResponse.json(employee, { status: 200 });
  } catch (error) {
    console.error("Error fetching employee:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
