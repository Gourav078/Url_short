// app/api/url/details/[shortUrl]/route.js
import Urls from "@/models/urls";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connectToDB();

  const { shortUrl } = params;

  const urlEntry = await Urls.findOne({ shortUrl });

  if (urlEntry) {
    return NextResponse.json({
      longUrl: urlEntry.longUrl,
      clicks: urlEntry.clicks,
    });
  } else {
    return NextResponse.json({ message: "URL not found" }, { status: 404 });
  }
}
