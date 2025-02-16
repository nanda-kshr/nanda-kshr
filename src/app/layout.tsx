import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nandakishore P',
  description: 'I am Nandakishore P, Its my portfolio Website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
