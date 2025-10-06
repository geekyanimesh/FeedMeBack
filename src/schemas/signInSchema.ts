import {z} from 'zod'

export const signInSchema = z.object({
    username: z.string(),
    password: z.string().min(6,{message: "At least 6 digits"})
})