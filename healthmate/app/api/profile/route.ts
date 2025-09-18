import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest){ const { user_id,name,goal,age,gender,height_cm,weight_kg,email } = await req.json(); const { data, error } = await supabase.from('profiles').upsert({ user_id,name,goal,age,gender,height_cm,weight_kg,email }, { onConflict: 'user_id' }); if(error) return NextResponse.json({ error }, { status:400 }); return NextResponse.json({ success:true, data }); }
export async function GET(req: NextRequest){ const { searchParams } = new URL(req.url); const user_id = searchParams.get('user_id'); const { data, error } = await supabase.from('profiles').select('*').eq('user_id', user_id).single(); if(error) return NextResponse.json({ error }, { status:400 }); return NextResponse.json(data); }
