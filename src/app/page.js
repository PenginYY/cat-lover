"use client"

import React from "react";
import Navbar from "./components/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();

  return (
    <main>
      <Navbar session={session}/>
      <h1>Home page</h1>
    </main>
  );
}