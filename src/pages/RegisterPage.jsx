import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RegisterPage() {
  const { auth, setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const handleReg = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        data
      );
      console.log(response);
      if (response.status == 201) {
        const { user, token } = response.data;
        const { refreshToken, accessToken } = token;
        console.log(user, accessToken, refreshToken);
        setAuth({
          ...auth,
          user,
          accessToken,
          refreshToken,
        });

        alert("Register  Successful!");
        navigate("/");
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: "User Email not found!",
      });
      console.log(error.message);
    }
  };
  return (
    <main>
      <section className="container">
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          <form action="" autocomplete="off" onSubmit={handleSubmit(handleReg)}>
            <div className="mb-6">
              <label for="firstName" className="block mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                {...register("firstName", { required: true })}
                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label for="lastName" className="block mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                {...register("lastName", { required: true })}
                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label for="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                {...register("email", { required: true })}
                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label for="password" className="block mb-2">
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                id="password"
                name="password"
                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Create Account
              </button>
            </div>
            <p className="text-center">
              Already have account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
