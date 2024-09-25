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
  const changeTitleHandler = async (e, favId) => {
    const newTitle = e.target.value;
    console.log(newTitle);

    const updatedFavorites = favorites.map((fav) =>
      fav._id === favId ? { ...fav, title: newTitle } : fav
    );
    setFavorites(updatedFavorites);

    // handle the API request to update the title in the database
    try {
      const response = await fetch("/api/favorites", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          favId, // Send the ID of the favorite being updated
          title: newTitle, // Send the new title value
        }),
      });

      if (!response.ok) {
        throw new Error(`Error updating title: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Update successful:", result);
    } catch (error) {
      console.error("Error updating title:", error);
    }
  };

  const deleteFavoriteHandler = async (e, favId) => {
    e.preventDefault(); // Prevent default form submission if applicable
    try {
      const response = await fetch(`/api/favorites?favId=${favId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favId }),
      });

      // Log the response status
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to delete favorite.");
      }

      const result = await response.json();
      console.log(result.message); // Success message

      // Optionally, update the favorites state after successful deletion
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav._id !== favId)
      );
    } catch (error) {
      console.error("Error deleting favorite:", error.message);
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
                  <div className="absolute top-2 right-2 bg-red-600 bg-opacity-75 w-auto p-2 text-white rounded-xl">
                    <button onClick={(e) => deleteFavoriteHandler(e, fav._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="28"
                        height="28"
                        viewBox="0 0 128 128"
                      >
                        <path d="M 49 1 C 47.34 1 46 2.34 46 4 C 46 5.66 47.34 7 49 7 L 79 7 C 80.66 7 82 5.66 82 4 C 82 2.34 80.66 1 79 1 L 49 1 z M 24 15 C 16.83 15 11 20.83 11 28 C 11 35.17 16.83 41 24 41 L 101 41 L 101 104 C 101 113.37 93.37 121 84 121 L 44 121 C 34.63 121 27 113.37 27 104 L 27 52 C 27 50.34 25.66 49 24 49 C 22.34 49 21 50.34 21 52 L 21 104 C 21 116.68 31.32 127 44 127 L 84 127 C 96.68 127 107 116.68 107 104 L 107 40.640625 C 112.72 39.280625 117 34.14 117 28 C 117 20.83 111.17 15 104 15 L 24 15 z M 24 21 L 104 21 C 107.86 21 111 24.14 111 28 C 111 31.86 107.86 35 104 35 L 24 35 C 20.14 35 17 31.86 17 28 C 17 24.14 20.14 21 24 21 z M 50 55 C 48.34 55 47 56.34 47 58 L 47 104 C 47 105.66 48.34 107 50 107 C 51.66 107 53 105.66 53 104 L 53 58 C 53 56.34 51.66 55 50 55 z M 78 55 C 76.34 55 75 56.34 75 58 L 75 104 C 75 105.66 76.34 107 78 107 C 79.66 107 81 105.66 81 104 L 81 58 C 81 56.34 79.66 55 78 55 z"></path>
                      </svg>
                    </button>
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
