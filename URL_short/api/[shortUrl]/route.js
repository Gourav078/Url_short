// pages/api/[shortUrl].js
import Urls from "@/models/urls";
import { connectToDB } from "@/utils/database";

export default async function handler(req, res) {
  const {
    query: { shortUrl },
  } = req;

  await connectToDB();

  try {
    const urlEntry = await Urls.findOne({ shortUrl });
    console.log(urlEntry)

    if (urlEntry) {
      urlEntry.clicks += 1;
      await urlEntry.save();

      return res.redirect(urlEntry.longUrl);
    } else {
      return res.status(404).json({ message: "URL not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
