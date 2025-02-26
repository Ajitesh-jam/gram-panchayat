import { updateScheme } from "@/src/components/sql/mysql";
import { NextResponse } from "next/server";

export async function PATCH(req) {
    try {
        const body = await req.json();
        const { id, name , criteria , description } = body;
    
        if (!id || !name || !criteria || !description) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
    
        const updatedScheme = await updateScheme(id, name , criteria , description );
        if (!updatedScheme) {
        return NextResponse.json({ error: "Scheme not found" }, { status: 404 });
        }
        return NextResponse.json(updatedScheme, { status: 200 });
    } catch (error) {
        console.error("Error updating scheme:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}