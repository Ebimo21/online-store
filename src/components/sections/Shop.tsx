import Image from 'next/image'
import React, { Fragment } from 'react'
import Star from '../icons/Star'
import Link from 'next/link'
import { categories } from '@/database/db'

const Shop = () => {
  return (
    <section className='px-4 pt-20 '>
        <h2 className='text-2xl font-bold mb-4'>Shop Items</h2>
        <div className='flex flex-wrap justify-between gap-3'>
            {
                categories.map((item, index)=>{
                    return (
                        <Link href={`/item/${item.id}/`} key={index}>
                            <div className='basis-[48%]'>
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
                                <button className='btn w-full outline-none border border-solid border-slate-200 p-3 rounded-full font-semibold '>Add to Cart</button>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    </section>
  )
}

export default Shop