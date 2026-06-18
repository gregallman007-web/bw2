const { Icon, Nav, Footer, Accred, BookTab, useScrollMotion, PAGES, BOOKING_URL, CLINICIANS } = window.BW;

const PRINCIPLES = [
  ["target","Assessment-led","Everything starts with a thorough assessment — we diagnose the root cause before we treat, so your plan is built on understanding, not guesswork."],
  ["pulse","Root cause, not just pain","We look beyond the symptom to why it's happening — addressing the cause so improvements actually last."],
  ["wave","Hands-on & active","We combine manual therapy, acupuncture and sports massage with progressive rehabilitation — treatment and exercise working together."],
  ["check","Clear guidance","You'll always understand what's going on, what we're doing and why — with practical steps you can take between sessions."],
];

const COMPARISON = [
  { bw:"Personalised, evidence-based plans", trad:"One-size-fits-all exercise sheets" },
  { bw:"Root-cause diagnosis", trad:"Treating symptoms in isolation" },
  { bw:"Time to listen and explain", trad:"Rushed, in-and-out appointments" },
  { bw:"One clinician who knows your story", trad:"A different face each visit" },
  { bw:"Support across Maldon, Chelmsford & Essex", trad:"Generic, location-blind advice" },
  { bw:"Built for lasting results", trad:"Reliance on short-term fixes" },
];

function PageHero(){
  return (
    <section className="page-hero">
      <div className="page-hero-photo" style={{backgroundImage:"url('assets/about-hero-team.webp')"}} role="img" aria-label="The Blackwater Physiotherapy team at the Maldon clinic"></div>
      <div className="wrap page-hero-body">
        <nav className="crumb" aria-label="Breadcrumb">
          <a href={PAGES.home}>Home</a><span>/</span><span aria-current="page">About</span>
        </nav>
        <div className="page-eyebrow"><span className="bar"></span>About us</div>
        <h1>Trusted<br/><span className="em">physiotherapy.</span></h1>
        <p className="page-hero-sub">Clinician-owned, assessment-led physiotherapy rooted in Maldon — caring for Essex with the time, expertise and follow-through that real recovery needs.</p>
        <div className="page-hero-actions">
          <a className="btn btn-primary btn-primary-xl" href={BOOKING_URL} target="_blank" rel="noopener">Book an appointment <Icon name="arrow" size={14}/></a>
          <a className="btn btn-outline-light" href={PAGES.team}>Meet the team</a>
        </div>
      </div>
    </section>
  );
}

function WhoWeAre(){
  return (
    <section className="sec" id="who-we-are" style={{paddingTop:72}}>
      <div className="wrap about-intro">
        <div className="about-copy">
          <div className="sec-tag"><span className="bar"></span><span className="t">Who we are</span></div>
          <h2 className="sec-title">Care that treats the <span className="em">whole person.</span></h2>
          <p className="lead">Being injured or living with pain can be frustrating, overwhelming, and disheartening. Finding the right support can also feel confusing at a time when you need clarity and confidence most.</p>
          <p>At Blackwater Physiotherapy, we take a personalised, evidence-based approach to every patient, beginning with a thorough assessment to understand your condition, goals, lifestyle, and the demands of work, sport, and daily life.</p>
          <p>We focus on the root cause of symptoms rather than pain alone, using hands-on treatment, tailored rehabilitation, and clear guidance to support recovery across Essex, including Maldon, Chelmsford, and surrounding areas.</p>
        </div>
        <div className="about-figure">
          <div className="af-photo" style={{backgroundImage:"url('assets/services/sports-massage.webp')"}}></div>
        </div>
      </div>
    </section>
  );
}

function Approach(){
  return (
    <section className="sec approach-sec">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-tag"><span className="bar"></span><span className="t">Our approach</span></div>
          <h2 className="sec-title">Assessment-led, <span className="em">always.</span></h2>
          <p className="sec-blurb">Four principles guide every appointment — and they're the reason our patients get clear answers and lasting results.</p>
        </div>
        <div className="principle-grid">
          {PRINCIPLES.map(([icon,t,d],i) => (
            <div className="principle" key={t}>
              <div className="p-ic"><Icon name={icon} size={22}/></div>
              <span className="p-n">{String(i+1).padStart(2,"0")}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs(){
  return (
    <section className="sec" style={{paddingTop:0}}>
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-tag"><span className="bar"></span><span className="t">Why Blackwater</span></div>
          <h2 className="sec-title">A different kind of <span className="em">appointment.</span></h2>
          <p className="sec-blurb">How we work, versus the appointment-shaped approach most patients are used to.</p>
        </div>
        <div className="compare">
          <div className="ccol bw">
            <div><div className="sub">The Blackwater way</div><h4 style={{marginTop:8}}>Built around you.</h4></div>
            <ul>{COMPARISON.map(p => <li key={p.bw}><span className="ico"><Icon name="check" size={12} stroke={3}/></span>{p.bw}</li>)}</ul>
          </div>
          <div className="ccol trad">
            <div><div className="sub">The traditional approach</div><h4 style={{marginTop:8}}>Built around the clock.</h4></div>
            <ul>{COMPARISON.map(p => <li key={p.trad}><span className="ico">—</span>{p.trad}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamTeaser(){
  return (
    <section className="sec" style={{paddingTop:0}}>
      <div className="wrap">
        <div className="team-teaser">
          <div className="tt-photo" style={{backgroundImage:"url('assets/entrance-reception.webp')"}}></div>
          <div className="tt-body">
            <div className="tt-inner">
              <div className="tt-lead">
                <div className="sec-tag"><span className="bar"></span><span className="t">The team</span></div>
                <h2>Meet your <span className="em">clinicians.</span></h2>
                <p className="tt-intro">Three experienced physiotherapists, one consistent standard of care. The person who assesses you is the person who treats you — no locums, no rotating staff.</p>
                <a className="btn btn-primary" href={PAGES.team}>Meet the team <Icon name="arrow" size={13}/></a>
              </div>
              <ul className="tt-list">
                {CLINICIANS.map(c => (
                  <li key={c.slug}><b>{c.name}</b><span>{c.role}</span></li>
                ))}
              </ul>
            </div>
          </div>
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
          <div className="final-photo" style={{backgroundImage:"url('assets/maldon-locality.webp')"}}><div className="pin">Maldon · Essex</div></div>
          <div className="final-body">
            <h2>Recovery starts <span className="em">with a conversation.</span></h2>
            <div className="final-side">
              <p>Book a thorough initial assessment online in under two minutes, or call and we'll happily talk through how we can help.</p>
              <div className="final-actions">
                <a className="btn btn-primary btn-primary-xl" href={BOOKING_URL} target="_blank" rel="noopener">Book online <Icon name="arrow" size={14}/></a>
                <a className="btn btn-outline-light" href="tel:+447790717056">07790 717056</a>
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
      <Nav active="about"/>
      <PageHero/>
      <Accred/>
      <WhoWeAre/>
      <Approach/>
      <WhyUs/>
      <TeamTeaser/>
      <CTABand/>
      <Footer/>
      <BookTab/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
