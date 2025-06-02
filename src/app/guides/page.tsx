import css from "@/app/css/guides/guidesPage.module.css"
import Image from "next/image";

export default async function Guides(){

    const res = await fetch(`http://localhost:3000/api/chapters/get`);
    const response = await res.json();
    
    response.map((chapter) =>(
        
        chapter.link = `/guides/${chapter.chapterLink}`
    ));

    return (

    <div className={css.guide}>
        <p className={css.guideTitle}>* Select your chapter.</p>
        <div className={css.chapterContainers}>

            
            {response.map((chapter) =>(
                
                <div key={chapter.chapterID} className={css.chapter}>
                
                    <a href={chapter.link}>
                
                        <Image
                            src={chapter.chapterImage}
                            alt={chapter.chapterName}
                            width={200}
                            height={176}
                        />
                        <p>{chapter.chapterName}</p>
                
                    </a>
                
                </div>
            ))}        
            

        </div>
    </div>
    );
}