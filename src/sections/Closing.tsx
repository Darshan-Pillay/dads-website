export default function Closing() {
  return (
    <section className="section section--center closing" id="closing">
      <div
        className="closing__bg"
        aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(11,11,18,0.86), rgba(11,11,18,0.92)), url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1400&q=72')" }}
      />
      <div className="container-narrow closing__inner">
        <p className="eyebrow reveal">Your trusted technology partner</p>
        <h2 className="section__statement reveal" style={{ '--d': '60ms' }}>
          Whatever your technology landscape,<br />
          our focus remains the same.
        </h2>
        <p className="closing__lead reveal" style={{ '--d': '140ms' }}>
          Independent expertise across leading enterprise platforms and emerging technologies.
          Experienced consultants, deep industry knowledge, and a collaborative delivery model
          — combined to help organisations navigate complexity, reduce risk, and achieve
          meaningful business results that create <em>lasting value</em>.
        </p>
      </div>
    </section>
  );
}
