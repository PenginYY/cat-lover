"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function MemeCreator() {
  const [message, setMessage] = useState("");
  const searchHandle = () => {};
  const messageHandle = (e) => {
    const newMessage = e.target.value;

    // Log the input value and update the state
    console.log(newMessage);

    // Check if the length of the message exceeds 20 characters
    if (newMessage.length >= 20) {
      alert("The message limit at 20 characters!");
    }

    // Update the message state
    setMessage(newMessage);
  };

  // List of dropdown items
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
      <div className="relative w-full h-64 md:h-96 lg:h-[1000px]">
        <Image
          src="/img/default-image.png"
          alt="Default picture"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex justify-center items-center space-x-4 mt-10">
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
          placeholder="Search using keywords"
          maxLength="20"
          onChange={(e) => messageHandle(e)}
        />
        <button
          onClick={searchHandle()}
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
