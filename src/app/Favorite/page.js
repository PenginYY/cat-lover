"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";


export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  useState(() => {
  })

  return (
    <main>
      <Navbar />
      <h1 className="text-center text-2xl font-bold my-5">Favorite Cat Memes</h1>
      <div></div>
      <div></div>
    </main>
  );
}
