// images import
import logoImg from "@/images/logo.png";
import discordImg from "@/images/discord.png"
import logoutImg from "@/images/logout/logout_icon.png"

//css
import navbar from "@/app/css/navbar.module.css";

import Image from "next/image";
import Link from "next/link";
import getSession from "@/lib/auth"

var userStatus;
async function getUserStatus(){
    var session = await getSession()
    var status = getUserProfile(session);
    if(session.error == 401){
        console.log("ERROR 401: " + session.reason)
        status = getDiscordLogButton()
    }
    return status;
}
function getUserProfile(user){
    var color = "yellow"
    if(user.banned == 1) color = "red"
    return (
        <div className={navbar.profileContainer}>
                <Image 
                src={user.userProfilePicture}
                alt= "pdp"
                width={50}
                height={50}
                className={navbar.profileImage}/>
                <li><a style={{color:`${color}`}}>{user.userDisplayName}</a></li>
                <a href="/api/user/logout">
                    <Image
                    src={logoutImg}
                    alt="LogOut"
                    width={30}
                    height={30}
                    className={navbar.logout}
                    title="Log Out"/>
                </a>
                </div>
    )
}
function getDiscordLogButton(){
    var link;
    link = `https://discord.com/oauth2/authorize?client_id=1377396893277225034&response_type=code&redirect_uri=http%3A%2F%2F${process.env.IP_DNS}%2Fapi%2Fdiscord%2Fcallback&scope=identify`
    if(process.env.IP_DNS != "fastlittleboys.com"){
        link = `https://discord.com/oauth2/authorize?client_id=1377396893277225034&response_type=code&redirect_uri=http%3A%2F%2F${process.env.HOST}%3A${process.env.IP_PORT}%2Fapi%2Fdiscord%2Fcallback&scope=identify`
    }
    return (<Link href={link}>
        <button className={navbar.discordBtn}>
            <div className={navbar.discordImage}><Image
                src={discordImg}
                alt="Discord Logo"
                width={50} /></div>
            <p>Login with Discord</p>
        </button>
    </Link>)
}

export default async function Header(){
    userStatus = await getUserStatus()
    
    return(
        <div className={navbar.navbar}>
            <ul className={navbar.navbar__child}>
                <Link href="/">
                <Image 
                src={logoImg}
                alt="flbduck"
                width={250}
                /></Link>
                <li><Link href="/guides">Guides</Link></li>
                <li><Link href="https://speedrun.com/deltarune/resources/" target="_blank">Resources</Link></li>
                <li><Link href="https://nhaar.github.io/dr-ac-yt-retimer/" target="_blank">Retimer</Link></li>
                <li><Link href="/about">About</Link></li>
            </ul>
            <ul className={navbar.navbar__child}>
                <li><Link href="/discord" target="_blank">Discord</Link></li>
                <li><Link href="https://speedrun.com/deltarune" target="_blank">Speedrun.com</Link></li>
                {userStatus}
            </ul>
        </div>
    )
}