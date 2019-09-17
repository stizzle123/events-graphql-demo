import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    createdEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event"
      }
    ]
  },
  { timestamps: true }
);
