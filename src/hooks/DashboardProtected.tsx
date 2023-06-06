"use client"
import React, { useEffect } from 'react';
import useAuth from './authProvider';
import { useRouter } from 'next/navigation';



const DashboardProtected = ({children}: Props) => {
    const router = useRouter();
    const {accessToken, isLoading} = useAuth();
    
    useEffect(()=>{

        if(!isLoading && accessToken == ""){
            router.push('/login');
        }
    }, [isLoading, accessToken])

     if(isLoading || accessToken =="") {
        return null
     }
    return (
    <div>{children}</div>
  )
}

export default DashboardProtected