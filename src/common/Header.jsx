import React from "react";
import lws from "../assets/logo.svg";
import searchIcon from "../assets/icons/search.svg";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
export default function Header() {
  const { auth } = useAuth();

  console.log("auth", auth);

  return (
    <header>
      <nav className="container">
        <div>
          <a href="./index.html">
            <img className="w-32" src={lws} alt="lws" />
          </a>
        </div>

        <div>
          <ul className="flex items-center space-x-5">
            <li>
              <a
                href="./createBlog.html"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Write
              </a>
            </li>
            <li>
              <a
                href="./search.html"
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={searchIcon} alt="Search" />
                <span>Search</span>
              </a>
            </li>
            {!auth.user && (
              <li>
                <Link
                  to="/login"
                  className="text-white/50 hover:text-white transition-all duration-200"
                >
                  {" "}
                  Login{" "}
                </Link>
              </li>
            )}

            {auth?.user && (
              <li class="flex items-center">
                <div class="avater-img bg-orange-600 text-white">
                  {auth?.user?.avatar ? (
                    <span>
                      {" "}
                      <img
                        className="rounded-full  "
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/avatar/${
                          auth?.user?.avatar
                        }`}
                      />
                    </span>
                  ) : (
                    <span class="">{auth.user?.firstName.slice(0, 1)}</span>
                  )}
                </div>

                <a href="./profile.html">
                  <span class="text-white ml-2">
                    {" "}
                    <Link to={`/profile/${auth?.user?.id}`}>
                      {auth?.user?.firstName} {auth?.user?.lastName}
                    </Link>
                  </span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
