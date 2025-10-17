import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase'
import { parseCSV } from '@/utils/csv'

export async function POST(req:NextRequest){
  const text = await req.text()
  const rows = parseCSV(text) // expects columns: email, display_name, rep_code, tags (comma)
  const supabase = supabaseServer()
  const inserts = rows.map(r=> ({
    email: (r.email||'').trim(),
    display_name: (r.display_name||'').trim(),
    rep_code: (r.rep_code||'').trim(),
    tags: (r.tags||'').split(',').map(t=>t.trim()).filter(Boolean)
  })).filter(r=> r.email)

  if(!inserts.length) return NextResponse.json({ error:'No valid rows' }, { status:400 })

  const { error } = await supabase.from('invitees').insert(inserts.map(i=>({ email:i.email, display_name:i.display_name, rep_code:i.rep_code, tags:i.tags })))
  if(error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok:true, count: inserts.length })
}