import { useContext, useEffect, useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import { Diet_Rec } from './components/Diet_Rec/Diet_Rec';
import History from './components/History';
import { AuthContext } from './context/AuthContext';
import Footer from './components/Footer';
import ContactUs from './components/ContactUs';
import Blogs from './components/Blogs';
import BlogPost from './components/BlogPost';
import NotFound from './components/NotFound';
import CommunityContextOrovider from './context/main';
import Index from './components/pages/Community/index';
import EditProfile from './components/EditProfile';

function App() {
  const ConnString = import.meta.env.VITE_ConnString;
  const { isAuthenticate, setIsAuthenticate, setUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${ConnString}/auth/getuser`, {
        method: "GET",
        credentials: 'include'
      });
      const json = await response.json();
      if (json.success) {
        setUser(json.user);
        setIsAuthenticate(true);
      }
      else {
        setIsAuthenticate(false);
        setUser({});
      }
    }
    fetchUser();
  }, [isAuthenticate])

  useEffect(()=>{
    if(!localStorage.getItem('auth-token')) localStorage.setItem('userData', JSON.stringify({ success: false }));
  },[])
  return (
    <BrowserRouter>
      <Navbar />
      <CommunityContextOrovider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/get-diet-recommendation' element={<Diet_Rec />} />
          <Route path='/contactUs' element={<ContactUs />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blog_post/:id' element={<BlogPost />} />
          <Route path='/diet-history' element={<History />} />
          <Route path="/community" element={<Index />}></Route>
          <Route path="/editprofile" element={<EditProfile />}></Route>
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </CommunityContextOrovider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
