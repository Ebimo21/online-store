import Star from "@/components/icons/Star";
import { categories } from "@/database/db";
import Image from "next/image";

export default function Page({ params } : { params: { id: string } }) {
    const id = params.id
    const item = categories[Number(id)-1]

    return (
      <section className="flex flex-wrap p-4">
        <Image className="w-full" src={item.image} width={100} height={100} alt={item.description} />
        <div>
          <h2 className="text-3xl font-bold">{item.name}</h2>
          <p className="text-lg mb-2">{item.description}</p>
          <div className="flex items-center gap-1">
            {Array(item.rating).fill("").map((item,index)=>{
              return(
                <Star key={index} width={20} height={20} fill="#068d21" />
              )
            })} (121)
          </div>
        </div>

        <div className="flex mt-10 px-1 gap-4 min-w-full">
          <button className="btn p-4 bg-[#068d21] text-xl text-white font-bold rounded-lg">Buy Now</button>
          <button className="btn p-4 bg-white text-xl text-[#068d21] font-bold rounded-lg border border-solid border-[#068d21]">Add to Cart</button>
        </div>
      </section>
    )
  }