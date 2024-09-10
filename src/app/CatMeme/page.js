"use client";
import { useState } from "react";
import Image from "next/image";
import { Description, Field, Label, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Navbar from "../components/Navbar";

export default function CatSearch() {
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
          placeholder="Enter message"
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

      {/* Font Color */}
      <div className="flex flex-row justify-center items-center space-x-10 mt-10">
        <div className="flex flex-row space-x-*">
          <div className="w-full max-w-md px-4">
            <Field>
              <Label className="text-sm/6 font-medium text-black">
                Font Color
              </Label>
              <Description className="text-sm/6 text-black/50">
                Choose the color of your message.
              </Description>
              <div className="bg-black ">
                <Select
                  className={clsx(
                    "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                    // Make the text of each option black on Windows
                    "*:text-black"
                  )}
                >
                  <option value="active">Green</option>
                  <option value="paused">Orange</option>
                  <option value="delayed">Red</option>
                  <option value="canceled">Blue</option>
                  <option value="canceled">Pink</option>
                  <option value="canceled">Yellow</option>
                  <option value="canceled">Purple</option>
                </Select>
                <ChevronDownIcon
                  className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                  aria-hidden="true"
                />
              </div>
            </Field>
          </div>
        </div>

        {/* Font Size*/}
        <div className="flex flex-row space-x-*">
          <div className="w-full max-w-md px-4">
            <Field>
              <Label className="text-sm/6 font-medium text-black">
                Font Size
              </Label>
              <Description className="text-sm/6 text-black/50">
                Choose the size of your message.
              </Description>
              <div className="bg-black ">
                <Select
                  className={clsx(
                    "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                    // Make the text of each option black on Windows
                    "*:text-black"
                  )}
                >
                  <option value="10">10</option>
                  <option value="12">12</option>
                  <option value="14">14</option>
                  <option value="16">16</option>
                  <option value="18">18</option>
                  <option value="20">20</option>
                  <option value="22">22</option>
                </Select>
                <ChevronDownIcon
                  className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                  aria-hidden="true"
                />
              </div>
            </Field>
          </div>
        </div>
      </div>
    </main>
  );
}
