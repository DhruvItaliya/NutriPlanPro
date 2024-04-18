import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    const [expand, setExpand] = useState(false);
    const ConnString = import.meta.env.VITE_ConnString;
    const [userData, setUserData] = useState({ name: "", email: "", subject: "", country: "", message: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${ConnString}/contact_us`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: userData.name, email: userData.email, subject: userData.subject, country: userData.country, message: userData.message })
        });
        const json = await response.json();

        if (json.success) {
            toast.success("Sended Successfully");
            setUserData({ name: "", email: "", subject: "", country: "", message: "" });
        }
        else {
            toast.error(json.error);
        }
    }

    // useEffect(()=>{
    //   console.log(userData.gender);
    // },[userData])

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }
    return (
        <>
            <div className='px-4 md:px-20 lg:px-24 mt-5 mb-10'>
            <img src="src/assets/bg-3.jpg" className='fixed top-5 left-0 w-full object-fit opacity-70 z-[-1]' alt="" />
                <nav aria-label="Breadcrumb" className="flex">
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
                                to="/contactUs"
                                className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900"
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ol>
                </nav>
                <div className='flex flex-col justify-center items-center'>
                    <section className=" mx-auto p-4 lg:w-[50%] my-10 rounded-lg shadow-md bg-[#bbd0d5]">
                    <h1 className='text-5xl mb-7 font-[500] text-center text-[#10383b]'>Support & Feedback</h1>
                        <form method="POST" onSubmit={handleSubmit}>
                            <div className='flex gap-4'>
                                <div className="mb-4 flex-grow">
                                    <label htmlFor="name" className="block mb-1">Full Name</label>
                                    <input type="text" id="name" name="name" value={userData.name} onChange={handleChange} className="w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500" placeholder="Your first and last name" required />
                                </div>

                                <div className="mb-4 flex-grow">
                                    <label htmlFor="email" className="block mb-1">Your Email Address</label>
                                    <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} className="w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500" placeholder="john@doe.com" required />
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <div className="mb-4 flex-grow">
                                    <label htmlFor="subject" className="block mb-1">Subject</label>
                                    <input type="text" id="subject" name="subject" value={userData.subject} onChange={handleChange} className="w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500" placeholder="Subject" required />
                                </div>

                                <div className="mb-4 flex-grow">
                                    <label htmlFor="country" className="block mb-1">Country</label>
                                    <select id="country" name="country" size={expand ? 1 : 1} onClick={() => setExpand(!expand)} value={userData.country} onChange={handleChange} className="w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500">
                                        <option value="">Select a country</option>
                                        <option value="IN">India (IN)</option>
                                        <option value="US">United States (US)</option>
                                        <option value="DE">Germany (DE)</option>
                                        <option value="FR">France (FR)</option>
                                        <option value="IT">Italy (IT)</option>
                                        <option value="IT">United Kingdom (UK)</option>
                                        <option value="AF">Afghanistan (AF)</option>
                                        <option value="AL">Albania (AL)</option>
                                        <option value="DZ">Algeria (DZ)</option>
                                        <option value="AD">Andorra (AD)</option>
                                        <option value="AO">Angola (AO)</option>
                                        <option value="AG">Antigua and Barbuda (AG)</option>
                                        <option value="AR">Argentina (AR)</option>
                                        <option value="AM">Armenia (AM)</option>
                                        <option value="AU">Australia (AU)</option>
                                        <option value="AT">Austria (AT)</option>
                                        <option value="AZ">Azerbaijan (AZ)</option>
                                        <option value="BS">Bahamas (BS)</option>
                                        <option value="BH">Bahrain (BH)</option>
                                        <option value="BD">Bangladesh (BD)</option>
                                        <option value="BB">Barbados (BB)</option>
                                        <option value="BY">Belarus (BY)</option>
                                        <option value="BE">Belgium (BE)</option>
                                        <option value="BZ">Belize (BZ)</option>
                                        <option value="BJ">Benin (BJ)</option>
                                        <option value="BT">Bhutan (BT)</option>
                                        <option value="BO">Bolivia (BO)</option>
                                        <option value="BA">Bosnia and Herzegovina (BA)</option>
                                        <option value="BW">Botswana (BW)</option>
                                        <option value="BR">Brazil (BR)</option>
                                        <option value="BN">Brunei (BN)</option>
                                        <option value="BG">Bulgaria (BG)</option>
                                        <option value="BF">Burkina Faso (BF)</option>
                                        <option value="BI">Burundi (BI)</option>
                                        <option value="CV">Cabo Verde (CV)</option>
                                        <option value="KH">Cambodia (KH)</option>
                                        <option value="CM">Cameroon (CM)</option>
                                        <option value="CA">Canada (CA)</option>
                                        <option value="CF">Central African Republic (CF)</option>
                                        <option value="TD">Chad (TD)</option>
                                        <option value="CL">Chile (CL)</option>
                                        <option value="CN">China (CN)</option>
                                        <option value="CO">Colombia (CO)</option>
                                        <option value="KM">Comoros (KM)</option>
                                        <option value="CG">Congo (Congo-Brazzaville) (CG)</option>
                                        <option value="CD">Congo, Democratic Republic of the (Congo-Kinshasa) (CD)</option>
                                        <option value="CR">Costa Rica (CR)</option>
                                        <option value="CI">Cote d'Ivoire (CI)</option>
                                        <option value="HR">Croatia (HR)</option>
                                        <option value="CU">Cuba (CU)</option>
                                        <option value="CY">Cyprus (CY)</option>
                                        <option value="CZ">Czechia (Czech Republic) (CZ)</option>
                                        <option value="DK">Denmark (DK)</option>
                                        <option value="DJ">Djibouti (DJ)</option>
                                        <option value="DM">Dominica (DM)</option>
                                        <option value="DO">Dominican Republic (DO)</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="message" className="block mb-1">Your message</label>
                                <textarea id="message" name="message" value={userData.message} onChange={handleChange} className="w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500" placeholder="Enter your message..." required></textarea>
                            </div>

                            <div className="mb-4">
                                <button type="submit" className="w-full px-4 py-2 rounded bg-[#10383b] text-white hover:bg-[#153336] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Send</button>
                            </div>

                        </form>
                    </section>
                </div>
            </div>
        </>

    )
}

export default ContactUs