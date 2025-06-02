export default async function getSession(){
    const res = await fetch(`http://${process.env.HOST}:${process.env.IP_PORT}/api/me`);
    return await res.json()
}