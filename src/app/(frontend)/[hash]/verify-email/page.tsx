"use client"
import { verifyEmail } from "@/api/apiCalls";
import Star from "@/components/icons/Star";
import { categories } from "@/database/db";
import useCart from "@/hooks/cartProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Page({ params } : { params: { hash: string } }) {
    const router = useRouter();
    const hash = params.hash;
    console.log(hash);

    const {addToCart} = useCart();

    const handleVerifyEmail = async()=>{
        const response = await verifyEmail(hash);
        console.log(response);
        // if(response.success)

    }

    useEffect(()=>{
        verifyEmail(hash);
    }, [])

    return (
      <div><p>Verifying Email</p></div>
    )
  }