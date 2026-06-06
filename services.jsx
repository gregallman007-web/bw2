const { useState, useEffect } = React;
const { Icon, Nav, Footer, Accred, BookTab, useScrollMotion, PAGES, BOOKING_URL, SERVICES } = window.BW;

/* Pair each service with a longer "what it's for" line + who it suits */
const SERVICE_DETAIL = {
  "initial-assessment": { for:"Best place to start", points:["Full history & movement assessment","Clear diagnosis and honest plan","45 minutes, one-to-one"] },
  "follow-up":          { for:"Continuing care", points:["Hands-on treatment","Plan reviewed & progressed","30 minute session"] },
  "rehabilitation":     { for:"Rebuild & prevent", points:["Progressive loading programme","Strength, mobility & control","Return-to-activity focus"] },
  "acupuncture":        { for:"Pain relief treatment", points:["Modern Dry Needling","Pain & muscle tension relief","Always after assessment"] },
  "sports-massage":     { for:"Recovery & performance", points:["Deep tissue & trigger point","Improved mobility","Pre / post event"] },
  "home-visits":        { for:"Care that comes to you", points:["Ideal post-surgery","Ideal for mobility and falls","Maldon & surrounding areas"] },
};

const STEPS = [
  { n:"01", t:"Assess", d:"A thorough one-to-one assessment to understand your pain, history and goals — and find the root cause." },
  { n:"02", t:"Plan", d:"A clear, personalised treatment plan you understand and trust, mapped to what matters to you." },
  { n:"03", t:"Treat", d:"Hands-on treatment, acupuncture and targeted rehab — adapted as you progress." },
  { n:"04", t:"Progress", d:"We track outcomes and build lasting strength so you stay well beyond the clinic." },
  { n:"05", t:"Refer", d:"If you need more, we refer back to your GP with a clinic letter and liaise with our network of orthopaedic, paediatric and sport & exercise medicine consultants." },
];

function PageHero(){
  return (
    <section className="page-hero">
      <div className="page-hero-photo" style={{backgroundImage:"url('assets/services/sports-massage.webp')"}} role="img" aria-label="Physiotherapist treating a patient at Blackwater Physiotherapy"></div>
      <div className="wrap page-hero-body">
        <nav className="crumb" aria-label="Breadcrumb">
          <a href={PAGES.home}>Home</a><span>/</span><span aria-current="page">Services</span>
        </nav>
        <div className="page-eyebrow"><span className="bar"></span>Our Services</div>
        <h1>Physiotherapy<br/><span className="em">that works.</span></h1>
        <p className="page-hero-sub">Assessment-led care, hands-on treatment and structured rehabilitation — six clear routes into recovery for Maldon, Chelmsford and the surrounding area.</p>
        <div className="page-hero-actions">
          <a className="btn btn-primary btn-primary-xl" href={BOOKING_URL} target="_blank" rel="noopener">Book an appointment <Icon name="arrow" size={14}/></a>
          <a className="btn btn-outline-light" href="#services-grid">Explore services</a>
        </div>
      </div>
    </section>
  );
}

function Intro(){
  return (
    <section className="sec intro-sec">
      <div className="wrap intro-grid">
        <div className="sec-tag"><span className="bar"></span><span className="t">How we help</span></div>
        <h2 className="sec-title">Care routes, not just <span className="em">appointments</span>.</h2>
        <p className="intro-lead">Every journey begins with a thorough <strong>Initial Assessment</strong>. From there we shape the right mix of hands-on treatment, rehabilitation and support around your goals — whether that's getting out of pain, returning to sport, or moving with confidence again.</p>
      </div>
    </section>
  );
}

function ServicesGrid(){
  return (
    <section className="sec" id="services-grid" style={{paddingTop:0}}>
      <div className="wrap">
        <div className="svc-media-grid">
          {SERVICES.map((s, i) => {
            const d = SERVICE_DETAIL[s.slug] || {};
            return (
              <article className="svc-mcard" id={"service-" + s.slug} key={s.slug}>
                <div className="ph">
                  <img src={s.img} alt={s.name} loading={i < 2 ? "eager" : "lazy"}/>
                  <span className="ph-tag"><Icon name={s.icon} size={15}/>{d.for}</span>
                </div>
                <div className="bd">
                  <h3>{s.name}</h3>
                  <p>{s.blurb}</p>
                  <ul className="ticks">
                    {(d.points||[]).map(p => <li key={p}><Icon name="check" size={13} stroke={3}/>{p}</li>)}
                  </ul>
                  <a className="mlink" href={"service-" + s.slug + ".html"}>Learn more <Icon name="arrow" size={13}/></a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Process(){
  return (
    <section className="sec process-sec">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-tag"><span className="bar"></span><span className="t">The process</span></div>
          <h2 className="sec-title">A clear path, <span className="em">start to finish.</span></h2>
          <p className="sec-blurb">No guesswork and no open-ended treatment — you'll always know where you are and what comes next. And if your recovery needs more than physiotherapy, we'll guide the next step.</p>
        </div>
        <div className="step-grid">
          {STEPS.map(s => (
            <div className="step" key={s.n}>
              <span className="step-n">{s.n}</span>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABand(){
  return (
    <section className="sec" style={{paddingTop:0}}>
      <div className="wrap">
        <div className="final">
          <div className="final-photo">
            <img src="assets/clinic/treatment-room.webp" alt="Blackwater Physiotherapy treatment room"/>
            <div className="pin">Maldon · Essex</div>
          </div>
          <div className="final-body">
            <h2>Not sure which is <span className="em">right for you?</span></h2>
            <div className="final-side">
              <p>Start with an Initial Assessment and we'll guide you to the right plan — or call and we'll happily talk it through first.</p>
              <div className="final-actions">
                <a className="btn btn-primary btn-primary-xl" href={BOOKING_URL} target="_blank" rel="noopener">Book online <Icon name="arrow" size={14}/></a>
                <a className="btn btn-outline-light" href="tel:+447790717056">07790 717056</a>
              </div>
              <div className="final-meta">
                <div className="row"><b>Mon–Fri</b> 7am–8pm</div>
                <div className="row"><b>Saturday</b> 8am–2pm</div>
                <div className="row"><b>Visit</b> Gracie Barra Studio, The Old Ironworks, Maldon CM9 4LE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function App(){
  useScrollMotion();
  return (
    <div>
      <Nav active="services"/>
      <PageHero/>
      <Accred/>
      <ServicesGrid/>
      <Process/>
      <CTABand/>
      <Footer/>
      <BookTab/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
