import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import FloatingBlogActions from "../blogs/FloatingBlogActions";
import BlogComments from "../blogs/BlogComments";
import BlogContent from "../blogs/BlogContent";
import { useAxios } from "../hooks/useAxios";
import useFavBlogs from "../hooks/useFavBlogs";

export default function BlogDetails() {
  const { api } = useAxios();
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const { fetchFavBlogs, favBlogs } = useFavBlogs();
  const [favourite, setFavourite] = useState(
    favBlogs.find((fav) => (fav.id === id ? true : false))
  );

  const fetchBlogsDetails = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/blogs/${id}`
    );
    console.log("Details", response.data);
    if (response.status == 200) {
      setBlog(response.data);
    }
  };
  useEffect(() => {
    fetchBlogsDetails();
  }, [favourite]);

  const handleLike = async (id) => {
    try {
      const response = await api.post(`http://localhost:3000/blogs/${id}/like`);
      // setLike(response?.data?.isLiked);
      console.log(response, "like action");
      if (response.status == 200) {
        fetchBlogsDetails();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleFav = async (id) => {
    try {
      const response = await api.patch(
        `http://localhost:3000/blogs/${id}/favourite`
      );

      if (response.status == 200) {
        console.log("fav");
        setFavourite(!favourite);
        fetchFavBlogs();
      }
    } catch (err) {
      setFavourite(false);
    }
  };

  console.log("fav in blog details : ", favourite);
  return (
    <div>
      <main>
        <section>
          <BlogContent blog={blog}></BlogContent>
        </section>

        <BlogComments blog={blog}></BlogComments>
      </main>

      <FloatingBlogActions
        blog={blog}
        handleFav={handleFav}
        handleLike={handleLike}
        favourite={favourite}
      ></FloatingBlogActions>
    </div>
  );
}
