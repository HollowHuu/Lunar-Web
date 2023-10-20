import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import { SessionProvider } from './sessionProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lunar web app.',
  description: 'New website for Lunar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider> 
      <html lang="en">
        
        <body className={inter.className}>
          
          <main className='bg-gradientbg'>
          <Header />
            {children}
            </main>
        </body>
        
      </html>
    </SessionProvider>
  )
}
