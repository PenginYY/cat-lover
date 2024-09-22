"use client"

import React, { useState, useEffect } from 'react'
import Image from "next/image";
import Navbar from '../components/Navbar'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function Welcome() {
    const { data: session } = useSession();

    const [catImageUrl, setCatImageUrl] = useState("/img/default-image.png");

    useEffect(() => {
        showCatHandle();
    }, [])

    const showCatHandle = async () => {
        const apiUrl = `https://cataas.com/cat/gif/says/Welcome?filter=mono&fontColor=green&fontSize=40&type=square`;

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
                    <div className='container mx-5 bg-gray-200'>
                        <p>
                            Rest API: CATAAS (Cat as a service)
                        </p>
                    </div>
                    <div className="relative w-full h-64 md:h-96 lg:h-[800px]">
                        <Image
                            src={catImageUrl}
                            alt="Generated cat meme"
                            fill
                            priority={true}
                            className="object-contain" // Changed from object-cover to object-contain
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}