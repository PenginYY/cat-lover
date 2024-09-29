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
                  <Link
                    href={"/Login"}
                    className="flex items-center bg-white-500 border text-white py-2 px-3 rounded-md text-lg my-2 hover:bg-white hover:text-black"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="mx-3">
                  <Link
                    href={"/Register"}
                    className="flex items-center bg-blue-600 text-white py-2 px-3 rounded-md text-lg my-2 hover:bg-blue-800"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              {/* Full navigation is only shown when the user is logged in */}
              <ul className="flex">
                <li className="mx-3">
                  <Link
                    href={"/CatSearch"}
                    className="flex items-center bg-white-500 text-white py-2 px-3 rounded-md text-lg my-2 hover:bg-white hover:text-black"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                    Cat Search
                  </Link>
                </li>
                <li className="mx-3">
                  <Link
                    href={"/CatMeme"}
                    className="flex items-center bg-white-500 text-white py-2 px-3 rounded-md text-lg my-2 hover:bg-white hover:text-black"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    Meme Creator
                  </Link>
                </li>
                <li className="mx-3">
                  <Link
                    href={"/Favorite"} // change to created meme or history page
                    className="flex items-center bg-white-500 text-white py-2 px-3 rounded-md text-lg my-2 hover:bg-white hover:text-black"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6">
                      <path stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>
                    Created Meme
                  </Link>
                </li>
                <li className="mx-3">
                  <Link
                    href={"/Favorite"}
                    className="flex items-center bg-white-500 text-white py-2 px-3 rounded-md text-lg my-2 hover:bg-white hover:text-black"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    Your Favorite
                  </Link>
                </li>
                <li className="mx-3">
                  <Link
                    href={"/Profile"}
                    className="flex items-center bg-white-500 border text-white py-2 px-3 rounded-md text-lg my-2 hover:bg-white hover:text-black"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    Profile
                  </Link>
                </li>
                <li className="mx-3">
                  <a
                    onClick={() => signOut()}
                    className="flex items-center bg-red-500 text-white py-2 px-3 rounded-md text-lg my-2 hover:bg-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                      />
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
