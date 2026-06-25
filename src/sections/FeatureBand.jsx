export default function FeatureBand() {
  return (
    <section className="feature-band" aria-label="Intelligence working with people">
      <div className="feature-band__media">
        <img src="assets/ai-humans.png" alt="" loading="lazy" />
        <div className="feature-band__scrim" />
      </div>
      <div className="feature-band__caption container reveal">
        <p className="eyebrow">A new kind of partnership</p>
        <h2 className="feature-band__title">
          Where intelligence works <em>with</em> people — not over them.
        </h2>
        <p className="feature-band__lead">
          Our consultants embed with your team, blending human judgement with technology
          that earns its keep. Every engagement leaves your people stronger than it found them.
        </p>
      </div>
    </section>
  );
}
