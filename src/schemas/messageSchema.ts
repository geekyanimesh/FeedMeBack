import {z} from 'zod'

export const messageSchema = z.object({
    content: z
    .string()
    .min(10,{message: "At least 10 characters"})
    .max(300, {message: "At max 300 characters"})    
})