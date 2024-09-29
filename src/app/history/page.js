"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardBody, Image } from "@nextui-org/react";
import { Description, Field, Label, Select } from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Navbar from "../components/Navbar";

export default function History() {
  const { data: session } = useSession();
  const [histories, setHistories] = useState([]);
  const [editingMeme, setEditingMeme] = useState(""); // Track which meme is being edited
  const [formData, setFormData] = useState({
    text: "",
    fontColor: "#00FF00",
    fontSize: 25,
    memeUrl: "",
    userEmail: "",
  });
  const [previewImageUrl, setPreviewImageUrl] = useState(""); // For previewing changes
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

  const fetchHistories = async () => {
    try {
      if (!session?.user?.email) {
        throw new Error("User email is not available.");
      }

      const res = await fetch(`/api/histories?userEmail=${session.user.email}`);
      console.log(session.user.email);
      if (!res.ok) {
        throw new Error(
          `Failed to fetch histories: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      setHistories(data);
      setFormData((prevData) => ({
        ...prevData,
        userEmail: session.user.email,
      }));
    } catch (error) {
      console.error("Error fetching histories:", error);
    }
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation(); // Prevent event bubbling if necessary
    const confirmed = window.confirm("Delete this meme?");
    if (confirmed) {
      deleteHistoryHandler(e, id); // Call your delete function if confirmed
    }
  };

  const deleteHistoryHandler = async (e, hisId) => {
    e.preventDefault(); // Prevent default form submission if applicable
    try {
      const response = await fetch(`/api/histories/${hisId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hisId }),
      });

      // Log the response status
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to delete history.");
      }

      const result = await response.json();
      console.log(result.message); // Success message

      setHistories((newHistories) =>
        newHistories.filter((his) => his._id !== hisId)
      );
    } catch (error) {
      console.error("Error deleting history:", error.message);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Preview the updated meme before saving
  const handlePreview = async () => {
    const encodedMessage = encodeURIComponent(formData.text);
    const encodedFontColor = formData.fontColor.replace("#", "%23");
    const encodedCatId = encodeURIComponent(editingMeme.catId);

    const previewUrl = `https://cataas.com/cat/${encodedCatId}/says/${encodedMessage}?font=Impact&fontSize=${formData.fontSize}&fontColor=${encodedFontColor}&fontBackground=none&position=center`;

    setPreviewImageUrl(previewUrl); // Set preview image URL
    setFormData((prevData) => ({
      ...prevData,
      memeUrl: previewUrl,
    }));
  };

  // Save the confirmed changes
  const handleConfirmChanges = async (e) => {
    e.preventDefault();
    handlePreview();
    try {
      const response = await fetch(`/api/histories/${editingMeme._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`Failed to update meme: ${response.statusText}`);
      }

      const updated = await response.json();
      console.log(updated.message); // Success message

      closeModal(); // Close the modal

      const updatedHistories = await histories.map((his) =>
        his._id === updated.history._id ? updated.history : his
      );

      setHistories(updatedHistories); // Update the list of memes
    } catch (error) {
      console.error("Error updating meme:", error);
    }
  };

  // Open edit modal with the current data of the meme
  const openEditModal = (meme) => {
    setEditingMeme(meme); // Set the meme to be edited
    setPreviewImageUrl(meme.memeUrl);
    setFormData((prevData) => ({
      ...prevData,
      text: meme.text || "", // Set current text or empty if missing
      fontColor: meme.fontColor || "#00FF00", // Set current font color, default green
      fontSize: meme.fontSize || 25, // Set current font size, default 25
    })); // Initialize form with current meme values
    setIsModalOpen(true); // Open modal
  };

  // Close modal and cancel edit
  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchHistories();
    }
  }, [session]);

  return (
    <main className="flex flex-col h-h-dvh">
      <Navbar session={session} />
      <div className="container mx-auto">
        <h3 className="text-3xl my-3">Created Memes</h3>
        <hr className="my-3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {histories && histories.length > 0 ? (
            histories.map((his) => (
              <Card
                key={his._id}
                className="relative w-full h-100vh md:h-96 lg:h-[800px]"
              >
                <CardBody className="p-0">
                  <Image
                    src={his.memeUrl} // Ensure this is a valid public URL
                    alt={`Created meme`}
                    width="auto"
                    height="auto"
                    priority={true}
                    objectfit="contain"
                    className="rounded-xl w-full h-auto max-w-full max-h-full"
                  />
                  {/* <div className="absolute top-2 right-2 flex flex-col space-y-2"> */}
                  <div className="absolute top-2 right-2 bg-red-600 bg-opacity-75 w-auto p-2 text-white rounded-xl">
                    <button onClick={(e) => handleDeleteClick(e, his._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="28"
                        height="28"
                        viewBox="0 0 128 128"
                      >
                        <path d="M 49 1 C 47.34 1 46 2.34 46 4 C 46 5.66 47.34 7 49 7 L 79 7 C 80.66 7 82 5.66 82 4 C 82 2.34 80.66 1 79 1 L 49 1 z M 24 15 C 16.83 15 11 20.83 11 28 C 11 35.17 16.83 41 24 41 L 101 41 L 101 104 C 101 113.37 93.37 121 84 121 L 44 121 C 34.63 121 27 113.37 27 104 L 27 52 C 27 50.34 25.66 49 24 49 C 22.34 49 21 50.34 21 52 L 21 104 C 21 116.68 31.32 127 44 127 L 84 127 C 96.68 127 107 116.68 107 104 L 107 40.640625 C 112.72 39.280625 117 34.14 117 28 C 117 20.83 111.17 15 104 15 L 24 15 z M 24 21 L 104 21 C 107.86 21 111 24.14 111 28 C 111 31.86 107.86 35 104 35 L 24 35 C 20.14 35 17 31.86 17 28 C 17 24.14 20.14 21 24 21 z M 50 55 C 48.34 55 47 56.34 47 58 L 47 104 C 47 105.66 48.34 107 50 107 C 51.66 107 53 105.66 53 104 L 53 58 C 53 56.34 51.66 55 50 55 z M 78 55 C 76.34 55 75 56.34 75 58 L 75 104 C 75 105.66 76.34 107 78 107 C 79.66 107 81 105.66 81 104 L 81 58 C 81 56.34 79.66 55 78 55 z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-gray-500 bg-opacity-75 w-auto p-2 text-white rounded-xl">
                    <button onClick={() => openEditModal(his)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* </div> */}
                </CardBody>
              </Card>
            ))
          ) : (
            <p>No histories available.</p>
          )}
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-8/12 h-auto h-100vh p-6 flex">
            {/* Preview Image */}
            <div className="relative w-1/2 h-auto mr-6 flex items-center justify-center">
              <Image
                src={previewImageUrl}
                alt="Preview meme"
                fill
                priority={true}
                className="rounded-xl w-full h-full object-contain"
              />
            </div>
            {/* Form Section */}
            <div className="relative w-1/2 items-center justify-center">
              <h2 className="block text-gray-700 text-2xl font-bold mb-2">
                Editing Meme
              </h2>
              <form>
                {/* Edit Form Fields */}
                {/* Meme Message -- */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Meme Message
                  </label>
                  <input
                    type="text"
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter message"
                    maxLength="20"
                  />
                </div>
                {/* <input
                  className="bg-[#EAEAEA] text-center rounded w-1/3 h-10 border border-[#888]"
                  type="text"
                  placeholder="Enter message"
                  maxLength="20"
                  onChange={messageHandle}
                /> */}
                {/* Font Color -- */}
                {/* <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Font Color
                  </label>
                  <input
                    type="text"
                    name="fontColor"
                    value={formData.fontColor}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter new font color"
                  />
                </div> */}
                {/* Font Color */}
                <div className="mb-4">
                  <Field>
                    <Label className="block text-gray-700 text-sm font-bold">
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
                      name="fontColor"
                      value={formData.fontColor}
                      onChange={handleInputChange}
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
                {/* Font Size -- */}
                {/* <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Font Size
                  </label>
                  <input
                    type="number"
                    name="fontSize"
                    value={formData.fontSize}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter font size"
                  />
                </div> */}
                {/* Font Size */}
                <div className="mb-4">
                  <Field>
                    <Label className="block text-gray-700 text-sm font-bold">
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
                      name="fontSize"
                      value={formData.fontSize}
                      onChange={handleInputChange}
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

                {/* Buttons */}
                <div className="flex space-x-4">
                  {/* Button: Preview Changes */}
                  <button
                    type="button"
                    onClick={handlePreview}
                    className="bg-gray-500 rounded text-white w-40 h-16"
                  >
                    Preview Changes
                  </button>
                  {/* Button: Confirm Changes */}
                  <button
                    type="submit"
                    onClick={handleConfirmChanges}
                    className="bg-black rounded text-white w-40 h-16"
                  >
                    Confirm Changes
                  </button>
                  {/* Button: Cancel */}
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-red-500 rounded text-white w-40 h-16"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
