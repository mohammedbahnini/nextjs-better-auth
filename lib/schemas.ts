import { z } from "zod";

export const formSchema = z.object({
    name: z.string({ message : "Name can't be empty"}).min(1, 'Name is required '),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required').min(9, 'Password is to short'),
    confirmPassword: z.string().min(1, 'Confirm password is required')
}).refine(data => {
    return data.password === data.confirmPassword
}, {
    message: 'Confirm password is wrong',
    path: ['confirmPassword']
})

export type formDataType = z.infer<typeof formSchema>;