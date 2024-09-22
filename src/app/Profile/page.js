"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react"
import { signOut } from "next-auth/react";
import Navbar from "../components/Navbar";

export default function Profile() {
    const { data: session } = useSession();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // Optional password change
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    //const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    //const [deletePassword, setDeletePassword] = useState(""); // State for password input

    useEffect(() => {
        if (!session) {
            redirect("/Welcome");
        } else if (session) {
            setName(session.user.name);
            setEmail(session.user.email);
        }
    }, [session]);


    const handleUpdate = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        try {
            const body = {};
            if (name) body.name = name;
            if (email) body.email = email;
            if (password) body.password = password;

            const res = await fetch("/api/profile", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const result = await res.json();
            if (res.ok) {
                setSuccess(result.message || "Profile updated successfully");
                await signIn("Credentials", { email, password, redirect: false });
            } else {
                setError(result.message || "Failed to update profile");
            }
        } catch (error) {
            setError("An error occurred while updating the profile");
        }
    };

    const handleDelete = async () => {
        if (!password) {
            setError("Please enter your password to delete your profile.");
            return;
        }
        if (confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
            const res = await fetch("/api/profile", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await res.json();
            if (res.ok) {
                console.log(result.message);
                setSuccess(result.message || "Profile deleted successfully.");
                signOut({ callbackUrl: '/' });
            } else {
                setError(result.message || "Failed to delete profile.");
            }
        }
    };



    return (
        <main>
            <Navbar session={session} />
            <div className="container mx-auto mt-20 flex flex-col items-center">
                <div className="w-full max-w-md">
                    <h3 className="text-2xl font-bold mb-4">Edit Profile</h3>
                    <hr className="my-3" />

                    {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
                    {success && <div className="bg-green-500 text-white p-2 rounded mb-4">{success}</div>}

                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
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
                            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
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
                            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
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
                                type="submit"
                                className="w-[50%] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                            >
                                Update Profile
                            </button>

                            <button
                                onClick={handleDelete}
                                className="mx-3 w-[50%] bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                            >
                                Delete Profile
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </main>
    );
}


// const openDeleteModal = () => {
//     setIsModalOpen(true);
// };

// const handleDelete = async () => {
//     const hashedDeletePassword = await bcrypt.hash(deletePassword, 10);
//     const isMatch = await bcrypt.compare(hashedDeletePassword, password);

//     if (!isMatch) {
//         setError("Passwords do not match. Please try again.");
//         return;
//     } else {
//         const res = await fetch("/api/profile", {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email: email, password: password }),
//         });

//         const result = await res.json();
//         if (res.ok) {
//             console.log(result.message);
//             setSuccess(result.message || "Profile deleted successfully.");
//             redirect("/");
//         } else {
//             setError(result.message || "Failed to delete profile.");
//         }
//     }
// };

// {/* <button
//                     onClick={openDeleteModal}
//                     className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
//                 >
//                     Delete Profile
//                 </button> */}

//             {/* Modal for password confirmation */}
//             {/* {isModalOpen && (
//                     <div className="fixed inset-0 flex items-center justify-center z-50">
//                         <div className="bg-white p-6 rounded shadow-md">
//                             <h4 className="text-lg font-bold mb-4">Confirm Deletion</h4>
//                             <p>Enter your password to confirm deletion:</p>
//                             <input
//                                 type="password"
//                                 value={deletePassword}
//                                 onChange={(e) => setDeletePassword(e.target.value)}
//                                 className="w-full p-2 border rounded mb-4"
//                                 placeholder="Enter your password"
//                             />
//                             <div className="flex justify-end">
//                                 <button
//                                     onClick={handleDelete}
//                                     className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 mr-2"
//                                 >
//                                     Delete
//                                 </button>
//                                 <button
//                                     onClick={() => {
//                                         setIsModalOpen(false);
//                                         setDeletePassword(""); // Clear password input
//                                     }}
//                                     className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )} */}
