"use client";

import Navbar from "./components/Navbar";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link"; // Ensure Link is correctly imported

export default function Home() {
  const { data: session } = useSession(); // Fetch session data from NextAuth
  const [showModal, setShowModal] = useState(false);

  // Check login status when the component is mounted
  useEffect(() => {
    if (!session) {
      setShowModal(true); // Show modal if user is not logged in
    }
  }, [session]); // Runs the effect when session value changes

  return (
    <main>
      <Navbar session={session} />
    </main>
  );
}
