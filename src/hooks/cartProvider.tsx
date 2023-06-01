"use client"
import { categories } from "@/database/db";
import { SetStateAction, useEffect, useMemo } from "react";
import { createContext, Dispatch, useContext, useState } from "react";
// import { getCookie, setCookie } from "cookies-next";

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

    // if(!getCookie('store')){
    //     setCookie('store', JSON.stringify([]))
    // }

    // if(!getCookie('storeCount')){
    //     setCookie('storeCount', JSON.stringify(0))
    // }
    
    const Storestr = JSON.stringify([{}])
    const Countstr = JSON.stringify(0)

    // const tempCookieStore:string =  String(getCookie('store')) || Storestr;
    // const CookieStoreCount:number = Number(getCookie('storeCount')) ||  Number(Countstr);
    // const CookieStore:ShopItem[]  = JSON.parse(tempCookieStore);
    
    const [cart, setCart] = useState<ShopItem[]>(categories);
    const [cartCount, setCartCount] = useState<number>(0);
    const [inventory, setInventory] = useState<ShopItem[]>(categories);

    const cartTotal = useMemo(()=>{
        let total = 0;
        cart.map((item, index)=> total += (item.amount * item.count));
        return total
    }, [cart])

    const removeFromCart = (item:ShopItem):void =>{
        // const tempCookieStore:string =  String(getCookie('store'));
        // const CookieStoreCount = Number(getCookie('storeCount'));
        
        // const CookieStore:ShopItem[]  = JSON.parse(tempCookieStore);
        const found = cart.find((cartItem)=> cartItem.id == item.id);

        if(found){
            const modifiedCookieStore:ShopItem[] = cart.filter(item => item.id !== found.id);
            // setCookie('store', JSON.stringify(modifiedCookieStore));
            // setCookie('storeCount', String(CookieStoreCount - 1));
            console.log(modifiedCookieStore);
            setCart(modifiedCookieStore);
            setCartCount(prev=> prev-1)
        }
    }

    const addToCart = (item:ShopItem):void =>{
        // const temp =  String(getCookie('store'));
        // const CookieStore:ShopItem[]  = JSON.parse(temp);
        const found = cart.find((cartItem)=> cartItem.id == item.id )
        
        if(!found){
            const newItem:ShopItem[] = [...cart, {...item, count: 1}]
            // setCookie('store', JSON.stringify(newItem));
            // setCookie('storeCount', cartCount + 1)
            setCart(newItem);
            setCartCount(prev=>prev+1)
        } else {
            
            const modifiedCookieStore = cart.map((prevItem)=>{
                if(prevItem.id === item.id){
                    return {...prevItem, count: prevItem.count + 1}
                }
                return prevItem;
            });
// 
            // setCookie('store', modifiedCookieStore);
            setCart(modifiedCookieStore);
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