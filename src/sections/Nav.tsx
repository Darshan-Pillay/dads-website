import React from 'react';
import type { MouseEvent } from 'react';
import { Button } from '../ds.tsx';
import { Icon } from '../icons.tsx';

type NavProps = { onNav?: (e: MouseEvent<HTMLAnchorElement>) => void };

export default function Nav({ onNav }: NavProps) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = ['Who we are', 'Vision', 'Approach', 'What we do', 'Industries', 'Principles'];
  return (
    <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-nav__inner">
        <a className="site-nav__brand" href="#top" onClick={onNav}>
          <img src="assets/softfinity-horizontal-dark.svg" alt="Softfinity Consulting" width="780" height="200" />
        </a>
        <nav className="site-nav__links">
          {links.map((l) => (
            <a key={l} href={'#' + l.toLowerCase().replace(/\s+/g, '-')} onClick={onNav}>{l}</a>
          ))}
        </nav>
        <div className="site-nav__cta">
          <Button variant="primary" size="sm" as="a" href="#contact" onClick={onNav}
            iconRight={<Icon name="chevron-down" size={16} />}>
            Connect with a specialist
          </Button>
        </div>
      </div>
    </header>
  );
}
