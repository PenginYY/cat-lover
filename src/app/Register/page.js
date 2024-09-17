"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: session } = useSession();
  if (session) redirect("/Welcome");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields!");
      return;
    }

    try {
      const resCheckUser = await fetch("/api/checkUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resCheckUser.json();
      if (user) {
        setError("User already exits!");
        return;
      }

      // Register user
      const resRegister = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (resRegister.ok) {
        const form = e.target;
        setError("");
        setSuccess("User registered successfully!");
        form.reset();
      } else {
        setError("User registration failed.");
      }
    } catch (error) {
      setError("An error occurred during registration.");
      console.log("Error: ", error);
    }
  };

  return (
    <main>
      <Navbar />
      <div className="container mx-auto py-5">
        <h3>Register Page</h3>
        <hr className="my-3" />
        <form onSubmit={handleSubmit}>

          {error && (
            <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
              {success}
            </div>
          )}

          <input
            onChange={(e) => setName(e.target.value)}
            className="block bg-gray-200 p-2 my-2 rounded-md"
            type="text"
            placeholder="Enter your name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="block bg-gray-200 p-2 my-2 rounded-md"
            type="email"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="block bg-gray-200 p-2 my-2 rounded-md"
            type="password"
            placeholder="Enter your password"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block bg-gray-200 p-2 my-2 rounded-md"
            type="password"
            placeholder="Confirm your password"
          />
          <button
            type="submit"
            className="bg-green-500 p-2 rounded-md text-white"
          >
            Sign Up
          </button>
        </form>
        <hr className="my-3" />
        <p>
          Already have an account? Go to{" "}
          <Link className="text-blue-500 hover:underline" href={"/Login"}>
            Login
          </Link>{" "}
          Page
        </p>
      </div>
    </main>
  );
}
