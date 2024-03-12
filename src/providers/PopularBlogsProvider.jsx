import { useState } from "react";
import { PopularBlogsContext } from "../context";

export default function PopularBlogsProvider({ children }) {
  const [popularBlogs, setPopularBlogs] = useState([]);
  return (
    <PopularBlogsContext.Provider value={{ popularBlogs, setPopularBlogs }}>
      {children}
    </PopularBlogsContext.Provider>
  );
}
