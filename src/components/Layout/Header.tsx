"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import AccountUser from '../icons/AccountUser'
import MenuIcon from '../icons/menuIcon'
import Search from '../icons/Search'

const Header = () => {
  const [showMenu, setShowMenu] = useState<Boolean>(false)
  return (
    <div>
      <div className='bg-green-800 p-1 text-xs text-white flex flex-col gap-1 items-center justify-between'>
        <Link href='tel:+2348105910313'>08105910313</Link>
        <span className='hidden'>Get 50% off of selected items  |  Shop Now</span>
        <div className='flex items-center gap-5 bg-transparent'>
          <select defaultValue="eng" className='bg-transparent outline-none'>
            <option className='text-white bg-black' value="en">En</option>
            <option className='text-white bg-black' value="fr">Fr</option>
          </select>

          <select defaultValue="Nigerias" className=' bg-transparent outline-none'>
            <option className='text-white bg-black' value="Nigeria">Nigeria</option>
            <option className='text-white bg-black' value="South Africa">South Africa</option>
          </select>
        </div>
      </div>

      <div>
        <header className='flex items-center justify-between gap-2 p-2 py-4 relative shadow-xl'>
          <div className=' basis-1/12 flex items-center gap-1'>
            <Image src="/images/duffel.png" width={20} height={20} alt='logo' />
            <span className='text-2xl text-[#636363] font-extrabold'>ShopBox</span>
          </div>

          <div className={`${showMenu ? "absolute translate-x-0": "opacity-0 absolute -translate-y-96"} duration-200 rounded-lg  top-[80px] bg-white w-[96%] mr-2 right-0  shadow-lg pt-4 flex flex-col px-0 text-center '`}>
            <span className='p-4 border-b border-b-solid border-b-slate-200'>Category</span>
            <span className='p-4 border-b border-b-solid border-b-slate-200'>Deals</span>
            <span className='p-4 border-b border-b-solid border-b-slate-200'>Whats New</span>
            <span className='p-4 border-b border-b-solid border-b-slate-200'>Delivery</span>
          </div>

          <form onSubmit={(e)=>e.preventDefault()} className='bg-[#f8f8f8d7] grow basis-4/12 border border-solid border-[#cccccc] flex items-center gap-1 rounded-md p-[2px]'>
            <input className='p-1 w-full outline-none border-0' type='search' />
            <button><Search width={20} height={20} fill='#000'/></button>
          </form>
          <div className='basis-1/12 flex items-center gap-1'>
            <AccountUser width={30} height={30} fill='#7d7d7d' />
            <div onClick={()=>setShowMenu(prev=>!prev)}><MenuIcon width={30} height={30} fill='#7d7d7d' /></div>
          </div>
        </header>
      </div>
    </div>
  )
}
export default Header