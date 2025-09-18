import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest){ const { user_id, day, weight_kg, steps, sleep_hours, notes } = await req.json(); const { error } = await supabase.from('metrics').insert({ user_id, day, weight_kg, steps, sleep_hours, notes }); if(error) return NextResponse.json({ error }, { status:400 }); return NextResponse.json({ success:true }); }
export async function GET(req: NextRequest){ const { searchParams } = new URL(req.url); const user_id = searchParams.get('user_id'); const { data, error } = await supabase.from('metrics').select('*').eq('user_id', user_id).order('day',{ascending:true}); if(error) return NextResponse.json({ error }, { status:400 }); return NextResponse.json(data); }
