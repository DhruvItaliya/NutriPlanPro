import React, { createContext, useState } from "react";

const CommunityContext = createContext();

const CommunityContextOrovider = ({ children }) => {
  const [globalPost,setGolbalPost] = useState(null);
  const [update,setUpdate]= useState(false);
  const [post, setPost] = useState(null);
  const [userData, setUserData] = useState({ name: "", email: "" ,photo:"" });
  const [scholarships, setScholarships] = useState(null);
  const [index, setIndex] = useState(0);
  const [sName, setSName] = useState(null);
  const handlePost = (data) => {
    setPost(data);
  };
  const nextPage = () => {
    setIndex((prevIndex) => prevIndex + 10);
    console.log(index);
  };
  const prePage = () => {   
    setIndex((prevIndex) => prevIndex - 10);
    console.log(index);
  };

  const context = {
    index,
    nextPage,
    prePage,
    sName,
    setSName,
    post,
    handlePost,
    userData,
    setUserData,
    update,
    setUpdate,
    globalPost,
    setGolbalPost
  };

  return (
    <CommunityContext.Provider value={context}>
      {children}
    </CommunityContext.Provider>
  );
};

export { CommunityContext, CommunityContextOrovider as default};
