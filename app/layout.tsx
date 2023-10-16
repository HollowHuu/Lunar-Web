import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/modules/header'

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
    <html lang="en">
      <Header></Header>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
