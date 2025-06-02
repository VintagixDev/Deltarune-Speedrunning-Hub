import Header from "./header"
import Footer from "./footer"
import "@/app/css/globals.css"
import getSession from "@/lib/auth";
export const metadata = {
  title: "Deltarune Speedrunning Hub",
  description: "The (un)official Deltarune Speedrunning Hub",
};




export default async function RootLayout({ children }) {

  await getSession()

  const header = Header()
  const footer = Footer()
  return (
    <html lang="en">
<link rel="icon" href="/favicon.ico" sizes="any" />
      <body>
        <header>
        {header}
        </header>
        {children}

        <footer>
          {footer}
        </footer>
      </body>

      
    </html>
  );
}
