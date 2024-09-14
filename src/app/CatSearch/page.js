"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function MemeCreator() {
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
            className="bi bi-balloon-heart size-16"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"
            />
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
        <div className="flex justify-center items-center bg-zinc-200 w-1/3 h-fit mr-11 rounded py-5">
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
