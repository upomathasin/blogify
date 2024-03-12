import { Link, useNavigate } from "react-router-dom";
import AllBlogs from "../blogs/AllBlogs";
import useAuth from "../hooks/useAuth";
import FavBlogs from "../blogs/FavBlogs";
import PopularBlogs from "../blogs/PopularBlogs";

export default function HomePage() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const showAuthor = (e, id) => {
    e.stopPropagation();
    navigate(`profile/${id}`);
  };
  const showDetails = (id) => {
    navigate(`blogDetails/${id}`);
  };

  return (
    <main>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <AllBlogs
              showAuthor={showAuthor}
              showDetails={showDetails}
            ></AllBlogs>
            <div className="md:col-span-2 h-full w-full space-y-5">
              <PopularBlogs
                showAuthor={showAuthor}
                showDetails={showDetails}
              ></PopularBlogs>
              {auth.user && (
                <FavBlogs
                  showAuthor={showAuthor}
                  showDetails={showDetails}
                ></FavBlogs>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
