// src/lib/supabase.ts
import { createBrowserClient, createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export function supabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export function supabaseServer() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        /**
         * Next.js App Router requires set/remove implementations even if
         * you don’t use them directly. These try/catch blocks prevent
         * build-time/edge runtime complaints when cookies are immutable.
         */
        set(name: string, value: string, options: any) {
          try {
            // @ts-ignore — Next cookies API supports object form
            cookieStore.set({ name, value, ...options })
          } catch {
            /* no-op on edge/immutable */
          }
        },
        remove(name: string, options: any) {
          try {
            // emulate removal by setting empty value
            // @ts-ignore
            cookieStore.set({ name, value: '', ...options })
          } catch {
            /* no-op */
          }
        }
      }
    }
  )
}
