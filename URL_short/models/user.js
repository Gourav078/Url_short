import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    urls: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Url",
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
