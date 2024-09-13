"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function MemeCreator() {
  const [message, setMessage] = useState("");
  // default image
  const [catImageUrl, setCatImageUrl] = useState("/img/default-image.png");
  const [error, setError] = useState("");

  const messageHandle = (e) => {
    const newMessage = e.target.value;

    if (newMessage.length >= 20) {
      setError("The message limit is 20 characters!");
    }
    setMessage(newMessage);
  };

  const searchHandle = async () => {
    if (!message) {
      setError("Please enter a message!");
      return;
    } else {
      setError("");
    }
    // Build the API URL using user inputs
    const encodedMessage = encodeURIComponent(message);
    console.log(encodedMessage);

    const apiUrl = `https://cataas.com/cat/${encodedMessage}?position=center`;

    try {
      const response = await fetch(apiUrl);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob); // Convert blob to URL
      setCatImageUrl(imageUrl); // Update the image state
    } catch (error) {
      console.error("Error fetching the cat meme:", error);
    }
  };

  // List of dropdown keywords
  const items = [
    { name: "About" },
    { name: "Base" },
    { name: "Blog" },
    { name: "Contact" },
    { name: "Custom" },
    { name: "Support" },
    { name: "Tools" },
  ];

  // console.log(searchName);
  // Filtered items based on the search term
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(message.toLowerCase())
  );
  // console.log(filteredItems);

  return (
    <main className="flex flex-col h-h-dvh">
      <Navbar />
      {/* Display the cat image */}
      <div className="relative w-full h-64 md:h-96 lg:h-[800px]">
        <Image
          src={catImageUrl}
          alt="Generated cat meme"
          fill
          priority={true}
          className="object-contain" // Changed from object-cover to object-contain
        />
      </div>

      <div className="w-full flex justify-center items-center">
        {error && (
          <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}
      </div>
      {/* Input form */}
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
          placeholder="Enter message"
          maxLength="20"
          onChange={messageHandle}
        />
        <button
          onClick={searchHandle}
          className="bg-black rounded text-white w-20 h-10"
          type="submit"
        >
          Search
        </button>
      </div>

      {filteredItems.map((item) => {
        return (
          <p key={item.name} className="inline-block text-center">
            {item?.name}
          </p>
        );
      })}
    </main>
  );
}
