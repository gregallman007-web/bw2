/* ===========================================================================
   Blackwater Physiotherapy — Shared shell (Icon, nav data, Nav, Footer)
   Loaded on every interior page before the page's own script.
   Exposes: window.BW = { Icon, Nav, Footer, PAGES, SERVICES, CONDITION_GROUPS,
            WHO_WE_HELP, CLINICIANS, REVIEWS, BOOKING_URL }
   =========================================================================== */
(function(){
  const { useState, useEffect } = React;

  const BOOKING_URL = "https://blackwater-physiotherapy.uk3.cliniko.com/bookings";

  // Real page URLs (prototype filenames). Home is the built homepage file.
  const PAGES = {
    home:       "Blackwater Physiotherapy.html",
    about:      "About.html",
    services:   "Services.html",
    conditions: "Conditions.html",
    who:        "Who We Help.html",
    team:       "Team.html",
    faqs:       "FAQs.html",
    blog:       "Blog.html",
    reviews:    "Reviews.html",
    contact:    "Contact.html",
  };

  const SERVICES = [
    { slug:"initial-assessment", name:"Initial Assessment", img:"assets/services/initial-assessment.webp",
      blurb:"The first appointment — a thorough assessment of your pain, history and goals, ending with a clear diagnosis and plan.", icon:"target" },
    { slug:"follow-up", name:"Follow Up", img:"assets/services/follow-up.webp",
      blurb:"Ongoing treatment sessions that review progress and adapt your plan as you recover.", icon:"refresh" },
    { slug:"rehabilitation", name:"Rehabilitation Session", img:"assets/services/rehabilitation.webp",
      blurb:"Focused, progressive exercise to rebuild strength, mobility and confidence — and keep symptoms from returning.", icon:"activity" },
    { slug:"acupuncture", name:"Acupuncture", img:"assets/services/acupuncture.webp",
      blurb:"Fine, sterile needling used within your physiotherapy plan to ease pain, relax tight muscles and support healing.", icon:"needle" },
    { slug:"sports-massage", name:"Sports Massage", img:"assets/services/sports-massage.webp",
      blurb:"Hands-on soft-tissue treatment to release tension, improve mobility and support recovery and performance.", icon:"wave" },
    { slug:"home-visits", name:"Home Visits", img:"assets/services/home-visits.webp",
      blurb:"Assessment-led physiotherapy in your own home — ideal after surgery or when getting to the clinic is difficult.", icon:"home" },
  ];

  const CONDITION_GROUPS = [
    { title:"Spine & nerve pain", items:["Back Pain","Neck Pain","Sciatica"] },
    { title:"Joint & movement", items:["Joint Pain","Mobility","Post-Op Rehab"] },
    { title:"Sport & activity", items:["Running Injuries","Sport Injuries","Muscle Pain"] },
    { title:"Longer-term", items:["Persistent Pain","Work-Related Pain"] },
  ];

  const WHO_WE_HELP = [
    { name:"General population", href:PAGES.who + "#general" },
    { name:"Older adults",       href:PAGES.who + "#older-adults" },
    { name:"Athletes",           href:PAGES.who + "#athletes" },
    { name:"Children",           href:PAGES.who + "#children" },
  ];

  const CLINICIANS = [
    { slug:"cam", name:"Cam", role:"Lead Physiotherapist · Co-Director", img:"assets/team.webp", pos:"25% center" },
    { slug:"stef", name:"Stef", role:"Lead Physiotherapist · Co-Director", img:"assets/team.webp", pos:"75% center" },
    { slug:"laurie", name:"Laurie Clarke", role:"Senior Physiotherapist", img:"assets/team-laurie.webp", pos:"center", placeholder:true },
  ];

  const REVIEWS = [
    { quote:"Clear explanation, a well-structured plan, and the confidence to return to normal activity.", name:"Helen R.", meta:"Running injury" },
    { quote:"The most thorough assessment I've had — within six weeks I was back lifting my kids without a thought.", name:"James P.", meta:"Lower back pain" },
    { quote:"Stef explained every step and why it mattered. Recovery felt like a partnership.", name:"Aiyana K.", meta:"Post-op rehab" },
    { quote:"Genuinely the best healthcare experience I've had in years. Calm, professional, supportive.", name:"David M.", meta:"Sciatica" },
    { quote:"My shoulder hadn't moved properly in eighteen months. Three weeks in and I was sleeping again.", name:"Priya S.", meta:"Frozen shoulder" },
  ];

  /* ---------- ICONS ---------- */
  const Icon = ({name, size=20, stroke=2}) => {
    const common = {width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:stroke, strokeLinecap:"round", strokeLinejoin:"round"};
    const paths = {
      arrow: <path d="M5 12h14M13 6l6 6-6 6"/>,
      phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.88.33 1.74.62 2.56a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.52-1.13a2 2 0 0 1 2.11-.45c.82.29 1.68.5 2.56.62A2 2 0 0 1 22 16.92z"/>,
      mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></>,
      check: <path d="m5 12 5 5L20 7"/>,
      activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>,
      spine: <><path d="M12 3v18"/><path d="M9 6h6M9 10h6M9 14h6M9 18h6"/></>,
      plus: <path d="M12 5v14M5 12h14"/>,
      pulse: <path d="M3 12h4l3-9 4 18 3-9h4"/>,
      home: <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2h-4v-7H10v7H6a2 2 0 0 1-2-2z"/>,
      target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></>,
      refresh: <><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v5h-5"/></>,
      needle: <path d="m4 20 6-6m4-4 6-6M9 11l4 4M5 15l4 4M11 9l4 4"/>,
      wave: <path d="M3 12c2 0 2-3 4-3s2 3 4 3 2-3 4-3 2 3 4 3M3 18c2 0 2-3 4-3s2 3 4 3 2-3 4-3 2 3 4 3"/>,
    };
    return <svg {...common}>{paths[name] || null}</svg>;
  };

  /* ---------- NAV ---------- */
  function navModel(activeKey){
    return [
      { key:"home",       href:PAGES.home,       label:"Home" },
      { key:"about",      href:PAGES.about,      label:"About" },
      { key:"services",   href:PAGES.services,   label:"Services",    dd:"services" },
      { key:"conditions", href:PAGES.conditions, label:"Conditions",  dd:"conditions" },
      { key:"who",        href:PAGES.who,        label:"Who we help", dd:"who" },
      { key:"team",       href:PAGES.team,       label:"Team" },
      { key:"faqs",       href:PAGES.faqs,       label:"FAQs" },
      { key:"blog",       href:PAGES.blog,       label:"Blog" },
      { key:"reviews",    href:PAGES.reviews,    label:"Reviews" },
      { key:"contact",    href:PAGES.contact,    label:"Contact" },
    ].map(n => ({...n, active: n.key === activeKey}));
  }

  function NavItem({item}){
    const dd = item.dd;
    return (
      <div className="nav-item">
        <a href={item.href} className={item.active ? "active" : ""}>
          {item.label}{dd && <span className="caret">▼</span>}
        </a>
        {dd === "services" && (
          <div className="nav-dd">
            {SERVICES.map(s => (
              <a key={s.slug} href={PAGES.services + "#service-" + s.slug}>{s.name}<span className="arr">→</span></a>
            ))}
          </div>
        )}
        {dd === "conditions" && (
          <div className="nav-dd">
            {CONDITION_GROUPS.map(g => (
              <a key={g.title} href={PAGES.conditions}>{g.title}<span className="arr">→</span></a>
            ))}
            <a href={PAGES.conditions} style={{borderTop:"1px solid var(--line)",marginTop:6,paddingTop:12,color:"var(--teal)",fontWeight:700}}>All conditions<span className="arr">→</span></a>
          </div>
        )}
        {dd === "who" && (
          <div className="nav-dd">
            {WHO_WE_HELP.map(w => (
              <a key={w.name} href={w.href}>{w.name}<span className="arr">→</span></a>
            ))}
          </div>
        )}
      </div>
    );
  }

  function Nav({active}){
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 40);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive:true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
    const model = navModel(active);
    return (
      <header className={"nav" + (scrolled ? " scrolled" : "")}>
        <div className="wrap nav-inner">
          <a href={PAGES.home} className="nav-brand" aria-label="Blackwater Physiotherapy">
            <span className="mark"><img src="assets/logo-bp-full.webp" alt="Blackwater Physiotherapy" width="45" height="52"/></span>
            <span className="name">
              <span className="top"><span className="bw">Blackwater</span> <span className="py">Physiotherapy</span></span>
              <span className="sub">Maldon <span className="bar">|</span> Essex</span>
            </span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            {model.map(n => <NavItem item={n} key={n.key}/>)}
          </nav>
          {window.MobileMenu && (
            <window.MobileMenu
              mainNav={model.map(n => ({...n, dd:n.dd}))}
              services={SERVICES}
              conditionGroups={CONDITION_GROUPS}
              whoWeHelp={WHO_WE_HELP}
              Icon={Icon}
            />
          )}
        </div>
      </header>
    );
  }

  /* ---------- FOOTER ---------- */
  function Footer(){
    return (
      <footer>
        <div className="wrap">
          <div className="fgrid">
            <div>
              <h5>Practice</h5>
              <ul>
                <li><a href={PAGES.about}>About</a></li>
                <li><a href={PAGES.team}>Team</a></li>
                <li><a href={PAGES.reviews}>Reviews</a></li>
                <li><a href={PAGES.faqs}>FAQs</a></li>
                <li><a href={PAGES.contact}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h5>Services</h5>
              <ul>
                {SERVICES.map(s => (
                  <li key={s.slug}><a href={PAGES.services + "#service-" + s.slug}>{s.name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5>Conditions</h5>
              <ul>
                {CONDITION_GROUPS.map(g => (
                  <li key={g.title}><a href={PAGES.conditions}>{g.title}</a></li>
                ))}
                <li><a href={PAGES.conditions}>All conditions →</a></li>
              </ul>
            </div>
            <div>
              <h5>Accreditation</h5>
              <div className="foot-accred">
                <div className="row"><img src="assets/accred/hcpc.webp" alt="HCPC registered"/></div>
                <div className="row"><img src="assets/accred/csp.webp" alt="Chartered Society of Physiotherapy"/></div>
                <div className="row"><img src="assets/accred/iaomm.webp" alt="IAOMM member"/></div>
              </div>
            </div>
          </div>

          <div className="fbrand foot-brand-bottom">
            <div className="mark"><img src="assets/logo-bp-full.webp" alt="Blackwater Physiotherapy"/></div>
            <div className="name">Blackwater<span>Physiotherapy</span></div>
          </div>

          <div className="fbottom">
            <span>© 2026 Blackwater Physiotherapy Ltd · Maldon, Essex</span>
            <span>HCPC reg. PH106842</span>
            <span><a href="#">Privacy</a> · <a href="#">Terms</a></span>
          </div>
        </div>
      </footer>
    );
  }

  /* ---------- ACCRED + INSURER STRIP ---------- */
  const ACCRED_LOGOS = [
    { name:"HCPC — Health & Care Professions Council", src:"assets/accred/hcpc.webp" },
    { name:"Chartered Society of Physiotherapy", src:"assets/accred/csp.webp" },
    { name:"International Association of Manual Medicine", src:"assets/accred/iaomm.webp" },
  ];
  const INSURERS = [
    { name:"Bupa", src:"assets/insurance/bupa.webp" },
    { name:"AXA", src:"assets/insurance/axa.webp" },
    { name:"Aviva", src:"assets/insurance/aviva.webp" },
    { name:"WPA", src:"assets/insurance/wpa.webp" },
    { name:"HCML", src:"assets/insurance/hcml.webp" },
    { name:"Proclaim Group", src:"assets/insurance/proclaim.webp" },
  ];
  function Accred(){
    return (
      <section className="accred">
        <div className="wrap accred-inner">
          <div className="accred-row">
            <div className="lbl">Registered &amp; accredited</div>
            <div className="logos">
              {ACCRED_LOGOS.map(a => <div className="accred-logo" key={a.name} title={a.name}><img src={a.src} alt={a.name}/></div>)}
            </div>
          </div>
          <div className="accred-row">
            <div className="lbl">Insurers we work with</div>
            <div className="logos">
              {INSURERS.map(i => <div className="accred-logo" key={i.name} title={i.name}><img src={i.src} alt={i.name}/></div>)}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- BOOK NOW FLOATING TAB ---------- */
  function BookTab(){
    return (
      <a className="nav-book-float" href={BOOKING_URL} target="_blank" rel="noopener" aria-label="Book now">
        <span className="lbl">Book Now</span>
        <Icon name="arrow" size={15}/>
      </a>
    );
  }

  /* ---------- SCROLL MOTION (shared) ---------- */
  function useScrollMotion(){
    useEffect(() => {
      document.querySelectorAll(".sec, .accred, .page-hero-body").forEach(el => el.classList.add("reveal"));
      document.querySelectorAll(".svc-mcard .ph, .band-photo").forEach(el => el.classList.add("image-mask"));
      document.querySelectorAll(".svc-media-grid, .accred-row .logos, .step-grid, .principle-grid, .cgrid, .tgrid").forEach(el => el.classList.add("stagger"));
      const els = [...document.querySelectorAll(".reveal, .image-mask, .stagger")];
      const vh = window.innerHeight || 800;
      // Above-the-fold elements reveal immediately (same tick → no flash); rest on scroll.
      els.forEach(el => { if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("in"); });
      let io;
      if ("IntersectionObserver" in window){
        io = new IntersectionObserver((entries, obs) => {
          entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add("in"); obs.unobserve(e.target); } });
        }, { threshold:0, rootMargin:"0px 0px -8% 0px" });
        els.forEach(el => { if (!el.classList.contains("in")) io.observe(el); });
      } else {
        els.forEach(el => el.classList.add("in"));
      }
      // Safety net: never leave content hidden if the observer misses.
      const t = setTimeout(() => els.forEach(el => el.classList.add("in")), 2000);
      return () => { clearTimeout(t); if (io) io.disconnect(); };
    }, []);
  }

  window.BW = { Icon, Nav, Footer, Accred, BookTab, useScrollMotion, PAGES, BOOKING_URL,
                SERVICES, CONDITION_GROUPS, WHO_WE_HELP, CLINICIANS, REVIEWS };
})();
