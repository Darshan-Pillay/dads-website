import { useState } from 'react';
import type React from 'react';
import ContactForm from '../components/ContactForm.tsx';

export default function Contact() {
  const [succeeded, setSucceeded] = useState(false);

  if (succeeded) {
    return (
      <section className="section section--center" id="contact">
        <div className="container">
          <div className="contact__card contact__success-card">
            <img
              src="/assets/softfinity-mark-gold.svg"
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

  return (
    <section className="section section--center" id="contact">
      <div className="container">
        <img className="contact__star reveal" src="/assets/softfinity-mark-gold.svg" alt="" aria-hidden="true" width="136" height="136" />
        <p className="eyebrow reveal" style={{ '--d': '40ms' } as React.CSSProperties}>Connect with a specialist</p>
        <h2 className="section__title reveal" style={{ '--d': '80ms', maxWidth: '26ch', marginInline: 'auto' } as React.CSSProperties}>
          Tell us about your transformation. We'll bring the experience.
        </h2>
        <ContactForm
          className="contact__card contact__form reveal"
          onSuccess={() => setSucceeded(true)}
        />
        <p className="contact__note reveal" style={{ '--d': '200ms' } as React.CSSProperties}>No pitch. No agenda. Just honest direction.</p>
      </div>
    </section>
  );
}
