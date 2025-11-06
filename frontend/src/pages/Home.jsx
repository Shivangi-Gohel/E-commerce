import React from 'react'
import Navbar from '../components/Navbar'
import { Button } from '@/components/ui/button'

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='flex justify-between mx-20 mt-20'>
        <div className='flex flex-col gap-4'>
          <div className='mb-6'>NEW COLLECTION</div>
          <div className='font-bold text-4xl flex flex-col gap-3'>
            <div>Timeless</div>
            <div>style</div>
            <div>meets</div>
            <div>modern craftsmanship</div>
          </div>
          <div className='mt-6 mb-6 text-gray-500 font-semibold'>Discover our latest arrivals that blend classic designs with contemporary quality. <br /> Elevate your wardrobe with pieces that stand the test of time.</div>
          <div className='flex gap-5'>
            <Button className="bg-black text-white">Shop Now <img src="https://images.icon-icons.com/1993/PNG/512/arrow_arrows_back_direction_left_navigation_right_icon_123236.png" className='h-5 w-5 invert'  alt="" /></Button>
            <Button variant="outline">Learn more</Button>
          </div>
        </div>
        <div>
          <img className='h-110 w-140 rounded-2xl align-right' src="https://static.vecteezy.com/system/resources/previews/028/080/332/large_2x/generative-ai-cloth-store-aesthetic-background-of-clothes-hanging-on-hangers-muted-neutral-colors-photo.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Home
