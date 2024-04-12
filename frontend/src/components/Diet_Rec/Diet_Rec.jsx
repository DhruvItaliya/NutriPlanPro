import React, { useContext, useEffect, useState } from 'react';
import './Diet_Rec.css';
import { AuthContext } from '../../context/AuthContext';
import { Link, json } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import bg from '../../assets/pngegg.png';
export const Diet_Rec = () => {
    const ConnString = import.meta.env.VITE_ConnString;
    const { isAuthenticate, user, setIsAuthenticate } = useContext(AuthContext);
    const [isGenerate, setIsGenerate] = useState(false);
    const exercises = ['No exercise', 'Little exercise', 'Moderate exercise', 'Very exercise', 'Extra exercise']
    const [sliderValue, setSliderValue] = useState(0);
    const [exercise, setExercise] = useState();
    const [goal, setGoal] = useState("Loss Weight");
    const [mealValue, setMealValue] = useState(2);

    // data after response received
    const [personalData, setPersonalData] = useState({
        bmi: 0,
        bmr: 0,
        calories: 0,
        wStatus: 'Under Weight',
        mealsperday: 2,
        goal: ''
    })
    const [recommendedMeals, setRecommandedMeal] = useState([]);
    const [selectedMeals, setSelectedMeals] = useState([]);

    useEffect(() => {
        setExercise(exercises[sliderValue]);
    }, [sliderValue]);

    const storedUser = JSON.parse(localStorage.getItem('userData'));
    useEffect(() => {
        setAge(storedUser.success ? storedUser.age : 2)
        setHeight(storedUser.success ? storedUser.height : 50)
        setWeight(storedUser.success ? storedUser.weight : 10)
    }, [])

    const [age, setAge] = useState(storedUser.success ? storedUser.age : 2);
    const [height, setHeight] = useState(storedUser.success ? storedUser.height : 50);
    const [weight, setWeight] = useState(storedUser.success ? storedUser.weight : 10);
    const [gender, setGender] = useState(storedUser.success ? storedUser.gender : "male");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://127.0.0.1:5000/submit`, {
            method: "POST",
            // credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ age: age, height: height, weight: weight, gender: gender, phyAct: sliderValue, goal: goal, meals_per_day: mealValue })
        });
        const json = await response.json();
        if (json.success) {
            console.log(json);
            setPersonalData({
                bmi: json.calvalues[0],
                bmr: json.calvalues[1],
                calories: json.calvalues[2],
                wStatus: Number(json.calvalues[0]) < 18.5 ? "Under Weight" : json.calvalues[0] > 25 ? "Obesity" : "Normal",
                mealsperday: json.mealsperday,
                goal: json.goal
            })
            const initialSelectedMeals = Array.from({ length: json.mealsperday }, () => json.meals[0]);
            console.log(initialSelectedMeals);
            setRecommandedMeal(json.meals)
            setSelectedMeals(initialSelectedMeals)
            console.log(recommendedMeals);
            console.log(selectedMeals);
            setIsGenerate(true);
            console.log(json)
            toast.success("Recommendation Generated Successfully !");
        }
        else {
            toast.error(json.error);
        }
    }

    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([0, 0, 0]);

    useEffect(() => {
        // console.log(selectedMeals);
        const newLabels = [];
        let newData = [0, 0, 0];
        console.log(selectedMeals);
        selectedMeals.forEach(item => {
            // newData[0] += item[1]; // Calories
            newData[0] += item[3] * 9; // Fat
            newData[1] += item[4] * 4; // Carb
            newData[2] += item[5] * 4; // Protein
        });
        newData = newData.map((item) => parseFloat(item.toFixed(2)));
        setData(newData)
        console.log(newData);
    }, [recommendedMeals, selectedMeals])

    const handleMealSelection = (e, id) => {
        const selectedMealName = e.target.value.replace(/\s+/g, ' ');
        const selectedMeal = recommendedMeals.find(meal => {
            return meal[0].replace(/\s+/g, ' ') === selectedMealName
        });
        const updatedSelectedMeals = [...selectedMeals];
        updatedSelectedMeals[id] = selectedMeal;
        // console.log();
        setSelectedMeals(updatedSelectedMeals);
    };

    // Save Diet
    const saveDiet = async () => {
        const dataToBeSaved = {
            personalData: {
                age: age,
                height: height,
                weight: weight,
                gender: gender,
                phyAct: sliderValue,
                goal: goal,
                meals_per_day: mealValue,
                wStatus: personalData.wStatus,
                bmi: personalData.bmi,
                bmr: personalData.bmr,
                required_calories: personalData.calories
            },
            recommendedMeals: recommendedMeals
        }
        const response = await fetch(`${ConnString}/auth/save-diet`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ personalData: dataToBeSaved.personalData, recommendedMeals: recommendedMeals })
        });
        const json = await response.json();
        if (json.success) {
            console.log(json)
            toast.success('Diet Saved!')
        }
        else {
            toast.error(json.error);
        }
    }

    const data1 = {
        labels: ['Total Calories You Choose', `${personalData.goal}` + ' Calories'],
        datasets: [
            {
                backgroundColor: [
                    '#D6A029',
                    '#295FD6'
                ],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [data[0] + data[1] + data[2], personalData.calories]
            }
        ]
    };

    const options1 = {
        title: {
            display: true,
            text: 'Sales Overview',
            fontSize: 20
        },
        plugins: {
            legend: {
                display: false // Hide legend
            }
        }
    };

    const data2 = {
        labels: ['Fat', 'Carb', 'Protien'],
        datasets: [
            {
                label: 'My First Dataset',
                data: data,
                backgroundColor: [
                    '#52c0bc',
                    '#fcb524',
                    '#976fe8'
                ],
                hoverOffset: 10
            }
        ]
    };

    const total = data2.datasets[0].data.reduce((acc, val) => acc + val, 0);
    const percentageData = data2.datasets[0].data.map(value => ((value / total) * 100).toFixed(2));

    const options2 = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        // label += percentageData[context.dataIndex] + '%';
                        label += context.raw;
                        return label;
                    },
                },
            },
            legend: {
                display: true,
                position: 'top',
                labels: {
                    generateLabels: function (chart) {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map(function (label, i) {
                                const value = percentageData[i];
                                return {
                                    text: `${label}: ${value}%`,
                                    fillStyle: data.datasets[0].backgroundColor[i],
                                    hidden: isNaN(data.datasets[0].data[i]) || data.datasets[0].data[i] === 0
                                };
                            });
                        }
                        return [];
                    }
                }
            }
        },
    };



    return (
        <>
            <div className={`px-4 md:px-20 lg:px-24 pt-5 pb-10 relative`}>
                <img src="src/assets/pngwing.png" className='fixed top-5 left-0 w-full object-fit opacity-50 z-[-1]' alt="" />
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
                                to="/get-diet-recommendation"
                                className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900"
                            >
                                Get Diet
                            </Link>
                        </li>
                    </ol>
                </nav>
                <div className='flex flex-col justify-center items-center my-5 lg:my-0 z-10'>
                    <div className='text-4xl font-semibold my-2 text-center mb-5'>Automatic Diet Recommendation</div>
                    <form onSubmit={handleSubmit} className='flex flex-col justify-start text-black bg-[#faf5ff] border-2 border-gray-400 w-full lg:w-[80%] p-4'>
                        <div>You can modify the values and click Generate button to use</div>
                        <div className='flex flex-col my-2'>
                            <label htmlFor="age" className='text-black my-1' name="age">Age</label>
                            <div className=' flex justify-between bg-[#4e3964] rounded-md' >
                                <div className='w-full'>
                                    <input type="number" id="age" name="age" className='w-full bg-transparent text-white rounded-md p-2 outline-none' value={age} onChange={(e) => setAge(parseInt(e.target.value))} min={2} required />
                                </div>
                                <div className='flex space-x-1 w-[60px] text-white'>
                                    <button type='button' className={`w-[50%] rounded-l-md hover:${age > 2 ? 'bg-green-500' : 'bg-none'} text-xl`} onClick={() => setAge(age - 1)} disabled={age <= 2}>-</button>
                                    <button type='button' className='w-[50%] rounded-r-md hover:bg-green-500 text-xl' onClick={() => setAge(age + 1)}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col my-2'>
                            <label htmlFor="height" className='text-black my-1'>Height(cm)</label>
                            <div className=' flex justify-between bg-[#4e3964] rounded-md' >
                                <div className='w-full'>
                                    <input type="number" id="height" name="height" className='w-full bg-transparent text-white rounded-md p-2 outline-none' value={height} onChange={(e) => setHeight(parseInt(e.target.value))} min={50} required />
                                </div>
                                <div className='flex space-x-1 w-[60px] text-white'>
                                    <button type='button' className={`w-[50%] rounded-l-md hover:${height > 50 ? 'bg-green-500' : 'bg-none'} text-xl`} onClick={() => setHeight(height - 1)} disabled={height <= 50} readOnly={height <= 50}>-</button>
                                    <button type='button' className='w-[50%] rounded-r-md hover:bg-green-500 text-xl' onClick={() => setHeight(height + 1)}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col my-2'>
                            <label htmlFor="weight" className='text-black my-1'>Weight(kg)</label>
                            <div className=' flex justify-between bg-[#4e3964] rounded-md' >
                                <div className='w-full'>
                                    <input type="number" id="weight" name="weight" className='w-full bg-transparent text-white rounded-md p-2 outline-none' value={weight} onChange={(e) => setWeight(parseInt(e.target.value))} min={10} required />
                                </div>
                                <div className='flex space-x-1 w-[60px] text-white'>
                                    <button type='button' className={`w-[50%] rounded-l-md hover:${weight > 10 ? 'bg-green-500' : 'bg-none'} text-xl`} onClick={() => setWeight(weight - 1)} disabled={weight <= 10}>-</button>
                                    <button type='button' className='w-[50%] rounded-r-md hover:bg-green-500 text-xl' onClick={() => setWeight(weight + 1)}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col my-2'>
                            <label htmlFor="weight" className='text-black my-1'>Gender</label>
                            <div className='flex flex-col'>
                                <div>
                                    <input type="radio" id="male" name="gender" className='bg-gray-700 text-black accent-[#4e3964] rounded-md p-1' defaultChecked={gender === 'male'} onClick={() => setGender("male")} /><label htmlFor="male" className='text-black my-1 px-1'>Male</label>
                                </div>
                                <div>
                                    <input type="radio" id="female" name="gender" className='bg-gray-700 text-black accent-[#4e3964] rounded-md p-1' defaultChecked={gender === 'female'} onClick={() => setGender("female")} /><label htmlFor="female" className='text-black my-1 px-1'>Female</label>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col my-2'>
                            <label htmlFor="phyAct" className='text-black my-1'>Activity</label>
                            <div className='flex justify-center'>{exercise}</div>
                            <input
                                type="range"
                                id="phyAct"
                                className='bg-[#4e3964] rounded-md m-1'
                                name='phyAct'
                                min={0}
                                max={4}
                                value={sliderValue}
                                onChange={(event) => setSliderValue(event.target.value)}
                            />
                            <div className='flex justify-between px-1'>
                                <div>No exersise</div>
                                <div>Extra exersise</div>
                            </div>
                        </div>
                        <div className='flex flex-col my-2'>
                            <label htmlFor="weight" className='text-black my-1'>Choose your weight loss plan:</label>
                            <select id="goal" name="goal" value={goal} onChange={(e) => { setGoal(e.target.value) }} className='bg-[#4e3964] p-2 rounded-md text-white'>
                                <option value="Loss Weight">Loss Weight</option>
                                <option value="Maintain Weight">Maintain Weight</option>
                                <option value="Gain Weight">Gain Weight</option>
                            </select>
                        </div>
                        <div className='flex flex-col my-2'>
                            <label htmlFor="meals" className='text-black my-1'>Meals per day</label>
                            <div className='flex justify-center'>{mealValue}</div>
                            <input type="range" id="meals_per_day" name='meals_per_day' className='bg-[#4e3964] text-white rounded-md m-1' value={mealValue} onChange={(event) => setMealValue(event.target.value)} min={2} max={5} />
                            <div className='flex justify-between px-1'>
                                <div>2</div>
                                <div>5</div>
                            </div>
                        </div>
                        <div className='flex flex-col items-center my-2'>
                            <button type='submit' className='bg-[#4e3964] w-full hover:bg-[#493163] active:scale-[99%] text-white px-3 py-1.5 rounded-md'>Generate</button>
                            {!isAuthenticate && <p className='text-red-500'>With free account you can save your diet! <Link className='underline underline-offset-2 text-[#493163]' to="/login">Login</Link></p>}
                        </div>
                    </form>
                </div>
                {isGenerate &&
                    <div className='flex flex-col justify-center items-center my-5 lg:my-5 z-10'>
                        <div className='w-full lg:w-[80%] bg-[#faf5ff] border-2 border-gray-400'>
                            <div className='flex justify-between text-black p-4'>
                                <div className='flex flex-col justify-start'>
                                    <h1 className='text-3xl font-[500]'>BMI CALCULATOR</h1>
                                    <p>Body Mass Index(BMI)</p>
                                    <h3 className='text-2xl font-[500]'>{personalData.bmi} kg/m<sup>2</sup></h3>
                                    <h3 className={`${personalData.wStatus === 'Under Weight' || personalData.wStatus === 'Obesity' ? 'text-red-700' : 'text-green-700'} text-xl font-[500]`}>{personalData.wStatus}</h3>
                                    <p className='text-sm'>Healthy BMI range: 18.5 kg/m<sup>2</sup>- 25 kg/m<sup>2</sup></p>
                                </div>
                                {isAuthenticate && <div className='flex justify-end items-start'>
                                    <button className='bg-[#4e3964] hover:bg-[#493163] active:scale-[99%] w-[100px] hover: text-white px-3 py-1.5 rounded-md' onClick={saveDiet}>Save Diet</button>
                                </div>}
                            </div>
                            <div className='flex flex-col justify-start text-black p-4'>
                                <h1 className='text-3xl font-[500]'>DIET RECOMMENDATION</h1>
                                <p className='text-2xl font-[500] mt-3'>Recommended recipes:</p>
                                <div className='mt-3'>
                                    {recommendedMeals.length > 0 &&
                                        Array.from({ length: parseInt(personalData.mealsperday) }, (_, index) => (
                                            <select key={index} onChange={(e) => { handleMealSelection(e, index) }} className='bg-[#4e3964] p-2 m-1 rounded-md text-white w-[25%]'>
                                                {recommendedMeals.map((meal, mealIndex) => (
                                                    <option key={mealIndex}>{meal[0]}</option>
                                                ))}
                                            </select>
                                        ))
                                    }
                                </div>
                                <div className='my-4 flex justify-around gap-2'>
                                    {selectedMeals.map((meal, i) => {
                                        return (
                                            <>
                                                <div key={i} className='flex  items-center gap-2 my-2 border w-full p-2 rounded-md'>
                                                    <div className='w-16 h-12 rounded-md'>
                                                        <img src={meal[1]} alt="" className='object-cover w-full h-full rounded-md' />
                                                    </div>
                                                    <div>
                                                        <div className='font-[500]'>{meal[0]}</div>
                                                        <div className='flex flex-col'>
                                                            <div className='text-[#e01fa6]'>Total Calories : {meal[2]} </div>
                                                            <div className='text-[#52c0bc]'>Fat : {meal[3]}gm </div>
                                                            <div className='text-[#fcb524]'>Carb : {meal[4]}gm </div>
                                                            <div className='text-[#976fe8]'>Protien : {meal[5]}gm </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr/>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='flex flex-col justify-start text-black p-4'>
                                <div className='w-full'>
                                    <h1 className='text-2xl text-center font-[500] mb-5'>Total Calories in Recipes vs {personalData.goal} Calories:</h1>
                                    <div className=' flex justify-center'>
                                        <div className='w-[50%]'>
                                            <Bar data={data1} options={options1} />
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <h1 className='text-2xl text-center font-[500] my-5'>Nutritional Values</h1>
                                    <div className=' flex justify-center'>
                                        <div className='w-[50%]'>
                                            <Pie data={data2} options={options2} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isAuthenticate && <div className='flex justify-end p-3'>
                                <button className='bg-[#4e3964] hover:bg-[#493163] active:scale-[99%] w-[100px] hover: text-white px-3 py-1.5 rounded-md' onClick={saveDiet}>Save Diet</button>
                            </div>}
                        </div>
                    </div>}
            </div>
        </>
    )
}
