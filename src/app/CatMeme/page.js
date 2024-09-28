"use client";
import { useState } from "react";
import Image from "next/image";
import { Description, Field, Label, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";

export default function MemeCreator() {
  const { data: session } = useSession();

  const [message, setMessage] = useState("");
  const [fontColor, setFontColor] = useState("#00FF00"); // default green color
  const [fontSize, setFontSize] = useState(25); // default font size
  // default image
  const [catImageUrl, setCatImageUrl] = useState("/img/default-image.png");
  const [error, setError] = useState("");
  // catId
  const catJason = 'https://cataas.com/cat?json=true';
  const [catId, setCatId] = useState("");

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

    try {
      const response = await fetch(catJason)
      const responseData = await response.json()
      setCatId(responseData._id)
    } catch (error) {
      console.error("Error fetching cat id:", error);
    }

    // Build the API URL using user inputs
    const encodedMessage = encodeURIComponent(message);
    console.log(encodedMessage);
    const encodedFontColor = fontColor.replace("#", "%23"); // URL encode the color
    const encodedCatId = encodeURIComponent(catId);

    const apiUrl = `https://cataas.com/cat/${encodedCatId}/says/${encodedMessage}?font=Impact&fontSize=${fontSize}&fontColor=${encodedFontColor}&fontBackground=none&position=center`;

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const imageUrl = response.url; // This is the direct image URL from the API
        console.log(imageUrl); // Log the URL for confirmation

        // Set the image URL in the state to display in the UI
        setCatImageUrl(imageUrl);
      }
    } catch (error) {
      console.error("Error fetching the cat meme:", error);
    }
  };

  return (
    <main className="flex flex-col h-h-dvh">
      <Navbar session={session} />

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
          className="bg-black rounded text-white w-40 h-10"
          type="submit"
        >
          Generate Meme
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
