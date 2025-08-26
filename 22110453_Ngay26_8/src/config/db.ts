import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      // ⚠️ các option này từ mongoose v6 trở đi không cần nữa
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(" MongoDB connected");
  } catch (err: any) {
    console.error(" MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;

