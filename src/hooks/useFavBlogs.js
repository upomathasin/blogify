import React, { useContext, useEffect, useState } from "react";
import { FavBlogsContext } from "../context";
import { useAxios } from "./useAxios";

export default function useFavBlogs() {
  const [favBlogs, setFavBlogs] = useState([]);
  const { api } = useAxios();

  useEffect(() => {
    try {
      const fetchFavBlogs = async () => {
        const response = await api.get(
          `${import.meta.env.VITE_BASE_URL}/blogs/favourites`
        );

        if (response && response.status == 200) {
          setFavBlogs(response.data.blogs);
        }
      };

      fetchFavBlogs();
    } catch (err) {
      console.log(err.message);
    }
  }, []);
  return { favBlogs, setFavBlogs };
}
