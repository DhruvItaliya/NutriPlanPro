import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdLock } from "react-icons/md";
import login_img from '../assets/login.jpg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const ConnString = import.meta.env.VITE_ConnString;
  const [inputUserData, setInputUserData] = useState({ email: "", password: "" });
  const {isAuthenticate,setIsAuthenticate,user,setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${ConnString}/auth/login`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: inputUserData.email, password: inputUserData.password })
    });
    const json = await response.json();
    if (json.success) {
      setIsAuthenticate(true);
      json.userData.success = true;
      localStorage.setItem('userData',JSON.stringify(json.userData)); 
      localStorage.setItem('auth-token',JSON.stringify(json.auth_token)); 
      toast.success("Login successfully");
      navigate('/');
    }
    else {
      toast.error(json.error);
    }
  }

  const handleChange = (e) => {
    setInputUserData({ ...inputUserData, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <div className='flex box-border'>
        <div className='flex justify-center items-center mx-auto w-full md:w-[50%] h-[450px] lg:h-[550px]'>
          <div className='flex flex-col justify-center items-center w-[80%] sm:w-[70%] bg-[#b9d7d9] rounded-md h-[350px]'>
            <h1 className='text-3xl text-[#164043] my-2 justify-start'>Login</h1>
            <form onSubmit={handleSubmit} className='flex flex-col w-[90%] sm:w-[70%]'>
              <div className='flex items-center bg-gray-100 my-2 rounded-md w-full' tabIndex={1}>
                <MdEmail className='m-2 text-[#164043]' /><input id="email" name="email" type="text" required className='bg-transparent border-l-2 p-2 outline-none w-[80%]' placeholder='Your Email' value={inputUserData.email} onChange={handleChange} />
              </div>
              <div className='flex items-center bg-gray-100 my-2 rounded-md '>
                <MdLock className='m-2 text-[#164043]' /> <input id="password" name="password" type="password" required className='bg-transparent border-l-2 p-2 outline-none w-[80%]' placeholder='Your Password' value={inputUserData.password} onChange={handleChange} />
              </div>
              <div className='flex my-2'>
                <input type="checkbox"/><p className='mx-2'>remember me?</p>
              </div>
              <div className='flex flex-col sm:flex-row my-2 space-x-1'>
                <p>Don't have an account?</p><Link to="/register" className='text-[#164043] underline underline-offset-2'>Sign up</Link>
              </div>
              <button type='submit' className='bg-[#164043] text-lg text-white py-1 rounded-md'>Login</button>
            </form>
          </div>
        </div>
        <div className='hidden md:flex justify-center items-center w-[50%] h-[600px]'>
          <img src={login_img} className='object-scale-down w-[70%]' alt="login_img" />
        </div>
      </div>
    </div>
  )
}

export default Login