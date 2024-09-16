"use client"

import React from "react";
import Navbar from "./Components/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();

  return (
    <main>
      <Navbar />
      <h1>Home page</h1>
    </main>
  );
}