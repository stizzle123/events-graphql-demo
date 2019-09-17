import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", EventSchema);
