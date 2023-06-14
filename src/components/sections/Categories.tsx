"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { backendHost, getCategories } from '@/api/apiCalls';


const Categories = () => {
    const categories:shopCategory[] = [
        {
            name: "Hand Bag",
            image: "/images/bag.png",
        },
        {
            name: "Furnitures",
            image: "/images/furniture.png",
        },
        {
            name: "Books",
            image: "/images/books.png",
        },
        {
            name: "Tech",
            image: "/images/tech.png",
        },
        {
            name: "Sneaker",
            image: "/images/sneakers.png",
        },
        {
            name: "Books 2 ",
            image: "/images/books.png",
        },
        {
            name: "Travel",
            image: "/images/travel.png",
        },
        {
            name: "Sneaker 2",
            image: "/images/sneakers.png",
        },
        {
            name: "Hand Bag 2 ",
            image: "/images/bag.png",
        },
        {
            name: "Tech 2 ",
            image: "/images/tech.png",
        },

    ]
    // const [categories, setCategories] = useState<shopCategory[]>([]);

    // useEffect(()=>{
    //     const getCategory = async () =>{
    //         const response = await getCategories();
    //         console.log(response.data);
    //         setCategories(response.data);
            

    //     }

    //     getCategory();

    // }, [])
  return (
    <section className='px-4 pt-20 '>
        <h2 className='text-2xl font-bold mb-4'>Shop our Top Categories</h2>
        <div className='flex flex-wrap justify-between gap-3 '>
            {
                categories.map((item, index)=>{
                    return (
                        <div className='   basis-[45%] xxs:basis-[48%] xs sm:basis-4/12  md:basis-3/12 lg:basis-2/12 rounded-lg relative overflow-hidden  ' key={index}>
                                <h3 className='text-center absolute top-5 w-full z-20 font-bold sm:font-medium text-xl sm:text-base text-white '>{item.name}</h3>
                                <Image className='w-full align-middle z-10 hover:scale-125 duration-1000' src={item.image} width={50} height={50} alt="ther" />
                                {/* <img className='w-full align-middle z-10 hover:scale-125 duration-1000' src={`${backendHost}/${item.image}`} width={50} height={50} alt="ther" /> */}
                        </div>
                    )
                })
            }
        </div>
    </section>
  )
}

export default Categories