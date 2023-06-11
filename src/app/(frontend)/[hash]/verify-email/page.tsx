"use client"
import { verifyEmail } from "@/api/apiCalls";
import { useEffect } from "react";


export default function Page({ params } : { params: { hash: string } }) {
    const hash = params.hash;
    
    useEffect(()=>{
        verifyEmail(hash);
    }, [])

    return (
      <div><p>Verifying Email</p></div>
    )
  }