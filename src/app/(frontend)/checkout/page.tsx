"use client"
import useCart from '@/hooks/cartProvider'
import Image from 'next/image'
import React from 'react'


const CheckOut = () => {
    const {cart, removeFromCart} = useCart();
  return (
    <div className='p-4'>
        <h2>Review And Checkout</h2>

        <div>

        {cart.length > 0? cart.map((item, index)=>{
                  return(
                    <div key={index} className='text-sm font-medium'>
                      <div className='flex items-center gap-2'>
                        <span>{index+1}</span>
                        <Image src={item.image} width={50} height={50} alt={item.description} />
                        <p className='mr-auto'>{item.name}</p>

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
    </div>
  )
}

export default CheckOut