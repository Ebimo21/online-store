import Image from 'next/image'
import React, { Fragment } from 'react'
import Star from '../icons/Star'

const BestDeals = () => {
    const categories:shopCategory[] = [
        {
            name: "HomePod Mini",
            image: "/images/pod.png",
            description: "Table with air purifier, stained veneer/black",
            amount: 299,
            rating: 5,
            
        },
        {
            name: "Instax Mini 9",
            image: "/images/instax.png",
            description: "Selfie mode and selfie mirror, Macro mode",
            amount: 99,
            rating: 4,
        },
        {
            name: "Base Camp Duffel M",
            image: "/images/duffel.png",
            description: 'Table with air purifier, stained veneer/black',
            amount: 299,
            rating: 3,
        },
        {
            name: "Tot e Medium",
            image: "/images/pod-green.png",
            description: 'Table with air purifier, stained veneer/black',
            amount: 299,
            rating: 2,
        },
        {
            name: "HomePod Mini",
            image: "/images/tot.png",
            description: 'Table with air purifier, stained veneer/black',
            amount: 299,
            rating: 1,
        },
        {
            name: "HomePod Mini",
            image: "/images/watch.png",
            description: 'Table with air purifier, stained veneer/black',
            amount: 299,
            rating: 0,
        },
    ]
  return (
    <section className='px-4 pt-20 '>
        <h2 className='text-2xl font-bold mb-4'>Today Best Deal for You</h2>
        <div className='a align-top w-[90vw] md:w-[80vw] my-2 md:mx-10 rounded-xl py-4  whitespace-nowrap bar overflow-x-auto '>
            {
                categories.map((item, index)=>{
                    return (
                        <div key={index} className='w-[175px] md:w-[350px] mr-2  inline-block'>
                            <div className='border border-solid border-slate-300 rounded-xl' >
                                <div className=' rounded-lg relative overflow-hidden  ' >
                                        <Image className='w-full align-middle z-10 hover:scale-125 duration-1000' src={item.image} width={50} height={50} alt="ther" />
                                </div>
                            </div>
                            <div className='font-bold my-2 text-lg flex flex-wrap whitespace-normal items-start justify-between w-full'>
                                <h3 className='basis-8/12'>{item.name}</h3>
                                <span className='basis-4/12 text-base'>${item?.amount}.<sup>00</sup></span>
                                <p className='basis-full font-normal text-sm'>{item.description}</p>
                                <div className='flex items-end font-normal text-xs my-4'>
                                    {Array(item.rating).fill("").map((item,index)=>{
                                        return(
                                            <Fragment key={index}>
                                                <Star width={20} height={20} fill='#068d21' />
                                            </Fragment>
                                        )
                                    })}

                                    (121)
                                    </div>
                            </div>
                            <button className='btn outline-none border border-solid border-slate-200 p-3 rounded-full font-semibold '>Add to Cart</button>
                        </div>
                    )
                })
            }
        </div>
    </section>
  )
}

export default BestDeals