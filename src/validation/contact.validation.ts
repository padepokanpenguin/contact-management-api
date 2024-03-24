import { z, ZodType } from "zod";

export class ContactValidation {
    static readonly Create: ZodType = z.object({
        first_name: z.string().min(1).max(100),
        last_name: z.string().min(1).max(100).optional(),
        email: z.string().min(1).max(100).optional(),
        phone: z.string().min(1).max(20).optional()
    })

    static readonly Update : ZodType = z.object({
        id: z.number().positive(),
        first_name: z.string().min(1).max(100),
        last_name: z.string().min(1).max(100).optional(),
        email: z.string().min(1).max(100).email().optional(),
        phone: z.string().min(1).max(20).optional(),
    });

    static readonly Search : ZodType = z.object({
        name: z.string().min(1).optional(),
        phone: z.string().min(1).optional(),
        email: z.string().min(1).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })
}