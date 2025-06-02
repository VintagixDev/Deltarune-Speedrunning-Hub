
import getSession from "@/lib/auth";
import { redirect } from "next/navigation";


async function getStratFromID(id){
    const res = await fetch(`http://${process.env.HOST}:${process.env.IP_PORT}/api/strats/get?stratID=${id}`);
    const response = await res.json()
    console.log(response)
    return response
}

export default async function DeleteStrat({ searchParams }) {
    const stratID = (await searchParams).stratID;
    if(stratID == null){
        redirect('/')
        
    }
    const user = await getSession()
    if(user.error != null){ console.log("not logged in"); redirect('/guides') }
    if(user.banned == 1){ console.log("You are banned");  redirect('/guides')}
    var strat;
    try{
        strat = await getStratFromID(stratID);
        
        if(strat[0].stratID){
            console.log("in")
            const res = await fetch(`http://${process.env.HOST}:${process.env.IP_PORT}/api/strats/delete?stratID=${strat[0].stratID}`); 
            console.log(res.ok)
            
            
        }
    }catch(e){
        console.log(e)
        redirect('/guides')
    }
    redirect(`/guides/${strat[0].chapterLink}`)
    

}