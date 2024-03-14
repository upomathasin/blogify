import React, { useState } from "react";
import lws from "../assets/logo.svg";
import searchIcon from "../assets/icons/search.svg";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import { createPortal } from "react-dom";
import SearchBlog from "../blogs/SearchBlog";
export default function Header() {
  const { auth } = useAuth();
  const { state } = useProfile();
  const [showSearchModal, setShowSearchModal] = useState(false);
  return (
    <header>
      {showSearchModal &&
        createPortal(
          <SearchBlog onClose={() => setShowSearchModal(false)}></SearchBlog>,
          document.body
        )}
      <nav className="container">
        <div>
          <img className="w-32" src={lws} alt="lws" />
        </div>

        <div>
          <ul className="flex items-center space-x-5">
            <li>
              <Link
                to="/createBlog"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Write
              </Link>
            </li>
            {auth.user && (
              <li>
                <button
                  onClick={() => setShowSearchModal(true)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img src={searchIcon} alt="Search" />
                  <span>Search</span>
                </button>
              </li>
            )}
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
                  {auth?.state?.user?.avatar ? (
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

                <span class="text-white ml-2">
                  {" "}
                  <Link to={`/profile/${auth?.user?.id}`}>
                    {auth?.user?.firstName} {auth?.user?.lastName}
                  </Link>
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
