import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

// Defined function to validate request data with a Zod schema
export const validateRequest = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            // Body validation against the schema
            schema.parse(req.body);
            next();
        } catch (error) {
            // If validation fails, respond with a 400 status and error messages
            if (error instanceof Error) {
                res.status(400).json({
                    status: "fail",
                    message: "Validation error",
                    errors: (error as any).issues.map((issue: any) => issue.message),
                });
            } else {
                next(error); // Pass the error to the next error handler if it’s not a validation error
            }
        }
    };
};
