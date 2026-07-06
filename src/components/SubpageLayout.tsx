import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ContactModalContext } from './ContactModalContext.tsx';
import ContactModal from './ContactModal.tsx';

interface SubpageLayoutProps {
  children: ReactNode;
  backLabel?: string;
  backHref?: string;
}

export default function SubpageLayout({
  children,
  backLabel = '← Back to home',
  backHref = '/',
}: SubpageLayoutProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ContactModalContext.Provider value={{ openModal: () => setModalOpen(true) }}>
      <div className="sp-body">
        <header className="sp-nav">
          <div className="sp-nav__inner">
            <Link className="sp-nav__brand" to="/">
              <img
                src="/assets/softfinity-horizontal-dark.svg"
                alt="Softfinity Consulting"
                width={780}
                height={200}
              />
            </Link>
            <Link className="sp-nav__back" to={backHref}>
              {backLabel}
            </Link>
          </div>
        </header>

        <main>{children}</main>

        <footer className="sp-footer">
          <div className="sp-footer__inner">
            <span>© 2026 Softfinity Consulting (Pty) Ltd. Technology-agnostic. Business-focused.</span>
            <Link to="/">← Back to home</Link>
          </div>
        </footer>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </ContactModalContext.Provider>
  );
}
