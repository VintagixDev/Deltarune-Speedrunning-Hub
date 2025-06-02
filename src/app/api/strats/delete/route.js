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
  if(user.error) redirect('/guides/')
  if(user.banned == 1) redirect('/guides/')
  const _strat = await fetch(`http://localhost:3000/api/strats/get?stratID=${queryParams}`)
  var strat = await _strat.json();
  
  strat = strat[0]
  if(strat == undefined) redirect('/guides/')
  if(user.userID == strat.userID || user.userRole >= 1){

        const dbConnection = await DBConnection()

        const query = `DELETE FROM strats WHERE stratID = ${queryParams}`
        await dbConnection.execute(query, [])
        redirect('/guides/'+strat.chapterLink)
        return NextResponse.json({ message: "strat deleted successfully" });
  }
  redirect('/guides/')
  return NextResponse.json({error: "you cannot delete this strat"})
}