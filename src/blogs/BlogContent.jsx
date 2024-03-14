import React, { useContext } from "react";
import { DetailContext } from "../context";

export default function BlogContent({ blog }) {
  const { showAuthor } = useContext(DetailContext);
  return (
    <div className="container text-center py-8">
      <h1 className="font-bold text-3xl md:text-5xl">{blog.title}</h1>
      <div className="flex justify-center items-center my-4 gap-4">
        <div className="flex items-center capitalize space-x-2">
          <div className="avater-img bg-indigo-600 text-white">
            {blog?.author?.avatar ? (
              <img
                className="rounded-full"
                src={`${import.meta.env.VITE_BASE_URL}/uploads/avatar/${
                  blog.author.avatar
                }`}
              />
            ) : (
              <span className=" rounded-full">
                {blog?.author?.firstName.slice(0, 1)}
              </span>
            )}
          </div>
          <h5
            className="text-slate-500 text-sm"
            onClick={(e) => showAuthor(e, blog?.author?.id)}
          >
            {blog?.author?.firstName} {blog?.author?.lastName}
          </h5>
        </div>
        <span className="text-sm text-slate-700 dot">
          {new Date(blog?.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <span className="text-sm text-slate-700 dot">
          {blog?.likes?.length} Likes
        </span>
      </div>
      {blog?.thumbnail && (
        <img
          className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
          src={`${import.meta.env.VITE_BASE_URL}/uploads/blog/${
            blog?.thumbnail
          }`}
          alt=""
        />
      )}

      <ul className="tags">
        {blog?.tags?.split(",").map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <div
        dangerouslySetInnerHTML={{ __html: `<p >${blog?.content}</p>` }}
        className="mx-auto  w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2  text-justify"
      ></div>
    </div>
  );
}
