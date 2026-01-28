import dbPromise from "@Lib/mongo";
import { NextResponse } from "next/server";
import { createHash } from "@Lib/hash";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 },
      );
    }

    const db = await dbPromise;
    await db
      .collection("users")
      .updateOne(
        { email: email },
        {
          $set: {
            password: password,
            passwordHash: await createHash(password),
          },
        },
      );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Changing Password error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
