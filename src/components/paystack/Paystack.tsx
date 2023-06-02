"use client"
import useCart from '@/hooks/cartProvider'
import React, {Fragment, useState} from 'react'
import { PaystackButton } from 'react-paystack'

type Props = {}

const Paystack = (props: Props) => {
    const {cartTotal} = useCart();
    const publicKey = "pk_test_60d8de5dfce1e22ec80c9914d319b44fac57f09a"
    const amount = cartTotal * 760 * 100 // Remember, set in kobo!
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [phone, setPhone] = useState<number>(0)
    

    const componentProps = {
        email,
        amount,
        
        publicKey,
        text: "Pay Now",
        onSuccess: () =>
          alert("Thanks for doing business with us! Come back soon!!"),
        onClose: () => alert("Wait! You need this oil, don't go!!!!"),
        
      }
  
  return(
    <Fragment>
        <div className="checkout-form">
          <div className="">
            <label htmlFor="name" className="block mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                onChange={(e) => setName(e.target.value)}
              />
          </div>
          <div className="">
            <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="text"
                id="email"
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div className="">
            <label htmlFor="phone" className="block mb-2">Phone</label>
              <input
                type="text"
                id="phone"
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                required
                onChange={(e) => setPhone(parseInt(e.target.value))}
              />
          </div>
          <PaystackButton className="paystack-button btn p-3 bg-green-900 text-white mt-4 font-bold rounded-lg" {...componentProps} />
        </div>
    </Fragment>
  )
}

export default Paystack