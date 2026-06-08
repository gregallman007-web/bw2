const { useState, useEffect, useRef, useMemo } = React;
const BW_PAGES = window.BW && window.BW.PAGES || {};
const BW_BOOKING = window.BW && window.BW.BOOKING_URL || "#contact";
const BW_SocialIcon = window.BW && window.BW.SocialIcon;

/* ========================= DATA ========================= */
const ROTATING = ["stronger.", "faster.", "fully.", "for good.", "with confidence."];

const NAV = [
{ href: "#", label: "Home", active: true },
{ href: "#about", label: "About" },
{ href: "#services", label: "Services" },
{ href: "#conditions", label: "Conditions" },
{ href: "#team", label: "Team" },
{ href: "#reviews", label: "Reviews" },
{ href: "#contact", label: "Contact" }];


const SERVICES = [
{ slug: "initial-assessment", name: "Initial Assessment", desc: "The first appointment for understanding your pain, goals and the best route into treatment.", icon: "⌖" },
{ slug: "follow-up", name: "Follow Up", desc: "Ongoing treatment and rehabilitation sessions designed to build progress over time.", icon: "↻" },
{ slug: "rehabilitation", name: "Rehabilitation Session", desc: "Focused, longer, progressive exercise sessions that rebuild strength, mobility and confidence so you can return to the activities that matter — and stay there.", icon: "❂" },
{ slug: "acupuncture", name: "Acupuncture", desc: "A treatment option that can help reduce pain, relax tight muscles and support healing.", icon: "╳" },
{ slug: "sports-massage", name: "Sports Massage", desc: "Hands-on treatment to ease muscle tension, improve mobility and support recovery.", icon: "≋" },
{ slug: "home-visits", name: "Home Visits", desc: "Physiotherapy delivered in your own environment to improve movement, confidence and independence.", icon: "⌂" }];


const QUAD_CONDITIONS = [
{ name: "Sports Injuries", icon: "🏃" },
{ name: "Neck & Back Pain", icon: "🔻" },
{ name: "Post-Op Rehab", icon: "✚" },
{ name: "Chronic Pain", icon: "◐" }];


const CONDITION_GROUPS = [
{ title: "Spine & nerve pain", items: ["Back Pain", "Neck Pain", "Sciatica"] },
{ title: "Joint & movement", items: ["Joint Pain", "Mobility", "Post-Op Rehab"] },
{ title: "Sport & activity", items: ["Running Injuries", "Sport Injuries", "Muscle Pain"] },
{ title: "Longer-term", items: ["Persistent Pain", "Work-Related Pain"] }];

const CONDITIONS = [
{ name: "Neck & Back Pain", slug: "neck-back-pain" },
{ name: "Shoulder Pain", slug: "shoulder-pain" },
{ name: "Hip & Knee Pain", slug: "hip-knee-pain" },
{ name: "Sports Injuries", slug: "sports-injuries" },
{ name: "Other Joint Pain", slug: "other-joint-pain" },
{ name: "Post-Op", slug: "post-op" }];


const CLINICIANS = [
{ slug: "cam", name: "Cam", role: "Lead Physiotherapist · Co-Director", img: "assets/team.webp", pos: "25% center", teaser: "Musculoskeletal physiotherapist with NHS and elite-sport experience. Special interest in complex spinal pain and running rehabilitation.", creds: [["MSc", "Advanced Physio"], ["HCPC", "Registered"], ["MCSP", "Member"]] },
{ slug: "stef", name: "Stef", role: "Lead Physiotherapist · Co-Director", img: "assets/team.webp", pos: "75% center", teaser: "MSK specialist with private, NHS and sporting experience. Calm, methodical approach focused on long-term outcomes.", creds: [["BSc", "Physiotherapy"], ["HCPC", "Registered"], ["MCSP", "Member"]] },
{ slug: "laurie", name: "Laurie Clarke", role: "Senior Physiotherapist", img: "assets/team-laurie.webp", pos: "center", placeholder: true, teaser: "Specialist in post-surgical rehabilitation and complex conditions. Team Lead for Surgical & Vascular services at Basildon University Hospital, with extensive NHS and community experience helping patients regain movement, strength and confidence.", creds: [["BSc", "Physiotherapy"], ["HCPC", "Registered"], ["MCSP", "Member"]] }];


const COMPARISON = [
{ bw: "Holistic, person-centred approach", trad: "Treating symptoms, not the person" },
{ bw: "Goal-focused, tailored treatment plans", trad: "One-size-fits-all exercise sheet" },
{ bw: "Time and space to feel heard", trad: "Rushed, in-and-out appointments" },
{ bw: "Support beyond the clinic", trad: "Support ends when the session does" },
{ bw: "Built for lasting, sustainable results", trad: "Reliance on short-term fixes" },
{ bw: "Structured tracking of progress", trad: "No clear plan or outcome" }];


const REVIEWS = [
{ quote: "From the first phone call I felt heard. Cam took the time to understand my running history and built a plan that finally got me through to marathon day pain-free.", name: "Helen R.", meta: "Running injury · 8 sessions" },
{ quote: "After two years of back pain I'd almost given up. The assessment was the most thorough I've had, and within six weeks I was back lifting my kids without a thought.", name: "James P.", meta: "Lower back pain · 6 sessions" },
{ quote: "Stef explained every step, every exercise, and why it mattered. Post-op recovery felt like a partnership rather than a chore.", name: "Aiyana K.", meta: "Post-op rehab · 12 sessions" },
{ quote: "Genuinely the best healthcare experience I've had in years. Calm, professional, and they actually follow up between sessions.", name: "David M.", meta: "Sciatica · 5 sessions" },
{ quote: "My shoulder hadn't moved properly in eighteen months. Three weeks in and I was sleeping through the night again.", name: "Priya S.", meta: "Frozen shoulder · 7 sessions" }];


/* ========================= ICONS ========================= */
const Icon = ({ name, size = 20, stroke = 2 }) => {
  const s = size;
  const sw = stroke;
  const common = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.88.33 1.74.62 2.56a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.52-1.13a2 2 0 0 1 2.11-.45c.82.29 1.68.5 2.56.62A2 2 0 0 1 22 16.92z" />,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></>,
    check: <path d="m5 12 5 5L20 7" />,
    star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" fill="currentColor" />,
    activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    spine: <><path d="M12 3v18" /><path d="M9 6h6M9 10h6M9 14h6M9 18h6" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    pulse: <path d="M3 12h4l3-9 4 18 3-9h4" />,
    home: <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2h-4v-7H10v7H6a2 2 0 0 1-2-2z" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" fill="currentColor" /></>,
    refresh: <><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 3v5h-5" /></>,
    needle: <path d="m4 20 6-6m4-4 6-6M9 11l4 4M5 15l4 4M11 9l4 4" />,
    wave: <path d="M3 12c2 0 2-3 4-3s2 3 4 3 2-3 4-3 2 3 4 3M3 18c2 0 2-3 4-3s2 3 4 3 2-3 4-3 2 3 4 3" />,
    cross: <><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
    arrowSm: <path d="M5 12h14M13 6l6 6-6 6" />,
    google: <><path d="M21.35 11.1H12v2.9h5.35c-.25 1.55-1.95 4.55-5.35 4.55-3.22 0-5.85-2.67-5.85-5.95s2.63-5.95 5.85-5.95c1.83 0 3.05.78 3.75 1.45l2.55-2.45C16.7 4.15 14.55 3.1 12 3.1c-4.97 0-9 4.03-9 9s4.03 9 9 9c5.2 0 8.65-3.65 8.65-8.8 0-.6-.07-1.05-.15-1.45z" fill="currentColor" stroke="none" /></>
  };
  return <svg {...common}>{paths[name] || null}</svg>;
};

/* ========================= ROTATOR ========================= */
function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROTATING.length), 2400);
    return () => clearInterval(t);
  }, []);
  const longest = ROTATING.reduce((a, b) => b.length > a.length ? b : a, "");
  return (
    <span className="rotator" aria-live="polite">
      <span className="rotator-track">
        <span aria-hidden="true" style={{ visibility: "hidden", whiteSpace: "nowrap", display: "inline-block" }}>{longest}</span>
        {ROTATING.map((w, idx) =>
        <span key={w} className="rotator-word" style={{
          position: "absolute", left: 0, top: 0,
          transform: `translateY(${(idx - i) * 110}%)`,
          opacity: idx === i ? 1 : 0
        }}>{w}</span>
        )}
      </span>
    </span>);

}

/* ========================= NAV ========================= */
const MAIN_NAV = [
{ href: BW_PAGES.home || "index.html", label: "Home", active: true },
{ href: BW_PAGES.about || "About.html", label: "About" },
{ href: BW_PAGES.services || "Services.html", label: "Services", dd: "services" },
{ href: BW_PAGES.conditions || "Conditions.html", label: "Conditions", dd: "conditions" },
{ href: BW_PAGES.who || "Who We Help.html", label: "Who we help", dd: "who" },
{ href: BW_PAGES.team || "Team.html", label: "Team" },
{ href: BW_PAGES.faqs || "FAQs.html", label: "FAQs" },
{ href: BW_PAGES.blog || "Blog.html", label: "Blog" },
{ href: BW_PAGES.reviews || "Reviews.html", label: "Reviews" },
{ href: BW_PAGES.contact || "Contact.html", label: "Contact" }];

const WHO_WE_HELP = [
{ name: "General population", href: (BW_PAGES.who || "Who We Help.html") + "#general" },
{ name: "Older adults", href: (BW_PAGES.who || "Who We Help.html") + "#older-adults" },
{ name: "Athletes", href: (BW_PAGES.who || "Who We Help.html") + "#athletes" },
{ name: "Children", href: (BW_PAGES.who || "Who We Help.html") + "#children" }];


function NavItem({ item }) {
  const dd = item.dd;
  return (
    <div className="nav-item">
      <a href={item.href} className={item.active ? "active" : ""}>
        {item.label}{dd && <span className="caret">▼</span>}
      </a>
      {dd === "services" &&
      <div className="nav-dd">
          {SERVICES.map((s) =>
        <a key={s.slug} href={"service-" + s.slug + ".html"}>{s.name}<span className="arr">→</span></a>
        )}
        </div>
      }
      {dd === "conditions" &&
      <div className="nav-dd">
          {CONDITIONS.map((c) =>
        <a key={c.slug} href={"condition-" + c.slug + ".html"}>{c.name}<span className="arr">→</span></a>
        )}
          <a href={BW_PAGES.conditions || "Conditions.html"} style={{ borderTop: "1px solid var(--line)", marginTop: 6, paddingTop: 12, color: "var(--teal)", fontWeight: 700 }}>All conditions<span className="arr">→</span></a>
        </div>
      }
      {dd === "who" &&
      <div className="nav-dd">
          {WHO_WE_HELP.map((w) =>
        <a key={w.name} href={w.href}>{w.name}<span className="arr">→</span></a>
        )}
        </div>
      }
    </div>);

}

function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="wrap nav-inner">
        <a href="#" className="nav-brand" aria-label="Blackwater Physiotherapy">
          <span className="mark"><img src="assets/logo-bp-full.webp" alt="Blackwater Physiotherapy" width="45" height="52" /></span>
          <span className="name">
            <span className="top"><span className="bw">Blackwater</span> <span className="py">Physiotherapy</span></span>
            <span className="sub">Maldon <span className="bar">|</span> Essex</span>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {MAIN_NAV.map((n) => <NavItem item={n} key={n.label} />)}
        </nav>
        {window.MobileMenu &&
        <window.MobileMenu
          mainNav={MAIN_NAV}
          services={SERVICES}
          conditionGroups={CONDITION_GROUPS}
          conditions={CONDITIONS}
          whoWeHelp={WHO_WE_HELP}
          Icon={Icon} />

        }
      </div>
    </header>);

}

/* ========================= HERO ========================= */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-photo" style={{ backgroundImage: "url('assets/hero.webp')" }} role="img" aria-label="Physiotherapy treatment in progress"></div>
      <div className="wrap hero-inner">
        <div className="hero-eyebrow">
          <span className="dot"></span>
          <span>Maldon, Essex · Est. 2024</span>
        </div>
        <h1>
          <span className="line">Move better.</span>
          <span className="line line2">Recover <span className="rot-em"><Rotator/></span></span>
        </h1>
        <p className="hero-sub">
          Maldon's clinician-owned physiotherapy practice — built around your recovery, performance and longevity.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary btn-primary-xl" href={BW_BOOKING} target="_blank" rel="noopener">Book Initial Assessment <Icon name="arrow" size={14} /></a>
          <a className="btn btn-outline-light" href="#approach">Our Approach</a>
        </div>
        <div className="hero-meta">
          <div className="hero-stat teal">
            <div className="k">4.9 ★</div>
            <div className="l">312 Google reviews</div>
          </div>
        </div>
      </div>
    </section>);

}

/* ========================= QUAD CARD ROW ========================= */
function QuadRow() {
  return (
    <section className="quad">
      <div className="wrap">
        <div className="quad-grid">
          {/* 1 — Conditions */}
          <div className="qcard">
            <div className="qnum">01 — Conditions</div>
            <div className="qhead"><h3>Conditions We Treat</h3></div>
            <div className="icon-grid">
              <div className="icon-box"><div className="ic"><Icon name="activity" size={18} /></div><div className="nm">Sports Injuries</div></div>
              <div className="icon-box"><div className="ic"><Icon name="spine" size={18} /></div><div className="nm">Neck & Back Pain</div></div>
              <div className="icon-box"><div className="ic"><Icon name="plus" size={18} /></div><div className="nm">Post-Op Rehab</div></div>
              <div className="icon-box"><div className="ic"><Icon name="pulse" size={18} /></div><div className="nm">Chronic Pain</div></div>
            </div>
            <a href={BW_PAGES.conditions || "Conditions.html"} className="more" style={{ marginTop: "auto", fontFamily: "var(--manrope)", fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 700, display: "inline-flex", gap: 8, alignItems: "center" }}>
              See all conditions <Icon name="arrow" size={12} />
            </a>
          </div>

          {/* 2 — Booking (dark anchor, centre) */}
          <div className="qcard dark">
            <div className="qnum">02 — Contact</div>
            <div className="qhead"><h3>Book &amp; Contact</h3></div>
            <p className="qsub">Same-week appointments usually available. Call, email, or book online in under two minutes.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a className="contact-row" href="tel:+447790717056">
                <div className="ic"><Icon name="phone" size={16} /></div>
                <div className="info">
                  <div className="l">Call us</div>
                  <div className="v">07790 717056</div>
                </div>
              </a>
              <a className="contact-row" href="mailto:info@blackwaterphysiotherapy.co.uk">
                <div className="ic"><Icon name="mail" size={16} /></div>
                <div className="info">
                  <div className="l">Email</div>
                  <div className="v">info@blackwaterphysiotherapy.co.uk</div>
                </div>
              </a>
            </div>
            <div className="contact-actions">
              <a className="btn btn-on-dark btn-block" href={BW_BOOKING} target="_blank" rel="noopener">Book Online Now <Icon name="arrow" size={12} /></a>
              <a className="btn btn-ghost-on-dark btn-block" href="#contact">Contact Us</a>
            </div>
          </div>

          {/* 3 — Services */}
          <div className="qcard">
            <div className="qnum">03 — Services</div>
            <div className="qhead"><h3>Services</h3></div>
            <p className="qsub">Two service paths sit at the centre of every patient journey.</p>
            <div className="svc-list">
              <div className="svc-item">
                <div className="nm">Initial Assessment</div>
                <div className="ds">Comprehensive evaluation and a personalised treatment plan you can trust.</div>
              </div>
              <hr className="svc-rule" />
              <div className="svc-item">
                <div className="nm">Follow-Up Sessions</div>
                <div className="ds">Ongoing care, progression and support across the full recovery journey.</div>
              </div>
            </div>
            <a href={BW_PAGES.services || "Services.html"} className="more" style={{ marginTop: "auto", fontFamily: "var(--manrope)", fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 700, display: "inline-flex", gap: 8, alignItems: "center" }}>
              All services <Icon name="arrow" size={12} />
            </a>
          </div>
        </div>
      </div>
    </section>);

}

/* ========================= ACCREDITATIONS + INSURANCE STRIP ========================= */
const ACCRED_LOGOS = [
{ name: "HCPC — Health & Care Professions Council", src: "assets/accred/hcpc.webp" },
{ name: "Chartered Society of Physiotherapy", src: "assets/accred/csp.webp" },
{ name: "International Association of Manual Medicine", src: "assets/accred/iaomm.webp" }];

const INSURERS = [
{ name: "Bupa", src: "assets/insurance/bupa.webp" },
{ name: "AXA", src: "assets/insurance/axa.webp" },
{ name: "Aviva", src: "assets/insurance/aviva.webp" },
{ name: "WPA", src: "assets/insurance/wpa.webp" },
{ name: "HCML", src: "assets/insurance/hcml.webp" },
{ name: "Proclaim Group", src: "assets/insurance/proclaim.webp" }];


function Accred() {
  return (
    <section className="accred" style={{ marginTop: 0 }}>
      <div className="wrap accred-inner">
        <div className="accred-row">
          <div className="lbl">Registered &amp; accredited</div>
          <div className="logos">
            {ACCRED_LOGOS.map((a) =>
            <div className="accred-logo" key={a.name} title={a.name}>
                <img src={a.src} alt={a.name} />
              </div>
            )}
          </div>
        </div>
        <div className="accred-row">
          <div className="lbl">Insurers we work with</div>
          <div className="logos">
            {INSURERS.map((i) =>
            <div className="accred-logo" key={i.name} title={i.name}>
                <img src={i.src} alt={i.name} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

/* ========================= SECTION HEAD ========================= */
function SecHead({ tag, title, blurb, children }) {
  return (
    <div className="sec-head">
      <div className="sec-tag"><span className="bar"></span><span className="t">{tag}</span></div>
      <h2 className="sec-title">{title}</h2>
      {children || <p className="sec-blurb">{blurb}</p>}
    </div>);

}

/* ========================= ABOUT ========================= */
function About() {
  return (
    <section className="sec" id="about" style={{ paddingBottom: 64 }}>
      <div className="wrap">
        <SecHead tag="01 — About" title={<>Trusted <span className="em">physiotherapy</span>.</>} blurb="Personalised, evidence-based care for Maldon, Chelmsford and the surrounding Essex villages." />
        <div className="about-grid">
          <div className="about-copy">
            <p className="lead">Being injured or living with pain can be frustrating, overwhelming, and disheartening. Finding the right support can also feel confusing at a time when you need clarity and confidence most.</p>
            <p>At Blackwater Physiotherapy, we take a personalised, evidence-based approach to every patient, beginning with a thorough assessment to understand your condition, goals, lifestyle, and the demands of work, sport, and daily life.</p>
            <p>We focus on the root cause of symptoms rather than pain alone, using hands-on treatment, tailored rehabilitation, and clear guidance to support recovery across Essex, including Maldon, Chelmsford, and surrounding areas.</p>
            <div className="about-quotes">
              <figure className="quote-card">
                <span className="qmark">“</span>
                <blockquote>Blackwater Physiotherapy has been brilliant. They listen to my concerns, bring a wealth of experience and care, and identified the underlying issue while making me feel completely at ease. The treatment has made a noticeable difference — I highly recommend them.</blockquote>
                <figcaption><span className="stars">★★★★★</span><span className="src">Google review</span></figcaption>
              </figure>
              <figure className="quote-card">
                <span className="qmark">“</span>
                <blockquote>Three visits and a really positive experience. They're friendly, set realistic expectations and explain everything clearly. I always leave with sensible, practical advice — and they don't book appointments for the sake of it. I've gained real confidence in managing my recovery.</blockquote>
                <figcaption><span className="stars">★★★★★</span><span className="src">Google review</span></figcaption>
              </figure>
            </div>
          </div>
          <div className="about-photo">
            <img src="assets/about-dropin.webp" alt="Cam and Stef at a community drop-in clinic in Maldon" />
          </div>
        </div>
      </div>
    </section>);

}

/* ========================= MARQUEE ========================= */
function Marquee() {
  const words = ["Confidence", "Movement", "Function", "Active Living", "Hobbies", "Quality of Life"];
  const all = [...words, ...words, ...words];
  return (
    <section className="band" aria-hidden="true">
      <div className="band-inner">
        {all.map((w, i) =>
        <React.Fragment key={i}>
            <span className={"band-word" + (i % 2 === 1 ? " alt" : "")}>{w}</span>
            <span className="band-dot"></span>
          </React.Fragment>
        )}
      </div>
    </section>);

}

/* ========================= APPROACH ========================= */
function Approach() {
  return (
    <section className="sec" id="approach">
      <div className="wrap">
        <SecHead tag="02 — Approach" title={<>What sets <span className="em">us</span> apart.</>} blurb="How we work versus the appointment-shaped approach most patients are used to." />
        <div className="compare">
          <div className="ccol bw">
            <div>
              <div className="sub">The Blackwater way</div>
              <h4 style={{ marginTop: 8 }}>Built around you.</h4>
            </div>
            <ul>
              {COMPARISON.map((p) =>
              <li key={p.bw}><span className="ico"><Icon name="check" size={12} stroke={3} /></span>{p.bw}</li>
              )}
            </ul>
          </div>
          <div className="ccol trad">
            <div>
              <div className="sub">The traditional approach</div>
              <h4 style={{ marginTop: 8 }}>Built around the clock.</h4>
            </div>
            <ul>
              {COMPARISON.map((p) =>
              <li key={p.trad}><span className="ico">—</span>{p.trad}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>);

}

/* ========================= SERVICES ========================= */
function ServicesFull() {
  return (
    <section className="sec" id="services" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SecHead tag="03 — Services" title={<>Our <span className="em">services</span>.</>} blurb="Six service paths, all rooted in the same thorough assessment-and-plan framework." />
        <div className="svc-grid">
          {SERVICES.map((s, i) => {
            const iconMap = {
              "initial-assessment": "target", "follow-up": "refresh", "rehabilitation": "activity",
              "acupuncture": "needle", "sports-massage": "wave", "home-visits": "home"
            };
            return (
              <a className="svc-card" href={(BW_PAGES.services || "Services.html") + "#service-" + s.slug} key={s.slug}>
                <div className="ico"><Icon name={iconMap[s.slug] || "target"} size={22} /></div>
                <div className="num">0{i + 1}</div>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
                <span className="more">Learn more <Icon name="arrow" size={12} /></span>
              </a>);

          })}
        </div>
      </div>
    </section>);

}

/* ========================= FINAL CTA ========================= */
function FinalCTA() {
  return (
    <section className="sec" id="final-cta" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="final">
          <div className="final-photo">
            <img src="assets/entrance-reception.webp" alt="Blackwater Physiotherapy reception, Old Iron Works Studios, Maldon" />
            <div className="pin">Maldon · Essex</div>
          </div>
          <div className="final-body">
            <h2>Ready to feel <span className="em">like yourself</span> again?</h2>
            <div className="final-side">
              <p>Book a thorough initial assessment online in under two minutes. Same-week appointments usually available — we'll always confirm by phone before your first visit.</p>
              <div className="final-actions">
                <a className="btn btn-primary btn-primary-xl" href={BW_BOOKING} target="_blank" rel="noopener">Book Online <Icon name="arrow" size={14} /></a>
                <a className="btn btn-outline-light" href="tel:+447790717056">07790 717056</a>
              </div>
              <div className="final-meta">
                <div className="row"><b>Mon–Fri</b> 7am–8pm</div>
                <div className="row"><b>Saturday</b> 8am–2pm</div>
                <div className="row"><b>Visit</b> The Old Ironworks, Maldon CM9 4LE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ========================= CONDITIONS ========================= */
function ConditionsFull() {
  return (
    <section className="sec" id="conditions" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SecHead tag="04 — Conditions" title={<>Conditions <span className="em">we treat</span>.</>} blurb="Grouped by area so you can recognise yours quickly without scrolling a wall of symptoms." />
        <div className="cgrid">
          {CONDITION_GROUPS.map((g, i) =>
          <div className="cgroup" key={g.title}>
              <div className="gh">
                <div className="gn">0{i + 1}</div>
                <h4>{g.title}</h4>
              </div>
              <div className="ctags">
                {g.items.map((item) =>
              <span className="ctag" key={item}><span className="dot"></span>{item}</span>
              )}
              </div>
            </div>
          )}
        </div>
        <div className="cond-footer">
          <span>Don't see your condition? It's almost certainly something we treat.</span>
          <a href={BW_PAGES.conditions || "Conditions.html"} className="btn btn-outline">View all conditions <Icon name="arrow" size={12} /></a>
        </div>
      </div>
    </section>);

}

/* ========================= TEAM (carousel, 2-up) ========================= */
function Team() {
  const [perView, setPerView] = useState(2);
  const [i, setI] = useState(0);
  const total = CLINICIANS.length;
  useEffect(() => {
    const calc = () => setPerView(window.innerWidth <= 1100 ? 1 : 2);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  const maxIndex = Math.max(0, total - perView);
  useEffect(() => {setI((v) => Math.min(v, maxIndex));}, [maxIndex]);
  const step = 100 / perView;
  const prev = () => setI((v) => Math.max(0, v - 1));
  const next = () => setI((v) => Math.min(maxIndex, v + 1));
  return (
    <section className="sec" id="team" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SecHead tag="05 — Team" title={<>Meet <span className="em">your</span> team.</>} blurb="No locums, no rotating staff. The person who assesses you is the person who treats you." />
        <div className="team-hero">
          <img src="assets/team.webp" alt="The Blackwater Physiotherapy team" />
          <div className="caption">
            <div className="l">Your team</div>
            <div className="t">Cam · Stef · Laurie</div>
          </div>
        </div>

        <div className="team-carousel">
          <div className="tc-viewport">
            <div className="tc-track" style={{ transform: `translateX(-${i * step}%)` }}>
              {CLINICIANS.map((c) =>
              <div className="tc-slide" key={c.slug} style={{ flex: `0 0 ${step}%` }}>
                  <article className="tcard">
                    <div className={"tphoto " + c.slug}>
                      <img src={c.img} alt={c.name} style={{ objectPosition: c.pos }} />
                      {c.placeholder && <span className="tphoto-tag">Placeholder image</span>}
                    </div>
                    <div className="tbody">
                      <div className="role">{c.role}</div>
                      <h3>{c.name}</h3>
                      <p>{c.teaser}</p>
                      <div className="tcreds">
                        {c.creds.map(([k, v]) => <span className="tcred" key={k}><b>{k}</b>{v}</span>)}
                      </div>
                    </div>
                  </article>
                </div>
              )}
            </div>
          </div>
          <div className="tc-nav">
            <div className="tc-dots">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) =>
              <button key={idx} className={"d" + (idx === i ? " on" : "")} onClick={() => setI(idx)} aria-label={`Page ${idx + 1}`} />
              )}
            </div>
            <div className="tc-arrows">
              <button className="arr" onClick={prev} aria-label="Previous" disabled={i === 0}>←</button>
              <button className="arr" onClick={next} aria-label="Next" disabled={i === maxIndex}>→</button>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
          <a className="btn btn-outline" href={BW_PAGES.team || "Team.html"}>Meet the team <Icon name="arrow" size={13} /></a>
        </div>
      </div>
    </section>);

}

/* ========================= REVIEWS ========================= */
function Reviews() {
  const [idx, setIdx] = useState(0);
  const [anim, setAnim] = useState(true);
  const [paused, setPaused] = useState(false);
  const [perView, setPerView] = useState(3);
  const total = REVIEWS.length;
  useEffect(() => {
    const calc = () => setPerView(window.innerWidth <= 700 ? 1 : window.innerWidth <= 1100 ? 2 : 3);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  // Duplicate the list so we can slide forward continuously, then snap back.
  const slides = useMemo(() => [...REVIEWS, ...REVIEWS.slice(0, perView)], [perView]);

  const go = (n) => {setAnim(true);setIdx(n);};
  const prev = () => go(idx <= 0 ? total - 1 : idx - 1);
  const next = () => setIdx((i) => i + 1);

  // When we slide one full set past the end, snap back to 0 with no transition.
  useEffect(() => {
    if (idx === total) {
      const t = setTimeout(() => {setAnim(false);setIdx(0);}, 650);
      return () => clearTimeout(t);
    }
    if (!anim) {
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
      return () => cancelAnimationFrame(r);
    }
  }, [idx, anim, total]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIdx((i) => i + 1), 4000);
    return () => clearInterval(t);
  }, [paused]);

  const activeDot = idx % total;

  const GoogleG = () =>
  <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>;


  return (
    <section className="sec" id="reviews" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="rev-head">
          <div className="sec-tag"><span className="bar"></span><span className="t">06 — Reviews</span></div>
          <h2 className="sec-title">In their own words.</h2>
          <div className="rev-rating">
            <div className="g-badge">
              <GoogleG />
              <span className="g-word"><span className="b">G</span><span className="o1">o</span><span className="y">o</span><span className="b">g</span><span className="g">l</span><span className="r">e</span></span>
            </div>
            <div className="rev-rating-score">
              <span className="num">4.9</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span className="stars">★★★★★</span>
                <span className="meta">Based on 312 reviews</span>
              </div>
            </div>
          </div>
        </div>
        <div className="rev-viewport" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="rev-track" style={{ transform: `translateX(-${idx * (100 / perView)}%)`, transition: anim ? "transform .6s cubic-bezier(.6,.02,.2,1)" : "none" }}>
            {slides.map((r, i) =>
            <div className="rev" key={i} style={{ flex: `0 0 calc(100%/${perView})` }}>
                <div className="rev-inner">
                  <div className="rev-top">
                    <span className="stars">★★★★★</span>
                    <GoogleG />
                  </div>
                  <p className="quote">"{r.quote}"</p>
                  <div className="who">
                    <span className="name">{r.name}</span>
                    <span>{r.meta}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="rev-nav">
          <div className="dots">
            {REVIEWS.map((_, i) =>
            <button key={i} className={"d" + (i === activeDot ? " on" : "")} onClick={() => go(i)} aria-label={`Review ${i + 1}`} />
            )}
          </div>
          <button className="arr" onClick={prev} aria-label="Previous">←</button>
          <button className="arr" onClick={next} aria-label="Next">→</button>
        </div>
      </div>
    </section>);

}

/* ========================= INSURANCE (legacy section — no longer rendered, kept for reference) ========================= */

/* ========================= CONTACT (MAP + FORM) ========================= */
function Contact() {
  const [form, setForm] = React.useState({ first: "", last: "", email: "", phone: "", topic: "Initial Assessment", message: "", consent: false });
  const [status, setStatus] = React.useState("");
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.first || !form.email || !form.message) {setStatus("Please fill in your name, email and message.");return;}
    if (!form.consent) {setStatus("Please tick the consent box.");return;}
    setStatus("ok:Thanks — we'll be in touch within one working day.");
    setForm({ first: "", last: "", email: "", phone: "", topic: "Initial Assessment", message: "", consent: false });
  };
  const ok = status.startsWith("ok:");
  const statusText = ok ? status.slice(3) : status;

  return (
    <section className="sec contact-section" id="contact" style={{ paddingTop: 120 }}>
      <div className="wrap">
        <SecHead tag="07 — Visit & Contact" title={<><span style={{ display: "block" }}>Find us.</span><span className="em" style={{ display: "block" }}>Get in touch.</span></>}><span></span></SecHead>
        <div className="contact-grid">
          <div className="contact-side">
            <div className="map-wrap">
              <span className="pin">Maldon · Essex</span>
              <iframe
                src="https://maps.google.com/maps?q=Maldon%2C%20Essex%2C%20UK&t=&z=14&ie=UTF8&iwloc=&output=embed"
                title="Map of Maldon, Essex"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="contact-info">
              <div className="info-card">
                <div className="ic"><Icon name="home" size={16} /></div>
                <div>
                  <div className="l" style={{ color: "rgba(255, 255, 255, 0.882)" }}>Clinic</div>
                  <div className="v">First Floor, Gracie Barra Studio,<br />The Old Ironworks, Maldon CM9 4LE</div>
                </div>
              </div>
              <div className="info-card">
                <div className="ic"><Icon name="refresh" size={16} /></div>
                <div>
                  <div className="l" style={{ color: "rgba(255, 255, 255, 0.882)" }}>Hours</div>
                  <div className="v">Mon–Fri 7am–8pm<br />Sat 8am–2pm</div>
                </div>
              </div>
              <div className="info-card">
                <div className="ic"><Icon name="phone" size={16} /></div>
                <div>
                  <div className="l" style={{ color: "rgba(255, 255, 255, 0.88)" }}>Phone</div>
                  <div className="v"><a href="tel:+447790717056">07790 717056</a><br/><a href="tel:+447468333745">07468 333745</a></div>
                </div>
              </div>
              <div className="info-card">
                <div className="ic"><Icon name="mail" size={16} /></div>
                <div>
                  <div className="l" style={{ color: "rgba(255, 255, 255, 0.88)" }}>Email</div>
                  <div className="v"><a href="mailto:info@blackwaterphysiotherapy.co.uk">info@blackwaterphysiotherapy.co.uk</a></div>
                </div>
              </div>
            </div>
          </div>

          <form className="form-card" onSubmit={submit} noValidate>
            <div className="head">
              <div className="lbl">Send a message</div>
              <h3>Tell us how we can help.</h3>
              <p>Short message, quick reply. We'll suggest a route in or book you straight in.</p>
            </div>
            <div className="form">
              <div className="form-row">
                <div className="field">
                  <label htmlFor="first">First name</label>
                  <input id="first" type="text" value={form.first} onChange={(e) => set("first", e.target.value)} placeholder="Jane" />
                </div>
                <div className="field">
                  <label htmlFor="last">Last name</label>
                  <input id="last" type="text" value={form.last} onChange={(e) => set("last", e.target.value)} placeholder="Smith" />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@example.co.uk" />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone (optional)</label>
                  <input id="phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="07000 000000" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="topic">What can we help with?</label>
                <select id="topic" value={form.topic} onChange={(e) => set("topic", e.target.value)}>
                  <option>Initial Assessment</option>
                  <option>Follow-Up Session</option>
                  <option>Acupuncture</option>
                  <option>Sports Massage</option>
                  <option>Home Visits</option>
                  <option>Insurance / billing enquiry</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="A short summary of what's going on, and when you're free…"></textarea>
              </div>
              <label className="form-consent">
                <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} />
                <span>I'm happy for Blackwater Physiotherapy to contact me about my enquiry. We never share your details.</span>
              </label>
              <div className="form-submit">
                <button type="submit" className="btn btn-on-dark">Send message <Icon name="arrow" size={12} /></button>
                {status && <span className={"form-status " + (ok ? "ok" : "")}>{statusText}</span>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>);

}

/* ========================= FOOTER ========================= */
function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <h5>Practice</h5>
            <ul>
              <li><a href={BW_PAGES.about || "About.html"}>About</a></li>
              <li><a href={(BW_PAGES.about || "About.html") + "#approach"}>Our approach</a></li>
              <li><a href={BW_PAGES.team || "Team.html"}>Team</a></li>
              <li><a href={BW_PAGES.reviews || "Reviews.html"}>Reviews</a></li>
              <li><a href={BW_PAGES.contact || "Contact.html"}>Contact</a></li>
            </ul>
          </div>
          <div>
            <h5>Services</h5>
            <ul>
              {SERVICES.map((s) =>
              <li key={s.slug}><a href={"service-" + s.slug + ".html"}>{s.name}</a></li>
              )}
            </ul>
          </div>
          <div>
            <h5>Conditions</h5>
            <ul>
              {CONDITIONS.map((c) =>
              <li key={c.slug}><a href={"condition-" + c.slug + ".html"}>{c.name}</a></li>
              )}
              <li><a href={BW_PAGES.conditions || "Conditions.html"}>All conditions →</a></li>
            </ul>
          </div>
          <div>
            <h5>Accreditation</h5>
            <div className="foot-accred">
              <div className="row"><img src="assets/accred/hcpc.webp" alt="HCPC registered" /></div>
              <div className="row"><img src="assets/accred/csp.webp" alt="Chartered Society of Physiotherapy" /></div>
              <div className="row"><img src="assets/accred/iaomm.webp" alt="IAOMM member" /></div>
            </div>
          </div>
        </div>

        <a className="fbrand foot-brand-bottom" href={BW_PAGES.home || "Blackwater Physiotherapy.html"} aria-label="Blackwater Physiotherapy — home">
          <div className="mark"><img src="assets/logo-bp-square.webp" alt="Blackwater Physiotherapy" /></div>
          <div className="name">Blackwater<span>Physiotherapy</span></div>
        </a>

        <div className="foot-social" aria-label="Social media">
          {[["instagram","https://www.instagram.com/blackwaterphysiotherapy"],["facebook","https://www.facebook.com/share/14ScM7tHX52/"]].map(([n,href]) => (
            <a className="soc" key={n} href={href} target="_blank" rel="noopener" aria-label={n}>{BW_SocialIcon && <BW_SocialIcon name={n}/>}</a>
          ))}
        </div>

        <div className="fbottom">
          <span>© 2026 Blackwater Physiotherapy · Maldon, Essex</span>
          <span><a href="Privacy.html">Privacy</a> · <a href="Terms.html">Terms</a></span>
        </div>
      </div>
    </footer>);

}

/* ========================= TWEAKS ========================= */
const TWEAK_DEFAULTS = {
  teal: "#2FAEAA",
  bg: "#F7FAFA",
  ink: "#16191B",
  pale: "#D8ECEB"
};

function App() {
  const { useTweaks, TweaksPanel, TweakSection, TweakColor } = window;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--teal", t.teal);
    r.style.setProperty("--bg", t.bg);
    r.style.setProperty("--ink", t.ink);
    r.style.setProperty("--teal-pale", t.pale);
  }, [t]);

  // Scroll-driven motion: reveal sections, mask-reveal images, stagger grids
  useEffect(() => {
    // Tag sections for fade-rise
    document.querySelectorAll(".sec, .quad, .accred").forEach((el) => el.classList.add("reveal"));
    // Tag image containers for mask reveal
    document.querySelectorAll(
      ".about-photo, .team-hero, .final-photo"
    ).forEach((el) => el.classList.add("image-mask"));
    // Tag grids for staggered child reveal
    document.querySelectorAll(
      ".quad-grid, .svc-grid, .cgrid, .accred-row .logos, .contact-info"
    ).forEach((el) => el.classList.add("stagger"));

    const els = [...document.querySelectorAll(".reveal, .image-mask, .stagger")];
    const vh = window.innerHeight || 800;
    els.forEach((el) => {if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("in");});
    let io;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => {if (e.isIntersecting) {e.target.classList.add("in");obs.unobserve(e.target);}});
      }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
      els.forEach((el) => {if (!el.classList.contains("in")) io.observe(el);});
    } else {
      els.forEach((el) => el.classList.add("in"));
    }
    const t = setTimeout(() => els.forEach((el) => el.classList.add("in")), 2000);
    return () => {clearTimeout(t);if (io) io.disconnect();};
  }, []);

  return (
    <div>
      <Nav />
      <Hero />
      <Accred />
      <About />
      <Approach />
      <ServicesFull />
      <ConditionsFull />
      <Team />
      <Reviews />
      <FinalCTA />
      <Contact />
      <Footer />

      <a className="nav-book-float" href={BW_BOOKING} target="_blank" rel="noopener" aria-label="Book now">
        <span className="lbl">Book Now</span>
        <Icon name="arrow" size={15} />
      </a>

      <TweaksPanel>
        <TweakSection label="Brand" />
        <TweakColor label="Teal" value={t.teal}
        options={["#2FAEAA", "#1f8a87", "#0e7572", "#3DBEB9", "#16191B"]}
        onChange={(v) => setTweak("teal", v)} />
        <TweakColor label="Page" value={t.bg}
        options={["#F7FAFA", "#FFFFFF", "#F2F6F6", "#EFF5F5"]}
        onChange={(v) => setTweak("bg", v)} />
        <TweakColor label="Pale teal" value={t.pale}
        options={["#D8ECEB", "#E4F2F1", "#C8E4E2", "#EDF5F5"]}
        onChange={(v) => setTweak("pale", v)} />
        <TweakColor label="Ink" value={t.ink}
        options={["#16191B", "#0B0F11", "#1F2426", "#102528"]}
        onChange={(v) => setTweak("ink", v)} />
      </TweaksPanel>
    </div>);

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);