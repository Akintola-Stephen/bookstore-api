import { z } from "zod";

export const createBookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author ID is required"),
    category: z.string().min(1, "Category ID is required"),
    publicationYear: z
        .number()
        .int()
        .min(1900, "Publication year must be after 1900")
        .max(new Date().getFullYear(), "Publication year cannot be in the future"),
    ISBN: z.string().regex(/^\d{10}(\d{3})?$/, "Invalid ISBN format"),
});

export const updateBookSchema = createBookSchema.partial(); // Allow partial updates
