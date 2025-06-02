export default async function getSession(){
    const res = await fetch(`http://localhost:3000/api/me`);
    return await res.json()
}