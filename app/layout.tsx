import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arjun & Associates — Client Inquiry',
  description: 'Submit your legal inquiry and our team will respond within 24 hours.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased min-h-screen">{children}</body>
    </html>
  )
}
