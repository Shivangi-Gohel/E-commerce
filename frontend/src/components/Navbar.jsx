import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between p-4 sticky top-0 bg-white shadow-md'>
      <h1 className='font-bold text-3xl'>Shopify</h1>
      <div className='flex gap-8'>
        <ul className='flex gap-10'>
          <li>Home</li>
          <li>Shop now</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <div className='flex gap-1'>
            <span>Search</span>
            <img src="https://img.icons8.com/?size=100&id=59878&format=png&color=000000" className='w-6 h-6' alt="" />
        </div>
        <img src="https://img.icons8.com/?size=100&id=85080&format=png&color=000000" className='w-6 h-6' alt="" />
      </div>
    </div>
  )
}

export default Navbar
