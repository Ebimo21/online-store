'use client'
import useAuth from "@/hooks/authProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const {accessToken, isLoading} = useAuth();
    
  useEffect(()=>{
      if(!isLoading && accessToken !== ""){
          router.push('/dashboard');
      }
  }, [isLoading, accessToken])
  
  if(isLoading || accessToken !=="") {
    return <p>User already logged in...</p>
  }
  return children
}
