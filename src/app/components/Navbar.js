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
            <Link href={"/"}>Homepage</Link>
          </div>
          {!session ? (
            <>
              {/* Show only "Register" and "Login" when the user is not logged in */}
              <ul className="flex">
                <li className="mx-3">
                  <Link href={"/Login"} className="hover:underline">Sign In</Link>
                </li>
                <li className="mx-3">
                  <Link href={"/Register"} className="hover:underline">Sign Up</Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              {/* Full navigation is only shown when the user is logged in */}
              <ul className="flex">
                <li className="mx-3">
                  <Link href={"/CatSearch"} className="hover:underline">Cat Search</Link>
                </li>
                <li className="mx-3">
                  <Link href={"/CatMeme"} className="hover:underline">Meme Creator</Link>
                </li>
                <li className="mx-3">
                  <Link href={"/Favorite"} className="hover:underline">Your Favorite</Link>
                </li>
                <li className="mx-3">
                  <Link
                    href={"/Profile"}
                    className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2"
                  >
                    Profile
                  </Link>
                </li>
                <li className="mx-3">
                  <a
                    onClick={() => signOut()}
                    className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2"
                  >
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
