"use client";
import { useState } from 'react';
export default function SubscribePage(){ 
  const [loading,setLoading]=useState(false);
  const handleCheckout=async()=>{
    setLoading(true);
    const res=await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:'test-1'})});
    const data=await res.json();
    window.location.href=data.url;
  };
  return (<div style={{padding:40}}><h1>Subscribe to HealthMate</h1><p>$10/month — 7-day free trial</p><button onClick={handleCheckout} disabled={loading}>{loading?'Redirecting...':'Subscribe Now'}</button></div>);
}
