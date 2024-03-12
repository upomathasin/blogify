import React, { useContext, useEffect } from "react";
import { FavBlogsContext } from "../context";
import { useAxios } from "./useAxios";

export default function useFavBlogs() {
  const { favBlogs, setFavBlogs } = useContext(FavBlogsContext);
  const { api } = useAxios();

  useEffect(() => {
    const fetchFavBlogs = async () => {
      const response = await api.post(
        `${import.meta.env.VITE_BASE_URL}/blogs/favourites`
      );

      if (response && response.status == 200) {
        setFavBlogs(response.data);
      }
    };

    fetchFavBlogs();
  }, []);
  return { favBlogs, setFavBlogs };
}
