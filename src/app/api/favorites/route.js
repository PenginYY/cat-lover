import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Favorite from "../../../../models/favorite";

export async function POST(req) {
    try {
        const { userId, selectedTag, message, catImageUrl } = await req.json();

        await connectMongoDB();

        const favorite = await Favorite.create({ userId, imageUrl, keywords });

        return NextResponse.json({ message: "Favorite added.", favorite }, { status: 201 });
    } catch (error) {
        console.error("Error adding favorite meme: ", error);
        return NextResponse.json({ message: "Failed to add favorite." }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        await connectMongoDB();
        const favorites = await Favorite.find({ userId });

        return NextResponse.json({ favorites });
    } catch (error) {
        console.error("Error fetching favorites:", error);
        return NextResponse.json({ message: "Failed to fetch favorites." }, { status: 500 });
    }
}