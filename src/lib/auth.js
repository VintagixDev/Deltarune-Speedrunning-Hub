import { cookies } from "next/headers";


export default async function getSession(){
    const cookie = await cookies()
    const res = await fetch(`http://${process.env.HOST}:${process.env.IP_PORT}/api/me`, {
        headers: { Cookie: cookie.toString() },
    });
    const response = await res.json();
    return response
}