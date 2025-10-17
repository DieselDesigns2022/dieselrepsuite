// src/app/layout.tsx
import '../styles/globals.css'
import { Toaster } from '@/components/Toaster'

export const metadata = {
  title: 'RepSuite',
  description: 'Lightweight CRM for reps',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-6xl mx-auto p-4">{children}</div>
        <Toaster />
      </body>
    </html>
  )
}
