import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import "react-markdown-editor-lite/lib/index.css";
import css from "@/app/css/guides/strat.module.css"
import Image from "next/image";
import backImage from "@/images/buttons/back.png";
import editImage from "@/images/buttons/edit.png"
import deleteImage from "@/images/buttons/delete.png";

import getSession from '@/lib/auth';


async function getStratFromID(id){
    const res = await fetch(`http://${process.env.HOST}:${process.env.IP_PORT}/api/strats/get?stratID=${id}`);
    const response = await res.json()
    return response
}

var video;
function getVideo(strat){
    if(strat.stratVideo != null){
        var video = strat.stratVideo.replace("watch?v=", "embed/")
        return(
            <iframe width="642" height="358" src={video} allowFullScreen />
)
    } else{
        return (<p></p>)
    }
}

function getActionButtons(user, strat){
    if(user.error != null) return;
    if(user.banned == 1) return;
    if(user.userID == strat.userID || user.userRole >= 1){
        
        return (
            <div className={css.buttons}>
                <a href={`/guide/edit?stratID=${strat.stratID}`}>
                    <button style={{backgroundColor: 'rgb(221, 133, 2)'}}>
                      <Image 
                      src={editImage}
                      alt="View"
                      width={30}
                      height={30}
                      style={{marginLeft: "1px"}}
                      />
                    </button></a>
                    <a href={`/api/strats/delete?stratID=${strat.stratID}`}>
                    <button style={{backgroundColor: 'rgb(221, 2, 2)'}}>
                      <Image 
                      src={deleteImage}
                      alt="delete"
                      width={25}
                      height={25}
                      style={{marginTop: "2px"}}
                      />
                    </button></a>
            </div>
        )
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ stratID: string }>
}) {
    const { stratID } = await params;
    const _strat = await getStratFromID(stratID);
    const strat = _strat[0]
    video = getVideo(strat);
    var user = await getSession();
    const buttons = getActionButtons(user, strat)

   return (
    <div className={css.stratContainer}>
        <div className={css.stratHeader}>
            
            <a href={`/guides/${strat.chapterLink}`}>
            <Image
                src={backImage}
                alt="Go Back"
                width={40} 
            />
          </a>
            <h1>{strat.stratName}</h1>
            <p>by {strat.userDisplayName}</p>
      </div>
      <div className={css.headerSubtitle}>

        <h2 style={{backgroundColor:`#${strat.sectionColor}`}}>{strat.sectionName}</h2>
            {buttons}
      </div>
        <div className={css.stratDescription}>
            {video}
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} skipHtml={false}>
                {strat.stratDescription}
                
            </ReactMarkdown>
        </div>

    </div>
  );
}

   //   <ReactMarkdown remarkPlugins={[remarkGfm]}>
  //      {strategy.description}
//      </ReactMarkdown>