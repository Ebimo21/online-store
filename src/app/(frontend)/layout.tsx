import Layout from '@/components/Layout'
import './globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Store',
  description: 'Online Store Front',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
