import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app";

const PORT = process.env.PORT || 5000;

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || "");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;
