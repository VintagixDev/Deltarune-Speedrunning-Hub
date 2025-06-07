import css from "@/app/css/guides/chapterLink.module.css";

import viewImage from "@/images/buttons/view.png"
import deleteImage from "@/images/buttons/delete.png"
import editImage from "@/images/buttons/edit.png"
import backImage from "@/images/buttons/back.png"
import newImage from "@/images/buttons/new.png"

import Image from "next/image";
import Link from "next/link";
import NotFound from "@/app/not-found"

import ActionButtonsClient from '@/lib/component/ActionButtonsClient'
import getSession from "@/lib/auth";

async function getStratsFromChapter(chapter){
  const res = await fetch(`http://${process.env.HOST}:${process.env.IP_PORT}/api/strats/get?chapterName=${chapter}`);
  const response = await res.json()
  return response
}

async function getSectionsFromChapter(chapter){
 const res = await fetch(`http://${process.env.HOST}:${process.env.IP_PORT}/api/section/get?chapterName=${chapter}`);
 
 return await res.json();
}

async function getChapter(chapter){
  const res = await fetch(`http://${process.env.HOST}:${process.env.IP_PORT}/api/chapters/get?chapterName=${chapter}`);
  return await res.json();
}

async function deleteStrat(stratID) {
  try {
    const res = await fetch(`/api/strats/delete?stratID=${stratID}`);
    const data = await res.json();
    console.log("DELETE RESPONSE:", data);
  } catch (err) {
    console.error("DELETE ERROR:", err);
  }
}




function getNewButton(user, chapter){
  if(user.error != null) return;
  if(user.banned == 1) return;
  return (
    <Link href={`/guide/new?chapterLink=${chapter[0].chapterLink}`}>
      <button style={{backgroundColor: 'rgb(0, 219, 11)'}} className={css.button}>
        <Image 
          src={newImage}
          alt="new"
          width={24}
          height={25}
          style={{marginTop: "3px", marginRight: "0px"}}
          
        
        />
      </button>
    </Link>
  )
}

export default async function Page({
    params,
}: {
    params: Promise<{ chapterLink: string }>
}) {
    const { chapterLink } = await params
    
    const strats = await getStratsFromChapter(chapterLink)
    const sections = await getSectionsFromChapter(chapterLink)
    const chapter = await getChapter(chapterLink);
    const user = await getSession()
    const newButton = getNewButton(user, chapter);
    if(chapter[0] == undefined){
      return NotFound();
    }

    return (

      <div>
        <div className={css.stratTitle}>
                    
          <Link href="/guides">
          <Image
            src={backImage}
            alt="Go Back"
            width={40} 
          />
          </Link>
          <h1 key={chapter[0].chapterID}>{chapter[0].chapterName} Guides</h1>
          {newButton}
        </div>
        
        <div className={css.container}>          

        {sections.map((section) => (
          
          <div style={{marginBottom:"100px"}} key={section.sectionID}>
            <div className={css.sectionContainer} >
                <h1 className={css.firstBox}>{section.sectionName}</h1>
                <h1 className={css.secondBox}>Author(s)</h1>
                <h1 className={css.thirdBox}>Actions</h1>
            </div>
          
            <div>
              {strats.filter((strat) => strat.sectionID === section.sectionID).map((strat) => (

                <div className={css.sectionContainer} key={strat.stratID}>

                  <Link className={css.firstBox} href={`/guide/${strat.stratID}`}>{strat.stratName}</Link>
                  <p className={css.secondBox}>by {strat.userDisplayName}</p>
                  <div className={css.buttons}>
                  <Link href={`/guide/${strat.stratID}`}>
                    <button className={css.button} style={{backgroundColor: 'rgb(9, 202, 3)'}}>
                      <Image 
                      src={viewImage}
                      alt="View"
                      width={35}
                      height={35}
                      style={{marginTop: "2px"}}
                      />
                    </button></Link>
                    <ActionButtonsClient user={user} strat={strat} />
                    </div>
                </div>
                
              ))}
              </div>     
          
          </div>

  ))}
        
        
  

        


        
          
          </div>
        
        </div>
        
        
      )
    }