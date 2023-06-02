"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import AccountUser from '../icons/AccountUser'
import MenuIcon from '../icons/menuIcon'
import Search from '../icons/Search'
import Cart from '../icons/Cart'
import useCart from '@/hooks/cartProvider';
import { useRouter, usePathname } from 'next/navigation'

const Header = () => {
  const router = useRouter();
  const path = usePathname()
  const [showMenu, setShowMenu] = useState<Boolean>(false);
  const [showCartContent, setShowCartContent] = useState<Boolean>(false);
  const { ckStore, ckStoreCount, removeFromCart, cartTotal} = useCart();

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
            <div className={`${path=="/checkout"? "hidden md:static": "fixed md:static"}  bottom-20 rounded-full bg-white shadow-xl btn p-3 z-20`} >
              <div onClick={()=>{setShowCartContent(prev=>!prev)}}>
                <Cart width={35} height={35} fill='#7d7d7d' />
              </div>
              <span className='bg-red-800 w-5 h-5 text-xs flex items-center justify-center font-bold p-1 rounded-full absolute top-0 text-white right-0'>{ckStoreCount}</span>
              {showCartContent && (<div className='absolute p-4 bg-white shadow-2xl h-[70vh] w-[93vw] rounded-2xl bottom-16 right-0'>
                <h3 className="text-3xl font-bold">Cart </h3>
                <hr />

                <div className='h-[400px] mt-5 overflow-y-scroll'>
                  {ckStore.length > 0? ckStore.map((item, index)=>{
                    return(
                      <div key={index} className='text-sm font-medium'>
                        <div className='flex items-center gap-2'>
                          <Link href={`/item/${item.id}`}><Image src={item.image} width={50} height={50} alt={item.description} /></Link>
                          <Link href={`/item/${item.id}`}><p className='mr-auto'>{item.name}</p></Link>

                          <div className=' flex items-center justify-start gap-2'>
                            <button onClick={()=>removeFromCart(item)}>x</button>
                            <span className='p-2 shadow-lg rounded-lg '>{item.count}</span>
                            <span className='p-2 shadow-lg rounded-lg '>{item.amount} $</span>
                          </div>
                        </div>

                      </div>
                    )
                  }): <p>Cart is Empty</p>}
                </div>

                  <div className='absolute bottom-5 w-11/12 flex items-center justify-between'>
                      <span>Total: {cartTotal} </span>
                      <button onClick={()=>{setShowCartContent(prev=>!prev); setTimeout(()=>{router.push('/checkout')}, 100)}} className=' btn p-4 bg-[#068d21] text-xl text-white font-bold rounded-lg'>Checkout</button>
                  </div>
                {ckStore.length> 0 && (
                  <div className='absolute bottom-5 w-11/12 flex items-center justify-between'>
                      <span>Total: {cartTotal} </span>
                      <Link href="/checkout"><button className=' btn p-4 bg-[#068d21] text-xl text-white font-bold rounded-lg'>Checkout</button></Link>
                  </div>
                )}
              </div>)}
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