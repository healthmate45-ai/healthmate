"use client";
import { useState,useEffect } from 'react';
export default function MetricsPage(){
  const [form,setForm]=useState({weight_kg:'',steps:'',sleep_hours:'',notes:''});
  const [metrics,setMetrics]=useState([]);
  useEffect(()=>{ fetch('/api/metrics?user_id=test-1').then(r=>r.json()).then(d=>setMetrics(d||[])); },[]);
  const handleChange=(e)=>setForm({...form,[e.target.name]:e.target.value});
  const handleSubmit=async()=>{
    await fetch('/api/metrics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:'test-1',day:new Date().toISOString().split('T')[0],...form})});
    alert('Saved ✅'); const res=await fetch('/api/metrics?user_id=test-1'); const d=await res.json(); setMetrics(d);
  };
  return (<div style={{padding:40}}><h1>📊 Daily Metrics</h1><div style={{marginBottom:20}}><input name='weight_kg' placeholder='Weight (kg)' value={form.weight_kg} onChange={handleChange} style={{marginRight:10}} /><input name='steps' placeholder='Steps' value={form.steps} onChange={handleChange} style={{marginRight:10}} /><input name='sleep_hours' placeholder='Sleep (hours)' value={form.sleep_hours} onChange={handleChange} style={{marginRight:10}} /><input name='notes' placeholder='Notes' value={form.notes} onChange={handleChange} style={{marginRight:10}} /><button onClick={handleSubmit}>Save</button></div><h2>History</h2><ul>{metrics.map((m,i)=>(<li key={i}>{m.day}: {m.weight_kg}kg, {m.steps} steps, {m.sleep_hours}h, {m.notes}</li>))}</ul></div>);
}
