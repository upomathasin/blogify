import React, { useContext } from "react";
import { BlogContext } from "../context";

export default function useAllBlogs() {
  const { blogs, setBlogs } = useContext(BlogContext);

  console.log("all blog", blogs);
  return { blogs, setBlogs };
}
