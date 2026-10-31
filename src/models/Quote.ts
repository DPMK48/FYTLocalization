import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuote extends Document {
  category: "localization" | "ai-data";
  service: string;
  subject: string;
  fullName: string;
  email: string;
  volume: string;
  notes?: string;
  sourceLang?: string;
  targetLang?: string;
  dataType?: string;
  targetRegion?: string;
  collectionTool?: string;
  status: "pending" | "reviewed" | "responded";
  createdAt: Date;
  updatedAt: Date;
}

const QuoteSchema: Schema = new Schema<IQuote>(
  {
    category: { type: String, enum: ["localization", "ai-data"], required: true },
    service: { type: String, required: true },
    subject: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    volume: { type: String, default: "" },
    notes: { type: String, default: "" },
    sourceLang: { type: String },
    targetLang: { type: String },
    dataType: { type: String },
    targetRegion: { type: String },
    collectionTool: { type: String },
    status: {
      type: String,
      enum: ["pending", "reviewed", "responded"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Quote: Model<IQuote> =
  mongoose.models.Quote || mongoose.model<IQuote>("Quote", QuoteSchema);

