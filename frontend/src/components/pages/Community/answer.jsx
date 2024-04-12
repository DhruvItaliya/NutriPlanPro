import React from 'react';
import { FaUserCircle } from "react-icons/fa";
const Answer = ({ data }) => {
    const isToday = (createdAt) => {
        const createdAtDate = new Date(createdAt);
        const today = new Date();
        if (createdAtDate.getDate() === today.getDate() &&
            createdAtDate.getMonth() === today.getMonth() &&
            createdAtDate.getFullYear() === today.getFullYear()) return true;
        return false;
    }
    return (
        <div className='flex justify-end'>
            <div className="answer w-[80%] bg-[#285FD5]/30 text-black p-4 mb-4 rounded-lg shadow-md ">
                <div className="flex items-center mb-2">
                    {/* Answerer profile image */}
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                        <FaUserCircle className="w-full h-full object-cover" />

                        {/* src={data?.user?.photo} */}
                    </div>
                    {/* Answerer name */}
                    <div>
                        <p className="text-sm text-gray-600">{data?.user?.name}</p>
                        <p className="text-[11px] text-gray-600">{data?.user?.occupation}</p>
                    </div>
                </div>
                {/* Answer text */}
                <p className="text-black">{data.answer}</p>
                <div className='text-xs flex justify-end w-full text-gray-500'>
                    {isToday(data.createdAt) ? new Date(data.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) :
                        new Date(data.createdAt).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>
        </div>
    );
};

export default Answer;
