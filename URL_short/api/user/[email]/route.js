import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
  const { email } = params;
  // const { email } = await req.json();
  try {
    await connectToDB();
    const user = await User.findOne({ email });
    // console.log("user:",user)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to connect to the server" },
      { status: 500 }
    );
  }
}
