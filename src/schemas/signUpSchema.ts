import {z} from 'zod'

export const usernameValidation = z      // single value only 
    .string()
    .min(2,"Username must be at least 2 characters")
    .max(20,"Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special characters")


export const signUpSchema = z.object({      // multi values therefore object
    username: usernameValidation,
    email: z.string().email({
        message: "Invalid mail address"
    }),
    password: z.string().min(6,{message: "At least 6 characters"})
})
