import React, { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
const History = () => {
    const ConnString = import.meta.env.VITE_ConnString;
    const { isAuthenticate, user, setIsAuthenticate } = useContext(AuthContext);
    const [history, setHistory] = useState([])
    useEffect(() => {
        const fetchHistory = async () => {
            const response = await fetch(`${ConnString}/auth/gethistory`, {
                method: "GET",
                credentials: "include",
            });
            const json = await response.json();
            if (json.success) {
                console.log(json.history)
                setHistory(json.history);
            }
        }
        fetchHistory();
    }, [])

    const [expandedHistory, setExpandedHistory] = useState(null);

    const handleHistoryClick = (item) => {
        // If the clicked history item is already expanded, collapse it
        if (expandedHistory === item._id) {
            setExpandedHistory(null);
        } else {
            // If the clicked history item is not expanded, expand it
            setExpandedHistory(item._id);
        }
    };

    const isToday = (createdAt) => {
        const createdAtDate = new Date(createdAt);
        const today = new Date();
        if (createdAtDate.getDate() === today.getDate() &&
            createdAtDate.getMonth() === today.getMonth() &&
            createdAtDate.getFullYear() === today.getFullYear()) return true;
        return false;
    }

    return (
        <>
            <div className='px-4 md:px-20 lg:px-24 pt-5 pb-10'>
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
                                to="/diet-history"
                                className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900"
                            >
                                History
                            </Link>
                        </li>
                    </ol>
                </nav>
                <div className='flex justify-center'>
                    <div className='w-[80%]'>
                        <h3 className='text-4xl my-3'>History</h3>
                        {history.map((item) => (
                            <div key={item._id} className='bg-[#faf5ff] my-2 p-2 cursor-pointer outline outline-1 hover:shadow-lg hover:outline-[#4e3964] rounded-md' onClick={() => handleHistoryClick(item)}>
                                <div className='text-sm text-gray-500'>
                                    {isToday(item.createdAt) ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) :
                                        new Date(item.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>

                                {expandedHistory !== item._id && <div>{item.recommendedMeals[0][0]}...</div>}

                                {/* Check if the history item is expanded and show additional details if it is */}
                                {expandedHistory === item._id && (
                                    <div className='my-3 px-2'>
                                        <div className='flex justify-between gap-5'>
                                            <div className='w-[20%] py-5'>
                                                <div className='flex justify-between'>
                                                    <div>Age</div>
                                                    <div>{item.personalData.age}</div>
                                                </div>
                                                <hr />
                                                <div className='flex justify-between'>
                                                    <div>Height</div>
                                                    <div> {item.personalData.height}</div>
                                                </div>
                                                <hr />
                                                <div className='flex justify-between'>
                                                    <div> Weight</div>
                                                    <div> {item.personalData.weight}</div>
                                                </div>
                                                <hr />
                                                <div className='flex justify-between'>
                                                    <div> Gender</div>
                                                    <div> {item.personalData.gender}</div>
                                                </div>
                                                <hr />
                                                <div className='flex justify-between'>
                                                    <div> Goal</div>
                                                    <div> {item.personalData.goal}</div>
                                                </div>
                                                <hr />
                                                <div className='flex justify-between'>
                                                    <div> Physical Activity</div>
                                                    <div> {item.personalData.phyAct}</div>
                                                </div>
                                                <hr />
                                                <div className='flex justify-between'>
                                                    <div> Meals Per Day</div>
                                                    <div> {item.personalData.meals_per_day}</div>
                                                </div>
                                                <hr />
                                                <div className='flex justify-between'>
                                                    <div> Weight Status</div>
                                                    <div> {item.personalData.wStatus}</div>
                                                </div>
                                                <hr />
                                                <div className='flex justify-between'>
                                                    <div> BMI</div>
                                                    <div> {item.personalData.bmi}</div>
                                                </div>
                                                <hr />
                                                <div className='flex justify-between'>
                                                    <div> BMR</div>
                                                    <div> {item.personalData.bmr}</div>
                                                </div>
                                                <hr />
                                                <div className='flex justify-between'>
                                                    <div> Required Calories</div>
                                                    <div> {item.personalData.required_calories}</div>
                                                </div>
                                            </div>
                                            <div className='w-[70%]'>
                                                <div className='flex gap-1'>
                                                    <div className='w-1/4 font-[500]'>Image</div>
                                                    <div className='w-1/2 font-[500]'>Name</div>
                                                    <div className='w-1/4 font-[500]'>Calories</div>
                                                    <div className='w-1/4 font-[500]'>Fat</div>
                                                    <div className='w-1/4 font-[500]'>Carb</div>
                                                    <div className='w-1/4 font-[500]'>Protien</div>
                                                </div>
                                                <hr />
                                                {/* <div className='flex flex-col'> */}
                                                {item.recommendedMeals.map((meal) => (
                                                    <>
                                                        <div className='flex items-center gap-1'>
                                                            <div className='w-1/4 py-1 rounded-md'> <img src={meal[1]} alt="" className='w-[90%] h-[80px] rounded-md' /></div>
                                                            <div className='w-1/2'>{meal[0]}</div>
                                                            <div className='w-1/4'>{meal[2]}</div>
                                                            <div className='w-1/4'>{meal[3]}g</div>
                                                            <div className='w-1/4'>{meal[4]}g</div>
                                                            <div className='w-1/4'>{meal[5]}g</div>
                                                        </div>
                                                        <hr />
                                                    </>
                                                ))}
                                                {/* </div> */}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default History