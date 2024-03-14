import React from "react";
import BlogForm from "../blogs/BlogForm";
import { useLocation } from "react-router-dom";

export default function CreateBlog() {
  const { state } = useLocation();
  console.log(state);
  return (
    <main>
      <section>
        <div className="container">
          <BlogForm blog={state}></BlogForm>
        </div>
      </section>
    </main>
  );
}
