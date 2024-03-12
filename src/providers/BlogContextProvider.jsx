import React, { useState } from "react";
import { BlogContext } from "../context";

export default function BlogContextProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  return (
    <BlogContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </BlogContext.Provider>
  );
}
