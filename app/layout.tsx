import React from "react"
import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { AppProvider } from '@/lib/store'

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ['200', '300', '400', '500', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Football Booking",
  description: "Book your football fields locally",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} font-sans antialiased bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50`}>
        <AppProvider>
          {children}
        </AppProvider>
        <Analytics />
      </body>
    </html>
  )
}
