import { generateToken, getTokenData } from "@Lib/jwt";
import dbPromise from "@Lib/mongo";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token is required" },
        { status: 400 }
      );
    }

    const data = getTokenData(token);
    const newToken = generateToken({
      id: data.id,
      email: data.email,
      name: data.name,
    });

    const db = await dbPromise;
    const payload = {
      token: token,
      revoked_at: new Date(),
    }
    await db.collection("blacklisted_tokens").insertOne(payload);

    const ObjID = new ObjectId(data.id)
    await db.collection("users").updateOne(
      { _id: ObjID },
      { $set: { lastLogin: new Date() } }
    );

    return NextResponse.json({
      success: true,
      token: newToken,
      email: data.email,
      name: data.name,
    });

  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}