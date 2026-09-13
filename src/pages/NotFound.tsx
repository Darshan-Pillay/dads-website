import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useEffect(() => { document.title = 'Page not found — Softfinity Consulting'; }, []);

  return (
    <div className="sp-body" style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', textAlign: 'center', padding: '2rem' }}>
      <div>
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>404</p>
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-white)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, margin: '0 0 1rem', lineHeight: 1.1 }}>
          Page not found.
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate)', marginBottom: '2rem' }}>
          This page doesn't exist or has been moved.
        </p>
        <Link to="/" className="sp-cta__btn">← Back to home</Link>
      </div>
    </div>
  );
}
