import React, { useContext, useState } from "react";
import { usePopularBlogs } from "../hooks/usePopularBlogs";
import { DetailContext } from "../context";

export default function PopularBlogs() {
  const { popularBlogs } = usePopularBlogs();
  const { showAuthor, showDetails } = useContext(DetailContext);
  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>

      {popularBlogs.length !== 0 ? (
        <ul className="space-y-5 my-5">
          {popularBlogs?.map((blog) => {
            return (
              <li key={blog.id} onClick={() => showDetails(blog?.id)}>
                <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                  {blog.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  by
                  <span>
                    {" "}
                    <button onClick={(e) => showAuthor(e, blog?.author?.id)}>
                      {blog.author.firstName} {blog.author.lastName}
                    </button>
                  </span>
                  <span>·</span> {blog.likes.length} Likes
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <h1 className="text-lg text-indigo-500 py-2">No Popular Blog Exist.</h1>
      )}
    </div>
  );
}
