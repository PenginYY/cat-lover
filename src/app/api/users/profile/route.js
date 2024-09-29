import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import Favorite from "../../../../../models/favorite";
import History from "../../../../../models/history";
import bcrypt from "bcryptjs"

export async function GET(req) {
    try {
        await connectMongoDB();
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        // Fetch the user's favorites based on their email
        const user = await User.findOne({ email: email }).select("name email");

        // Return the favorites array in the response
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" }, { status: 500 }
        );
    }
}

export async function PATCH(req) {
    try {
        await connectMongoDB();
        const { name, email, password, currentEmail, confirmPassword } = await req.json();
        
        const user = await User.findOne({ email: currentEmail }).select("name email password");

        
        const isPasswordValid = await bcrypt.compare(confirmPassword, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid current password" }, { status: 401 });
        }

        // if (name) user.name = name;
        // if (email) user.email = email;
        // if (password) {
        //     const hashedPassword = await bcrypt.hash(password, 10);
        //     user.password = hashedPassword;
        // }

        // Check if a new password is provided but is empty
        if (password === "") {
            return NextResponse.json({ message: "Password cannot be empty" }, { status: 400 });
        }

        // Update name if provided
        if (name && name !== user.name) {
            user.name = name;
        }

        // Check if new email is different and not in use by another user
        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return NextResponse.json({ message: "Email already in use" }, { status: 409 });
            }
            user.email = email;
        }

        // Update password if a new one is provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();
        return NextResponse.json({ message: "User profile updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectMongoDB();
        const { email, password } = await req.json();
        const user = await User.findOne({ email }).select("password");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }

        await User.findOneAndDelete({ email });
        await Favorite.deleteMany({ userEmail: email })
        await History.deleteMany({ userEmail: email })

        return NextResponse.json({ message: "User profile deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}