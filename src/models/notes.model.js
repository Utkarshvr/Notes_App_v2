import { Schema, model } from "mongoose";

const schema = Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  { timestamps: true }
);

const Notes = model("Notes", schema);

export default Notes;
