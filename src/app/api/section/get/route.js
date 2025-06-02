import DBConnection from "@/lib/db";


export async function GET(req){

    const queryParams = req.nextUrl.searchParams.get('chapterName')

    const connection = await DBConnection()
    

    let query = "SELECT * FROM sections" 
    
    if(queryParams != null){
        query = `SELECT sections.* FROM sections WHERE chapterID = (SELECT chapterID from chapters where chapterLink = "${queryParams}")`;
    }
    const [results] = await connection.execute(query, [])
    connection.end()
    return Response.json(results, {status: 200})
}