"use client"

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const { data: session } = useSession();
  if (session) redirect("/welcome");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email, password, redirect: false
      })
      if (res.error) {
        setError("Invalid credentials");
        return;
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main>
      <Navbar />
      <div className="container mx-auto mt-20 flex flex-col items-center">
        <div className="w-full max-w-md">
          <h3 className="text-2xl font-bold mb-4">Login Page</h3>
          <hr className="my-3" />
          <form onSubmit={handleSubmit} className="space-y-4">

            {error && (
              <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full block bg-gray-200 p-2 my-2 rounded-md"
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full block bg-gray-200 p-2 my-2 rounded-md"
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 py-2 px-7 rounded-md text-white"
            >
              Sign In
            </button>
          </form>
          <hr className="my-3" />
          <p>
            Don&apos;t have an account? Go to{" "}
            <Link className="text-blue-500 hover:underline" href={"/register"}>
              Register
            </Link>{" "}
            Page
          </p>
        </div>
      </div>
    </main>
  );
}
