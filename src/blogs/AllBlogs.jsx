import React, { useEffect, useState, useRef } from "react";
import BlogCard from "./BlogCard";
import useAllBlogs from "../hooks/useAllBlogs";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AllBlogs({ showAuthor, showDetails }) {
  const { blogs, setBlogs } = useAllBlogs();
  const loadRef = useRef(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/blogs?page=${page}&limit=${10}`
        );

        if (response?.data?.blogs?.length === 0) {
          setHasMore(false);
        } else {
          setBlogs((prevBlogs) => [...prevBlogs, ...response.data.blogs]);
          setPage((prevPage) => prevPage + 1);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    const onInterception = (items) => {
      const loaderItem = items[0];
      console.log(items[0]);
      if (loaderItem.isIntersecting && hasMore) {
        fetchBlog();
      }
    };
    const observer = new IntersectionObserver(onInterception);

    if (observer && loadRef.current) {
      observer.observe(loadRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasMore, page]);

  return (
    <div className="space-y-3 md:col-span-5">
      {console.log(blogs)}
      {blogs &&
        blogs.map((blog, index) => {
          return (
            <BlogCard
              key={blog}
              blog={blog}
              showAuthor={(e) => showAuthor(e, blog?.author?.id)}
              showDetails={() => showDetails(blog.id)}
            ></BlogCard>
          );
        })}

      <div ref={loadRef}>
        {hasMore ? (
          <div className="text-center text-teal-600 py-5">
            <h1 className="text-3xl">Fetching more data.......</h1>
          </div>
        ) : (
          <div className="text-center text-indigo-500 py-5">
            <h1 className="text-3xl">No More Blog To Fetch.</h1>
          </div>
        )}
      </div>
    </div>
  );
}
