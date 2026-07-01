import { useState, useRef } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Button, Input, Select, Textarea } from '../ds.tsx';
import { Icon } from '../icons.tsx';
import { contactSchema, ALLOWED_DOMAINS } from '../lib/contactSchema.ts';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const MESSAGE_MAX = 1000;
const CONTACT_MAILTO = 'mailto:christopher.pillay@softfinity.co.za';

export default function Contact() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const mountTime = useRef(String(Date.now()));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const fd = new FormData(e.currentTarget);
    const raw: Record<string, unknown> = {};
    fd.forEach((value, key) => { raw[key] = value; });

    const result = contactSchema.safeParse(raw);
    if (!result.success) {
      setStatus('error');
      setErrorMsg('Please check the fields above and try again.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...raw, _t: mountTime.current }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json().catch(() => ({})) as { error?: string };
        setStatus('error');
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Unable to reach the server. Please check your connection.');
    }
  };

  // Inline success — replaces form card, same section wrapper
  if (status === 'success') {
    return (
      <section className="section section--center" id="contact">
        <div className="container">
          <div className="contact__card contact__success-card">
            <img
              src="assets/softfinity-mark-gold.svg"
              alt=""
              aria-hidden="true"
              width="64"
              height="64"
              className="contact__success-mark"
            />
            <h2 className="contact__success-title">Thanks. We've got your message.</h2>
            <p className="contact__success-body">
              A senior consultant will reach out within one business day.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const submitting = status === 'submitting';

  return (
    <section className="section section--center" id="contact">
      <div className="container">
        <img className="contact__star reveal" src="assets/softfinity-mark-gold.svg" alt="" aria-hidden="true" width="136" height="136" />
        <p className="eyebrow reveal" style={{ '--d': '40ms' } as React.CSSProperties}>Connect with a specialist</p>
        <h2 className="section__title reveal" style={{ '--d': '80ms', maxWidth: '26ch', marginInline: 'auto' } as React.CSSProperties}>
          Tell us about your transformation. We'll bring the experience.
        </h2>
        <form
          className="contact__card contact__form reveal"
          style={{ '--d': '140ms' } as React.CSSProperties}
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
            <Input label="Name" name="name" placeholder="Jordan Maré" autoComplete="name" required />
            <Input label="Work email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required />
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
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
            helper={`${message.length} / ${MESSAGE_MAX}`}
          />
          <div className={submitting ? 'contact__btn-wrap contact__btn-wrap--loading' : 'contact__btn-wrap'}>
            <Button
              variant="primary" size="lg" block type="submit"
              disabled={submitting}
              aria-busy={submitting}
              iconRight={!submitting ? <Icon name="arrow-right" size={18} /> : undefined}
            >
              {submitting ? 'Sending…' : 'Connect with a specialist'}
            </Button>
          </div>
          {status === 'error' && (
            <p className="contact__error" role="alert">
              {errorMsg}{' '}
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
        <p className="contact__note reveal" style={{ '--d': '200ms' } as React.CSSProperties}>No pitch. No agenda. Just honest direction.</p>
      </div>
    </section>
  );
}
