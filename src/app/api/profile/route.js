import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs"

export async function PATCH(req) {
    try {
        await connectMongoDB();
        const { name, email, password } = await req.json();
        const user = await User.findOne({ email }).select("id");

        if (name) user.name = name;
        if (email) user.email = email;
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
        return NextResponse.json({ message: "User profile deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}