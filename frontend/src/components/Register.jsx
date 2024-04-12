import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast'
import { MdLock, MdEmail } from "react-icons/md";
import { FaUser, FaBriefcase } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const ConnString = import.meta.env.VITE_ConnString;
  const [userData, setUserData] = useState({ name: "", email: "", password: "", age: "", height: "", weight: "", gender: "male",occupation:"Dietitians and Nutritionist" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    const response = await fetch(`${ConnString}/auth/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: userData.name, email: userData.email, age: userData.age, height: userData.height, weight: userData.weight, gender: userData.gender,occupation:userData.occupation, password: userData.password })
    });
    const json = await response.json();

    if (json.success) {
      toast.success("Registered successfully");
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
    <div>
      <div className='flex'>
        <div className='flex justify-center items-center mx-auto w-full md:w-[60%] my-16'>
          <div className='flex flex-col justify-center items-center w-[80%] sm:w-[70%] bg-[#b9d7d9] rounded-md h-[490px]'>
            <h1 className='text-3xl text-[#164043] my-2 justify-start'>Create Account</h1>
            <form onSubmit={handleSubmit} className='flex flex-col w-[90%] sm:w-[70%]'>
              <div className='flex items-center bg-gray-100 my-2 rounded-md w-full'>
                <FaUser className='m-2 text-[#164043]' /> <input id="name" name="name" type="text" className='bg-transparent border-l-2 p-2 outline-none w-[80%]' placeholder='Your Name' value={userData.name} onChange={handleChange} required />
              </div>
              <div className='flex items-center bg-gray-100 my-2 rounded-md w-full'>
                <MdEmail className='m-2 text-[#164043]' /><input id="email" name="email" type="email" className='bg-transparent border-l-2 p-2 outline-none w-[80%] ' placeholder='Email Address' value={userData.email} onChange={handleChange} required />
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
                <select id="occupation" name="occupation"  onChange={handleChange} className='bg-transparent border-l-2 p-2 outline-none w-full'>
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
              <div className='flex items-center bg-gray-100 my-2 rounded-md '>
                <MdLock className='m-2 text-[#164043]' /> <input id="password" name="password" type="password" className='bg-transparent border-l-2 p-2 outline-none w-[80%]' placeholder='Password' value={userData.password} onChange={handleChange} required />
              </div>
              <div className='flex flex-col sm:flex-row my-2 space-x-1'>
                <p>Already have an account?</p><Link to="/login" className='text-[#164043] underline underline-offset-2'>Login</Link>
              </div>
              <button type='submit' className='bg-[#164043] text-lg text-white py-1 rounded-md'>Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register