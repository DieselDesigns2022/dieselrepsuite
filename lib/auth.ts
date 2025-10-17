import { redirect } from 'next/navigation'
import { supabaseServer } from './supabase-server'

export async function requireUser(){
  const supabase = supabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if(!user) redirect('/login')
  return user
}
