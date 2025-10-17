'use client'
import { useState } from 'react'
export default function Page(){
  const [subject,setSubject]=useState('')
  const [body,setBody]=useState('')
  async function send(){
    const res = await fetch('/api/announcements', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ subject, body }) })
    const j = await res.json(); alert(res.ok? 'Sent!' : j.error)
  }
  return (
    <div className="card space-y-2">
      <h1 className="h1">Announcements</h1>
      <input className="input" placeholder="Subject" value={subject} onChange={e=>setSubject(e.target.value)} />
      <textarea className="input min-h-[160px]" placeholder="Message..." value={body} onChange={e=>setBody(e.target.value)} />
      <button className="btn" onClick={send}>Send to All Reps</button>
    </div>
  )
}
