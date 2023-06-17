"use client"
import { backendHost } from '@/api/apiCalls'
import useProfileAPICall from '@/api/dashboard/profile'
import useAuth from '@/hooks/authProvider'
import useNotification from '@/hooks/notification'
import React, { FormEvent, useEffect, useState} from 'react'

const Page = () => {
  const {GetProfileDetails} = useProfileAPICall();
  const {successMessage, setSuccessMessage, setSuccess, success }= useNotification()
  const {accessToken, refreshToken, logoutAuth, setRefresh} = useAuth();
  const [user, setUser] = useState<user|null>(null);

  const handleUpload =async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const el = e.currentTarget?.elements[0];
    // @ts-expect-error
    console.log(el?.files);
    
    // @ts-expect-error
    
    const response = await UploadProfilePhoto(el?.files[0]);
    if(response.success){
      setSuccess(true);
      setRefresh(prev=>!prev)
      setSuccessMessage(response.message)
      setTimeout(()=>{
        setSuccess(false);
      }, 2000)

    }

  }

  useEffect(() => {
    const handleGetProfile = async() =>{
      const response = await GetProfileDetails(accessToken, refreshToken);
      console.info(response.data)
      if(response.data !== null) setUser(response.data[0])
    }

    handleGetProfile();
  }, [])
  return (
    <div>
      <div>User Profile Page</div>
      <p>User Id: {user?.id}</p>
      <p>LName: {user?.fname}</p>
      <p>LName: {user?.lname}</p>
      <p>User Email: {user?.email}</p>
      <p>{accessToken}</p>
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