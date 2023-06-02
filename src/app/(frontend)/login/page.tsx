"use client"
import { login } from '@/api/apiCalls';
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';


type Props = {}

const Page = (props: Props) => {

  const router = useRouter();

  const MIN_PASSWORD_LENGTH = 5;
  const MIN_EMAIL_LENGTH = 5;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  

  async function handleLogin (e: FormEvent){
    e.preventDefault();

    if(email.length<MIN_EMAIL_LENGTH){
      setError(true);
      setTimeout(()=>setError(false), 2000);
      setErrorMessage(`Email length too short! Min: ${MIN_EMAIL_LENGTH}`)
      return false;
    } 
    else if(password.length<MIN_PASSWORD_LENGTH){
      setError(true);
      setTimeout(()=>setError(false), 2000);
      setErrorMessage(`Password length too short! Min: ${MIN_PASSWORD_LENGTH}`)
      return false;
    } 
    const status =  await login(email, password);
    if(status.success){
      router.push('/dashboard')
    }
    // console.log(status);
  }

  return (
    <div>
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-md w-96">
            <h2 className="text-2xl font-semibold mb-6">Login</h2>
            <form onSubmit={(e)=>handleLogin(e)}>
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
                {error&& <p className='text-red-900 font-bold my-5 text-sm '>{errorMessage}</p>}

                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md w-full">Login</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default Page