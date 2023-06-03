"use client"
import { login, signUp } from '@/api/apiCalls';
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/authProvider';
import useNotification from '@/hooks/notification';
import Link from 'next/link';

type Props = {}

const Page = (props: Props) => {

  const router = useRouter();

  const MIN_FIELD_LENGTH = 3;

  const [email, setEmail] = useState<string>("");
  const [fName, setFName]= useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {error, setError, errorMessage, setErrorMessage, success, setSuccess, successMessage, setSuccessMessage} = useNotification();

  const { loginAuth, logoutAuth } = useAuth();
  
  async function handleLogin (e: FormEvent){
    e.preventDefault();

    if(fName.length<MIN_FIELD_LENGTH){
      setError(true);
      setTimeout(()=>setError(false), 2000);
      setErrorMessage(`First Name length too short! Min: ${MIN_FIELD_LENGTH}`)
      return false;
    } 
    if(lName.length<MIN_FIELD_LENGTH){
      setError(true);
      setTimeout(()=>setError(false), 2000);
      setErrorMessage(`Last Name length too short! Min: ${MIN_FIELD_LENGTH}`)
      return false;
    } 
    if(email.length<MIN_FIELD_LENGTH){
      setError(true);
      setTimeout(()=>setError(false), 2000);
      setErrorMessage(`Email length too short! Min: ${MIN_FIELD_LENGTH}`)
      return false;
    } 
    else if(password.length<MIN_FIELD_LENGTH){
      setError(true);
      setTimeout(()=>setError(false), 2000);
      setErrorMessage(`Password length too short! Min: ${MIN_FIELD_LENGTH}`)
      return false;
    } 
    const status =  await signUp(email, password, fName, lName);
    
    if(status.success){
      setSuccess(true);
      setTimeout(()=>{
        router.push('/dashboard');
        setSuccess(false)}, 2000);
      setSuccessMessage(status.message)
      loginAuth(status.data.accessToken);
    }else{
      logoutAuth();
      setError(true);
      setTimeout(()=>setError(false), 2000);
      setErrorMessage(`${status.message}`);
    }
  }

  return (
    <div>
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-md w-96">
            <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
            <form onSubmit={(e)=>handleLogin(e)} className='my-4'>
                <div className="mb-4">
                  <label htmlFor="fname" className="block text-gray-700 font-semibold mb-2">First Name: </label>
                  <input 
                  type="text" 
                  onChange={(e)=>setFName(e.target.value)}
                  id="fname" 
                  className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" 
                  placeholder="Enter your First Name" 
                  required />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="lname" className="block text-gray-700 font-semibold mb-2">Last Name</label>
                  <input 
                  type="text" 
                  onChange={(e)=>setLName(e.target.value)}
                  id="lname" 
                  className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" 
                  placeholder="Enter your Last Name" 
                  required />
                </div>
                <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                <input 
                 type="email" 
                 onChange={(e)=>setEmail(e.target.value)}
                 id="email" 
                 className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" 
                 placeholder="Enter your email" 
                 required />
                </div>
                <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                <input 
                 type="password" 
                 onChange={(e)=>setPassword(e.target.value)} 
                 id="password" className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="Enter your password" required />
                </div>
                {error&& <p className='text-red-800 font-bold my-5 text-sm '>{errorMessage}</p>}
                {success&& <p className='text-green-600 font-bold my-5 text-sm '>{successMessage}</p>}

                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md w-full">Login</button>
            </form>

            <p>Have an Account? <Link href={'/login'}><span className='text-green-500 font-bold'>Log In</span></Link></p>

            </div>
        </div>
    </div>
  )
}

export default Page