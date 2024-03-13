import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAxios } from "../hooks/useAxios";

export default function BlogForm() {
  const fileRef = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [thumbnail, setThumbnail] = useState(null);
  const { api } = useAxios();

  const handlePhotoUpload = (e) => {
    if (e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };
  const onSubmit = async (data) => {
    const formData = new FormData();
    let tags = data.tags.split(",");

    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("tags", tags);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    console.log(formData);

    try {
      const response = await api.post(
        `${import.meta.env.VITE_BASE_URL}/blogs/`,
        formData
      );
      if (response.status == 200) {
        alert("Successfully created blog");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className="createBlog" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
        <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <p
            onClick={() => {
              fileRef.current.click();
            }}
          >
            Upload Your Image
          </p>
          <input
            type="file"
            onChange={handlePhotoUpload}
            name="photo"
            ref={fileRef}
            hidden
          />
        </div>
      </div>
      <div className="mb-6">
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter your blog title"
          {...register("title")}
        />
      </div>

      <div className="mb-6">
        <input
          type="text"
          id="tags"
          name="tags"
          placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
          {...register("tags")}
        />
      </div>

      <div className="mb-6">
        <textarea
          id="content"
          name="content"
          placeholder="Write your blog content"
          {...register("content")}
          rows="8"
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
      >
        Create Blog
      </button>
    </form>
  );
}
