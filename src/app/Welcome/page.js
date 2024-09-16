"use client"

import React from 'react'
import Navbar from '../Components/Navbar'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function Welcome() {
    const { data: session } = useSession();
    console.log(session)

    if (!session) redirect("/Welcome");

    return (
        <div>
            <Navbar session={session}/>
            <div className='container mx-auto'>
                <h3 className='text-3xl my-3'>Welcome {session?.user?.name}</h3>
                <hr className='my-3' />
                <p></p>
            </div>
        </div>
    )
}