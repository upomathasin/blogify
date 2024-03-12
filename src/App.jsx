import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./providers/AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import CommonRoute from "./routes/CommonRoute";
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<CommonRoute />}>
          {" "}
          <Route path="/" element={<HomePage></HomePage>}></Route>;
          <Route
            path="/profile/:id"
            element={<ProfilePage></ProfilePage>}
          ></Route>
          <Route
            path="/blogDetails/:id"
            element={<BlogDetails></BlogDetails>}
          ></Route>
          <Route
            path="/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>;
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
