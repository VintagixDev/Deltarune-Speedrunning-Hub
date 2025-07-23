import DBConnection from "@/lib/db";


export async function GET(req){

    const queryParams = req.nextUrl.searchParams.get('chapterName')

    const connection = await DBConnection()
    

    let query = "SELECT * FROM sections"
    let args = [];
    
    if(queryParams != null){
        query = `SELECT sections.* FROM sections WHERE chapterID = (SELECT chapterID from chapters where chapterLink = ?) ORDER BY sectionListPriority;`;
        args = [queryParams];
    }
    const [results] = await connection.execute(query, args)
    connection.end()
    return Response.json(results, {status: 200})
}