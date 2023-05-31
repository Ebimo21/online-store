"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import AccountUser from '../icons/AccountUser'
import MenuIcon from '../icons/menuIcon'
import Search from '../icons/Search'
import Cart from '../icons/Cart'
import useCart from '@/hooks/useCart'

const Header = () => {
  const [showMenu, setShowMenu] = useState<Boolean>(false);
  const {cart, setCart, addToCart} = useCart();
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
        <header className='flex items-center justify-between  gap-2 md:gap-4 p-2 py-4 relative shadow-xl'>
          <div className=' basis-[35%] '>
            <Link className='flex items-center gap-1' href="/">
              <Image className='w-full block' src="/images/logo1.png" width={30} height={30} alt='logo' />
              <span className='text-xl text-[#636363] font-extrabold'>ShopBox</span>
            </Link>
          </div>

          <div className={`${showMenu ? "absolute translate-x-0": "opacity-0 absolute -translate-y-96 "} md:translate-y-0 md:static md:opacity-100 md:duration-0 md:rounded-none md:shadow-none md:flex-row md:pt-0 md:mr-0 duration-200 rounded-lg md:basis-5/12 md:w-5/12  top-[80px] bg-white w-[96%] mr-2 right-0  shadow-lg pt-4 flex flex-col px-0 text-center '`}>
            <span className='p-4 border-b border-b-solid border-b-slate-200 md:border-none'>Category</span>
            <span className='p-4 border-b border-b-solid border-b-slate-200 md:border-none'>Deals</span>
            <span className='p-4 border-b border-b-solid border-b-slate-200 md:border-none'>Whats New</span>
            <span className='p-4 border-b border-b-solid border-b-slate-200 md:border-none'>Delivery</span>
          </div>

          <form onSubmit={(e)=>e.preventDefault()} className='bg-[#f8f8f8d7] grow md:grow-0 basis-3/12 border border-solid border-[#cccccc] flex items-center gap-1 rounded-md p-[2px]'>
            <input className='p-1 w-full outline-none border-0' type='search' />
            <button><Search width={20} height={20} fill='#000'/></button>
          </form>
          <div className='basis-1/12 flex items-center gap-1 md:ml-5'>
            <div className='fixed md:static bottom-20 rounded-full bg-white shadow-xl btn p-3 z-20' onClick={()=>console.log("clicked cart")}>
              <Cart width={35} height={35} fill='#7d7d7d' />
              <span className='bg-red-800 w-5 h-5 text-xs flex items-center justify-center font-bold p-1 rounded-full absolute top-0 text-white right-0'>{cart.length}</span>
              </div>
            <AccountUser width={30} height={30} fill='#4b4b4b' />
            <div onClick={()=>setShowMenu(prev=>!prev)}><MenuIcon width={30} height={30} fill='#7d7d7d' /></div>
          </div>
        </header>
      </div>
    </div>
  )
}
export default Header