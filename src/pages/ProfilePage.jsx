import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import { actions } from "../actions";

import axios from "axios";
import { useParams } from "react-router-dom";
import editIcon from "../assets/icons/edit.svg";
import BlogCard from "../blogs/BlogCard";
export default function ProfilePage() {
  const { auth } = useAuth();
  const { state, dispatch } = useProfile();
  const { id } = useParams();

  useEffect(() => {
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

    fetchProfileData();
  }, [id]);

  console.log(state);
  return (
    <main class="mx-auto max-w-[1020px] py-8">
      <div class="container">
        <div class="flex flex-col items-center py-8 text-center">
          <div class="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            {state?.user?.avatar ? (
              <img
                className="rounded-full"
                src={`${import.meta.env.VITE_BASE_URL}/uploads/avatar/${
                  state?.user?.avatar
                }`}
              />
            ) : (
              <div class="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                <span class="">{state?.user?.firstName?.slice(0, 1)}</span>
              </div>
            )}

            {auth?.user?.id === state?.user?.id && (
              <button class="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80">
                <img src={editIcon} alt="Edit" />
              </button>
            )}
          </div>

          <div>
            <h3 class="text-2xl font-semibold text-white lg:text-[28px]">
              {state?.user?.firstName} {state?.user?.lastName}
            </h3>
            <p class="leading-[231%] lg:text-lg">{state?.user?.email}</p>
          </div>

          <div class="mt-4 flex items-start gap-2 lg:mt-6">
            <div class="flex-1">
              <p class="leading-[188%] text-gray-400 lg:text-lg">
                {state?.user?.bio}
              </p>
            </div>

            <button class="flex-center h-7 w-7 rounded-full">
              <img src={editIcon} alt="Edit" />
            </button>
          </div>
          <div class="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
        </div>

        <h4 class="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
        <div class="my-6 space-y-4">
          {state?.blogs.length !== 0 &&
            state.blogs.map((blog) => <BlogCard blog={blog} />)}
        </div>
      </div>
    </main>
  );
}
