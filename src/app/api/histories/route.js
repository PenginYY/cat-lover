import { connectMongoDB } from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import History from "../../../../models/history";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("userEmail");

    if (!userEmail) {
      return new NextResponse(
        JSON.stringify({ message: "User email is required" }),
        { status: 400 }
      );
    }

    await connectMongoDB();

    const histories = await History.find({ userEmail });

    return new NextResponse(JSON.stringify(histories), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error fetching histories",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  try {
    const { catId, text, fontSize, fontColor, memeUrl, userEmail } =
      await request.json();

    if (!catId || !text || !fontSize || !fontColor || !memeUrl || !userEmail) {
      return new NextResponse(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    await connectMongoDB();

    const newHistory = new History({
      catId,
      text,
      fontSize,
      fontColor,
      memeUrl,
      userEmail,
    });

    await newHistory.save();

    return new NextResponse(
      JSON.stringify({ message: "History is created", history: newHistory }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error creating history",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
