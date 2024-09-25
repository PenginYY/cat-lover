import { ObjectId } from "mongodb";
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

//Tested
export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Get the URL search params to extract the userEmail query param
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");

    // Check if userEmail is provided
    if (!userEmail) {
      return NextResponse.json(
        { message: "User email is required" },
        { status: 400 } // Bad request
      );
    }

    // Fetch the user's favorites based on their email
    const favorites = await Favorite.find({ userEmail: userEmail });

    // Return the favorites array in the response
    return NextResponse.json({ favorites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 } // Internal Server Error
    );
  }
}

//Tested
export async function PUT(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { favId, title } = body; // Extract the favorite ID and the new title
    console.log(favId, title);

    if (!favId || !title) {
      return NextResponse.json(
        { message: "Favorite ID and title are required." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Find the favorite by ID and update the title
    const result = await Favorite.updateOne(
      { _id: favId }, // Filter by favorite ID
      { $set: { title: title } } // Update the title field
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Favorite not found or title not updated." },
        { status: 404 }
      );
    }

    // Respond with the updated favorite
    return NextResponse.json({ message: "Title updated successfully." });
  } catch (error) {
    console.error("Error updating favorite:", error);
    return NextResponse.json(
      { message: "Failed to update favorite." },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const favId = searchParams.get("favId"); // Get the favorite ID from the query parameters
    console.log("Favorite ID to delete:", favId);

    // Ensure favId is provided
    if (!favId) {
      return NextResponse.json(
        { message: "favId parameter is required." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Use favId to delete the specific favorite
    const result = await Favorite.findOneAndDelete({
      _id: new ObjectId(favId), // Ensure favId is an ObjectId
    });

    // Check if a document was deleted
    if (!result.value) {
      return NextResponse.json(
        { message: "No favorite found with the given ID." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Favorite deleted successfully." });
  } catch (error) {
    console.error("Error deleting favorite:", error);
    return NextResponse.json(
      { message: "Failed to delete favorite." },
      { status: 500 }
    );
  }
}

// //not tested yet
// export async function DELETE(req) {
//   console.log(req);
//   try {
//     const { searchParams } = new URL(req.url);
//     const favId = searchParams.get("favId"); // Get the favorite ID from the query parameters
//     console.log("Favorite ID to delete:", favId);

//     // Ensure favId is provided
//     if (!favId) {
//       return NextResponse.json(
//         { message: "favId parameter is required." },
//         { status: 400 }
//       );
//     }

//     await connectMongoDB();

//     // Use favId to delete the specific favorite
//     const result = await Favorite.collection("favorites").findOneAndDelete({
//       _id: ObjectId(favId), // Ensure favId is an ObjectId
//     });

//     // Check if a document was deleted
//     if (!result) {
//       return NextResponse.json(
//         { message: "No favorite found with the given ID." },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ message: "Favorite deleted successfully." });
//   } catch (error) {
//     console.error("Error deleting favorite:", error);
//     return NextResponse.json(
//       { message: "Failed to delete favorite." },
//       { status: 500 }
//     );
//   }
// }
