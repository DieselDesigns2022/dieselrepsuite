import { NextRequest, NextResponse } from 'next/server'
import { resend, FROM } from '@/lib/resend'
import { supabaseServer } from '@/lib/supabase-server'

export async function POST(req:NextRequest){
  const sb = supabaseServer()
  const { data: { user } } = await sb.auth.getUser()
  if(!user) return NextResponse.json({ error:'Unauthorized' }, { status:401 })
  const { data: me } = await sb.from('profiles').select('role').eq('user_id', user.id).maybeSingle()
  if(!me || !['admin','owner'].includes(me.role)) return NextResponse.json({ error:'Forbidden' }, { status:403 })

  const { subject, body } = await req.json()
  if(!subject || !body) return NextResponse.json({ error:'Missing subject/body' }, { status:400 })

  // NOTE: For production, store emails in profiles or use a service-role function.
  const { data: reps } = await sb.from('profiles').select('user_id').eq('role','rep')
  const { data: users } = await sb.from('auth.users').select('id, email')
  const emails = (users||[]).filter(u=> (reps||[]).some(r=>r.user_id===u.id)).map(u=> u.email!).filter(Boolean)

  if(!emails.length) return NextResponse.json({ error:'No recipients' }, { status:400 })
  await resend.emails.send({ from: FROM, to: emails, subject, text: body })
  return NextResponse.json({ ok:true, sent: emails.length })
}
