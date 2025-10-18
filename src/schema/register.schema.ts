
import * as z from 'zod'

export const registerSchema = z.object({
  name: z.string().nonempty('This Field Is Required').min(3, 'Name Must Be At Least 3 Characters Long').max(10, 'Name Must Be At Most 10 Characters Long'),

  email: z.string().nonempty('This field is required').email('Invalid email address'),

  password: z.string().nonempty('This field is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'not valid password'),

  rePassword: z.string().nonempty('This field is required'),

  phone: z.string().nonempty('This field is required').regex(/^(002)?01[0-2,5][0-9]{8}$/, 'not valid phone number')



}).refine((data) => data.password === data.rePassword, {
  path: ['rePassword'],
  message: 'Passwords do not match'
})

export type registerSchemaForm = z.infer<typeof registerSchema>