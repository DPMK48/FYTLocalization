import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
  sender: string;
  recipient: string;
  text: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema: Schema = new Schema<IMessage>(
  {
    sender: { type: String, required: true, index: true },
    recipient: { type: String, required: true, index: true },
    text: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

