import React, { useEffect, useState } from 'react'
import all_blogs from '../assets/all_blogs';
import BlogItem from './BlogItem';
const RelatedBlogs = (props) => {
  const { blog } = props;
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  useEffect(() => {
    const getRelatedProducts = () => {
      const related = [];
      for (let i = 0; i < 4; i++) {
        console.log((blog.id + i + 1) % all_blogs.length)
        related.push(all_blogs[(blog.id + i + 1) % all_blogs.length ]);
      }
      setRelatedBlogs(related);
    }
    getRelatedProducts();
  }, [blog])

  useEffect(()=>{
    console.log(relatedBlogs)
  },[relatedBlogs])

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-[#171717] text-[30px] font-[600]'>Related Blogs</h1>
      <hr className='w-[100px] h-[6px] rounded-full bg-[#252525]' />
      <div className='my-[30px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7'>
        {relatedBlogs.length > 0 ? relatedBlogs.map((item, i) => {
          return <BlogItem key={item.id} img={item.img} id={item.id} title={item.title} description={item.description} date={item.date} />
        }) : null}
      </div>
    </div>
  )
}

export default RelatedBlogs