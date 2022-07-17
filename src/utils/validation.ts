import * as z from 'zod'

export const articleDetailSchema = z.object({
  title: z.string().min(1, 'This field is required'),
  perex: z.string()
    .min(1, 'This field is requiered')
    .max(300, 'Maximum character count is 200'),
  content: z.string().min(1, 'This field is required')
})
