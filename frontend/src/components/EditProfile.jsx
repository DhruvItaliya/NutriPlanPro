import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast'
import { MdLock, MdEmail } from "react-icons/md";
import { FaUser, FaBriefcase } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const ConnString = import.meta.env.VITE_ConnString;
    const user = JSON.parse(localStorage.getItem('userData'));
    const [userData, setUserData] = useState({ name: user.name, age: user.age, height: user.height, weight: user.weight, gender: user.gender, occupation: user.occupation });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hello");
        const response = await fetch(`${ConnString}/auth/editprofile`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: userData.name, age: userData.age, height: userData.height, weight: userData.weight, gender: userData.gender, occupation: userData.occupation })
        });
        const json = await response.json();

        if (json.success) {
            json.userData.success = true;
            localStorage.setItem('userData', JSON.stringify(json.userData));
            toast.success("Updated successfully");
            navigate('/');
        }
        else {
            toast.error(json.error);
        }
    }

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }
    return (
        <div className='px-4 md:px-20 lg:px-24 pt-5 pb-10 relative'>
            <img src="src/assets/bg-4.png" className='fixed top-5 left-0 w-full object-fit opacity-70 z-[-1]' alt="" />
            <nav aria-label="Breadcrumb" className="flex z-10">
                    <ol className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600">
                        <li className="flex items-center">
                            <Link
                                to="/"
                                className="flex h-10 items-center gap-1.5 bg-gray-100 px-4 transition hover:text-gray-900"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>

                                <span className="ms-1.5 text-xs font-medium"> Home </span>
                            </Link>
                        </li>

                        <li className="relative flex items-center">
                            <span
                                className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"
                            >
                            </span>

                            <Link
                                to="/editprofile"
                                className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900"
                            >
                                Edit Profile
                            </Link>
                        </li>
                    </ol>
                </nav>
            <div className='flex'>
                <div className='flex justify-center items-center mx-auto w-full md:w-[60%] my-16'>
                    <div className='flex flex-col justify-center items-center w-[80%] sm:w-[70%] bg-[#b9d7d9] rounded-md h-[390px]'>
                        <h1 className='text-3xl text-[#164043] my-2 justify-start'>Edit Profile</h1>
                        <form onSubmit={handleSubmit} className='flex flex-col w-[90%] sm:w-[70%]'>
                            <div className='flex items-center bg-gray-100 my-2 rounded-md w-full'>
                                <FaUser className='m-2 text-[#164043]' /> <input id="name" name="name" type="text" className='bg-transparent border-l-2 p-2 outline-none w-[80%]' placeholder='Your Name' value={userData.name} onChange={handleChange} required />
                            </div>
                            <div className='flex items-center gap-2 w-full'>
                                <div className='flex flex-col rounded-md w-[49%]'>
                                    <div className='flex items-center bg-gray-100 my-2 rounded-md w-full'>
                                        <input id="age" name="age" type="number" className='bg-transparent p-2 outline-none' placeholder='Your Age' value={userData.age} onChange={handleChange} required />
                                    </div>
                                    <div className='flex items-center bg-gray-100 my-2 rounded-md'>
                                        <input id="height" name="height" type="number" className='bg-transparent p-2 outline-none' placeholder='Your Height' value={userData.height} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className='flex flex-col rounded-md w-[49%]'>
                                    <div className='flex items-center bg-gray-100 my-2 rounded-md w-full'>
                                        <input id="weight" name="weight" type="number" className='bg-transparent p-2 outline-none' placeholder='Your Weight' value={userData.weight} onChange={handleChange} required />
                                    </div>
                                    <div className='flex items-center bg-gray-100 my-2 rounded-md w-full'>
                                        <div className='p-2 flex-grow'>
                                            <input type="radio" id="male" name="gender" className='bg-transparent  p-2 outline-none accent-[#164043] rounded-md' checked={userData.gender === 'male'} onChange={() => setUserData({ ...userData, gender: 'male' })} /><label htmlFor="male" className='text-black my-1 px-1 text-sm'>Male</label>
                                        </div>
                                        <div className='p-2 flex-grow'>
                                            <input type="radio" id="female" name="gender" className='bg-transparent p-2 outline-none  accent-[#164043] rounded-md' checked={userData.gender === 'female'} onChange={() => setUserData({ ...userData, gender: 'female' })} /><label htmlFor="female" className='text-black my-1 px-1 text-sm'>Female</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center bg-gray-100 my-2 rounded-md'>
                                <FaBriefcase className='m-2 text-[#164043]' />
                                <select id="occupation" name="occupation" onChange={handleChange} className='bg-transparent border-l-2 p-2 outline-none w-full'>
                                    <option value="Dietitians and Nutritionist">Dietitians and Nutritionist</option>
                                    <option value="Nutrition Coach">Nutrition Coach</option>
                                    <option value="Health Educator">Health Educator</option>
                                    <option value="Fitness Trainers and Instructor">Fitness Trainers and Instructor</option>
                                    <option value="Public Health Professional">Public Health Professional</option>
                                    <option value="Bussiness Man">Bussiness Man</option>
                                    <option value="Engineer">Engineer</option>
                                    <option value="Accountant">Accountant</option>
                                    <option value="Lawyer">Lawyer</option>
                                    <option value="Student">Student</option>
                                </select>
                            </div>
                            <button type='submit' className='bg-[#164043] text-lg text-white py-1 rounded-md'>Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile