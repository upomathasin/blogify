import React, { useState } from "react";
import likes from "../assets/icons/like.svg";
import comments from "../assets/icons/comment.svg";
import fav from "../assets/icons/heart.svg";
import { useAxios } from "../hooks/useAxios";
import fillFav from "../assets/icons/heart-filled.svg";
import useAllBlogs from "../hooks/useAllBlogs";
import useAuth from "../hooks/useAuth";
import useFavBlogs from "../hooks/useFavBlogs";

export default function FloatingBlogActions({
  blog,
  handleFav,
  handleLike,
  favourite,
}) {
  const { auth } = useAuth();
  const { api } = useAxios();

  const { favBlogs } = useFavBlogs();

  const [like, setLike] = useState(
    blog?.likes?.find((like) => like.id === auth?.user?.id)
  );

  console.log(favourite);

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li onClick={() => handleLike(blog?.id)}>
          <img src={likes} alt="like" />
          <span>{blog?.likes?.length}</span>
        </li>

        <li>
          {" "}
          <button onClick={() => handleFav(blog?.id)}>
            <img src={`${favourite ? fillFav : fav}`} />
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
