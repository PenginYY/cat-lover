"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // useEffect(() => {
  //     if (!session) {
  //         redirect("/Welcome");
  //     } else if (session) {
  //         setName(session.user.name);
  //         setEmail(session.user.email);
  //     }
  // }, [session]);

  useEffect(() => {
    if (!session) {
      redirect("/welcome");
    } else {
      const fetchProfileData = async () => {
        try {
          const res = await fetch(
            `api/users/profile?email=${session.user.email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const result = await res.json();

          if (res.ok) {
            setName(result.user.name);
            setEmail(result.user.email);
          } else {
            setError(result.message || "Failed to load profile");
          }
        } catch (error) {
          setError("An error occurred while loading the profile");
        }
      };
      setEmail(session.user.email);
      setCurrentEmail(session.user.email);
      fetchProfileData();
    }
  }, [session]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const body = {};
      let emailChanged = false;

      // Check if email has changed, if yes, validate the new email
      if (email !== session.user.email) {
        const resCheckUser = await fetch("api/users/checkUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const { user } = await resCheckUser.json();
        if (user) {
          setError("Email is already in use by another account!");
          return;
        }
        emailChanged = true;
      }

      if (name) body.name = name;
      if (emailChanged) body.email = email;
      if (password) body.password = password;
      body.currentEmail = currentEmail;
      body.confirmPassword = confirmPassword;

      const res = await fetch("api/users/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      if (res.ok) {
        setSuccess(result.message || "Profile updated successfully");

        // Update the state with the new values
        if (name) setName(name);
        if (email) setEmail(email);
        if (password) setPassword(password);
        setConfirmPassword("");

        // Update the session
        await signIn("credentials", {
          redirect: false,
          email: email || session.user.email,
          password: password || "",
        });
      } else {
        setError(result.message || "Failed to update profile");
      }
    } catch (error) {
      setError("An error occurred while updating the profile");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const res = await fetch("api/users/profile", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: confirmPassword }), // Send 'confirmPassword' as 'password'
      });

      const result = await res.json();

      if (res.ok) {
        console.log(result.message);
        setSuccess(result.message || "Profile deleted successfully.");
        signOut({ callbackUrl: "/" });
      } else {
        setError(result.message || "Failed to delete profile.");
      }
    } catch (error) {
      setError("An error occurred while deleting the profile.");
    }
  };

  const openModal = (actionType) => {
    setAction(actionType); // Set the action type (update or delete)
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setConfirmPassword(""); // Clear password on close
  };

  const handleConfirm = (e) => {
    if (action === "delete") {
      handleDelete(e);
    } else if (action === "update") {
      handleUpdate(e);
    }
    closeModal(); // Close modal after handling
  };

  return (
    <main>
      <Navbar session={session} />
      <div className="container mx-auto mt-20 flex flex-col items-center">
        <div className="w-full max-w-md">
          <h3 className="text-2xl font-bold mb-4">Edit Profile</h3>
          <hr className="my-3" />

          {error && (
            <div className="bg-red-500 text-white p-2 rounded mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-500 text-white p-2 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full block bg-gray-200 p-2 my-2 rounded-md"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full block bg-gray-200 p-2 my-2 rounded-md"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full block bg-gray-200 p-2 my-2 rounded-md"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex">
              <button
                type="button"
                onClick={() => openModal("update")}
                className="w-[50%] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Update Profile
              </button>

              <button
                type="button"
                onClick={() => openModal("delete")}
                className="mx-3 w-[50%] bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Delete Profile
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">
              {action === "delete"
                ? "Confirm Profile Deletion"
                : "Confirm Profile Update"}
            </h3>
            <p className="mb-4">
              {action === "delete"
                ? "Please enter your password to confirm profile deletion."
                : "Please enter your password to confirm profile update."}
            </p>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full block bg-gray-200 p-2 my-2 rounded-md"
              placeholder="Enter your password"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={handleConfirm}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Confirm {action.charAt(0).toUpperCase() + action.slice(1)}
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
