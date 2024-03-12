import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import FloatingBlogActions from "../blogs/FloatingBlogActions";
import BlogComments from "../blogs/BlogComments";
import BlogContent from "../blogs/BlogContent";
import { useAxios } from "../hooks/useAxios";

export default function BlogDetails() {
  const { api } = useAxios();
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const { auth } = useAuth();
  useEffect(() => {
    const fetchBlogsDetails = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/blogs/${id}`
      );
      console.log("Details", response.data);
      if (response.status == 200) {
        setBlog(response.data);
      }
    };

    fetchBlogsDetails();
  }, []);

  return (
    <div>
      <main>
        <section>
          <BlogContent blog={blog}></BlogContent>
        </section>

        <BlogComments blog={blog}></BlogComments>
      </main>

      <FloatingBlogActions blog={blog}></FloatingBlogActions>
    </div>
  );
}
