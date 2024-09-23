"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import keyword from "../../../data/keywords.json";

export default function MemeCreator() {
  const { data: session } = useSession();

  const [favorited, setFavorite] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [message, setMessage] = useState("");
  const [catImageUrl, setCatImageUrl] = useState("/img/default-image.png");
  const [error, setError] = useState("");
  const [keywords, setKeywords] = useState([]);

  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
  ];

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      if (selectedTag) {
        setError("Choose only 1 keyword!");
      } else {
        setSelectedTag(name);
        setMessage(name);
        setError("");
      }
    } else if (selectedTag === name) {
      setSelectedTag("");
      setMessage("");
      setError("");
    }
  };

  const searchHandle = async () => {
    setFavorite(false);
    const encodedMessage = encodeURIComponent(message);

    const apiUrl = `https://cataas.com/cat/${encodedMessage}?position=center`;

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const imageUrl = response.url;
        setCatImageUrl(imageUrl);
      }
    } catch (error) {
      console.error("Error fetching the cat meme:", error);
    }
  };

  const filteredKeywords = keywords.filter((item) =>
    item.toLowerCase().includes(message.toLowerCase())
  );

  const favoriteHandler = async () => {
    setFavorite(true);
    const title = "Untitled";
    if (!favorited && catImageUrl !== "/img/default-image.png") {
      try {
        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: session.user.email,
            title,
            selectedTag,
            message,
            catImageUrl,
          }),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        alert("Added to favorites!");
      } catch (error) {
        console.error("Failed to add favorite", error);
      }
    }

    if (catImageUrl === "/img/default-image.png") {
      alert("search first!");
      setFavorite(false);
    }
  };

  useEffect(() => {
    setKeywords(keyword);
  }, []);

  return (
    <main className="flex flex-col h-h-dvh ">
      <Navbar session={session} />
      <div className="relative w-full h-64 md:h-96 lg:h-[800px]">
        <Image
          src={catImageUrl}
          alt="Generated cat meme"
          fill
          priority={true}
          className="object-contain"
        />

        <button
          className="absolute text-black right-10 bottom-10"
          onClick={favoriteHandler}
        >
          {favorited ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-heart-fill size-10"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-heart size-10"
              viewBox="0 0 16 16"
            >
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
            </svg>
          )}
        </button>
      </div>

      <div className="w-full flex justify-center items-center">
        {error && (
          <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center space-x-4 mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        <input
          className="bg-[#EAEAEA] text-center rounded w-1/3 h-10 border border-[#888]"
          type="text"
          placeholder="Search by keyword"
          maxLength="20"
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Update message directly
        />
        <button
          onClick={searchHandle}
          className="bg-black rounded text-white w-20 h-10"
          type="submit"
        >
          Search
        </button>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex w-fit h-fit">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 bg-zinc-200 justify-center items-center w-full h-fit mr-11 rounded py-5">
            {filteredKeywords.map((item, index) => (
              <div
                key={item}
                className={`bg-sky-950 text-gray-100 rounded mx-2 p-2 text-center`}
              >
                <input
                  type="checkbox"
                  className="inline-block text-center mx-1"
                  name={item}
                  id={item}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={item}>{item}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
