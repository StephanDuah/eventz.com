import mongoose from "mongoose";
const MONGO_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { con: null, promise: null };

export const connectToDB = async () => {
  if (cached.conn) return cached.conn;
  if (!MONGO_URI) throw new Error("Database uri is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGO_URI, {
      dbName: "eventz",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
