import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ContactForm from './ContactForm.tsx';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [succeeded, setSucceeded] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.classList.add('sp-modal-open');
    } else {
      document.body.classList.remove('sp-modal-open');
    }
    return () => document.body.classList.remove('sp-modal-open');
  }, [open]);

  // Escape key closes
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  function handleClose() {
    setSucceeded(false);
    onClose();
  }

  return createPortal(
    <div className={open ? 'sp-modal is-open' : 'sp-modal'} role="presentation">
      <div className="sp-modal__scrim" onClick={handleClose} aria-hidden="true" />
      <div
        className="sp-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sp-modal-title"
      >
        <button className="sp-modal__close" type="button" onClick={handleClose} aria-label="Close">
          ×
        </button>

        {succeeded ? (
          <div className="sp-modal__thanks">
            <p className="eyebrow">We've got it.</p>
            <h2 className="sp-modal__title" id="sp-modal-title">
              A senior consultant will reach out within one business day.
            </h2>
            <p className="sp-modal__note">No pitch. No agenda. Just honest direction.</p>
            <button
              type="button"
              className="sp-cta__btn sp-modal__thanks-close"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Connect with a specialist</p>
            <h2 className="sp-modal__title" id="sp-modal-title">
              Tell us about your transformation. We'll bring the experience.
            </h2>
            <ContactForm onSuccess={() => setSucceeded(true)} />
            <p className="sp-modal__note">No pitch. No agenda. Just honest direction.</p>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
