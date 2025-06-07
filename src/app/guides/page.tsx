import css from "@/app/css/guides/guidesPage.module.css"
import Image from "next/image";
import Link
 from "next/link";
export default async function Guides(){

    const res = await fetch(`http://${process.env.HOST}:${process.env.IP_PORT}/api/chapters/get`);
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
                
                    <Link href={chapter.link}>
                
                        <Image
                            src={chapter.chapterImage}
                            alt={chapter.chapterName}
                            width={200}
                            height={176}
                        />
                        <p>{chapter.chapterName}</p>
                
                    </Link>
                
                </div>
            ))}        
            

        </div>
    </div>
    );
}