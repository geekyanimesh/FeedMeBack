import {z} from 'zod'

export const verfiySchema = z.object({
    code: z.string().length(6,"Must be 6 digits")
})
