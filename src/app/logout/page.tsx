import { cookies } from "next/headers";
import { redirect } from "next/navigation"

export default async function Logout(){
    var cookie = await cookies()
    const res = await fetch(`http://localhost:3000/api/users/logout`, {
        method: 'GET',
        credentials: 'include',
        headers: { Cookie: cookie.toString() },
        
    });
    console.log(res)
    redirect('/')
    return(<p>Logging out...</p>)
}