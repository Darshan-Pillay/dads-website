import { z } from 'zod';

// These rules are hand-mirrored in api/contact.php, which can't run Zod
// (ADR-0010 §8). If you change a rule or ALLOWED_DOMAINS here, change it there.
export const ALLOWED_DOMAINS = [
  'SAP', 'Microsoft', 'Oracle', 'IBM', 'AI',
  'Cloud Computing', 'Big Data & Analytics', 'Blockchain',
  'Mobile Development', 'Not sure yet',
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name is too short').max(100, 'Name is too long'),
  email: z.string().trim().max(254, 'Email is too long').email('Invalid email address'),
  domain: z.preprocess(
    (v) => (v === '' || v === undefined ? undefined : v),
    z.enum(ALLOWED_DOMAINS).optional()
  ),
  message: z.string().trim().min(50, 'Tell us a little more — 50 characters minimum.').max(1000, 'Message is too long'),
});

export type ContactPayload = z.infer<typeof contactSchema>;
