import { supabaseServer } from './supabase-server'
export async function ensureProfile(){
  const sb = supabaseServer()
  const { data: { user } } = await sb.auth.getUser()
  if(!user) return
  const { data: existing } = await sb.from('profiles').select('user_id').eq('user_id', user.id).maybeSingle()
  if(existing) return
  const { data: invite } = await sb.from('invitees').select('*').eq('email', user.email!).maybeSingle()
  const payload = invite ? {
    user_id: user.id,
    role: 'rep', display_name: invite.display_name, rep_code: invite.rep_code, tags: invite.tags
  } : { user_id: user.id, role: 'rep' as const }
  await sb.from('profiles').insert(payload as any)
}
