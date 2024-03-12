import React from "react";
import { set, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const submitFrom = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        data
      );
      console.log(response);
      if (response.status == 200) {
        const { user, token } = response.data;
        const { refreshToken, accessToken } = token;
        console.log(user, accessToken, refreshToken);
        setAuth({
          ...auth,
          user,
          accessToken,
          refreshToken,
        });

        alert("Login Successful!");
        navigate("/");
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: "User Email not found!",
      });
      console.log(error.message);
    }

    console.log(auth);
  };

  return (
    <form onSubmit={handleSubmit(submitFrom)}>
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
        />

        {!!errors.email && (
          <div className=" py-1 text-red-400" role="alert">
            <p>Email is required !</p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
          name="password"
          className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
        />
        {!!errors.password && (
          <div className=" py-1 text-red-400" role="alert">
            <p>Password is required !</p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <p className="text-red-400">{errors?.root?.random?.message}</p>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
        >
          Login
        </button>
      </div>
      <p className="text-center">
        Don't have an account?{" "}
        <a href="./register.html" className="text-indigo-600 hover:underline">
          Register
        </a>
      </p>
    </form>
  );
}
