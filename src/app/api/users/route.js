import DBConnection from "@/lib/db"


export async function GET(req){
  const connection = await DBConnection()
  let query = "SELECT *, NULL AS session_token FROM users"
  const [results] = await connection.execute(query, [])
  connection.end()
  return Response.json(results, {status: 200})
}

