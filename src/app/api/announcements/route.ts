import { NextRequest, NextResponse } from 'next/server'
import { resend, FROM } from '@/lib/resend'
import { supabaseServer } from '@/lib/supabase'

export async function POST(req:NextRequest){
  const sb = supabaseServer()
  const { data: { user } } = await sb.auth.getUser()
  if(!user) return NextResponse.json({ error:'Unauthorized' }, { status:401 })
  const { data: me } = await sb.from('profiles').select('role').eq('user_id', user.id).maybeSingle()
  if(!me || !['admin','owner'].includes(me.role)) return NextResponse.json({ error:'Forbidden' }, { status:403 })

  const { subject, body } = await req.json()
  if(!subject || !body) return NextResponse.json({ error:'Missing subject/body' }, { status:400 })

  // Fetch rep emails (auth.users requires RLS workarounds in Supabase; for MVP assume service role on server route or store emails redundantly in profiles)
  const { data: reps } = await sb.from('profiles').select('user_id, display_name').eq('role','rep')
  // NOTE: Depending on Supabase RLS on auth, you may keep a shadow emails table. This is a simplified placeholder:
  const { data: users } = await sb.from('auth.users').select('id, email')
  const emails = (users||[]).filter(u=> (reps||[]).some(r=>r.user_id===u.id)).map(u=> u.email!).filter(Boolean)

  if(!emails.length) return NextResponse.json({ error:'No recipients' }, { status:400 })
  await resend.emails.send({ from: FROM, to: emails, subject, text: body })
  return NextResponse.json({ ok:true, sent: emails.length })
}