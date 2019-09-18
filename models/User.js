import mongoose from "mongoose";
import bcrptjs from "bcryptjs";
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

UserSchema.methods.hashPassword = function(password) {
  const rounds = 10;
  return bcrptjs.genSalt(rounds, (err, salt) => {
    if (err) throw err;
    return bcrptjs.hash(password, salt, (err, hash) => {
      if (err) throw err;
      this.password = hash;
      return this.password;
    });
  });
};

UserSchema.methods.verifyPassword = function(password) {
  return bcrptjs.compare(password, this.password, (err, isMatch) => {
    if (err) throw err;
    return isMatch;
  });
};

export const User = mongoose.model("User", UserSchema);
