import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import History from "../../../../../models/history";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export const PATCH = async (request, context) => {
    const historyId = context.params.history;
    try {
        const body = await request.json();
        const { catId, text, fontSize, fontColor } = body;

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid user ID" }),
                { status: 400 }
            );
        }

        if (!historyId || !Types.ObjectId.isValid(historyId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid history ID" }),
                { status: 400 }
            );
        }

        await connectMongoDB();

        const user = await User.findById(userId);

        if (!user) {
            return new NextResponse(
                JSON.stringify({ message: "User not found" }),
                { status: 404 }
            );
        }

        const history = await History.findOne({ _id: historyId, user: userId });

        if (!history) {
            return new NextResponse(
                JSON.stringify({ message: "History not found" }),
                { status: 404 }
            );
        }

        const updatedHistory = await History.findByIdAndUpdate(
            historyId,
            { catId, text, fontSize, fontColor },
            { new: true }
        );

        return new NextResponse(
            JSON.stringify({ message: "History is updated", history: updatedHistory }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            "Error updating history" + error.message,
            { status: 500 }
        );
    }
};

export const DELETE = async (request, context) => {
    const historyId = context.params.history;
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid user ID" }),
                { status: 400 }
            );
        }

        if (!historyId || !Types.ObjectId.isValid(historyId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid history ID" }),
                { status: 400 }
            );
        }

        await connectMongoDB();

        const user = await User.findById(userId);

        if (!user) {
            return new NextResponse(
                JSON.stringify({ message: "User not found" }),
                { status: 404 }
            );
        }

        const history = await History.findOne({ _id: historyId, user: userId });

        if (!history) {
            return new NextResponse(
                JSON.stringify({ message: "History not found" }),
                { status: 404 }
            );
        }

        const deletedHistory = await History.findByIdAndDelete(historyId);

        return new NextResponse(
            JSON.stringify({ message: "History is deleted", history: deletedHistory }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            "Error deleting history" + error.message,
            { status: 500 }
        );
    };
};