import connectDB from "../config/db";

export const initDB = async () => {
  await connectDB();
};