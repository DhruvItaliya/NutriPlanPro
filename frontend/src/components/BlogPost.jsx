import React, { useEffect } from 'react'
import { useParams,Link } from 'react-router-dom';
import all_blogs from '../assets/all_blogs';
import parse from 'html-react-parser';
import RelatedBlogs from './RelatedBlogs';


const BlogPost = () => {
    let { id } = useParams();
    id = parseInt(id);
    return (

        <div className='px-4 md:px-20 lg:px-48 mt-5 mb-10'>
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
                            to="/blogs"
                            className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900"
                        >
                            Blogs
                        </Link>
                    </li>
                    <li className="relative flex items-center">
                        <span
                            className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"
                        >
                        </span>

                        <Link
                            to={`/blog_post/${id}`}
                            className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900"
                        >
                            Blog Post
                        </Link>
                    </li>
                </ol>
            </nav>
            <div className='flex my-5'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-3xl sm:text-4xl text-center'>{all_blogs[id-1].title}</h1>
                    <p className='my-2'>{all_blogs[id-1].date} by <span className='text-[#10383b] font-[500]'>NutriPlanPro</span></p>
                    <div style={{ whiteSpace: "pre-line" }} className='text-justify'>
                        {parse(all_blogs[id-1].description)}
                    </div>
                </div>
            </div>
            <RelatedBlogs blog={all_blogs[id-1]} />
        </div>
    )
}

export default BlogPost