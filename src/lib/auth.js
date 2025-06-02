import { cookies } from "next/headers";


export default async function getSession(){
    const cookie = await cookies()
    const res = await fetch(`http://localhost:3000/api/me`, {
        headers: { Cookie: cookie.toString() },
    });
    const response = await res.json();
    return response
}