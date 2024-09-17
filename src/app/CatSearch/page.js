"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function CatSearch() {
  const [selectedTag, setSelectedTag] = useState("");
  const [message, setMessage] = useState("");
  // default image
  const [catImageUrl, setCatImageUrl] = useState("/img/default-image.png");
  const [error, setError] = useState("");

  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
  ];

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    if (checked) {
      if (selectedTag) {
        // If there's already a selected tag, show error
        setError("Choose only 1 keyword!");
      } else {
        // Set the selected tag
        setSelectedTag(name);
        setMessage(name); // Update the message with the selected tag
        setError(""); // Clear any previous error
      }
    } else {
      // Checkbox was unchecked
      if (selectedTag === name) {
        setSelectedTag(""); // Clear the selected tag
        setMessage(""); // Clear the message
        setError(""); // Clear any previous error
      }
    }
  };

  const searchHandle = async () => {
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
  const keywords = [
    { name: "Angry" },
    { name: "Baby" },
    { name: "Bed" },
    { name: "Catto" },
    { name: "Evil" },
    { name: "Fluffy" },
    { name: "Grumpy" },
  ];

  // console.log(searchName);
  // Filtered keywords based on the search term
  const filteredKeywords = keywords.filter((item) =>
    item.name.toLowerCase().includes(message.toLowerCase())
  );
  // console.log(filteredKeywords);
  const favoriteHandler = () => {};

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
        <button
          className="absolute text-black right-10 bottom-10"
          onClick={favoriteHandler}
        >
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
        </button>
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
          placeholder="Search by keyword"
          maxLength="20"
          onChange={handleCheckboxChange}
        />
        <button
          onClick={searchHandle}
          className="bg-black rounded text-white w-20 h-10"
          type="submit"
        >
          Search
        </button>
      </div>

      <div className="flex justify-center items-center w-full h-fit">
        <div className="flex justify-center items-center bg-zinc-200 w-fit h-fit mr-11 rounded py-5">
          {filteredKeywords.map((item, index) => (
            <div
              key={item.name}
              className={`${
                colors[index % colors.length]
              } text-black rounded mx-5 p-2`}
            >
              <input
                type="checkbox"
                className="inline-block text-center"
                name={item.name}
                id={item.name}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={item.name}>{item.name}</label>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
