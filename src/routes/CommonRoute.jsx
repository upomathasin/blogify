import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Outlet } from "react-router-dom";
import ProfileContextProvider from "../providers/ProfileContextProvider";
import BlogContextProvider from "../providers/BlogContextProvider";
import FavBlogsContextProvider from "../providers/FavBlogsContextProvider";
import PopularBlogsProvider from "../providers/PopularBlogsProvider";
import AuthProvider from "../providers/AuthProvider";
import useAuth from "../hooks/useAuth";

export default function CommonRoute() {
  const { auth } = useAuth();
  return (
    <div>
      {" "}
      <BlogContextProvider>
        {" "}
        <PopularBlogsProvider>
          <ProfileContextProvider>
            <Header></Header>

            <FavBlogsContextProvider>
              <Outlet></Outlet>
            </FavBlogsContextProvider>
          </ProfileContextProvider>
        </PopularBlogsProvider>
      </BlogContextProvider>
      <Footer></Footer>
    </div>
  );
}
