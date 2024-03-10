import { Schema, models, model } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  emailVerified: boolean;
}
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);
export const User = models.User || model("User", userSchema);
