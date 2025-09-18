import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function GET(){ const { data: profiles } = await supabase.from('profiles').select('*').not('push_token','is',null); for(const p of profiles||[]){ await fetch('https://exp.host/--/api/v2/push/send',{ method:'POST', headers:{ 'Accept':'application/json','Content-Type':'application/json' }, body: JSON.stringify({ to: p.push_token, title: 'Reminder', body: "Don’t forget to log your metrics today!" }) }); } return NextResponse.json({ sent:true }); }
