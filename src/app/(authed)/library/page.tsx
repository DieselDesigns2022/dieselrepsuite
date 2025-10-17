'use client'
import { useState } from 'react'
export default function Page(){
  const [file,setFile] = useState<File|null>(null)
  async function upload(){
    if(!file) return
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch('/api/uploads/promo', { method:'POST', body: fd })
    const j = await res.json()
    alert(res.ok? `Uploaded: ${j.path}` : j.error)
  }
  return (
    <div className="card space-y-3">
      <h1 className="h1">Content Library</h1>
      <input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} />
      <button className="btn" onClick={upload}>Upload Promo</button>
    </div>
  )
}
