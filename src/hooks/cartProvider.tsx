"use client"
import { categories } from "@/database/db";
import { SetStateAction, useEffect, useMemo } from "react";
import { createContext, Dispatch, useContext, useState } from "react";
import { getCookie, setCookie } from "cookies-next";

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

    if(!getCookie('store')){
        setCookie('store', JSON.stringify([]))
    }

    if(!getCookie('storeCount')){
        setCookie('storeCount', JSON.stringify(0))
    }
    
    const Storestr = JSON.stringify([{}])
    const Countstr = JSON.stringify(0)

    const tempCookieStore:string =  String(getCookie('store')) || Storestr;
    const CookieStoreCount = Number(getCookie('storeCount')) ||  Countstr;
    console.log(tempCookieStore);
        console.log(CookieStoreCount);
    const CookieStore:ShopItem[]  = JSON.parse(tempCookieStore);

    const [cart, setCart] = useState<Array<ShopItem>>(CookieStore);
    const [cartCount, setCartCount] = useState<number>(Number(CookieStoreCount));
    const [inventory, setInventory] = useState<Array<ShopItem>>(categories);

    const cartTotal = useMemo(()=>{
        let total = 0
        cart?.map((item, index)=> total += (item.amount * item.count));
        return total

    }, [cart])

    const removeFromCart = (item:ShopItem):void =>{
        const tempCookieStore:string =  String(getCookie('store'));
        const CookieStoreCount = Number(getCookie('storeCount'));
        
        const CookieStore:ShopItem[]  = JSON.parse(tempCookieStore);
        const found = CookieStore.find((cartItem)=> cartItem.id == item.id)
        if(found){
            const modifiedCookieStore:ShopItem[] = CookieStore.filter(item => item.id !== found.id);
            setCookie('store', modifiedCookieStore);
            setCookie('storeCount', CookieStoreCount - 1)
            console.log(modifiedCookieStore);
            setCart(modifiedCookieStore);
            // setCart((prevArr) => prevArr.filter(item => item.id !== found.id));
            setCartCount(prev=> prev-1)
        }
    }

    const addToCart = (item:ShopItem):void =>{
        const temp =  String(getCookie('store'));
        const CookieStoreCount = Number(getCookie('storeCount'));
        const CookieStore:ShopItem[]  = JSON.parse(temp);
        const found = CookieStore.find((cartItem)=> cartItem.id == item.id )
        
        if(!found){
            const newItem:ShopItem[] = [...CookieStore, {...item, count: 1}]
            setCookie('store', JSON.stringify(newItem));
            setCookie('storeCount', cartCount + 1)
            setCart(newItem);
            setCartCount(prev=>prev+1)
            // setCart(prev=>[...prev, {...item, count: 1}])/
        } else {
            
            console.log(CookieStore);

            const modifiedCookieStore = CookieStore.map((prevItem)=>{
                if(prevItem.id === item.id){
                    return {...prevItem, count: prevItem.count + 1}
                }
                return prevItem;
            })

            setCookie('store', modifiedCookieStore )

            setCart(modifiedCookieStore);
           
            // setCart((prev)=>{
            //     return (
            //         prev.map((prevItem)=>{
            //             if(prevItem.id === item.id){
            //                 return {...prevItem, count: prevItem.count + 1}
            //             }
            //             return prevItem
            //         })
            //     )
            // })
        }
    }

    useEffect(()=>{
        console.log("fulls out");
        
    }, [])
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