"use client"
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";


export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`/api/favorites?userId=${session.user.id}`);
      if (!response.ok) throw new Error("Failed to fetch favorites");
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      setError("Failed to load favorites.");
      console.error(error);
    }
  };

  const handlerRemoveFavorite = async (memeId) => {
    try {
      await fetch('/api/favorites', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: session.user.id, memeId }),
      });
      fetchFavorites();
    } catch (error) {
      setError("Failed to remove favorite.");
      console.error(error);
    }
  };

  return (
    <main>
      <Navbar />
      <h1 className="text-center text-2xl font-bold my-5">Favorite Cat Memes</h1>
      {error && <p className="text-red-500">{error}</p>}
      {favorites.length === 0 ? (
        <p>No favorite memes yet!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((favorite) => (
            <div key={favorite.memeId} className="border p-4 rounded-md">
              <img src={`https://your-image-source.com/${favorite.memeId}`} alt={`Meme ${favorite.memeId}`} className="w-full h-auto" />
              <button onClick={() => handleRemoveFavorite(favorite.memeId)} className="mt-2 bg-red-500 text-white p-2 rounded">
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
      <div></div>
      <div></div>
    </main>
  );
}
