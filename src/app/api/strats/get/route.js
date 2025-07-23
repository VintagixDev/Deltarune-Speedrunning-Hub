import getSession from "@/lib/auth";
import DBConnection from "@/lib/db";

export async function GET(req){

    const chapterName = req.nextUrl.searchParams.get('chapterName')
    
    const stratID = req.nextUrl.searchParams.get('stratID')

    const connection = await DBConnection()
    
    let query = "SELECT * FROM strats";
    let args = [];
    
    if(chapterName != null){
        query = `SELECT strats.*, sections.*, userDisplayName FROM strats INNER JOIN sections ON strats.sectionID = sections.sectionID INNER JOIN users ON strats.userID = users.userID WHERE strats.chapterID = (SELECT chapterID FROM chapters WHERE chapterLink = ?) ORDER BY sectionListPriority;`;
        args = [chapterName];
    }

    if(stratID != null){
        query = `SELECT strats.*, userDisplayName, chapterLink, sectionName, sectionColor FROM strats INNER JOIN users ON strats.userID = users.userID INNER JOIN chapters ON strats.chapterID = chapters.chapterID INNER JOIN sections ON strats.sectionID = sections.sectionID WHERE stratID = ?;`;
        args = [stratID];
    }

    const [results] = await connection.execute(query, args)
    connection.end()
    return Response.json(results, {status: 200})
}
