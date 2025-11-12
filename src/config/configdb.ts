import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(
      "mongodb+srv://nhatminhtran2611_db_user:SihNA0uvvhbkBYqZ@cluster0.vwfbl8h.mongodb.net/node_fulltask?retryWrites=true&w=majority"
    );
    console.log("✅ Connected to MongoDB Atlas successfully!");
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ MongoDB Atlas connection failed:", error.message);
    } else {
      console.error("❌ MongoDB Atlas connection failed:", error);
    }
    process.exit(1);
  }
};

export default connectDB;