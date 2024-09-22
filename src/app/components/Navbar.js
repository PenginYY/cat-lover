"use client";

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar({ session }) {
  return (
    <nav className="bg-[#333] text-white p-5">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <Link href={"/Welcome"}>CAT LOVER</Link>
          </div>
          {!session ? (
            <>
              {/* Show only "Register" and "Login" when the user is not logged in */}
              <ul className="flex">
                <li className="mx-3">
                  <Link href={"/Login"} className="flex items-center bg-white-500 border text-white py-2 px-3 rounded-md text-lg my-2 hover:bg-white hover:text-black">Sign In</Link>
                </li>
                <li className="mx-3">
                  <Link href={"/Register"} className="flex items-center bg-blue-600 text-white py-2 px-3 rounded-md text-lg my-2 hover:bg-blue-800">Sign Up</Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              {/* Full navigation is only shown when the user is logged in */}
              <ul className="flex">
                <li className="mx-3">
                  <Link href={"/CatSearch"} className="flex items-center bg-white-500 text-white py-2 px-3 rounded-md text-lg my-2 hover:bg-white hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    Cat Search
                  </Link>
                </li>
                <li className="mx-3">
                  <Link href={"/CatMeme"} className="flex items-center bg-white-500 text-white py-2 px-3 rounded-md text-lg my-2 hover:bg-white hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                    Meme Creator
                  </Link>
                </li>
                <li className="mx-3">
                  <Link href={"/Favorite"} className="flex items-center bg-white-500 text-white py-2 px-3 rounded-md text-lg my-2 hover:bg-white hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    Your Favorite
                  </Link>
                </li>
                <li className="mx-3">
                  <Link
                    href={"/Profile"}
                    className="flex items-center bg-white-500 border text-white py-2 px-3 rounded-md text-lg my-2 hover:bg-white hover:text-black"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    Profile
                  </Link>
                </li>
                <li className="mx-3">
                  <a
                    onClick={() => signOut()}
                    className="flex items-center bg-red-500 text-white py-2 px-3 rounded-md text-lg my-2 hover:bg-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                    Sign Out
                  </a>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
