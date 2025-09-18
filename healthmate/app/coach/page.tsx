"use client";
import { useState } from 'react';
export default function CoachPage(){ 
  const [messages,setMessages]=useState([]);
  const [input,setInput]=useState('');
  const sendMessage=async()=>{
    const newMessages=[...messages,{role:'user',content:input}];
    setMessages(newMessages); setInput('');
    const res=await fetch('/api/coach',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:'test-1',messages:newMessages})});
    const data=await res.json();
    setMessages([...newMessages,{role:'assistant',content:data.content||data}]);
  };
  return (<div style={{padding:40}}><h1>HealthMate Coach</h1><div style={{border:'1px solid #ccc',padding:10,height:300,overflowY:'auto',marginBottom:10}}>{messages.map((m,i)=>(<p key={i}><b>{m.role}:</b> {m.content}</p>))}</div><input value={input} onChange={e=>setInput(e.target.value)} style={{padding:8,width:'70%'}} /><button onClick={sendMessage} style={{padding:8,marginLeft:8}}>Send</button></div>);
}
