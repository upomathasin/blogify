import React from "react";
import useAuth from "../hooks/useAuth";
import BlogActions from "./BlogActions";
export default function BlogCard({ blog, showDetails, showAuthor }) {
  const { auth } = useAuth();

  return (
    <div onClick={showDetails} className="blog-card">
      <img
        className="blog-thumb"
        src="./assets/blogs/React-Roadmap.jpg"
        alt=""
      />
      <div className="mt-2 relative">
        <h3 className="text-slate-300 text-xl lg:text-2xl">
          <p>{blog.title}</p>
        </h3>

        <p className="mb-6 text-base text-slate-500 mt-1">{blog.content}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <div className="avater-img bg-indigo-600 text-white">
              {blog.author.avatar ? (
                <img
                  className="rounded-full"
                  src={`${import.meta.env.VITE_BASE_URL}/uploads/avatar/${
                    blog.author.avatar
                  }`}
                />
              ) : (
                <span className=" rounded-full">
                  {blog.author.firstName.slice(0, 1)}
                </span>
              )}
            </div>

            <div>
              <h5 className="text-slate-500 text-sm">
                <button onClick={showAuthor}>
                  By {blog.author.firstName} {blog.author.lastName}
                </button>
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>
                  {" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-slate-700">
            <span>{blog.likes.length} Likes</span>
          </div>
        </div>
        {auth.user && auth.user.id === blog.author.id && (
          <BlogActions blog={blog}></BlogActions>
        )}
      </div>
    </div>
  );
}
