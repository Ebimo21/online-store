import React from 'react'

type Props = {}

const Hero = (props: Props) => {
  return (
    <div id="hero" className="p-5">
        <div className="pt-20">
          <h1 className="l leading-[1.3] text-[#003d29] text-bold text-4xl font-bold">Shopping and <span>Department Store.</span></h1>
          <p className="text-thin my-4 text-lg text-slate-600">Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.</p>
          <button className="bg-green-800 p-3 font-bold rounded-lg text-white">Learn More</button>
        </div>
      </div>
  )
}

export default Hero