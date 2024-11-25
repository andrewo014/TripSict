import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongoDB from "@/libs/mongodb";
import { User } from "@/models/UserSchema";
export async function POST(req: NextRequest) {
  try {
 
    const { firstName, username, email, password } = await req.json();
    if (!firstName || !username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }
    await connectMongoDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email." },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      username,
      email,
      password: hashedPassword,
    });
    return NextResponse.json(
      { message: "User registered successfully!", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { message: "Something went wrong during signup." },
      { status: 500 }
    );
  }
}