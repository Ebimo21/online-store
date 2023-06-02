"use client"
import Paystack from '@/components/paystack/Paystack'
import useCart from '@/hooks/cartProvider'
import Image from 'next/image'
import React from 'react'


const CheckOut = () => {
    const {cart, removeFromCart, cartTotal} = useCart();

    const handleReadCookie = () => {
      const cookieName = 'myCookie';
      const cookies = document.cookie.split(';');
  
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        console.log(cookie);
  
        if (cookie.startsWith(cookieName + '=')) {
          const cookieValue = cookie.substring(cookieName.length + 1);
          console.log(cookieValue);
          break;
        }
      }
    };
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

        <div>
          <p>Total: ${cartTotal}.00</p>
          <p>Total: #{cartTotal * 760}.00</p>
        </div>

        <button onClick={()=>handleReadCookie()}>Read</button>

        <Paystack />


    </div>
  )
}

export default CheckOut