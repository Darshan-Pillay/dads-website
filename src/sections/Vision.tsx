export default function Vision() {
  return (
    <section className="section vision" id="vision">
      <div className="container vision__grid">
        <div className="vision__copy">
          <p className="eyebrow reveal">Our vision</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            Practical, collaborative, intellectual property–driven solutions to your IT needs.
          </h2>
          <p className="vision__body reveal" style={{ '--d': '120ms' }}>
            SOFTFINITY Consulting is driven by a clear aspiration: to respond to the recurring
            call from our clients for solutions that are <em>actually theirs</em>. Too often,
            clients are overwhelmed by vendors pursuing their own agendas. In reality, the most
            effective solutions require the integration of multiple products, unified through
            a single role-based architecture.
          </p>
          <p className="vision__body reveal" style={{ '--d': '180ms' }}>
            The primary obstacle is the lack of effective collaboration among independent
            software vendors, service providers, and internal project teams. Each party tends
            to view itself as a complete solution provider — rather than as one component
            within a larger, integrated whole.
          </p>
          <p className="vision__body reveal" style={{ '--d': '240ms' }}>
            SOFTFINITY understands this dilemma. Our role is to harness and combine these
            specialised capabilities, supplementing the common elements with our own resources,
            while pooling the collective intellectual property of the alliance for our client's
            ultimate benefit. We call this <strong>Singular Intellectual Property Assimilation</strong>
            {' '}— and it delivers a decisive competitive advantage.
          </p>
          <p className="vision__pull reveal" style={{ '--d': '300ms' }}>
            Our long-term objective: enable clients to implement robust, standards-based
            enterprise architectures that link diverse business units, suppliers, customers,
            and partners — with real-time access to information at the point of service.
          </p>
        </div>
        <figure className="vision__figure reveal" style={{ '--d': '160ms' }}>
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
            alt="A cross-functional team collaborating around a laptop"
            loading="lazy" decoding="async" width="1200" height="800"
          />
          <figcaption>Cross-functional IP teams — client, Softfinity consultants, and partner resources, working as one.</figcaption>
        </figure>
      </div>
    </section>
  );
}
