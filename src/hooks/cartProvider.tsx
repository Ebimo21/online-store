"use client"
import { categories } from "@/database/db";
import { SetStateAction, useMemo } from "react";
import { createContext, Dispatch, useContext, useState } from "react";

type CartContextType = {
    cart: ShopItem[]; 
    setCart: Dispatch<SetStateAction<Array<ShopItem>>>;
    addToCart: (item: ShopItem) => void;
    removeFromCart: (item: ShopItem) => void;
    cartCount: number;
    inventory: ShopItem[]; 
    cartTotal: number;
  };

const CartContext = createContext<CartContextType> ({
    cart: [],
    setCart: ()=>{},
    addToCart: () =>{},
    removeFromCart: () =>{},
    cartCount: 0,
    inventory: [],
    cartTotal: 0,
});

export default function useCart(){
    return useContext(CartContext)
}

export const CartProvider = ({children}: Props) =>{
    const [cart, setCart] = useState<Array<ShopItem>>([]);
    const [cartCount, setCartCount] = useState<number>(0);
    const [inventory, setInventory] = useState<Array<ShopItem>>(categories);

    const cartTotal = useMemo(()=>{
        let total = 0
        cart.map((item, index)=> total += (item.amount * item.count));
        return total

    }, [cart])

    const removeFromCart = (item:ShopItem):void =>{
        const found = cart.find((cartItem)=> cartItem.id == item.id)
        if(found){
            setCart((prevArr) => prevArr.filter(item => item.id !== found.id));
            setCartCount(prev=> prev-1)
        }
    }

    const addToCart = (item:ShopItem):void =>{
        const found = cart.find((cartItem)=> cartItem.id == item.id )
        
        if(!found){
            setCartCount(prev=> prev+1)
            setCart(prev=>[...prev, {...item, count: 1}])
        } else {
            setCart((prev)=>{
                return (
                    prev.map((prevItem)=>{
                        if(prevItem.id === item.id){
                            return {...prevItem, count: prevItem.count + 1}
                        }
                        return prevItem
                    })
                )
            })
        }
    }
    return (
        <CartContext.Provider value=
        {
            {
                cart, 
                setCart, 
                addToCart, 
                cartCount, 
                inventory, 
                removeFromCart, 
                cartTotal
            }
        }>
            {children}
        </CartContext.Provider>
        )
}