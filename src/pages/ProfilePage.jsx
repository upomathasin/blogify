import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import { actions } from "../actions";
import dots from "../assets/icons/3dots.svg";
import axios from "axios";
import { useParams } from "react-router-dom";
import editIcon from "../assets/icons/edit.svg";
import BlogCard from "../blogs/BlogCard";
export default function ProfilePage() {
  const { auth } = useAuth();
  const { state, dispatch } = useProfile();
  const { id } = useParams();

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
        <div className="flex flex-col items-center py-8 text-center">
          <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            {state?.user?.avatar ? (
              <img
                className="rounded-full"
                src={`${import.meta.env.VITE_BASE_URL}/uploads/avatar/${
                  state?.user?.avatar
                }`}
              />
            ) : (
              <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                <span className="">{state?.user?.firstName?.slice(0, 1)}</span>
              </div>
            )}

            {auth?.user?.id === state?.user?.id && (
              <button className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80">
                <img src={editIcon} alt="Edit" />
              </button>
            )}
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
              {state?.user?.firstName} {state?.user?.lastName}
            </h3>
            <p className="leading-[231%] lg:text-lg">{state?.user?.email}</p>
          </div>

          <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
              <p className="leading-[188%] text-gray-400 lg:text-lg">
                {state?.user?.bio}
              </p>
            </div>

            <button className="flex-center h-7 w-7 rounded-full">
              <img src={editIcon} alt="Edit" />
            </button>
          </div>
          <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
        </div>

        <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
        <div className="my-6 space-y-4">
          {state?.blogs.length !== 0 ? (
            state.blogs.map((blog) => (
              <BlogCard
                blog={blog}
                key={blog.id}
                fetchProfileData={fetchProfileData}
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
