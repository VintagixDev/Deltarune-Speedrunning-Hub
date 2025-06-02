import css from "@/app/css/footer.module.css";


export default function Footer(){
    return(
        <div className={css.footer}>
            
        <div className={css.footerContainer}>
            <ul className={css.links}>
                <p>External links</p>
                <li><a href="/discord" target="_blank">Discord</a></li>
                <li><a href="https://speedrun.com/deltarune" target="_blank">Speedrun.com</a></li>
                <li><a href="https://speedrun.com/deltarune/resources/" target="_blank">Resources</a></li>
                <li><a href="https://nhaar.github.io/dr-ac-yt-retimer/" target="_blank">Retimer</a></li>
            </ul>

            <ul className={css.links}>
                <p>Pages</p>
                <li><a href="/guides">Guides</a></li>
                
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