import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAxios } from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function BlogForm({ blog }) {
  const fileRef = useRef(null);
  const [defaultBlog, setDefaultBlog] = useState(blog || {});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [thumbnail, setThumbnail] = useState(null);
  const { api } = useAxios();
  const { auth } = useAuth();

  const handlePhotoUpload = (e) => {
    console.log(e.target.files[0]);
    if (
      !e.target.files[0].type.startsWith("image/") ||
      e.target.value.size > 5 * 1024 * 1024
    ) {
      alert("Only images are allowed.And file size must be less than 5MB");
      return;
    } else {
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

    if (blog?.id) {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_BASE_URL}/blogs/${blog.id}`,
          formData
        );

        if (response.data.id === blog.id) {
          alert(`Blog has been updated successfully !`);
          console.log(response.data);
          navigate(`/blogDetails/${response.data.id}`);
        }
      } catch (err) {
        alert(err.message);
      }
    } else {
      try {
        const response = await api.post(
          `${import.meta.env.VITE_BASE_URL}/blogs/`,
          formData
        );
        console.log(response.data);
        if (response.data.status === "success") {
          console.log(response.data.status);
          alert(`${response.data.message}`);

          navigate(`/blogDetails/${response.data.blog.id}`);
        }
      } catch (err) {
        alert(err.message);
      }
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
      <div className="my-4 w-full">
        {defaultBlog?.thumbnail && (
          <img
            className=" w-44"
            src={`http://localhost:3000/uploads/blog/${defaultBlog.thumbnail}`}
          />
        )}
      </div>
      {thumbnail && (
        <p>
          Selected Thumbnail :{" "}
          <span className="text-indigo-500"> {thumbnail.name}</span>{" "}
        </p>
      )}
      <div className="mb-6">
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={`${defaultBlog.title ? defaultBlog.title : ""}`}
          placeholder="Enter your blog title"
          {...register("title", { required: true })}
        />
        {errors?.title && <p className="text-red-500">Title is required </p>}
      </div>

      <div className="mb-6">
        <input
          type="text"
          id="tags"
          name="tags"
          defaultValue={`${
            defaultBlog.tags ? defaultBlog.tags.split(",") : ""
          }`}
          placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
          {...register("tags", { required: true })}
        />
        {errors?.tags && <p className="text-red-500">Tags are required </p>}
      </div>

      <div className="mb-6">
        <textarea
          id="content"
          name="content"
          placeholder="Write your blog content"
          {...register("content", { required: true })}
          defaultValue={defaultBlog.content ? defaultBlog.content : ""}
          rows="8"
        ></textarea>
        {errors?.content && (
          <p className="text-red-500">Content is required </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
      >
        {`${blog?.id ? "Edit Blog " : "Create Blog"}`}
      </button>
    </form>
  );
}
