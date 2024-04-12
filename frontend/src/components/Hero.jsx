import React from 'react'
import hero_img from '../assets/hero1.png'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
const Hero = () => {
    return (
        <div className='max-w-[1640px] mx-auto px-4'>
            <div className='max-h-[620px] relative'>
                <div className='absolute w-full h-full max-h-[620px] text-gray-200 bg-black/45 flex flex-col justify-center items-start'>
                    <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold px-4'>Transform Your Plate</h1>
                    <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold px-4'>Transform Your Life</h1>
                    <div className='flex  mx-[20%] justify-center'>
                        <Link to='/get-diet-recommendation' className='flex justify-center w-36 my-2 font-[500] hover:shadow-xl hover:scale-[101%] hover:duration-200  rounded-full px-3 py-2 text-xl bg-orange-400'><button className='flex items-center gap-2 justify-center'>GET DIET<FaArrowRight /></button></Link>
                    </div>
                </div>
                <img className='w-full max-h-[620px] object-cover' src={hero_img} alt="" />
            </div>
        </div>
    )
}

export default Hero