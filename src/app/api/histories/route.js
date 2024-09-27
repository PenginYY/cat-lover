import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import History from "../../../../models/history";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid user ID" }),
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

        const histories = await History.find({
            user: new Types.ObjectId(userId)
        });

        return new NextResponse(
            JSON.stringify(histories),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            "Error fetching histories" + error.message,
            { status: 500 }
        );
    }
};

export const POST = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        const { catId, text, fontSize, fontColor } = await request.json();

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid user ID" }),
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

        const newHistory = new History({
            catId,
            text,
            fontSize,
            fontColor,
            user: new Types.ObjectId(userId)
        });

        await newHistory.save();

        return new NextResponse(
            JSON.stringify({ message: "History is created", history: newHistory }),
            { status: 201 }
        );
    } catch (error) {
        return new NextResponse(
            "Error creating history" + error.message,
            { status: 500 }
        );
    }
};