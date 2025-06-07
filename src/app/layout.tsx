import Header from "./header"
import Footer from "./footer"
import "@/app/css/globals.css"
import getSession from "@/lib/auth";
import Head from "next/head";
export const metadata = {
  title: "Deltarune Speedrunning Hub",
  description: "The unofficial Deltarune Speedrunning Hub",
};




export default async function RootLayout({ children }) {

  await getSession()

  const header = Header()
  const footer = Footer()
  return (
    <html lang="en">
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <Head>
      <meta property="og:image" content="/favicon.ico" />
    </Head>
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
