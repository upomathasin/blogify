import { Link, useNavigate } from "react-router-dom";
import AllBlogs from "../blogs/AllBlogs";
import useAuth from "../hooks/useAuth";
import FavBlogs from "../blogs/FavBlogs";
import PopularBlogs from "../blogs/PopularBlogs";
import { useContext } from "react";
import { DetailContext } from "../context";

export default function HomePage() {
  const navigate = useNavigate();

  const {showAuthor,showDetails}=useContext(DetailContext);
  const { auth } = useAuth();


  return (
    <main>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <AllBlogs
      
            ></AllBlogs>
            <div className="md:col-span-2 h-full w-full space-y-5">
              <PopularBlogs
          
              ></PopularBlogs>
              {auth.user && (
                <FavBlogs
         
                ></FavBlogs>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
