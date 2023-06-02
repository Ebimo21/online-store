import Image from 'next/image'
import React from 'react'


const Brands = () => {
    const categories: shopCategory[] = [
        {
            name: "Staples",
            image: "/images/staples.png",
            description: "Delivery within 24hrs",
        },
        {
            name: "Sprouts",
            image: "/images/sprouts.png",
            description: "Delivery within 24hrs",
        },
        {
            name: "Grocery Outlets",
            image: "/images/outlet.png",
            description: "Delivery within 24hrs",
        },
        {
            name: "Mollie Stones",
            image: "/images/mollie.png",
            description: "Delivery within 24hrs",
        },
        {
            name: "Sports Basement",
            image: "/images/basement.png",
            description: "Delivery within 24hrs",
        },
        {
            name: "Container Store",
            image: "/images/container.png",
            description: "Delivery within 24hrs",
        },
        {
            name: "Target",
            image: "/images/target.png",
            description: "Delivery within 24hrs",
        },
        {
            name: "Bevmo",
            image: "/images/bevmo.png",
            description: "Delivery within 24hrs",
        },
    ]
    return (
        <section className='px-4 pt-20 '>
        <h2 className='text-2xl font-bold mb-4'>Shop our Top Categories</h2>
        <div className='flex flex-wrap justify-between gap-3 '>
            {
                categories.map((item, index)=>{
                    return (
                        <div className='w-full rounded-sm flex items-center gap-2 px-4 py-3 bg-[#eeeeee43] shadow-md' key={index}>
                            <div className={`relative w-16 h-16`}>
                                <Image className='rounded-full absolute align-middle' src={item.image} width={100} height={100} alt="aite" />
                            </div>
                            <div className='flex flex-col justify-between'>
                                <p className='font-semibold text-base'>{item.name}</p>
                                <p className='text-sm'>{item.description}</p>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    </section>
  )
}

export default Brands