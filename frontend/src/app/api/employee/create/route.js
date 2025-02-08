import { createEmployee } from "@/src/components/sql/mysql";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const employee = await req.json();

    if (!employee.employee_id || !employee.password || !employee.citizen_id || !employee.role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newEmployee = await createEmployee(employee);
    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
