import mongoose from "mongoose";
const MONGO_URI = process.env.MONGODB_URI || '';

let cached = (global as any).mongoose || { con: null, promise: null };

export const connectToDB = async () => {
  try {
    if (cached.conn) return cached.conn;
    if (!MONGO_URI) throw new Error("Database uri is missing");

    cached.promise =
      cached.promise ||
      (await mongoose.connect(MONGO_URI, {
        dbName: "test",
        bufferCommands: false,
      }));

    cached.conn = await cached.promise;
     console.log("dbconnected")
    return cached.conn;
  } catch (error) {
    console.log(error);
  }
};


