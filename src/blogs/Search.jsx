import React, { useContext } from "react";
import { searchContext } from "../providers/SearchContextProvider";

export default function Search() {
  const { setSearchTerm } = useContext(searchContext);
  const handleSearch = (e) => {
    setSearchTerm(e);
  };
  return (
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
          onChange={(e) => handleSearch(e.target.value)}
        />
      </form>
    </div>
  );
}
