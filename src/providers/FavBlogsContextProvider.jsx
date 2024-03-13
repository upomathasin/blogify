import React, { useEffect, useState } from "react";
import { FavBlogsContext } from "../context";
import { useAxios } from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function FavBlogsContextProvider({ children }) {
  const [favBlogs, setFavBlogs] = useState([]);
  const { api } = useAxios();
  const { auth } = useAuth();
  const fetchFavBlogs = async () => {
    const response = await api.get(
      `${import.meta.env.VITE_BASE_URL}/blogs/favourites`
    );

    if (response && response.status == 200) {
      setFavBlogs(response.data.blogs);
    }
  };
  useEffect(() => {
    if (auth?.user) {
      try {
        fetchFavBlogs();
      } catch (err) {
        alert(err.error);
      }
    }
  }, [auth?.user]);

  return (
    <FavBlogsContext.Provider value={{ favBlogs, setFavBlogs, fetchFavBlogs }}>
      {children}
    </FavBlogsContext.Provider>
  );
}
