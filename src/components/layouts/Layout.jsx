import Head from 'next/head'
import CompsLayoutsNavbar from '@/components/layouts/Navbar'
import CompsLayoutsFooter from '@/components/layouts/Footer'

export default function CompLayout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
        <title>Leaderboard</title>
        <link rel="icon" type="image/x-icon" href="/icon-512x512.png" />
      </Head>

      <div id="comps-layout">
        <CompsLayoutsNavbar />
        {children}
        <CompsLayoutsFooter />
      </div>
    </>
  )
}
