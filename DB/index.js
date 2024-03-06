import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Restaurant-project-M3";

export const setConnection = async () => {
  try {
    const mongoConnect = await mongoose.connect(MONGO_URI);
    const dbName = mongoConnect.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  } catch (err) {
    console.error("Error:", err);
  }
};
