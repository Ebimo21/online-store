"use client"
import { backendHost } from '@/api/apiCalls'
import { GetProfileDetails, UploadProfilePhoto } from '@/api/dashboard/profile'
import useAuth from '@/hooks/authProvider'
import useNotification from '@/hooks/notification'
import React, { FormEvent, HTMLInputTypeAttribute, InputHTMLAttributes, useEffect, useState } from 'react'

const Page = () => {
  const {successMessage, setSuccessMessage, setSuccess, success }= useNotification()
  const {accessToken, logoutAuth, user, setRefresh} = useAuth();
  console.log(user);

  const handleUpload =async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const el = e.currentTarget?.elements[0];
    // @ts-expect-error
    console.log(el?.files);
    
    // @ts-expect-error
    
    const response = await UploadProfilePhoto(el?.files[0], accessToken);
    if(response.success){
      setSuccess(true);
      setRefresh(prev=>!prev)
      setSuccessMessage(response.message)
      setTimeout(()=>{
        setSuccess(false);
      }, 2000)

    }

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
      {success && <p>{successMessage}</p>}
      <img src={`${backendHost}/${user?.pfp}`} width={250} height={250} alt="adadf" />

    </div>
  )
}

export default Page