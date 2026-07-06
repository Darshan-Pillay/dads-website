import { useState, useRef } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Button, Input, Select, Textarea } from '../ds.tsx';
import { contactSchema, ALLOWED_DOMAINS } from '../lib/contactSchema.ts';

type Status = 'idle' | 'submitting' | 'error';
type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>;

const MESSAGE_MAX = 1000;
const CONTACT_MAILTO = 'mailto:christopher.pillay@softfinity.co.za';

interface ContactFormProps {
  onSuccess: () => void;
  className?: string;
}

export default function ContactForm({ onSuccess, className }: ContactFormProps) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [apiError, setApiError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const mountTime = useRef(String(Date.now()));

  const clearField = (field: keyof FieldErrors) => {
    setFieldErrors(prev => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const fd = new FormData(e.currentTarget);
    const raw: Record<string, unknown> = {};
    fd.forEach((value, key) => { raw[key] = value; });

    const result = contactSchema.safeParse(raw);
    if (!result.success) {
      const flat = result.error.flatten().fieldErrors;
      setFieldErrors({
        name:    flat.name?.[0],
        email:   flat.email?.[0],
        message: flat.message?.[0],
      });
      return;
    }

    setFieldErrors({});
    setStatus('submitting');
    setApiError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...raw, _t: mountTime.current }),
      });

      if (res.ok) {
        onSuccess();
      } else {
        const data = await res.json().catch(() => ({})) as { error?: string };
        setStatus('error');
        setApiError(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setApiError('Unable to reach the server. Please check your connection.');
    }
  };

  const submitting = status === 'submitting';

  return (
    <form
      className={['contact__form', className].filter(Boolean).join(' ')}
      name="contact"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Honeypot — invisible to humans, filled by dumb scrapers */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
        aria-hidden="true"
      />
      <div className="contact__row">
        <Input
          label="Name" name="name" placeholder="Jordan Maré" autoComplete="name" required
          error={fieldErrors.name}
          onChange={() => clearField('name')}
        />
        <Input
          label="Work email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required
          error={fieldErrors.email}
          onChange={() => clearField('email')}
        />
      </div>
      <Select
        label="What do you need help with?"
        name="domain"
        placeholder="Choose a technology area"
        options={[...ALLOWED_DOMAINS]}
      />
      <Textarea
        label="What's on your mind?"
        name="message"
        rows={5}
        maxLength={MESSAGE_MAX}
        placeholder="A line about where you're headed…"
        required
        value={message}
        error={fieldErrors.message}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setMessage(e.target.value);
          clearField('message');
        }}
        helper={fieldErrors.message ? undefined : `${message.length} / ${MESSAGE_MAX}`}
      />
      <div className={submitting ? 'contact__btn-wrap contact__btn-wrap--loading' : 'contact__btn-wrap'}>
        <Button
          variant="primary" size="lg" block type="submit"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? 'Sending…' : 'Submit'}
        </Button>
      </div>
      {status === 'error' && apiError && (
        <p className="contact__error" role="alert">
          {apiError}{' '}
          <a href={CONTACT_MAILTO} className="contact__error-link">
            Email us directly
          </a>{' '}
          and we'll get back to you.
        </p>
      )}
      <p className="contact__privacy">
        We'll use your details only to reply to this enquiry. See our{' '}
        <a href="/privacy" className="contact__privacy-link">privacy notice</a>{' '}
        for the full story.
      </p>
    </form>
  );
}
