import React, { useState } from "react";
import likes from "../assets/icons/like.svg";
import comments from "../assets/icons/comment.svg";
import fav from "../assets/icons/heart.svg";
import { useAxios } from "../hooks/useAxios";
import fillFav from "../assets/icons/heart-filled.svg";
import useAllBlogs from "../hooks/useAllBlogs";
import useAuth from "../hooks/useAuth";
import useFavBlogs from "../hooks/useFavBlogs";

export default function FloatingBlogActions({ blog }) {
  const { auth } = useAuth();
  const { api } = useAxios();
  const [favourite, setFavourite] = useState(false);
  const { favBlogs, setFavBlogs } = useFavBlogs();
  const [like, setLike] = useState(
    blog?.likes?.map((like) => auth?.user?.id === like.id)
  );
  const { blogs, setBlogs } = useAllBlogs();
  const handleLike = async (id) => {
    try {
      const response = await api.post(`http://localhost:3000/blogs/${id}/like`);

      console.log(response, "like action");
    } catch (err) {}
  };
  const handleFav = async (id) => {
    try {
      const response = await api.patch(
        `http://localhost:3000/blogs/${id}/favourite`
      );

      if (response.status == 200) {
        setFavourite(true);
        setFavBlogs((favBlogs) => [...favBlogs, response.data]);
      }
    } catch (err) {
      setFavourite(false);
    }
  };

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li onClick={handleLike}>
          <img src={likes} alt="like" />
          <span>{blog?.likes?.length}</span>
        </li>

        <li>
          {" "}
          <button onClick={() => handleFav(blog?.id)}>
            <img src={`${favourite ? fillFav : fav}`} alt="Favourite" />
          </button>
        </li>
        <a href="#comments">
          <li>
            <img src={comments} alt="Comments" />
            <span>{blog?.comments?.length}</span>
          </li>
        </a>
      </ul>
    </div>
  );
}
