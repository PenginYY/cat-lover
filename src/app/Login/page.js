import React from "react";
import Link from "next/link";
import Navbar from "../Components/Navbar";

export default function Login() {
  return (
    <main>
      <Navbar />
      <div className="container mx-auto py-5">
        <h3>Login Page</h3>
        <hr className="my-3" />
        <form action="">
          <input
            className="block bg-gray-200 p-2 my-2 rounded-md"
            type="email"
            placeholder="Enter your email"
          />
          <input
            className="block bg-gray-200 p-2 my-2 rounded-md"
            type="password"
            placeholder="Enter your password"
          />
          <button
            type="submit"
            className="bg-green-500 p-2 rounded-md text-white"
          >
            Sign In
          </button>
        </form>
        <hr className="my-3" />
        <p>
          Already have an account? go to{" "}
          <Link className="text-blue-500 hover:underline" href={"/Register"}>
            Register
          </Link>{" "}
          Page
        </p>
      </div>
    </main>
  );
}
