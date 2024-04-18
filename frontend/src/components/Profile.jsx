import React, { useEffect, useState } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Profile = () => {
    const [toggle, setToggle] = useState(false);
    const user = JSON.parse(localStorage.getItem('userData'));
    return (
        <div>
            <button onClick={() => {setToggle(!toggle)}} data-ripple-light="true" data-popover-target="menu" >
                <FaCircleUser size={35} />
            </button>
            <ul role="menu" data-popover="menu" data-popover-placement="bottom"
                className={`${!toggle&&"hidden"} absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none`}>
                <li role="menuitem"
                    className="block w-full cursor-pointer px-3 py-2 rounded-md"
                    onClick={()=>setToggle(!toggle)}>
                    {`Hii, ${user.name.length > 10 ? user.name.substring(0, 10) + "..." : user.name}`}
                    <p className='text-xs text-gray-500'>{user.occupation}</p>
                </li>
                <hr />
                <li role="menuitem"
                    className="block w-full cursor-pointer hover:bg-gray-300 px-3 py-2 rounded-md"
                    onClick={()=>setToggle(!toggle)}>
                    <Link to='/editprofile'>Edit Profile</Link>
                </li>
            </ul>
        </div>
    )
}

export default Profile