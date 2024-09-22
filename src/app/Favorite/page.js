"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Favorite() {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      if (!session?.user?.email) {
        throw new Error("User email is not available.");
      }

      const res = await fetch(`/api/favorites?userEmail=${session.user.email}`);

      if (!res.ok) {
        throw new Error(
          `Failed to fetch favorites: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      setFavorites(data.favorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchFavorites();
    }
  }, [session]);

  return (
    <main className="flex flex-col h-h-dvh">
      <Navbar session={session} />
      <div className="container mx-auto">
        <h3 className="text-3xl my-3">Your Favorite Memes</h3>
        <hr className="my-3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites && favorites.length > 0 ? (
            favorites.map((fav) => (
              <div
                key={fav._id}
                className="relative w-full h-64 md:h-96 lg:h-[800px]"
              >
                {/* Using Next.js Image component */}
                <Image
                  src={fav.catImageUrl} // Ensure this is a valid public URL
                  alt={`Meme with tag: ${fav.selectedTag || "No tag"}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-contain"
                />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full p-2 text-black">
                  <input value={fav.title} />
                  <p>{fav.message || "No message"}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No favorites available.</p>
          )}
        </div>
      </div>
    </main>
  );
}
