import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest){ const body = await req.text(); const sig = req.headers.get('stripe-signature')!; try{ const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!); if(event.type === 'checkout.session.completed'){ const session = event.data.object as Stripe.Checkout.Session; const userId = session.metadata?.user_id; await supabase.from('profiles').upsert({ user_id: userId, active_subscription: true }, { onConflict: 'user_id' }); } return NextResponse.json({ received: true }); } catch(err:any){ return NextResponse.json({ error: err.message }, { status:400 }); } }
