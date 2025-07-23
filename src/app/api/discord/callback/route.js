import { redirect } from "next/navigation"
import DBConnection from "@/lib/db"
import crypto from 'crypto';
import { cookies } from "next/headers";




export async function GET(req){
    const codeResult = req.nextUrl.searchParams.get('code')
    if(codeResult == undefined)  redirect("/")
    var redirect_uri = `http://${process.env.HOST}:${process.env.IP_PORT}/api/discord/callback`

    if(process.env.IP_DNS == "fastlittleboys.com"){
        redirect_uri = `http://fastlittleboys.com/api/discord/callback`
    }
    
    let options = {
        url: 'https://discord.com/api/oauth2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({

            'client_id': process.env.DISCORD_CLIENT_ID,
            'client_secret': process.env.DISCORD_CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'code': codeResult,
            'redirect_uri': redirect_uri,
        })
    }
    let discord_data = await fetch('https://discord.com/api/oauth2/token', options).then((response) => {
        return response.json();
    })
    const user = await fetch("https://discord.com/api/users/@me", {
        headers: { Authorization: `Bearer ${discord_data.access_token}`}
    }).then((response) =>{
        return response.json();
    })
    if(user.id != undefined){

        const dbConnection = await DBConnection()

        var profilePicture = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=1024`

        // Setup default query (add user in database)
        const sessionToken = crypto.randomBytes(32).toString('hex');
        
        var query = `INSERT INTO users(userDisplayName, userName, userProfilePicture, userRole, discordID, session_token) values
                    (?, ?, ?, ?, ?, ?)`;
        let args = [user.global_name, user.username, profilePicture, 0, user.id, sessionToken]
        
        // Check if user is already in the database
        console.log("Checking if user is in the database...")
        const [results] = await dbConnection.execute(`SELECT * from users WHERE discordID = "?"`, [user.id])
        var expire = discord_data.expires_in
        // if user is in database
        if(results != ""){
            
            // change query to update user's name, display name & profile picture
            console.log("user in database!")
            query = `UPDATE users SET userDisplayName = ?, userName = ?, userProfilePicture = ?, session_token = ? WHERE discordID = ?`
            args = [user.global_name, user.username, profilePicture, sessionToken, user.id]
        }
        try{

            await dbConnection.execute(query, args)
            dbConnection.end()
            // Set user's cookies
            var cookie = await cookies();
            await cookie.set('session_token', sessionToken, {
                httpOnly: false,
                secure: true,
                sameSite: 'none',
                maxAge:( 60 * 60 * 24 * 7), // 7 days
                path: '/',
            });
            
        }catch(e){
            console.log("ERROR:" + e)
        }
        
        

        
    }
    redirect("/login")

   

}
