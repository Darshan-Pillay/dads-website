import { Button } from '../ds.tsx';
import { Icon } from '../icons.tsx';
import type { Tweaks } from '../types.ts';

export default function Hero({ t }: { t: Tweaks }) {
  const treatment = t.heroStar;
  const dots = [
    { top: '20%', left: '30%', d: '0s' }, { top: '32%', left: '72%', d: '1.2s' },
    { top: '64%', left: '22%', d: '0.6s' }, { top: '70%', left: '78%', d: '1.8s' },
    { top: '48%', left: '12%', d: '2.4s' }, { top: '24%', left: '54%', d: '0.9s' },
  ];
  return (
    <section className="hero" id="top">
      {treatment === 'constellation' && (
        <div className="hero__constellation" aria-hidden="true">
          {dots.map((p, i) => (
            <span key={i} style={{ top: p.top, left: p.left, animationDelay: p.d }} />
          ))}
        </div>
      )}
      {/* No .reveal on hero content: it's above the fold on every load, so
          scroll-reveal does nothing useful — it just delays the LCP element
          (hero__lead) by the reveal transition + delay (was ~860ms). */}
      <div className="hero__inner">
        <span className={`hero__star ${treatment === 'orbit' ? 'hero__star--orbit' : ''}`} aria-hidden="true">
          <img src="assets/softfinity-mark-gold.svg" alt="" width="136" height="136" />
        </span>
        <div className="hero__wordmark">Softfinity<span className="gold">.</span></div>
        <h1 className="hero__title">
          Technology-agnostic consulting.<br />Business-focused<span className="gold"> outcomes.</span>
        </h1>
        <p className="hero__lead">
          We help organisations achieve their strategic objectives by providing highly experienced
          consultants who work alongside client teams to deliver measurable business outcomes —
          independent of any vendor, platform, or product.
        </p>
        <div className="hero__actions">
          <Button variant="primary" size="lg" as="a" href="#contact"
            iconRight={<Icon name="chevron-down" size={18} />}>
            Connect with a specialist
          </Button>
          <Button variant="ghost" size="lg" as="a" href="#principles">Our philosophy</Button>
        </div>
      </div>
      <a className="hero__scroll" href="#who-we-are" aria-label="Scroll to begin">
        <span>begin</span>
        <Icon name="chevron-down" size={20} />
      </a>
    </section>
  );
}
