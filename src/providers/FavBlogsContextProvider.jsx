import React, { useState } from "react";
import { FavBlogsContext } from "../context";

export default function FavBlogsContextProvider({ children }) {
  //const [favBlogs, setFavBlogs] = useState([]);
  return (
    <FavBlogsContext.Provider value={{ favBlogs, setFavBlogs }}>
      {children}
    </FavBlogsContext.Provider>
  );
}
