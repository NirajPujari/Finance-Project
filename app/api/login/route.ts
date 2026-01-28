import { generateToken } from "@Lib/jwt";
import { compareHash } from "@Lib/hash";
import dbPromise from "@Lib/mongo";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const db = await dbPromise;

    const user = await db.collection("users").findOne({ email });

    if (!user || !user.password) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 3. Compare password
    const correctPassword = await compareHash(password, user.passwordHash);

    if (!correctPassword) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }
    
    await db.collection("users").updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date() } }
    );

    const payload = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    }

    const token = generateToken(payload);

    return NextResponse.json({
      success: true,
      token,
      email: user.email,
      name: user.name
    });

  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}