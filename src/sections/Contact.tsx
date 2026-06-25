import { Button, Input, Select } from '../ds.tsx';
import { Icon } from '../icons.tsx';

type ContactProps = { onSubmit?: (data: FormData) => void };

export default function Contact({ onSubmit }: ContactProps) {
  return (
    <section className="section section--center" id="contact">
      <div className="container">
        <img className="contact__star reveal" src="assets/softfinity-mark-gold.svg" alt="" aria-hidden="true" />
        <p className="eyebrow reveal" style={{ '--d': '40ms' }}>Connect with a specialist</p>
        <h2 className="section__title reveal" style={{ '--d': '80ms', maxWidth: '26ch', marginInline: 'auto' }}>
          Tell us about your transformation. We'll bring the experience.
        </h2>
        {/* When the backend lands (see docs/adr/0003), wire onSubmit to POST to /api/contact. */}
        <form className="contact__card contact__form reveal" style={{ '--d': '140ms' }}
          name="contact" onSubmit={(e) => { e.preventDefault(); onSubmit?.(new FormData(e.currentTarget)); }}>
          <div className="contact__row">
            <Input label="Name" name="name" placeholder="Jordan Maré" autoComplete="name" required />
            <Input label="Work email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required />
          </div>
          <Select label="What do you need help with?" name="domain" placeholder="Choose a technology area"
            options={['SAP', 'Microsoft', 'Oracle', 'IBM', 'AI', 'Cloud Computing', 'Big Data & Analytics', 'Blockchain', 'Mobile Development', 'Not sure yet']} />
          <Input label="What's on your mind?" name="message" placeholder="A line about where you're headed…" />
          <Button variant="primary" size="lg" block type="submit"
            iconRight={<Icon name="arrow-right" size={18} />}>
            Connect with a specialist
          </Button>
        </form>
        <p className="contact__note reveal" style={{ '--d': '200ms' }}>No pitch. No agenda. Just honest direction.</p>
      </div>
    </section>
  );
}
