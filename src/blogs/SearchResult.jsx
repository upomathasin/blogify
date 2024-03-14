import React, { useContext } from "react";
import { searchContext } from "../providers/SearchContextProvider";

export default function SearchResult() {
  const { searchResult } = useContext(searchContext);
  return (
    <div className="">
      <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
      <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
        {searchResult.map((blog) => {
          <div className="flex gap-6 py-2">
            <img
              className="h-28 object-contain"
              src={`${import.meta.env.VITE_BASE_URL}/uploads/blog/${
                blog?.thumbnail
              }`}
              alt=""
            />

            <div className="mt-2">
              <h3 className="text-slate-300 text-xl font-bold">
                {blog?.title}
              </h3>

              <p className="mb-6 text-sm text-slate-500 mt-1">
                {blog?.content}
              </p>
            </div>
          </div>;
        })}
      </div>
    </div>
  );
}
