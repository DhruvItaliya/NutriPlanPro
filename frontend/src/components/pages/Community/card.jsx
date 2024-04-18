import React, { useContext, useState, useEffect } from "react";
import Answer from "./answer";
import { CommunityContext } from "../../../context/main";
import { FaUserCircle } from "react-icons/fa";
const Card = ({ user, question, answer, tags, id, time }) => {
  const ConnString = import.meta.env.VITE_ConnString;
  const [newAnswer, setNewAnswer] = useState(""); // State for the new answer
  const { userData, setUpdate, update } = useContext(CommunityContext);
  const [occupation, setOccupation] = useState(false);
  const handleAddAnswer = async () => {
    const packet = {
      user_id: JSON.parse(localStorage.getItem('userData'))._id,
      question_id: id,
      answer: newAnswer
    }
    // Logic to handle adding a new answer
    // This could involve sending the new answer to the backend or updating the state
    const response = await fetch(`${ConnString}/auth/community/addAnswer`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id: packet.user_id, question_id: packet.question_id, answer: packet.answer })
    })
    const json = await response.json();
    console.log(json);
    // Clear the input field after adding the answer
    setNewAnswer("");
    setUpdate(!update)
  };
  // function checkOccupation(userOccupation) {
  //   const validOccupations = ["Dietitian and Nutritionist", "Nutrition Coach", "Health Educator", "Fitness Trainer and Instructor", "Public Health Professional"];
  //   return setOccupation(validOccupations.includes(userOccupation));
  // }
  useEffect(() => {
    const validOccupations = ["Dietitians and Nutritionist", "Nutrition Coach", "Health Educator", "Fitness Trainer and Instructor", "Public Health Professional"];
    const user_occupation = JSON.parse(localStorage.getItem('userData')).occupation
    function checkOccupation(userOccupation) {
      return setOccupation(validOccupations.includes(userOccupation));
    }
    checkOccupation(user_occupation);
  }, [])
  const isToday = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const today = new Date();
    if (createdAtDate.getDate() === today.getDate() &&
      createdAtDate.getMonth() === today.getMonth() &&
      createdAtDate.getFullYear() === today.getFullYear()) return true;
    return false;
  }
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md max-w-3xl hover:shadow-lg relative" >
      {/* Questioner details */}
      <div className="w-[80%] flex items-center mb-4" >
        <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
          <FaUserCircle className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-lg leading-none font-bold">{user.name}</p>
          <p className="text-xs">{user.occupation}</p>
        </div >
      </div>


      {/* Question  */}
      <div className=" w-[80%] question bg-[#D59E28]/30 text-black p-4 mb-4 rounded-lg shadow-md" >
        <h3 className="text-purple-600 text-lg font-semibold mb-2" > {question}</h3 >
        <div className='text-xs flex justify-end w-full text-gray-500'>
          {isToday(time) ? new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) :
            new Date(time).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div >

      {/* Answers */}
      { answer.map((ans, ind) => {
        return < Answer key={ind} data={ans} />;
      })}

      {/* Tags */}

      <div className="flex mt-2 flex-wrap" >
        {tags.map((tag, index) => (
          <span key={index} className="inline-block bg-indigo-200 text-purple-800 text-sm px-2 py-1 rounded-full mr-2 mb-2">{tag}</span>
        ))}
      </div>

      {/* end of Tags */}

      {/* Add Answer Input Field */}
      {occupation && <div className="flex mt-4">
        <input type="text" className="flex-1 py-2 px-3 border border-gray-300 rounded-lg placeholder-purple-600 focus:outline-none" placeholder="Add an answer..." value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} />
        <button className="bg-purple-600 text-white py-2 px-4 rounded-lg ml-2 hover:bg-purple-700 focus:outline-none" onClick={handleAddAnswer}>Add</button>
      </div >}
    </div>)
}
export default Card;
