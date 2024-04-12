import React from 'react';
import { Link } from 'react-router-dom';

const BlogItem = (props) => {
    return (
        <div>
            <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                <img
                    alt=""
                    src={props.img}
                    className="h-56 w-full object-fit"
                />

                <div className="p-4 sm:p-6">
                    <time dateTime="2022-10-10" className="block text-xs text-gray-500"> {props.date} </time>
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">
                            {props.title}
                        </h3>
                    </div>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        {props.description}
                    </p>
                    <Link to={`/blog_post/${props.id}`} onClick={window.scrollTo({top:0,behavior:"smooth"})} className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                        Find out more
                        <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                            &rarr;
                        </span>
                    </Link>
                </div>
            </article>
        </div>
    )
}

export default BlogItem