import css from "@/app/css/about.module.css"

export default function About(){

    return(
        <div className={css.aboutContainer}>
            <p style={{marginBottom:"400px"}}>About - Coming soon...</p>
            <p>To contact us, please join our <a href="fastlittleboys.com/discord" style={{color: 'blue'}}>Discord Server</a> and ping @ashmichda or @vintagix in #technical-talk.</p>
        </div>
    ) 
}