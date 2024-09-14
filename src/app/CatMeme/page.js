"use client";
import { useState } from "react";
import Image from "next/image";
import { Description, Field, Label, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Navbar from "../components/Navbar";

export default function CatSearch() {
  const [message, setMessage] = useState("");
  const [fontColor, setFontColor] = useState("#00FF00"); // default green color
  const [fontSize, setFontSize] = useState(25); // default font size
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
    const encodedFontColor = fontColor.replace("#", "%23"); // URL encode the color

    const apiUrl = `https://cataas.com/cat/says/${encodedMessage}?font=Impact&fontSize=${fontSize}&fontColor=${encodedFontColor}&fontBackground=none&position=center`;

    try {
      const response = await fetch(apiUrl);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob); // Convert blob to URL
      setCatImageUrl(imageUrl); // Update the image state
    } catch (error) {
      console.error("Error fetching the cat meme:", error);
    }
  };

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

      {/* Font Color */}
      <div className="flex flex-row justify-center items-center space-x-10 mt-10">
        <div className="w-full max-w-md px-4 mb-10">
          <Field>
            <Label className="text-sm/6 font-medium text-black">
              Font Color
            </Label>
            <Description className="text-sm/6 text-black/50">
              Choose the color of your message.
            </Description>
            <Select
              className={clsx(
                "mt-3 block w-full appearance-none rounded-lg border-none bg-black py-1.5 px-3 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                "*:text-black"
              )}
              onChange={(e) => setFontColor(e.target.value)}
            >
              <option value="#00FF00">Green</option>
              <option value="#FFA500">Orange</option>
              <option value="#FF0000">Red</option>
              <option value="#0000FF">Blue</option>
              <option value="#FFC0CB">Pink</option>
              <option value="#FFFF00">Yellow</option>
              <option value="#800080">Purple</option>
            </Select>
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </Field>
        </div>

        {/* Font Size */}
        <div className="w-full max-w-md px-4 mb-10">
          <Field>
            <Label className="text-sm/6 font-medium text-black">
              Font Size
            </Label>
            <Description className="text-sm/6 text-black/50">
              Choose the size of your message.
            </Description>
            <Select
              className={clsx(
                "mt-3 block w-full appearance-none rounded-lg border-none bg-black py-1.5 px-3 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                "*:text-black"
              )}
              onChange={(e) => setFontSize(e.target.value)}
            >
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="35">35</option>
              <option value="40">40</option>
              <option value="45">45</option>
              <option value="50">50</option>
              <option value="55">55</option>
            </Select>
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </Field>
        </div>
      </div>
    </main>
  );
}
