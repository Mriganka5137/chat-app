import mongoose, { Document, Schema, model, models } from "mongoose";

export interface IChat extends Document {
  users: [Schema.Types.ObjectId];
  createdBy: Schema.Types.ObjectId;
  lastMessage: Schema.Types.ObjectId;
  isGroupChat: boolean;
  groupName: string;
  groupProfilePicture?: string;
  groupBio?: string;
  groupAdmins?: [Schema.Types.ObjectId];
  unreadCounts: Object;
}

const chatSchema = new Schema<IChat>(
  {
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    groupName: {
      type: String,
      default: "",
    },
    groupProfilePicture: {
      type: String,
      default: "",
    },
    groupBio: {
      type: String,
      default: "",
    },
    groupAdmins: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    unreadCounts: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

export const Chat = models.Chat || model("Chat", chatSchema);
