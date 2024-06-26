// import User from "@/models/user";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
