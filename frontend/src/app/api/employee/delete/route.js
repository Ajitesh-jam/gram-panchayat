import { deleteEmployee } from "@/src/components/sql/mysql";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const employee_id = searchParams.get("employee_id");
    const password = searchParams.get("password");

    if (!employee_id || !password) {
      return NextResponse.json({ error: "Missing employee_id or password" }, { status: 400 });
    }

    const deletedEmployee = await deleteEmployee(employee_id, password);
    if (!deletedEmployee) {
      return NextResponse.json({ error: "Invalid credentials or employee not found" }, { status: 401 });
    }

    return NextResponse.json({ message: "Employee deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
