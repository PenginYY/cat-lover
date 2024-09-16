import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/registerdb";
import Favorite from "../../../../models/favorite";

export async function POST(req) {
    try {
        const { userId, imageUrl, keywords } = await req.json();

        await connectMongoDB();

        const favorite = await Favorite.create({ userId, imageUrl, keywords });

        return NextResponse.json({ message: "Favorite meme added.", favorite }, { status: 201 });
    } catch (error) {
        console.error("Error adding favorite meme: ", error);
        return NextResponse.json(
            { message: "An error occured while adding the favorite meme."},
            { status: 500 }
        );
    }
}