import { Schema, model, models } from "mongoose";

const UrlSchema = new Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

const Urls = models.Urls || model("Urls", UrlSchema);

export default Urls;
