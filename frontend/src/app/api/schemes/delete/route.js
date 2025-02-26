// deleting a particular schema
import{deleteScheme}from "@/src/components/sql/mysql";
import{NextResponse}from "next/server";

export async function DELETE(req){
    try{
        const body = await req.json();
        const { id }= body;
       
        if(!id){
            return NextResponse.json({error:"Missing required fields"},{status:400});
        }
        // const scheme = await req.json();
        const deletedScheme = await deleteScheme(id);
        if(!deletedScheme){
            return NextResponse.json({error:"Scheme not found"},{status:404});
        }
        return NextResponse.json(deletedScheme,{status:200});
    }
    catch(error){
        console.error("Error deleting scheme:",error);
        return NextResponse.json({error:"Internal Server Error"},{status:500});
    }
}