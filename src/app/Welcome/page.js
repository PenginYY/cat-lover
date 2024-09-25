"use client"

import React, { useState, useEffect } from 'react'
import Image from "next/image";
import Navbar from '../components/Navbar'
import { useSession } from 'next-auth/react'

export default function Welcome() {
    const { data: session } = useSession();

    const [catImageUrl, setCatImageUrl] = useState("/img/bb692186-c423-4dc8-aca9-51ca6b1d96c7.gif");

    useEffect(() => {
        showCatHandle();
    }, [])

    const showCatHandle = async () => {
        const apiUrl = `https://cataas.com/cat/gif/says/Welcome?fontColor=green&fontSize=40&type=square`;
        //const apiUrl = `https://cataas.com/cat/gif/says/Welcome?filter=mono&fontColor=green&fontSize=40&type=square`;

        try {
            const response = await fetch(apiUrl);
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob); // Convert blob to URL
            setCatImageUrl(imageUrl); // Update the image state
        } catch {
            console.error("Error fetching the cat meme:", error);
        }
    }

    return (
        <div>
            <Navbar session={session} />
            <div className='container mx-auto'>
                <h3 className='text-3xl my-3'>Welcome {session?.user?.name}</h3>
                <hr className='my-3' />
                <div className='flex'>
                    <div className='container p-5 mx-5 my-5'>
                        <h1><strong>Final Project for CSX4104: Web Application Development</strong></h1>
                        <hr className="my-3" />

                        <h2><strong>Overview</strong></h2>
                        <p>
                            This project is called <strong>Cat Lover</strong>. This is the final assignment for the CSX4104 Web Application Development course. Developed in collaboration between our team members: Pattiya Yiadram, Yumi Yoshida, and Santawan Sanpha-asa, this application is designed specifically for cat enthusiasts.
                        </p>

                        <hr className="my-3" />
                        <h2><strong>Features</strong></h2>
                        <ul>
                            <li><strong>Random Cat Pictures:</strong> Users can view a variety of random cat images.</li>
                            <li><strong>Image Search:</strong> Users can find images that match their personal preferences.</li>
                            <li><strong>Custom Cat Memes:</strong> Users can create memes by adding text to the cat images. The application provides options to choose the font color and size, allowing users to craft memes that reflect their creativity and sense of humor.</li>
                        </ul>

                        <hr className="my-3" />
                        <h2><strong>Purpose</strong></h2>
                        <p>
                            This project showcases the technical skills acquired during the course and provides a fun and interactive platform for cat lovers to express themselves.
                        </p>

                        <hr className="my-3" />
                        <h2><strong>Team Members</strong></h2>
                        <ul>
                            <li>- Pattiya Yiadram</li>
                            <li>- Yumi Yoshida</li>
                            <li>- Santawan Sanpha-asa</li>
                        </ul>
                    </div>
                    <div className="relative w-full h-64 md:h-96 lg:h-[800px]">
                        <Image
                            src={catImageUrl}
                            alt="Generated cat meme"
                            fill
                            priority={true}
                            className="object-contain"
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}