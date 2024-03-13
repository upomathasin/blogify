import React, { useContext, useEffect, useState } from "react";
import { FavBlogsContext } from "../context";

export default function useFavBlogs() {
  const { favBlogs, setFavBlogs, fetchFavBlogs } = useContext(FavBlogsContext);
  return { favBlogs, setFavBlogs, fetchFavBlogs };
}
