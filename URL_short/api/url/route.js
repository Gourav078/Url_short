// pages/api/shorten.js
// import dbConnect from "../../lib/dbConnect"; // Ensure you have a dbConnect file to handle DB connection
// import Urls from "../../models/Urls";
// import { baseUrl, generateRandomString } from "../../utils/urlHelpers"; // Put your helper functions in utils/urlHelpers.js

import { baseUrl, genaretRandomString } from "@/libs/constant";
import Urls from "@/models/urls";
import { connectToDB } from "@/utils/database";
// import { generateRandomString } from "@/libs/constant";

// app/api/url/route.js
import { NextResponse } from "next/server";
// import dbConnect from '../../../lib/dbConnect'; // Ensure you have a dbConnect file to handle DB connection
// import Urls from '../../../models/Urls';
// import { generateRandomString, baseUrl } from '../../../utils/urlHelpers'; // Put your helper functions in utils/urlHelpers.js

export async function POST(request) {
  await connectToDB();

  const { longUrl } = await request.json();

  // Validate longUrl
  if (!longUrl || !longUrl.startsWith("http")) {
    return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
  }

  // Generate unique short URL
  let shortUrl;
  let urlExists;
  do {
    shortUrl = genaretRandomString(6);
    urlExists = await Urls.findOne({ shortUrl });
  } while (urlExists);

  const newUrl = new Urls({
    longUrl,
    shortUrl,
  });

  await newUrl.save();

  return NextResponse.json(
    { shortUrl: `${baseUrl}/${shortUrl}` },
    { status: 201 }
  );
}
