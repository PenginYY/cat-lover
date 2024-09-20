import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Favorite from "../../../../models/favorite";

//Tested
export async function POST(req) {
  try {
    const { userEmail, title, selectedTag, message, catImageUrl } =
      await req.json();

    // Log the received data to ensure everything is correct
    console.log("Received data:", {
      userEmail,
      title,
      selectedTag,
      message,
      catImageUrl,
    });

    // Ensure MongoDB connection is established
    await connectMongoDB();
    console.log("Connected to MongoDB");

    // Create the favorite document
    const favorite = await Favorite.create({
      userEmail,
      title,
      selectedTag,
      message,
      catImageUrl,
    });

    console.log("Favorite created:", favorite);

    return NextResponse.json(
      { message: "Favorite added.", favorite },
      { status: 201 }
    );
  } catch (error) {
    // More detailed error logging
    console.error("Error adding favorite meme: ", error);

    return NextResponse.json(
      { message: "Failed to add favorite.", error: error.message },
      { status: 500 }
    );
  }
}

//not tested yet
export async function GET(req) {
  try {
    await connectMongoDB();
    const info = await req.json();
    // const user = await Favorite.findOne({ email }).select("email");
    // console.log("User: ", user);

    return NextResponse.json({ info });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//not tested yet
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    await connectMongoDB();
    const favoritesDel = await Favorite.collection("favorites").deleteOne({});

    return NextResponse.json({ favoritesDel });
  } catch (error) {
    console.error("Error deleting favorites:", error);
    return NextResponse.json(
      { message: "Failed to delete favorites." },
      { status: 500 }
    );
  }
}
