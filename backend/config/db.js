import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://shoumik:HLz2mydOEaF5Hbvc@cluster1.y48lb.mongodb.net/delight"
    )
    .then(() => console.log("DB connected"));
};
