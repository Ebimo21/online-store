import BestDeals from "@/components/sections/BestDeals";
import Brands from "@/components/sections/Brands";
import Categories from "@/components/sections/Categories";
import Hero from "@/components/sections/Hero";
import Shop from "@/components/sections/Shop";

export default function Home() {

  return (
    <main className="">
      <Hero />
      <Categories />
      <Shop />
      <BestDeals />
      <Brands />
    </main>
  )
}
