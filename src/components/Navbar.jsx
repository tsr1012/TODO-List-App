import React from 'react'

const Navbar = () => {
  return (
    <nav className='group relative rounded-b-xl shadow-lg shadow-gray-700/40 transition-all duration-500 bg-gradient-to-r from-[#d846efb0] via-[#06b6d4b0] to-[#d946efb0] bg-size-200 bg-pos-0 hover:bg-pos-100 backdrop-blur-lg'>
      <div className='container mx-auto flex justify-between text-white py-3 px-10 items-center'>
        <div id="logo" className='group-hover:rotate-[360deg] group-hover:scale-125 transition-all duration-500'>
          <a href=""><span className='font-black text-xl sm:text-3xl'>iTASK</span></a>
        </div>
        <ul className="flex flex-col text-md sm:text-lg sm:flex-row">
          <li className='hover:font-black hover:tracking-wider font-semibold text-center w-32 transition-all duration-100 flex justify-end sm:justify-center'><a href="">Home</a></li>
          <li className='hover:font-black hover:tracking-wider font-semibold text-center w-32 transition-all duration-100 flex justify-end sm:justify-center'><a href="">Your Tasks</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
