import css from "@/app/css/footer.module.css";
import Link from "next/link";

export default function Footer(){
    return(
        <div className={css.footer}>
            
        <div className={css.footerContainer}>
            <ul className={css.links}>
                <p>External links</p>
                <li><Link href="/discord" target="_blank">Discord</Link></li>
                <li><Link href="https://speedrun.com/deltarune" target="_blank">Speedrun.com</Link></li>
                <li><Link href="https://speedrun.com/deltarune/resources/" target="_blank">Resources</Link></li>
                <li><Link href="https://nhaar.github.io/dr-ac-yt-retimer/" target="_blank">Retimer</Link></li>
            </ul>

            <ul className={css.links}>
                <p>Pages</p>
                <li><Link href="/guides">Guides</Link></li>
                <li><Link href="/about">About</Link></li>
            </ul>

            <ul className={css.links}>
                <p>Website made by</p>
                <li>» Vintagix</li>
                <li>» ashmichda</li>
                <p>Contributors</p>
                <li>» nhaar</li>
            </ul>
            </div>
        </div>
    )
}