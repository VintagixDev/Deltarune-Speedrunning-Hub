import Image from "next/image";
import css from "@/app/css/not-found.module.css"
import dogCheck1 from "@/images/404/dogcheck.webp"
import dogCheck2 from "@/images/404/dogcheck2.webp"

import dogCheck3 from "@/images/404/dogcheck3.gif"

export default function NotFound(){

    const dogs = [dogCheck1, dogCheck2, dogCheck3]
    const random = Math.floor(Math.random() * dogs.length)
    const dogCheck = dogs[random]
    var w;
    var h;
    switch(random){
        case 0:
            w = 300;
            h = 150;
            break;
        case 1:
            w = 300;
            h = 300;
            break;
        case 2:
            w = 350;
            h = 300;
            break;
    }

    return (
        <div className={css.notFound}>
            <div className={css.child}>
                <div>
                    
                    <Image
                    src={dogCheck}
                    alt="Dog Check"
                    width={w}
                    height={h} 
                    className={css.dogImage}/>
                </div>

                                <div className={css.separator}></div>


                <p className={css.text404}>404 | Page not found</p>
            
            </div>
        </div>

    );
}