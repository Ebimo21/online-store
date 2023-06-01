import Layout from '@/components/Layout'
import './globals.css'
import { Montserrat } from 'next/font/google'
import Head from 'next/head'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Store',
  description: 'Online Store Front',

  twitter: {
    card: 'app',
    title: 'StoreBox',
    description: 'StoreBox Online Store',
    // siteId: '1467726470533754880',
    creator: '@pondei',
    // creatorId: '1467726470533754880',
    images: {
      url: 'https://nextjs.org/og.png',
      alt: 'Next.js Logo',
    },
    app: {
      name: 'twitter_app',
      id: {
        iphone: 'twitter_app://iphone',
        ipad: 'twitter_app://ipad',
        googleplay: 'twitter_app://googleplay',
      },
      url: {
        iphone: 'https://iphone_url',
        ipad: 'https://ipad_url',
      },
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/fav.ico" sizes="any" />
      </Head>
      <body className={montserrat.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
