import React, { useContext, useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdLogin, MdLogout } from "react-icons/md";
import { GrBlog, GrContactInfo } from "react-icons/gr";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { GiBackwardTime } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {
    const ConnString = import.meta.env.VITE_ConnString;
    const { isAuthenticate, setIsAuthenticate } = useContext(AuthContext);
    const [nav, setNav] = useState(false);
    const [menu, setMenu] = useState('home')
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        e.preventDefault();
        const response = await fetch(`${ConnString}/auth/logout`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        if (json.success) {
            setIsAuthenticate(false);
            localStorage.setItem('userData', JSON.stringify({ success: false }));
            localStorage.removeItem('auth-token');
            toast.success("Logout successfully");
            navigate('/');
        }
        else {
            toast.error(json.error);
        }
    }
    const goToLogin = () => {
        setIsAuthenticate(false)
        navigate('/login');
    }

    return (
        <div className='sticky top-0 z-10 max-w-[1640px] mx-auto md:px-20 px-4 h-[70px] lg:px-24 flex justify-between items-center bg-[#bbd0d5] shadow-gray-200'>
            <div className='flex justify-center items-center'>
                <div className='flext sm:hidden mr-2' onClick={() => setNav(!nav)}>
                    <AiOutlineMenu size={25} />
                </div>
                <Link to='/'> <p className='font-bold text-2xl lg:text-3xl text-[#10383b] '>NutriPlanPro</p></Link>
            </div>

            <div>
                <nav>
                    <ul className='hidden sm:flex md:justify-around space-x-3 md:space-x-5 lg:space-x-7  lg:text-lg '>
                        <Link to='/' onClick={() => setMenu('home')}><li className={`text-gray-600 hover:bg-[#a9c8cf] hover:shadow-md rounded-md px-2 duration-200 ${menu === 'home' ? 'font-semibold' : ''} text-[17px] hover:cursor-pointer`}>Home</li></Link>
                        <Link to='/get-diet-recommendation' onClick={() => setMenu('get_diet')}><li className={`text-gray-600 hover:bg-[#a9c8cf] hover:shadow-md rounded-md px-2 duration-200 ${menu === 'get_diet' ? 'font-semibold' : ''} text-[17px] hover:cursor-pointer`}>Get Diet</li></Link>
                        {isAuthenticate && <Link to='/diet-history' onClick={() => setMenu('diet_history')}><li className={`text-gray-600 hover:bg-[#a9c8cf] hover:shadow-md rounded-md px-2 duration-200 ${menu === 'diet_history' ? 'font-semibold' : ''} text-[17px] hover:cursor-pointer`}>History</li></Link>}
                        <Link to='/blogs' onClick={() => setMenu('blogs')}><li className={`text-gray-600 hover:bg-[#a9c8cf] hover:shadow-md rounded-md px-2 duration-200 ${menu === 'blogs' ? 'font-semibold' : ''} text-[17px] hover:cursor-pointer`} >Blog</li></Link>
                        {isAuthenticate && <Link to='/community' onClick={() => setMenu('community')}><li className={`text-gray-600 hover:bg-[#a9c8cf] hover:shadow-md rounded-md px-2 duration-200 ${menu === 'community' ? 'font-semibold' : ''} text-[17px] hover:cursor-pointer`}>Community</li></Link>}
                        <Link to='/contactUs' onClick={() => setMenu('contact')}><li className={`text-gray-600 hover:bg-[#a9c8cf] hover:shadow-md rounded-md px-2 duration-200 ${menu === 'contact' ? 'font-semibold' : ''} text-[17px] hover:cursor-pointer`}>Contact</li></Link>
                    </ul>
                </nav>
            </div>


            <div className='flex items-center'>
                {/* login button */}
                {!isAuthenticate ? <button className='hidden sm:flex justify-center items-center lg:text-md bg-[#10383b] text-white rounded-full px-4 py-1 active:scale-95 hover:shadow-lg hover:bg-[#153336]' onClick={goToLogin} ><MdLogin size={20} className='mr-3' />Login</button> :
                    <button className='hidden sm:flex justify-center items-center lg:text-md bg-[#10383b] text-white rounded-full px-4 py-1 active:scale-95 hover:shadow-lg hover:bg-[#153336]' onClick={handleLogout} ><MdLogout size={20} className='mr-3' />Logout</button>}
            </div>


            {/* overlays(for mobile) */}
            {nav && <div className='h-screen w-full bg-black/80 fixed sm:hidden z-10 top-0 left-0 duration-300'></div>}

            {/* side menu */}
            <div className={nav ? 'z-10 bg-white h-screen w-[280px] fixed sm:hidden top-0 left-0 duration-300' : 'z-10 bg-white h-screen left-[-100%] w-[280px] fixed sm:hidden top-0 duration-300'}>
                <div className='flex justify-start p-4 items-center font-[500] text-2xl text-[#10383b]'>
                    {/* <img src={logo} alt="logo" className='w-28' onClick={goToHome} /> */}
                    NutriPlanPro
                </div>
                <AiOutlineClose className='absolute top-4 right-4' size={25} onClick={() => setNav(!nav)} />
                <nav>
                    <ul className='flex flex-col justify-around p-4'>
                        <Link to='/' onClick={() => setNav(!nav)}> <li className='flex py-3 px-2 text-gray-700 hover:bg-gray-100 hover:cursor-pointer'><IoHomeOutline size={25} className='mr-3' />Home</li></Link><hr />
                        <Link to='/get-diet-recommendation' onClick={() => setNav(!nav)}> <li className='flex py-3 px-2 text-gray-700 hover:bg-gray-100 hover:cursor-pointer'><BsFillInfoSquareFill size={25} className='mr-3' />Get Diet</li></Link><hr />
                        {isAuthenticate && <Link to='/diet-history' onClick={() => setNav(!nav)}> <li className='flex py-3 px-2 text-gray-700 hover:bg-gray-100 hover:cursor-pointer'><GiBackwardTime size={25} className='mr-3' />Diet History</li></Link>}<hr />
                        <Link to='/blogs' onClick={() => setNav(!nav)}><li className='flex py-3 px-2 text-gray-700 hover:bg-gray-100 hover:cursor-pointer'><GrBlog size={25} className='mr-3' />Blog</li></Link><hr />
                        {isAuthenticate && <Link to='/community' onClick={() => setNav(!nav)}><li className='flex py-3 px-2 text-gray-700 hover:bg-gray-100 hover:cursor-pointer'><GrBlog size={25} className='mr-3' />Blog</li></Link>}<hr />
                        <Link to='/contactUs' onClick={() => setNav(!nav)}><li className='flex py-3 px-2 text-gray-700 hover:bg-gray-100 hover:cursor-pointer'><GrContactInfo size={25} className='mr-3' />Contact</li></Link><hr />
                        <Link to='/login' onClick={() => setNav(!nav)}><li className='flex py-3 px-2 text-gray-700 hover:bg-gray-100 hover:cursor-pointer'><MdLogin size={25} className='mr-3' />Login</li></Link>
                    </ul>
                </nav>
            </div>

        </div>
    )
}

export default Navbar