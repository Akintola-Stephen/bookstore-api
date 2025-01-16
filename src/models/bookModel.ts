import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
    title: string;
    author: mongoose.Types.ObjectId;
    category: mongoose.Types.ObjectId;
    publicationYear: number;
    isbn: string;
}

const bookSchema = new Schema<IBook>(
    {
        title: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        publicationYear: { type: Number, required: true },
        isbn: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

export default mongoose.model<IBook>("Book", bookSchema);
