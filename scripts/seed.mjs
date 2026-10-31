import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://dorathypaul48_db_user:D4CTPHD7Clu5JiCw@cluster0.hjsgs6p.mongodb.net/fytlocalization";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "member"], default: "member" },
    bio: { type: String, default: "" },
    location: { type: String, default: "Bauchi State, Nigeria" },
    nativeLanguage: { type: String, default: "Hausa & English" },
    languagePairs: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    avatarBg: { type: String, default: "bg-blue-600" },
    avatarText: { type: String, default: "FY" },
    avatarUrl: { type: String, default: "" },
    coverUrl: { type: String, default: "" },
    isOnline: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: true },
    isCopywriter: { type: Boolean, default: false },
    badge: { type: String, default: "Admin" },
    completedJobs: { type: Number, default: 480 },
    rating: { type: Number, default: 5.0 },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seed() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI, { dbName: "fytlocalization" });
    console.log("Connected to MongoDB Atlas!");

    // 1. Clear database collections
    console.log("Clearing existing collections...");
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
      console.log(`Cleared collection: ${collection.collectionName}`);
    }

    // 2. Seed Admin user: Fatima Yusuf
    console.log("Seeding Fatima Yusuf as Administrator...");
    const adminUser = await User.create({
      username: "adminfytlocalization-com",
      name: "Fatima Yusuf",
      email: "admin@fytlocalization.com",
      password: "FYTAdmin@2026",
      role: "admin",
      isAdmin: true,
      bio: "Linguist and founder of FYTLOCALIZATION. Passionate about bringing African languages into modern AI training sets and cross-border digital platforms. Over 10+ years coordinating enterprise language solutions across Africa and the Middle East.",
      location: "Bauchi State, Nigeria",
      nativeLanguage: "Hausa & English",
      languagePairs: ["Hausa ↔ English", "Arabic → Hausa", "French → English"],
      skills: ["Translation", "AI Localization", "Transcription", "Interpretation"],
      badge: "Admin",
      avatarBg: "bg-blue-600",
      avatarText: "FY",
      isOnline: true,
      completedJobs: 480,
      rating: 5.0,
    });

    console.log("SUCCESS: Seeded Admin User:", adminUser.email);
    console.log("Initial Admin Password: FYTAdmin@2026");
    process.exit(0);
  } catch (error) {
    console.error("Seed Error:", error);
    process.exit(1);
  }
}

seed();

