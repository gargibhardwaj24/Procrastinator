import React from 'react'

export const Navbar = () => {
  return (
    <div className = "bg-green-950/75 text-white flex items-center justify-around p-3">
        <div className="webName font-extrabold text-3xl mx-3">Procrastinator</div>
        <div className="options flex font-[Nunito]">
            <div className="home mx-3 hover:font-bold hover:transition-all hover:underline cursor-pointer">Home</div>
            <div className="task mx-3 cursor-pointer  hover:font-bold hover:transition-all hover:underline">Your tasks</div>
        </div>
    </div>
  )
}
export default Navbar;