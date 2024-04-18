import React, { useContext, useEffect, useState } from "react";
import Card from "./card";
import { CommunityContext } from "../../../context/main";
import { toast } from 'react-hot-toast';
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const { isAuthenticate } = useContext(AuthContext)
  const navigate = useNavigate();
  const ConnString = import.meta.env.VITE_ConnString;
  const {
    post,
    handlePost,
    setGolbalPost,
    update,
    setUpdate,
    userData,
  } = useContext(CommunityContext);
  const [val, setVal] = useState("");
  const [valQ, setValQ] = useState("")
  const [toogle, setToogle] = useState(false);
  // Fetches data only on mount
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`${ConnString}/auth/community/getAllCommunity`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        if (!json.success) {
          throw new Error("Failed to fetch data");
        }
        const result = json.result;
        handlePost(result);
        setGolbalPost(result);
      }
      catch (error) {
        toast.error(error.message)
      }
    };
    fetchData();
    // window.scrollTo({ top: 500, behavior: 'smooth' });
  }, [update]);

  // logic to add question
  const handleAddQuestion = async (e) => {
    const arr = valQ.split(/\s*,\s*/).map(word => word.trim());
    const packet = {
      id: JSON.parse(localStorage.getItem('userData'))._id,
      question: val,
      tags: arr,
    };
    try {
      console.log(JSON.parse(localStorage.getItem('userData')));
      const res = await fetch(`${ConnString}/auth/community/addQuestion`, {
        method: "POST",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: packet.id, question: packet.question, tags: packet.tags })
      });
      setVal("");
      setValQ("");
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
    // Your logic for adding a question goes here
  };

  return isAuthenticate ? (
    <div className="flex flex-col space-y-16" style={{ minHeight: 'calc(100vh - 800px)' }}>
      <div className="community-page bg-[#10383b] p-3 mt-0 " >
        {post ? (
          <>
            <div className="mx-auto max-w-3xl">

              {(post) && post.map((item) => (
                <Card
                  key={item._id}
                  id={item._id}
                  user={item.user}
                  question={item.question}
                  answer={item.answers}
                  tags={item.tags}
                  time={item.createdAt}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <div className="bg-gray-200 p-8 rounded-lg shadow-lg">
              <div className="text-center">
                <svg
                  className="w-12 h-12 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                <p className="text-lg text-gray-600 mt-4">No Post Found</p>
              </div>
            </div>

          </div>
        )}
        <div className="max-w-4xl justify-center flex items-center mx-auto">
          <input
            type="text"
            value={!toogle ? val : valQ}
            className="flex-1 py-2 px-3 mr-2 border border-gray-300 rounded-lg placeholder-purple-500 focus:outline-none"
            placeholder={!toogle ? "Ask a question" : "Add Tags"}
            onChange={(e) => {
              if (!toogle)
                setVal(e.target.value);
              else
                setValQ(e.target.value);
            }}
          />
          <button
            className="w-24 bg-purple-600 text-white py-2 px-4 rounded-lg"
            onClick={(e) => {
              e.preventDefault();
              // for question
              if (!toogle) {
                setToogle(!toogle)
              }
              // for answer
              else {
                setToogle(!toogle)
                handleAddQuestion()
              }
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  ) : (
    <h1 className="text-center text-3xl text-gray-400 my-10">Please Login to get access</h1>
  )
}
