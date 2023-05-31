"use client"
import { useState } from "react";

export default function useCart(){
    const [cart, setCart] = useState<Array<object>>([{}]);

    const addToCart = (item:object) =>{
        setCart(prev=>[...prev, item])
        console.log(cart);
    }

    return { cart, setCart, addToCart}
}