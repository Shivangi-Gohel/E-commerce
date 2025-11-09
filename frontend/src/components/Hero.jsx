import React from 'react'
import { Button } from '@/components/ui/button.jsx'

const Hero = () => {
  return (
    <div className='bg-orange-900/15 bg-cover shadow-2xl'>
      <div className='md:flex justify-between mx-20'>
        <div className='flex flex-col gap-4 mb-10'>
          <div className='mb-6 mt-20 text-amber-950'>NEW COLLECTION</div>
          <div className='font-bold text-amber-950 text-3xl md:text-4xl flex flex-col gap-3'>
            <div>Timeless</div>
            <div>style</div>
            <div>meets</div>
            <div>modern craftsmanship</div>
          </div>
          <div className='mt-6 mb-6 text-amber-950/70 font-semibold'>Discover our latest arrivals that blend classic designs with contemporary quality. <br /> Elevate your wardrobe with pieces that stand the test of time.</div>
          <div className='md:flex gap-5'>
            <Button className="text-white bg-amber-950 md:m-0 m-1">Shop Now <img src="https://images.icon-icons.com/1993/PNG/512/arrow_arrows_back_direction_left_navigation_right_icon_123236.png" className='h-5 w-5 invert'  alt="" /></Button>
            <Button variant="outline" className='text-amber-950 md:m-0 m-1'>Learn more</Button>
          </div>
        </div>
        <div className='mt-20 pb-20'>
          <img className='mx-auto h-110 w-140 rounded-2xl align-right' src="https://static.vecteezy.com/system/resources/previews/028/080/332/large_2x/generative-ai-cloth-store-aesthetic-background-of-clothes-hanging-on-hangers-muted-neutral-colors-photo.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Hero
