// src/app/layout.tsx
export const metadata = { title: 'RepSuite', description: 'Lightweight CRM for reps' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0}}>
        <div style={{maxWidth: '960px', margin: '0 auto', padding: '16px'}}>{children}</div>
      </body>
    </html>
  )
}
