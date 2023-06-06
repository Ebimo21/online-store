import Image from 'next/image'
import React from 'react'


const Categories = () => {
    const categories:shopCategory[] = [
        {
            name: "Furnitures",
            image: "/images/furniture.png",
        },
        {
            name: "Hand Bag",
            image: "/images/bag.png",
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
            name: "Travel",
            image: "/images/travel.png",
        },
    ]
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
                        </div>
                    )
                })
            }
        </div>
    </section>
  )
}

export default Categories