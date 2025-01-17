import { z } from "zod";

export const createAuthorSchema = z.object({
    name: z.string().min(1, "Name is required"),
    bio: z.string().optional(),
    birthDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Birth date must be in YYYY-MM-DD format")
        .optional(),
});

export const updateAuthorSchema = createAuthorSchema.partial();
