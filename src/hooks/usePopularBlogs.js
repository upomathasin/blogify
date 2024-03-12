import React, { useContext, useEffect } from "react";
import { PopularBlogsContext } from "../context";
import axios from "axios";

export function usePopularBlogs() {
  const { popularBlogs, setPopularBlogs } = useContext(PopularBlogsContext);

  useEffect(() => {
    const fetchPopularBlogs = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/blogs/popular`
      );
      console.log("popRes", response.data);
      if (response.status == 200) {
        setPopularBlogs(response.data.blogs);
      }
    };

    fetchPopularBlogs();
  }, []);

  return { popularBlogs, setPopularBlogs };
}
