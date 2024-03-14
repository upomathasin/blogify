import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import deleteIcon from "../assets/icons/delete.svg";
export default function BlogComments({
  blog,
  handleComment,
  handleCommentDelete,
}) {
  const { auth } = useAuth();

  const [commentText, setCommentText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.comment.value.trim() !== "") {
      const comment = { content: e.target.comment.value };
      handleComment(blog?.id, comment);
      setCommentText("");
    } else {
      alert("Please write something before submitting comment !");
    }
  };

  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">
          Comments ({blog?.comments?.length})
        </h2>
        {auth?.user && (
          <div className="flex items -center space-x-4">
            <div className="avater-img bg-indigo-600 text-white">
              {auth?.user?.avatar ? (
                <img
                  className="rounded-full w-10"
                  src={`${import.meta.env.VITE_BASE_URL}/uploads/avatar/${
                    auth?.user?.avatar
                  }`}
                />
              ) : (
                <span>{auth?.user?.firstName.slice(0, 1)}</span>
              )}
            </div>
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <textarea
                  name="comment"
                  className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                  placeholder="Write a comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>

                <div className="flex justify-end mt-4">
                  <button className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                    Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {blog?.comments?.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-4 my-8">
            {comment?.author?.avatar ? (
              <img
                className="rounded-full w-10"
                src={`${import.meta.env.VITE_BASE_URL}/uploads/avatar/${
                  comment?.author?.avatar
                }`}
              />
            ) : (
              <span className=" rounded-full">
                {comment?.author?.firstName.slice(0, 1)}
              </span>
            )}

            <div className="w-full">
              <h5 className="text-slate -500 font-bold">
                {comment?.author?.firstName} {comment?.author?.lastName}
              </h5>
              <p className="text-slate-300">{comment.content}</p>
            </div>
            {comment?.author?.id === auth?.user?.id && (
              <div
                className="flex justify-center items-center "
                onClick={() => handleCommentDelete(blog?.id, comment?.id)}
              >
                {" "}
                <img src={deleteIcon} alt="Delete Blog" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
