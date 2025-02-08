import { updateEmployee } from "@/src/components/sql/mysql";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { employee_id, password, updates } = body;

    if (!employee_id || !password || !updates) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedEmployee = await updateEmployee(employee_id, password, updates);
    return NextResponse.json(updatedEmployee, { status: 200 });
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
