import React from "react";
import useFavBlogs from "../hooks/useFavBlogs";

export default function FavBlogs({ showDetails }) {
  const { favBlogs } = useFavBlogs();
  console.log("fav", favBlogs);
  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Your Favourites ❤️
      </h3>

      <ul className="space-y-5 my-5">
        {favBlogs.length != 0 ? (
          favBlogs.map((blog) => {
            return (
              <li onClick={() => showDetails(blog.id)}>
                <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                  {blog.title}
                </h3>
                <p className="text-slate-600 text-sm">{blog?.tags?.split()}</p>
              </li>
            );
          })
        ) : (
          <h1 className="text-lg text-indigo-500">
            Nothing Added To Favourites
          </h1>
        )}
      </ul>
    </div>
  );
}
