import { requireUser } from '@/lib/auth'
import AppNav from '@/components/AppNav'

export default async function AuthedLayout({ children }:{children:React.ReactNode}){
  await requireUser()
  return (
    <div className="grid grid-cols-[220px_1fr] gap-6">
      <aside className="card h-full sticky top-4 self-start"><AppNav/></aside>
      <main>{children}</main>
    </div>
  )
}