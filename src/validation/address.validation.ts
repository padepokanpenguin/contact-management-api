import {z, ZodType} from "zod";

export class AddressValidation {

    static readonly Create : ZodType = z.object({
        contact_id: z.number().positive(),
        street: z.string().min(1).max(255).optional(),
        city: z.string().min(1).max(100).optional(),
        province: z.string().min(1).max(100).optional(),
        country: z.string().min(1).max(100),
        postal_code: z.string().min(1).max(10),
    })

    static readonly Get : ZodType = z.object({
        contact_id: z.number().positive(),
        id: z.number().positive(),
    })

    static readonly Remove : ZodType = z.object({
        contact_id: z.number().positive(),
        id: z.number().positive(),
    })

    static readonly Update : ZodType = z.object({
        id: z.number().positive(),
        contact_id: z.number().positive(),
        street: z.string().min(1).max(255).optional(),
        city: z.string().min(1).max(100).optional(),
        province: z.string().min(1).max(100).optional(),
        country: z.string().min(1).max(100),
        postal_code: z.string().min(1).max(10),
    })

}
