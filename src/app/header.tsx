// images import
import logoImg from "@/images/logo.png";
import discordImg from "@/images/discord.png"
import logoutImg from "@/images/logout/logout_icon.png"

//css
import navbar from "@/app/css/navbar.module.css";

import Image from "next/image";
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
    return (<a href="https://discord.com/oauth2/authorize?client_id=1377396893277225034&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fdiscord%2Fcallback&scope=identify">
        <button className={navbar.discordBtn}>
            <div className={navbar.discordImage}><Image
                src={discordImg}
                alt="Discord Logo"
                width={50} /></div>
            <p>Login with Discord</p>
        </button>
    </a>)
}

export default async function Header(){
    userStatus = await getUserStatus()
    
    return(
        <div className={navbar.navbar}>
            <ul className={navbar.navbar__child}>
                <a href="/">
                <Image 
                src={logoImg}
                alt="flbduck"
                width={250}
                /></a>
                <li><a href="/guides">Guides</a></li>
                <li><a href="https://speedrun.com/deltarune/resources/" target="_blank">Resources</a></li>
                <li><a href="https://nhaar.github.io/dr-ac-yt-retimer/" target="_blank">Retimer</a></li>
                <li><a href="/about">About</a></li>
            </ul>
            <ul className={navbar.navbar__child}>
                <li><a href="/discord" target="_blank">Discord</a></li>
                <li><a href="https://speedrun.com/deltarune" target="_blank">Speedrun.com</a></li>
                {userStatus}
            </ul>
        </div>
    )
}