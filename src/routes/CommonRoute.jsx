import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Outlet } from "react-router-dom";
import ProfileContextProvider from "../providers/ProfileContextProvider";
import BlogContextProvider from "../providers/BlogContextProvider";
import FavBlogsContextProvider from "../providers/FavBlogsContextProvider";
import PopularBlogsProvider from "../providers/PopularBlogsProvider";
import AuthProvider from "../providers/AuthProvider";

export default function CommonRoute() {
  return (
    <div>
      <AuthProvider>
        {" "}
        <BlogContextProvider>
          {" "}
          <PopularBlogsProvider>
            <ProfileContextProvider>
              <Header></Header>

              <Outlet></Outlet>
            </ProfileContextProvider>
          </PopularBlogsProvider>
        </BlogContextProvider>
      </AuthProvider>
      <Footer></Footer>
    </div>
  );
}
