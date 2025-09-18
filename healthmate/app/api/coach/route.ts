import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { user_id, messages } = await req.json();

    const { data: profile } = await supabase.from('profiles').select('*').eq('user_id', user_id).single().catch(()=>({data:null}));

    const { data: metrics } = await supabase.from('metrics').select('*').eq('user_id', user_id).order('day',{ascending:false}).limit(7).catch(()=>({data:[]}));

    const systemPrompt = `You are HealthMate AI Coach.
User profile:
- Age: ${profile?.age||'unknown'}
- Gender: ${profile?.gender||'unknown'}
- Goal: ${profile?.goal||'unknown'}

Last 7 days metrics:
${metrics?.map(m=>`Day: ${m.day}, Weight: ${m.weight_kg}kg, Steps: ${m.steps}, Sleep: ${m.sleep_hours}h`).join('\n')}

Give personalized advice in Persian or English depending on user's message.`;

    const resp = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: systemPrompt }, ...(messages||[])],
    });

    return NextResponse.json({ content: resp.choices[0].message.content });
  } catch (err:any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
