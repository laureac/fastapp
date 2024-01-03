import mongoose from "mongoose";

let isConnected: boolean = false;
const MONGODB_URI = String(process.env.MONGODB_URI);

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (MONGODB_URI === undefined) return console.log("No MONGODB_URI");
  if (isConnected) return console.log("Already connected to DB");

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    return console.log("Connected to DB");
  } catch (e: any) {
    throw new Error(`Error connecting to DB: ${e.message}`);
  }
};
