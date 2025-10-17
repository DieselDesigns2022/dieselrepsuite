'use client'
import { supabaseBrowser } from '@/lib/supabase'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function LoginForm(){
  const [email,setEmail] = useState('')
  async function send(){
    const { error } = await supabaseBrowser().auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard` }
    })
    if(error) return toast.error(error.message)
    toast.success('Check your email for a magic link!')
  }
  return (
    <div className="space-y-3">
      <label className="label">Email</label>
      <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/>
      <button className="btn" onClick={send}>Send Magic Link</button>
    </div>
  )
}