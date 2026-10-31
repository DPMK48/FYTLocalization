import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "member";
  specialty?: string;
  bio?: string;
  location?: string;
  nativeLanguage?: string;
  languagePairs?: string[];
  skills?: string[];
  avatarBg?: string;
  avatarText?: string;
  avatarUrl?: string;
  coverUrl?: string;
  isOnline: boolean;
  isAdmin: boolean;
  isCopywriter?: boolean;
  isApproved: boolean;
  status: "pending" | "approved" | "rejected";
  badge: "Vetted Pro" | "Senior Linguist" | "Verified Member" | "Admin";
  completedJobs: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String },
    role: { type: String, enum: ["admin", "member"], default: "member" },
    specialty: { type: String, default: "Translation & Localization" },
    bio: { type: String, default: "" },
    location: { type: String, default: "Nigeria" },
    nativeLanguage: { type: String, default: "English" },
    languagePairs: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    avatarBg: { type: String, default: "bg-blue-600" },
    avatarText: { type: String, default: "MB" },
    avatarUrl: { type: String, default: "" },
    coverUrl: { type: String, default: "" },
    isOnline: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    isCopywriter: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    badge: {
      type: String,
      enum: ["Vetted Pro", "Senior Linguist", "Verified Member", "Admin"],
      default: "Verified Member",
    },
    completedJobs: { type: Number, default: 0 },
    rating: { type: Number, default: 5.0 },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

