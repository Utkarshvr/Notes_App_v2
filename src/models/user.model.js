import { Schema, model } from "mongoose";

const schema = Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [
        true,
        "The username has already been used by someone else. Please try another",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

const User = model("User", schema);

export default User;
