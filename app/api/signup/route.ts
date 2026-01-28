import { createHash } from "@Lib/hash";
import dbPromise from "@Lib/mongo";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { name, age, email, password } = await req.json();

    if (!name || !age || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, Age, Email and password are required" },
        { status: 400 }
      );
    }

    const db = await dbPromise;

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 401 }
      );
    }

    await db.collection("users").insertOne({
      name,
      age,
      email,
      passwordHash: await createHash(password),
      password,
      createdAt: new Date(),
      lastLogin: null,
    });


    return NextResponse.json({
      success: true
    });

  } catch (error) {
    console.error("Signup error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}