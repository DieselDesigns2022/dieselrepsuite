import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req:NextRequest){
  const sig = req.headers.get('stripe-signature')!
  const buf = Buffer.from(await req.arrayBuffer())
  let evt: any
  try{ evt = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!) } 
  catch(e:any){ return NextResponse.json({ error: e.message }, { status:400 }) }

  switch(evt.type){
    case 'checkout.session.completed':
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      // TODO: toggle access flags via Supabase service role (server-side only)
      break
  }
  return NextResponse.json({ received:true })
}