"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import { Card, CardBody, Image } from "@nextui-org/react";

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

  // Function to handle title change for a specific favorite
  const changeTitleHandler = (e, favId) => {
    console.log(e.target.value);
    const updatedFavorites = favorites.map((fav) =>
      fav._id === favId ? { ...fav, title: e.target.value } : fav
    );
    setFavorites(updatedFavorites);
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
        <div className="grid grid-rows-*">
          {favorites && favorites.length > 0 ? (
            favorites.map((fav) => (
              <Card
                key={fav._id}
                className="relative w-full h-100vh md:h-96 lg:h-[800px]"
              >
                <CardBody className="p-0">
                  <Image
                    src={fav.catImageUrl} // Ensure this is a valid public URL
                    alt={`Meme with tag: ${fav.selectedTag || "No tag"}`}
                    width="auto"
                    height="auto"
                    priority="true"
                    objectfit="contain"
                    className="rounded-xl w-auto h-auto max-w-full max-h-full"
                  />
                  <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-auto p-2 text-white rounded-xl">
                    <input
                      value={fav.title || ""}
                      className="bg-transparent text-white font-bold w-full"
                      onChange={(e) => changeTitleHandler(e, fav._id)}
                    />
                    <p>{fav.message || "No message"}</p>
                  </div>
                </CardBody>
              </Card>
            ))
          ) : (
            <p>No favorites available.</p>
          )}
        </div>
      </div>
    </main>
  );
}
