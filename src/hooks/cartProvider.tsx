"use client"
import { categories } from "@/database/db";
import { SetStateAction, useEffect, useMemo } from "react";
import { createContext, Dispatch, useContext, useState } from "react";

type CartContextType = {
    cart: ShopItem[]; 
    setCart: Dispatch<SetStateAction<Array<ShopItem>>>;
    addToCart: (item: ShopItem) => void;
    removeFromCart: (item: ShopItem) => void;
    cartCount: number;
    inventory: ShopItem[]; 
    cartTotal: number;
    ckStore: ShopItem[];
    setCkStore: Dispatch<SetStateAction<Array<ShopItem>>>;
    ckStoreCount: number;
  };

const CartContext = createContext<CartContextType> ({
    cart: [],
    setCart: ()=>{},
    addToCart: () =>{},
    removeFromCart: () =>{},
    cartCount: 0,
    inventory: [],
    cartTotal: 0,
    ckStore: [],
    setCkStore: ()=>{},
    ckStoreCount: 0,
});

export default function useCart(){
    return useContext(CartContext)
}

export const CartProvider = ({children}: Props) =>{

    const [ckStore, setCkStore] = useState<ShopItem[]>([])
    const [ckStoreCount, setCkStoreCount ] = useState<number>(0)

    const getCookie = (key:string) =>
    document.cookie.split("; ").reduce((total, currentCookie) => {
        const item = currentCookie.split("=");
        const storedKey = item[0];
        const storedValue = item[1];
        return key === storedKey ? decodeURIComponent(storedValue) : total;
    }, "");

const setCookie = (key:string, value:string|number, numberOfDays:number=2) => {
    const now = new Date();

    now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000);

    document.cookie = `${key}=${value}; expires=${now.toUTCString()}; path=/`;
};

async function resetItem(key:string) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};

    useEffect(()=>{
        if(!getCookie('store')){
            setCookie('store', JSON.stringify([]));
            setCkStore([])
            setCart([])

        }else{
            const tempCookieStore:string =  String(getCookie('store'));
            const CookieStore:ShopItem[]  = JSON.parse(tempCookieStore);
            setCkStore(CookieStore)

        }
    
        if(!getCookie('storeCount')){
            setCookie('storeCount', JSON.stringify(0))
            setCkStoreCount(0)
        }else{
            const CookieStoreCount:number = Number(getCookie('storeCount'));
            setCkStoreCount(CookieStoreCount)
        }
    }, [])
    
    const [cart, setCart] = useState<ShopItem[]>(ckStore);
    const [cartCount, setCartCount] = useState<number>(ckStoreCount);
    const [inventory, setInventory] = useState<ShopItem[]>(categories);

    const cartTotal = useMemo(()=>{
        let total = 0;
        ckStore.map((item, index)=> total += (item.amount * item.count));
        return total
    }, [ckStore])

    const removeFromCart = (item:ShopItem):void =>{
        const tempCookieStore:string =  String(getCookie('store'));
        const CookieStoreCount = Number(getCookie('storeCount'));
        
        const CookieStore:ShopItem[]  = JSON.parse(tempCookieStore);
        const found = CookieStore.find((cartItem)=> cartItem.id == item.id);
        console.log(found);

        if(found){
            const modifiedCookieStore:ShopItem[] = CookieStore.filter(item => item.id !== found.id);
            setCkStore(modifiedCookieStore)
            setCookie('store', JSON.stringify(modifiedCookieStore));
            setCookie('storeCount', String(CookieStoreCount - 1));
            setCart(modifiedCookieStore);
            setCartCount(prev=> prev-1);
            setCkStoreCount(prev=>prev-1)
        }

    }

    const addToCart = (item:ShopItem):void =>{
        const temp =  String(getCookie('store'));
        console.log(temp);
        const CookieStore:ShopItem[]  = JSON.parse(temp);
        const found = CookieStore.find((cartItem)=> cartItem.id == item.id )
        console.log(CookieStore);
        
        if(!found){
            const newItem:ShopItem[] = [...CookieStore, {...item, count: 1}]
            setCookie('store', JSON.stringify(newItem));
            setCookie('storeCount', ckStoreCount + 1)
            setCart(newItem);
            setCartCount(prev=>prev+1);
            setCkStore(newItem);
            setCkStoreCount(prev=>prev+1);
        } else {
            
            const modifiedCookieStore = CookieStore.map((prevItem)=>{
                if(prevItem.id === item.id){
                    return {...prevItem, count: prevItem.count + 1}
                }
                return prevItem;
            });

            setCkStore(modifiedCookieStore)
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
                cartTotal,
                setCkStore,
                ckStore,
                ckStoreCount,
            }
        }>
            {children}
        </CartContext.Provider>
        )
}