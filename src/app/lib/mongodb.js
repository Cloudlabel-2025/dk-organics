import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectDB() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is undefined in connectDB");
    throw new Error("MONGODB_URI environment variable is not set");
  }

  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 45000,
    }).then((m) => {
      console.log("MongoDB connection established");
      return m;
    }).catch((e) => {
      console.error("MongoDB connection failed:", e.message);
      throw e;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
