import { z } from 'zod';

export const ALLOWED_DOMAINS = [
  'SAP', 'Microsoft', 'Oracle', 'IBM', 'AI',
  'Cloud Computing', 'Big Data & Analytics', 'Blockchain',
  'Mobile Development', 'Not sure yet',
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name is too short').max(100, 'Name is too long'),
  email: z
    .string()
    .trim()
    .max(254, 'Email is too long')
    .refine(
      (v) => {
        const at = v.indexOf('@');
        return at > 0 && v.indexOf('.', at + 2) > at + 1;
      },
      { message: 'Invalid email address' }
    ),
  domain: z.preprocess(
    (v) => (v === '' || v === undefined ? undefined : v),
    z.enum(ALLOWED_DOMAINS).optional()
  ),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
});

export type ContactPayload = z.infer<typeof contactSchema>;
