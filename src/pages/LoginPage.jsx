import React from "react";
import LoginForm from "../auth/LoginForm";

export default function LoginPage() {
  return (
    <main>
      <section className="container">
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <LoginForm></LoginForm>
        </div>
      </section>
    </main>
  );
}
