import React, { useContext, useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import { actions } from "../actions";
import dots from "../assets/icons/3dots.svg";
import axios from "axios";
import { useParams } from "react-router-dom";
import editIcon from "../assets/icons/edit.svg";
import BlogCard from "../blogs/BlogCard";
import { DetailContext } from "../context";
import { useForm } from "react-hook-form";
import { useAxios } from "../hooks/useAxios";
import ProfileInfo from "../profile/ProfileInfo";
export default function ProfilePage() {
  const { state, dispatch } = useProfile();
  const { id } = useParams();
  const { showAuthor, showDetails } = useContext(DetailContext);

  const { api } = useAxios();
  const fetchProfileData = async () => {
    try {
      dispatch({ type: actions.profile.DATA_FETCHING });
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/profile/${id}`
      );

      console.log("profile", response);
      if (response.status === 200) {
        dispatch({ type: actions.profile.DATA_FETCHED, data: response.data });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [id]);

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        <ProfileInfo></ProfileInfo>
        <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
        <div className="my-6 space-y-4">
          {state?.blogs.length !== 0 ? (
            state.blogs.map((blog) => (
              <BlogCard
                blog={blog}
                key={blog.id}
                fetchProfileData={fetchProfileData}
                showAuthor={() => showAuthor(e, blog?.author?.id)}
                showDetails={() => showDetails(blog?.id)}
              />
            ))
          ) : (
            <h1 className="text-4xl text-center">
              No Blog Created By
              <span className="text-indigo-500">
                {" "}
                {state?.user?.firstName} {state?.user?.lastName}
              </span>
            </h1>
          )}
        </div>
      </div>
    </main>
  );
}
