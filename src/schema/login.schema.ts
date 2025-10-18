import * as z from 'zod'

export const loginSchema = z.object({


  email: z.string().nonempty('This field is required').email('Invalid email address'),

  password: z.string().nonempty('This field is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'not valid password')

})

export type loginSchemaForm = z.infer<typeof loginSchema>