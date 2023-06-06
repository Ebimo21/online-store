"use client"
import { GetProfileDetails, UploadProfilePhoto } from '@/api/dashboard/profile'
import useAuth from '@/hooks/authProvider'
import React, { FormEvent, HTMLInputTypeAttribute, InputHTMLAttributes, useEffect, useState } from 'react'

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
  }, []);

  const handleUpload =async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const el = e.currentTarget?.elements[0];
    // @ts-expect-error
    console.log(el?.files);
    
    // @ts-expect-error
    await UploadProfilePhoto(el?.files[0], accessToken);

  }
  return (
    <div>
      <div>User Profile Page</div>
      <p>User Id: {user?.id}</p>
      <p>User Email: {user?.email}</p>
      <button onClick={logoutAuth}>Logout</button>

      <form onSubmit={(e)=>handleUpload(e)}>
        <input type='file' />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Page