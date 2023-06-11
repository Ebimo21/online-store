"use client"
import { categories } from "@/database/db";
import { SetStateAction, useEffect, useMemo } from "react";
import { createContext, Dispatch, useContext, useState } from "react";
import useCookie from "./useCookie";

type CartContextType = {
    addToCart: (item: ShopItem) => void;
    removeFromCart: (item: ShopItem) => void;
    cartCount: number;
    inventory: ShopItem[]; 
    cartTotal: number;
    ckStore: ShopItem[];
    setCkStore: Dispatch<SetStateAction<Array<ShopItem>>>;
    setCkStoreCount: Dispatch<number>;
    ckStoreCount: number;
  };

const CartContext = createContext<CartContextType> ({
    addToCart: () =>{},
    removeFromCart: () =>{},
    cartCount: 0,
    inventory: [],
    cartTotal: 0,
    ckStore: [],
    setCkStore: ()=>{},
    ckStoreCount: 0,
    setCkStoreCount: ()=>{}
});

export default function useCart(){
    return useContext(CartContext)
}

export const CartProvider = ({children}: Props) =>{
    
    const {getCookie, setCookie} = useCookie();

    const [ckStore, setCkStore] = useState<ShopItem[]>([]);
    const [ckStoreCount, setCkStoreCount ] = useState<number>(0);
    const [cartCount, setCartCount] = useState<number>(ckStoreCount);
    const [inventory, setInventory] = useState<ShopItem[]>(categories);

    // set empty store cookie if it does not exist
    // save to state if it does exist
    useEffect(()=>{
        if(!getCookie('store')){
            setCookie('store', JSON.stringify([]));

        }else{
            const tempCookieStore:string =  String(getCookie('store'));
            const CookieStore:ShopItem[]  = JSON.parse(tempCookieStore);
            setCkStore(CookieStore)

        }
    
        if(!getCookie('storeCount')){
            setCookie('storeCount', JSON.stringify(0));
        }else{
            const CookieStoreCount:number = Number(getCookie('storeCount'));
            setCkStoreCount(CookieStoreCount);
        }
    }, [])
    
    const cartTotal = useMemo(()=>{
        let total = 0;
        ckStore.map((item)=> total += (item.amount * item.count));
        return total
    }, [ckStore])

    const removeFromCart = (item:ShopItem):void =>{
        const tempCookieStore:string =  String(getCookie('store'));
        const CookieStoreCount = Number(getCookie('storeCount'));
        
        const CookieStore:ShopItem[]  = JSON.parse(tempCookieStore);
        const found = CookieStore.find((cartItem)=> cartItem.id == item.id);

        if(found){
            const modifiedCookieStore:ShopItem[] = CookieStore.filter(item => item.id !== found.id);
            setCkStore(modifiedCookieStore)
            setCookie('store', JSON.stringify(modifiedCookieStore));
            setCookie('storeCount', String(CookieStoreCount - 1));
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
            setCartCount(prev=>prev+1);
            setCkStore(newItem);
            setCkStoreCount(prev=>prev+1);
        } else {
            
            const modifiedCookieStore = CookieStore.map((prevItem)=>{
                if(prevItem.id === item.id){
                    return {...prevItem, count: prevItem.count + 1}
                }
                console.log();
                return {...prevItem};
            });

            setCkStore(modifiedCookieStore);
            setCookie('store', JSON.stringify(modifiedCookieStore));
        }
    }
    
    return (
        <CartContext.Provider value=
        {
            {
                addToCart, 
                cartCount, 
                inventory, 
                removeFromCart, 
                cartTotal,
                setCkStore,
                ckStore,
                ckStoreCount,
                setCkStoreCount,
            }
        }>
            {children}
        </CartContext.Provider>
        )
}