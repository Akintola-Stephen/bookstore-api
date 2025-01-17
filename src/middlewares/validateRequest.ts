import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    status: "fail",
                    message: "Validation error",
                    errors: (error as any).issues.map((issue: any) => issue.message),
                });
            }
            next(error);
        }
    };
};
