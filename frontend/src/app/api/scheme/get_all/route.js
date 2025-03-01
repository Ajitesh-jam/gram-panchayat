import{getAllSchemes} from '@/src/components/sql/mysql';
import{NextResponse}from'next/server';

export async function GET(req){
    try{
        const schemes=await getAllSchemes();
        return NextResponse.json(schemes,{status:200});
    }catch(error){
        console.error("Database error:",error);
        return NextResponse.json({error:"Internal Server Error"},{status:500});
    }
}