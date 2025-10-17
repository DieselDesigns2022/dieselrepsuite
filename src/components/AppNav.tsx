import Link from 'next/link'
const items = [
  { href:'/dashboard', label:'Dashboard' },
  { href:'/reps', label:'Reps' },
  { href:'/library', label:'Library' },
  { href:'/submissions', label:'Submissions' },
  { href:'/payouts', label:'Payouts' },
  { href:'/announcements', label:'Announcements' },
  { href:'/settings', label:'Settings' },
]
export default function AppNav(){
  return (
    <nav className="space-y-2">
      {items.map(it=> (
        <Link key={it.href} className="block px-3 py-2 rounded-lg hover:bg-white/10" href={it.href}>{it.label}</Link>
      ))}
    </nav>
  )
}