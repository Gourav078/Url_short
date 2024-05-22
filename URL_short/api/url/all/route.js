// app/api/url/all.js
import Urls from "@/models/urls";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectToDB();

  try {
    const allUrls = await Urls.find({}, { _id: 0, __v: 0 }); // Exclude _id and __v fields
    return NextResponse.json(allUrls);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch URLs" },
      { status: 500 }
    );
  }
}
