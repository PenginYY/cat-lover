"use client";

import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link"; // Ensure Link is correctly imported
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession(); // Fetch session data from NextAuth
  const [catImageUrl, setCatImageUrl] = useState(
    "/img/bb692186-c423-4dc8-aca9-51ca6b1d96c7.gif"
  );

  useEffect(() => {
    showCatHandle();
  }, []);

  const showCatHandle = async () => {
    const apiUrl = `https://cataas.com/cat/gif/says/Welcome?fontColor=green&fontSize=40&type=square`;
    //const apiUrl = `https://cataas.com/cat/gif/says/Welcome?filter=mono&fontColor=green&fontSize=40&type=square`;

    try {
      const response = await fetch(apiUrl);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob); // Convert blob to URL
      setCatImageUrl(imageUrl); // Update the image state
    } catch (error) {
      console.error("Error fetching the cat meme:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-sky-100 to-purple-100">
      <Navbar session={session} />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] mt-[-40px]">
        <div className="w-full max-w-3xl flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl md:text-5xl font-bold my-3 text-center">
            Welcome to Cat Lover
          </h1>
          <p className="text-lg md:text-xl mb-8 text-center">
            Final Project for CSX4104: Web Application Development
          </p>
          <ul className="flex space-x-4">
            <li className="mx-3">
              <Link
                href={"/Login"}
                className="flex items-center bg-white border text-black py-2 px-3 rounded-md text-lg my-2 hover:bg-gray-100"
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
        </div>
        <Image
          src="https://i.redd.it/lojakg5fd6761.gif"
          alt="Cat Image"
          optimized={true}
          width={300} // Provide a fixed width
          height={300} // Provide a fixed height
          className="w-[40%] h-auto object-cover"
        />
      </div>
    </main>
  );
}
