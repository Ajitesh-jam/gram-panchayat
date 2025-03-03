//api to create a gvt monitor
import { createGovt } from "@/src/components/sql/mysql";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const monitor = await req.json();

    if (!monitor.govt_id || !monitor.password || !monitor.name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const newmonitor = await createGovt(monitor);
    return NextResponse.json(newmonitor, { status: 201 });
  } catch (error) {
    console.error("Error creating monitor:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}