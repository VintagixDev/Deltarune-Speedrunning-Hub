import { redirect } from "next/navigation"
import DBConnection from "@/lib/db"
import crypto from 'crypto';
import { cookies } from "next/headers";




export async function GET(req){
    const codeResult = req.nextUrl.searchParams.get('code')
    if(codeResult == undefined) return Response.json({results: "none"});

    let options = {
        url: 'https://discord.com/api/oauth2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'client_id': '1377396893277225034',
            'client_secret': 'u9oSPXH-HL-V1obwnQ6q60udgO_LpkFY',
            'grant_type': 'authorization_code',
            'code': codeResult,
            'redirect_uri': 'http://localhost:3000/api/discord/callback',
        })
    }
    let discord_data = await fetch('https://discord.com/api/oauth2/token', options).then((response) => {
        return response.json();
    })
    console.log(discord_data.access_token)  
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
                    ("${user.global_name}", "${user.username}", "${profilePicture}", 0, "${user.id}", "${sessionToken}")`;
        
        // Check if user is already in the database
        console.log("Checking if user is in the database...")
        const [results] = await dbConnection.execute(`SELECT * from users WHERE discordID = "${user.id}"`, [])
        var expire = discord_data.expires_in
        // if user is in database
        if(results != ""){
            
            // change query to update user's name, display name & profile picture
            console.log("user in database!")
            query = `UPDATE users SET userDisplayName = "${user.global_name}", userName = "${user.username}", userProfilePicture = "${profilePicture}", session_token = "${sessionToken}" WHERE discordID = "${user.id}"`
        }
        try{

            await dbConnection.execute(query, [])
            dbConnection.end()
            // Set user's cookies
            var cookie = await cookies();
            await cookie.set('session_token', sessionToken, {
                httpOnly: false,
                secure: true,
                sameSite: 'strict',
                maxAge:( 60 * 60 * 24 * 7), // 7 days
                path: '/',
            });
            
        }catch(e){
            console.log(e)
        }
        
        

        
    }
    redirect("/login")

   

}