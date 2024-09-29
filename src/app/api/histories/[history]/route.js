import { connectMongoDB } from "../../../../../lib/mongodb";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import History from "../../../../../models/history";

// PATCH: Update history by ID
export const PATCH = async (request, context) => {
  const historyId = context.params.history;
  try {
    const body = await request.json();
    const { catId, text, fontSize, fontColor, memeUrl, userEmail } = body;

    // Validate userEmail
    if (!userEmail) {
      return new NextResponse(
        JSON.stringify({ message: "User email is required" }),
        { status: 400 }
      );
    }

    // Validate historyId
    if (!historyId || !Types.ObjectId.isValid(historyId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid history ID" }),
        { status: 400 }
      );
    }

    await connectMongoDB();

    const history = await History.findById(historyId);

    if (!history) {
      return new NextResponse(
        JSON.stringify({ message: "History not found" }),
        { status: 404 }
      );
    }

    // Update only fields that are provided in the request body
    const updatedHistory = await History.findByIdAndUpdate(
      historyId,
      {
        ...(catId && { catId }),
        ...(text && { text }),
        ...(fontSize && { fontSize }),
        ...(fontColor && { fontColor }),
        ...(memeUrl && { memeUrl }),
        userEmail, // assuming userEmail must always be provided
      },
      { new: true } // return the updated document
    );

    return new NextResponse(
      JSON.stringify({
        message: "History is updated",
        history: updatedHistory,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error updating history",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};

// DELETE: Remove history by ID
export const DELETE = async (request, context) => {
  const historyId = context.params.history;
  try {
    // Validate historyId
    if (!historyId || !Types.ObjectId.isValid(historyId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid history ID" }),
        { status: 400 }
      );
    }

    await connectMongoDB();

    const history = await History.findById(historyId);

    if (!history) {
      return new NextResponse(
        JSON.stringify({ message: "History not found" }),
        { status: 404 }
      );
    }

    const deletedHistory = await History.findByIdAndDelete(historyId);

    if (!deletedHistory) {
      return new NextResponse(
        JSON.stringify({ message: "History not found or already deleted" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "History is deleted",
        history: deletedHistory,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error deleting history",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
