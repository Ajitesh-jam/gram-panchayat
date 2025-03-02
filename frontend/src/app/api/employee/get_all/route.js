import { getAllEmployees, getEmployee } from "@/src/components/sql/mysql";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {

    // Fetch employee from DB (includes the hashed password)
    const employee = await getAllEmployees();

    if (!employee) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    console.log("Employee: ", employee);

    return NextResponse.json(employee, { status: 200 });
  } catch (error) {
    console.error("Error fetching employee:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
