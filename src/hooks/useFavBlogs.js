import React, { useContext, useEffect, useState } from "react";
import { FavBlogsContext } from "../context";
import { useAxios } from "./useAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export default function useFavBlogs() {
  const [favBlogs, setFavBlogs] = useState([]);
  const { api } = useAxios();
  const { auth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFavBlogs = async () => {
      const response = await api.get(
        `${import.meta.env.VITE_BASE_URL}/blogs/favourites`
      );

      if (response && response.status == 200) {
        setFavBlogs(response.data.blogs);
      }
    };
    if (auth?.user) {
      try {
        fetchFavBlogs();
      } catch (err) {
        alert(err.error);
      }
    }
  }, []);
  return { favBlogs, setFavBlogs };
}
