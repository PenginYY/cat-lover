import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Keyword from "../../../../models/keyword";

export async function POST(req) {
  try {
    const { tags } = await req.json(); // Get the tags from the body

    // Connect to MongoDB
    await connectMongoDB();

    // Query the database with the tags
    const data = await Keyword.find({
      tags: { $in: tags },
    });

    // Return the data (adjust response according to your schema)
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json(
      { message: "An error occurred while searching for keywords." },
      { status: 500 }
    );
  }
}
