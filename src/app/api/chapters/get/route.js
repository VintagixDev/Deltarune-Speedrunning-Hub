import DBConnection from "@/lib/db";

export async function GET(req){

    const queryParams = req.nextUrl.searchParams.get('chapterName')

    const connection = await DBConnection()
    

    let query = "SELECT * FROM chapters" 
    
    if(queryParams != null){
        query = `SELECT * from chapters WHERE chapterLink = ?`;
    }
    const [results] = await connection.execute(query, [queryParams])
    connection.end()
    return Response.json(results, {status: 200})
}