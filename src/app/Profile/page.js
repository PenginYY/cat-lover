"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react"
import Navbar from "../components/Navbar";

export default function Profile() {
    const { data: session } = useSession();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // Optional password change
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    console.log("session: ", session)

    useEffect(() => {
        if (!session) {
            redirect("/Welcome");
        } else if (session) {
            setName(session.user.name);
            setEmail(session.user.email);
        }
    }, [session]);


    const handleSubmit = async (e) => {
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


    return (
        <main>
            <Navbar session={session}/>
            <div className="container mx-auto py-5">
                <h3 className="text-2xl font-bold mb-4">Edit Profile</h3>

                {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
                {success && <div className="bg-green-500 text-white p-2 rounded mb-4">{success}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded"
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
                            className="w-full p-2 border rounded"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">New Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter a new password (optional)"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </main>
    );
}
