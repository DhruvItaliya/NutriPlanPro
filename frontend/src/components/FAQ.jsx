import React from 'react'
import faqData from '../assets/FAQ'
const FAQ = () => {
  return (
    <div className='mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8 lg:py:6'>
        <h1 className="text-3xl font-bold text-black my-8 text-center">Frequently Asked Questions</h1>
            <div className="space-y-4 overflow-hidden ">
                {faqData.map((faq, index) => (
                    <details
                        key={index}
                        className="group border-s-4 shadow-md border-[#10383b] bg-gray-50 bg-opacity-50 p-6 [&_summary::-webkit-details-marker]:hidden"
                    >
                        <summary className="flex cursor-pointer  items-center justify-between gap-1.5">
                            <h2 className="text-lg font-medium text-gray-900">{faq.question}</h2>
                            <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </summary>
                        <p className="mt-4 leading-relaxed  text-gray-700">{faq.answer}</p>
                    </details>
                ))}
            </div>
    </div>
  )
}

export default FAQ