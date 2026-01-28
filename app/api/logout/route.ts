import dbPromise from "@Lib/mongo";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token is required" },
        { status: 400 }
      );
    }

    const db = await dbPromise;
    const payload = {
      token: token,
      revoked_at: new Date(),
    }
    await db.collection("blacklisted_tokens").insertOne(payload);

    return NextResponse.json({
      success: true,
      message:"Logged out successfully",
    });

  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}