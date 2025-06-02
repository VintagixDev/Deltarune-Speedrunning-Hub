import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
export async function GET(req){


    var cookie = await cookies()
    cookie.delete('session_token');
    redirect('/')    
}