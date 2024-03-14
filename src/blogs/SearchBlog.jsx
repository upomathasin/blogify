import React, { useState } from "react";

import { useAxios } from "../hooks/useAxios";
import closeIcon from "../assets/icons/close.svg";
export default function SearchBlog({ onClose }) {
  const { api } = useAxios();
  const [blogs, setBlogs] = useState([]);
  const searchBlog = async (e) => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_BASE_URL}/search?q=${e.target.value}`
      );

      if (response.status === 200) {
        setBlogs(response?.data?.data);
        console.log(response.data.data);
      }
    } catch (err) {
      console.log(err.message);
      setBlogs([]);
    }
  };

  return (
    <section class="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
      <div class="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
        <div>
          <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
            Search for Your Desire Blogs
          </h3>
          <form>
            <input
              name="search"
              type="text"
              placeholder="Start Typing to Search"
              className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
              onChange={searchBlog}
            />
          </form>
        </div>
        <div className="">
          <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
          <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
            {blogs.map((blog) => {
              return (
                <div className="flex gap-6 py-2">
                  <img
                    className="h-28 object-contain"
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/blog/${
                      blog.thumbnail
                    }`}
                    alt=""
                  />

                  <div className="mt-2">
                    <h3 className="text-slate-300 text-xl font-bold">
                      {blog.title}
                    </h3>

                    <p className="mb-6 text-sm text-slate-500 mt-1">
                      {blog.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <a>
          <img
            onClick={onClose}
            src={closeIcon}
            alt="Close"
            class="absolute right-2 top-2 cursor-pointer w-8 h-8"
          />
        </a>
      </div>
    </section>
  );
}
