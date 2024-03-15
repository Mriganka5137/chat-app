import mongoose from "mongoose";

export interface IMessage extends mongoose.Document {
  chat: mongoose.Schema.Types.ObjectId;
  sender: mongoose.Schema.Types.ObjectId;
  text: string;
  image: string;
  readBy: [mongoose.Schema.Types.ObjectId];
}

const messageSchema = new mongoose.Schema<IMessage>(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },

    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
