import mysql from "mysql2/promise"

export default async function DBConnection(){
    const dbconnection = await mysql.createConnection({
        host: `${process.env.HOST}`,
        port: `${process.env.DBPORT}`,
        database: `${process.env.DATABASE}`,
        user: `${process.env.DBUSER}`,
        password: `${process.env.DBPASSWORD}`
    })
    return dbconnection
    
}