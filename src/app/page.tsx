
import css from "@/app/css/home.module.css"
import deltaruneBg from "@/images/deltarune_fountain.gif"
import Image from "next/image";
import duckThrash from "@/images/thrash/duck.png"
import swordThrash from "@/images/thrash/sword.png"
import flameThrash from "@/images/thrash/flame.png"
import laserThrash from "@/images/thrash/laser.png"

import Link from "next/link";
export default async function Home() {

  return (

    
    <div className={css.home}>
      
      <div className={css.banner}>
       <Image
    src={deltaruneBg}
    alt="Fountain"
    width={960}
    height={540}
  /></div>

      <div className={css.title}>
        <h1>DELTARUNE</h1>
        <h1>SPEEDRUNNING HUB</h1>
      </div>
      
      <div className={css.welcomeText}>
        <h1>* Welcome to the official hub for all things Deltarune Speedrunning related!</h1>
        <h2>* Click on the different thrash machines below to navigate through the website!</h2>
        
      </div>

      <div className={css.thrashContainer}>

       <div className={css.thrash} >
        <Link href="/guides">
          <Image
          src={duckThrash}
          alt="ThrashMachine"
          height={125}
          className={css.thrashImage}
          /></Link>
          <Link href="/guides">Guides</Link>
       </div>

       <div className={css.thrash} >
        
        <Link href="https://speedrun.com/deltarune/resources/" target="_blank">
          <Image
          src={swordThrash}
          alt="ThrashMachine"
          height={125}
          className={css.thrashImage}
          />
          </Link>
          <Link href="https://speedrun.com/deltarune/resources/" target="_blank">Resources</Link>
       </div>

       <div className={css.thrash} >
          <Link href="https://nhaar.github.io/dr-ac-yt-retimer/" target="_blank">
          <Image
          src={flameThrash}
          alt="ThrashMachine"
          width={185}
          className={css.thrashImage}
          /></Link>
          <Link href="https://nhaar.github.io/dr-ac-yt-retimer/" target="_blank">Retimer</Link>
       </div>

       <div className={css.thrash} >
          <Link href="/about">
          <Image
          src={laserThrash}
          alt="ThrashMachine"
          width={160}
          className={css.thrashImage4}
          
          /></Link>
          <Link href="/about">About</Link>
       </div>

      </div>

    </div>
    
  );
}
