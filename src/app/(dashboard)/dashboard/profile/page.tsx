"use client"
import { GetProfileDetails } from '@/api/dashboard/profile'
import useAuth from '@/hooks/authProvider'
import React, { useEffect, useState } from 'react'

type Props = {}
type user = { id: string; fname: string; lname: string; email: string; } | null

const Page = (props: Props) => {
  const [user, setUser] = useState<user>(null);
  const {accessToken, logoutAuth} = useAuth();

  useEffect(()=>{
    async function fetChProfile (){
      const response = await GetProfileDetails(accessToken);
      if(response.data !== null) setUser(response.data[0])
    }

    fetChProfile();

  }, [])
  return (
    <div>
      <div>User Profile Page</div>
      <p>User Id: {user?.id}</p>
      <p>User Email: {user?.email}</p>
      <button onClick={logoutAuth}>Logout</button>
    </div>
  )
}

export default Page