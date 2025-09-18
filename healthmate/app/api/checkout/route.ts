import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function POST(req: NextRequest){ const { user_id } = await req.json(); const session = await stripe.checkout.sessions.create({ payment_method_types:['card'], mode:'subscription', line_items:[{ price: process.env.STRIPE_PRICE_ID || 'price_XXXX', quantity:1 }], success_url: process.env.SUCCESS_URL || 'https://healthmate.vercel.app/success', cancel_url: process.env.CANCEL_URL || 'https://healthmate.vercel.app/cancel', metadata:{ user_id } }); return NextResponse.json({ url: session.url }); }
