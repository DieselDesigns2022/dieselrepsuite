import { supabaseServer } from '@/lib/supabase'
import { redirect } from 'next/navigation'
export default async function Home(){
  const { data: { user } } = await supabaseServer().auth.getUser()
  redirect(user? '/dashboard' : '/login')
}