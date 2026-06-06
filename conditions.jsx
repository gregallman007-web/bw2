const { Icon, Nav, Footer, Accred, BookTab, useScrollMotion, PAGES, BOOKING_URL } = window.BW;

/* Featured conditions with detail pages */
const FEATURED = [
{ slug: "back-neck-pain", name: "Back & Neck Pain", img: "assets/conditions/back-pain.webp", pos: "center",
  blurb: "From sudden strain to long-standing stiffness, headaches or pain into the arm — we find the driver and get you moving freely again." },
{ slug: "shoulder-pain", name: "Shoulder Pain", img: "assets/conditions/neck-shoulder-pain.webp", pos: "center",
  blurb: "Stiffness, weakness or pain reaching and lifting — assessed and treated so the shoulder moves freely again." },
{ slug: "knee-hip-pain", name: "Knee & Hip Pain", img: "assets/conditions/knee-pain.webp", pos: "center",
  blurb: "Knee and hip pain — from wear-and-tear to sudden injury — managed and rehabilitated." },
{ slug: "sports-injuries", name: "Sports Injuries", img: "assets/conditions/back-pain-active.webp", pos: "center",
  blurb: "Running injuries, muscle strains and overuse problems — diagnosed and built back to full activity." },
{ slug: "other-joint-pain", name: "Other Joint Pain", img: "assets/conditions/running-injuries.webp", pos: "center 35%",
  blurb: "Ankle, foot, elbow, wrist and other joint pain — assessed thoroughly and rehabilitated properly." },
{ slug: "post-op", name: "Post-Op", img: "assets/services/rehabilitation.webp", pos: "center",
  blurb: "Structured recovery after surgery to restore strength, movement and confidence — safely." }];


const GROUPS = [
{ n: "01", title: "Spine & nerve pain", items: ["Back Pain", "Neck Pain", "Sciatica", "Postural pain"] },
{ n: "02", title: "Joint & movement", items: ["Knee Pain", "Hip Pain", "Shoulder Pain", "Mobility issues"] },
{ n: "03", title: "Sport & activity", items: ["Running Injuries", "Sport Injuries", "Muscle strains", "Tendon pain"] },
{ n: "04", title: "Longer-term & recovery", items: ["Persistent Pain", "Post-Operative Rehab", "Work-related aches", "Arthritis"] }];


function PageHero() {
  return (
    <section className="page-hero">
      <div className="page-hero-photo" style={{ backgroundImage: "url('assets/conditions/conditions-hero.webp')" }} role="img" aria-label="Conditions we treat at Blackwater Physiotherapy"></div>
      <div className="wrap page-hero-body">
        <nav className="crumb" aria-label="Breadcrumb">
          <a href={PAGES.home}>Home</a><span>/</span><span aria-current="page">Conditions</span>
        </nav>
        <div className="page-eyebrow"><span className="bar"></span>Conditions</div>
        <h1>Conditions <span className="em">we treat.</span></h1>
        <p className="page-hero-sub">Whether you're dealing with back pain, a sports injury, recovering from surgery, or persistent discomfort, we create a personalized plan to help you recover and stay active</p>
        <div className="page-hero-actions">
          <a className="btn btn-primary btn-primary-xl" href={BOOKING_URL} target="_blank" rel="noopener">Book an assessment <Icon name="arrow" size={14} /></a>
          <a className="btn btn-outline-light" href="#featured">Explore</a>
        </div>
      </div>
    </section>);

}

function Intro() {
  return (
    <section className="sec intro-sec">
      <div className="wrap intro-grid">
        <div className="sec-tag"><span className="bar"></span><span className="t">Where to start</span></div>
        <h2 className="sec-title">Not sure if we can <span className="em">help?</span></h2>
        <p className="intro-lead">If it affects how you move or how you feel day-to-day, it's worth a conversation. Most of what we see is <strong>pain, ache or injuries</strong> affecting muscles, joints, tendons and nerves. Below are the areas we treat most often; if yours isn't listed, it's almost certainly still something we can help with.</p>
      </div>
    </section>);

}

function Featured() {
  return (
    <section className="sec" id="featured" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-tag"><span className="bar"></span><span className="t">Commonly treated</span></div>
          <h2 className="sec-title">Find <span className="em">your</span> way in.</h2>
          <p className="sec-blurb">Recognise what's bothering you and jump straight to how we'd assess and treat it.</p>
        </div>
        <div className="cond-grid">
          {FEATURED.map((c) =>
          <a className="cond-card" href={"condition-" + c.slug + ".html"} key={c.slug}>
              <div className="cc-photo" style={{ backgroundImage: `url('${c.img}')`, backgroundPosition: c.pos }}></div>
              <div className="cc-body">
                <h3>{c.name}</h3>
                <p>{c.blurb}</p>
                <span className="cc-link">How we help <Icon name="arrow" size={13} /></span>
              </div>
            </a>
          )}
        </div>
      </div>
    </section>);

}

function Groups() {
  return (
    <section className="sec groups-sec">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-tag"><span className="bar"></span><span className="t">By area</span></div>
          <h2 className="sec-title">The full <span className="em">picture.</span></h2>
          <p className="sec-blurb">A broader view of what we assess and treat, grouped by area of the body and type of problem.</p>
        </div>
        <div className="grp-grid">
          {GROUPS.map((g) =>
          <div className="grp" key={g.n}>
              <div className="grp-head"><span className="grp-n">{g.n}</span><h3>{g.title}</h3></div>
              <ul>{g.items.map((i) => <li key={i}><span className="dot"></span>{i}</li>)}</ul>
            </div>
          )}
        </div>
        <div className="grp-foot">
          <span>Don't see your condition? It's almost certainly something we treat.</span>
          <a className="btn btn-primary" href={BOOKING_URL} target="_blank" rel="noopener">Book an assessment <Icon name="arrow" size={13} /></a>
        </div>
      </div>
    </section>);

}

function CTABand() {
  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="final">
          <div className="final-photo" style={{ backgroundImage: "url('assets/clinic/treatment-room.webp')" }}><div className="pin">Maldon · Essex</div></div>
          <div className="final-body">
            <h2>Let's find the <span className="em">root cause.</span></h2>
            <div className="final-side">
              <p>A thorough initial assessment is the fastest way to understand what's going on and what to do about it.</p>
              <div className="final-actions">
                <a className="btn btn-primary btn-primary-xl" href={BOOKING_URL} target="_blank" rel="noopener">Book online <Icon name="arrow" size={14} /></a>
                <a className="btn btn-outline-light" href="tel:+447790717056">07790 717056</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function App() {
  useScrollMotion();
  return (
    <div>
      <Nav active="conditions" />
      <PageHero />
      <Accred />
      <Intro />
      <Featured />
      <Groups />
      <CTABand />
      <Footer />
      <BookTab />
    </div>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);