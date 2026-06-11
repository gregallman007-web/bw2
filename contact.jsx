const { useState } = React;
const { Icon, Nav, Footer, BookTab, useScrollMotion, PAGES, BOOKING_URL } = window.BW;

const MAP_SRC = "https://maps.google.com/maps?q=The%20Old%20Ironworks%2C%20Maldon%2C%20Essex%20CM9%204LE&t=&z=15&ie=UTF8&iwloc=&output=embed";

function PageHero(){
  return (
    <section className="page-hero">
      <div className="page-hero-photo" style={{backgroundImage:"url('assets/clinic/contact-hero.webp')"}} role="img" aria-label="Physiotherapy assessment at Blackwater Physiotherapy"></div>
      <div className="wrap page-hero-body">
        <nav className="crumb" aria-label="Breadcrumb">
          <a href={PAGES.home}>Home</a><span>/</span><span aria-current="page">Contact</span>
        </nav>
        <div className="page-eyebrow"><span className="bar"></span>Get in touch</div>
        <h1>Let's <span className="em">talk.</span></h1>
        <p className="page-hero-sub">Book online in under two minutes, call us, or send a message — we reply within one working day.</p>
        <div className="page-hero-actions">
          <a className="btn btn-primary btn-primary-xl" href={BOOKING_URL} target="_blank" rel="noopener">Book online <Icon name="arrow" size={14}/></a>
          <a className="btn btn-outline-light" href="tel:+447790717056">07790 717056</a>
        </div>
      </div>
    </section>
  );
}

function InfoCards(){
  const items = [
    { ic:"home", l:"Clinic", v:<>First Floor, Gracie Barra Studio,<br/>The Old Ironworks, Maldon CM9 4LE</>, sub:"Free on-site parking" },
    { ic:"phone", l:"Phone", v:<><a href="tel:+447790717056">07790 717056</a><br/><a href="tel:+447468333745">07468 333745</a></>, sub:"Mon–Fri, 7am–8pm" },
    { ic:"mail", l:"Email", v:<a href="mailto:info@blackwaterphysiotherapy.co.uk">info@blackwaterphysiotherapy.co.uk</a>, sub:"We reply within 1 working day" },
    { ic:"refresh", l:"Opening hours", v:<>Mon–Fri · 7am–8pm<br/>Sat · 8am–2pm · Sun closed</>, sub:null },
  ];
  return (
    <div className="ci-grid">
      {items.map(it => (
        <div className="ci-card" key={it.l}>
          <div className="ci-ic"><Icon name={it.ic} size={18}/></div>
          <div className="ci-l">{it.l}</div>
          <div className="ci-v">{it.v}</div>
          {it.sub && <div className="ci-sub">{it.sub}</div>}
        </div>
      ))}
    </div>
  );
}

function EnquiryForm(){
  const [form, setForm] = useState({ first:"", last:"", email:"", phone:"", topic:"Initial Assessment", message:"", consent:false });
  const [status, setStatus] = useState("");
  const set = (k,v) => setForm(f => ({...f, [k]:v}));
  const submit = (e) => {
    e.preventDefault();
    if (!form.first || !form.email || !form.message){ setStatus("Please fill in your name, email and message."); return; }
    if (!form.consent){ setStatus("Please tick the consent box."); return; }
    setStatus("ok:Thanks — we'll be in touch within one working day.");
    setForm({ first:"", last:"", email:"", phone:"", topic:"Initial Assessment", message:"", consent:false });
  };
  const ok = status.startsWith("ok:");
  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <div className="head">
        <div className="lbl">Send a message</div>
        <h3>Tell us how we can help.</h3>
        <p>Short message, quick reply. We'll suggest a route in or book you straight in.</p>
      </div>
      <div className="form">
        <div className="form-row">
          <div className="field"><label htmlFor="first">First name</label><input id="first" type="text" value={form.first} onChange={e=>set("first",e.target.value)} placeholder="Jane"/></div>
          <div className="field"><label htmlFor="last">Last name</label><input id="last" type="text" value={form.last} onChange={e=>set("last",e.target.value)} placeholder="Smith"/></div>
        </div>
        <div className="form-row">
          <div className="field"><label htmlFor="email">Email</label><input id="email" type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="jane@example.co.uk"/></div>
          <div className="field"><label htmlFor="phone">Phone (optional)</label><input id="phone" type="tel" value={form.phone} onChange={e=>set("phone",e.target.value)} placeholder="07000 000000"/></div>
        </div>
        <div className="field">
          <label htmlFor="topic">What can we help with?</label>
          <select id="topic" value={form.topic} onChange={e=>set("topic",e.target.value)}>
            <option>Initial Assessment</option>
            <option>Follow-Up Session</option>
            <option>Rehabilitation Session</option>
            <option>Acupuncture</option>
            <option>Sports Massage</option>
            <option>Home Visits</option>
            <option>Insurance / billing enquiry</option>
            <option>Something else</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea id="message" value={form.message} onChange={e=>set("message",e.target.value)} placeholder="A short summary of what's going on, and when you're free…"></textarea>
        </div>
        <label className="form-consent">
          <input type="checkbox" checked={form.consent} onChange={e=>set("consent",e.target.checked)}/>
          <span>I'm happy for Blackwater Physiotherapy to contact me about my enquiry. We never share your details.</span>
        </label>
        <div className="form-submit">
          <button type="submit" className="btn btn-on-dark">Send message <Icon name="arrow" size={12}/></button>
          {status && <span className={"form-status " + (ok ? "ok" : "")}>{ok ? status.slice(3) : status}</span>}
        </div>
      </div>
    </form>
  );
}

function ContactMain(){
  return (
    <section className="sec contact-main" id="contact">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-tag"><span className="bar"></span><span className="t">Visit &amp; contact</span></div>
          <h2 className="sec-title">Find us in <span className="em">Maldon.</span></h2>
          <p className="sec-blurb">Ground-floor clinic at The Old Ironworks with free parking, a short walk from Maldon High Street.</p>
        </div>
        <InfoCards/>
        <div className="contact-cols">
          <div className="map-card">
            <iframe src={MAP_SRC} title="Map to Blackwater Physiotherapy, Maldon" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <EnquiryForm/>
        </div>
      </div>
    </section>
  );
}

function App(){
  useScrollMotion();
  return (
    <div>
      <Nav active="contact"/>
      <PageHero/>
      <ContactMain/>
      <Footer/>
      <BookTab/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
