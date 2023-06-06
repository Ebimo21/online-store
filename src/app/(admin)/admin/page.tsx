"use client"
import useAuth from '@/hooks/authProvider'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  const {accessToken} = useAuth();
  return (
    <div>
      <div>Admin Dashboard</div>
      <p>{accessToken}</p>
    </div>
  )
}

export default Page