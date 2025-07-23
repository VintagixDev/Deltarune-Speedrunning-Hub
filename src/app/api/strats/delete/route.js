import { NextResponse } from "next/server";
import DBConnection from "@/lib/db";
import getSession from "@/lib/auth";
import { redirect } from "next/navigation";


export async function GET(request) {
  const queryParams = request.nextUrl.searchParams.get('stratID')

  if(queryParams == null){
    return redirect('/guides/')
  }
  const user = await getSession()
  if(user.error) NextResponse.json("ERROR: user not logged in")
  if(user.banned == 1) NextResponse.json("ERROR: user banned")
  const _strat = await fetch(`http://${process.env.HOST}:${process.env.IP_PORT}/api/strats/get?stratID=${queryParams}`)
  var strat = await _strat.json();
  
  strat = strat[0]
  if(strat == undefined) NextResponse.json("ERROR: strat not found")
  if(user.userID == strat.userID || user.userRole >= 1){

        const dbConnection = await DBConnection()

        const query = `DELETE FROM strats WHERE stratID = ?`
        await dbConnection.execute(query, [queryParams])
        console.log("STRAT DELETED")
        
        return NextResponse.json({ message: "strat deleted successfully", status: "SUCCESS" });
  }
  
  return NextResponse.json({error: "you cannot delete this strat"})
}