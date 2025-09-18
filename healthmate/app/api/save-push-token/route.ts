import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest){ const { user_id, token } = await req.json(); const { error } = await supabase.from('profiles').update({ push_token: token }).eq('user_id', user_id); if(error) return NextResponse.json({ error }, { status:400 }); return NextResponse.json({ success:true }); }
