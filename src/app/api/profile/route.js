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

// export async function PATCH(req) {
//     try {
//         const session = await getSession({ req });
//         if (!session) {
//             return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//         }

//         const { name, email, password } = await req.json();

//         await connectMongoDB();

//         // Find the user by session user ID
//         const user = await User.findById(session.user.email);

//         if (!user) {
//             return NextResponse.json({ message: "User not found" }, { status: 404 });
//         }

//         // Update fields only if they are provided
//         if (name) user.name = name;
//         if (email) user.email = email;

//         // Update password only if provided
//         if (password) {
//             user.password = await bcrypt.hash(password, 10);
//         }

//         await user.save();

//         return NextResponse.json({ message: "Profile updated successfully" });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ message: "An error occurred while updating the profile" }, { status: 500 });
//     }
// }