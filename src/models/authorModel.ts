import mongoose, { Schema, Document } from "mongoose";

export interface IAuthor extends Document {
    name: string;
    bio: string;
    dateOfBirth: Date;
}

const authorSchema = new Schema<IAuthor>(
    {
        name: { type: String, required: true },
        bio: { type: String },
        dateOfBirth: { type: Date, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IAuthor>("Author", authorSchema);
