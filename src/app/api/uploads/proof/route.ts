import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase'

export async function POST(req:NextRequest){
  const supabase = supabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if(!user) return NextResponse.json({ error:'Unauthorized' }, { status:401 })

  const form = await req.formData()
  const file = form.get('file') as File
  if(!file) return NextResponse.json({ error:'Missing file' }, { status:400 })

  const bucket = 'proofs'
  const key = `${user.id}/${Date.now()}-${file.name}`

  const { data, error } = await supabase.storage.from(bucket).upload(key, file, { upsert:false })
  if(error) return NextResponse.json({ error: error.message }, { status:400 })
  return NextResponse.json({ path: data.path })
}