const { Icon, Nav, Footer, Accred, BookTab, useScrollMotion, PAGES, BOOKING_URL } = window.BW;

const TEAM = [
  {
    slug:"cam", name:"Cam", role:"Lead Physiotherapist · Co-Director",
    img:"assets/team.webp", pos:"25% center",
    bio:[
      "Cam is a musculoskeletal physiotherapist with extensive experience across the NHS and elite sport. He co-founded Blackwater Physiotherapy to deliver the kind of thorough, unhurried care that genuinely changes outcomes.",
      "He has a special interest in complex spinal pain and running rehabilitation, and is known for building clear, goal-focused plans around each patient's work, sport and daily life."
    ],
    specialisms:["Complex spinal pain","Running rehabilitation","Sports injuries","Return to performance"],
    creds:[["MSc","Advanced Physiotherapy"],["HCPC","Registered"],["MCSP","Member"]],
  },
  {
    slug:"stef", name:"Stef", role:"Lead Physiotherapist · Co-Director",
    img:"assets/team.webp", pos:"75% center",
    bio:[
      "Stef is an MSK specialist with experience spanning private practice, the NHS and sport. As co-director, he's helped shape Blackwater's calm, evidence-based approach to treatment.",
      "Methodical and reassuring, he focuses on long-term outcomes and clear communication — making sure every patient understands their diagnosis and feels confident in their plan."
    ],
    specialisms:["Musculoskeletal pain","Persistent pain","Post-injury rehab","Movement & strength"],
    creds:[["BSc","Physiotherapy"],["HCPC","Registered"],["MCSP","Member"]],
  },
  {
    slug:"laurie", name:"Laurie Clarke", role:"Senior Physiotherapist",
    img:"assets/team-laurie.webp", pos:"center", placeholder:true,
    bio:[
      "Laurie is an experienced physiotherapist specialising in post-surgical rehabilitation and complex conditions, with a strong background in both hospital and community care. After graduating with a BSc (Hons) in Physiotherapy from the University of Hertfordshire in 2017, he has developed significantly within the NHS.",
      "He currently works at Basildon University Hospital as Team Lead for Surgical and Vascular services, supporting patients recovering from major operations to regain movement, strength and confidence. Laurie also leads therapy coordination for the vascular hub within Mid and South Essex NHS Foundation Trust and runs a specialist outpatient amputee clinic.",
      "Alongside hospital care, Laurie has several years of community experience, treating patients at home and helping them restore independence — guiding people through every stage of recovery with clear, supportive rehabilitation tailored to their goals."
    ],
    specialisms:["Post-surgical rehabilitation","Complex conditions","Amputee rehabilitation","Community & home care"],
    creds:[["BSc (Hons)","Physiotherapy"],["HCPC","Registered"],["MCSP","Member"]],
  },
];

function PageHero(){
  return (
    <section className="page-hero">
      <div className="page-hero-photo" style={{backgroundImage:"url('assets/team.webp')"}} role="img" aria-label="The Blackwater Physiotherapy team"></div>
      <div className="wrap page-hero-body">
        <nav className="crumb" aria-label="Breadcrumb">
          <a href={PAGES.home}>Home</a><span>/</span><span aria-current="page">Team</span>
        </nav>
        <div className="page-eyebrow"><span className="bar"></span>Our team</div>
        <h1>Meet your <span className="em">team.</span></h1>
        <p className="page-hero-sub">Three experienced physiotherapists, one consistent standard of care. The person who assesses you is the person who treats you — no locums, no rotating juniors.</p>
        <div className="page-hero-actions">
          <a className="btn btn-primary btn-primary-xl" href={BOOKING_URL} target="_blank" rel="noopener">Book an appointment <Icon name="arrow" size={14}/></a>
        </div>
      </div>
    </section>
  );
}

function Profile({c, i}){
  const flip = i % 2 === 1;
  return (
    <section className={"profile" + (flip ? " flip" : "")} id={c.slug}>
      <div className="wrap profile-grid">
        <div className="profile-media">
          <div className="pf-photo" style={{backgroundImage:`url('${c.img}')`, backgroundPosition:c.pos}}></div>
          {c.placeholder && <span className="pf-tag">Placeholder photo</span>}
          <div className="pf-creds">
            {c.creds.map(([k,v]) => <span className="pf-cred" key={k}><b>{k}</b>{v}</span>)}
          </div>
        </div>
        <div className="profile-body">
          <div className="role">{c.role}</div>
          <h2>{c.name}</h2>
          {c.bio.map((p,idx) => <p key={idx}>{p}</p>)}
          <div className="pf-spec">
            <span className="ps-label">Special interests</span>
            <div className="ps-chips">
              {c.specialisms.map(s => <span className="ps-chip" key={s}><span className="dot"></span>{s}</span>)}
            </div>
          </div>
          <div className="pf-cta">
            <a className="btn btn-primary" href={BOOKING_URL} target="_blank" rel="noopener">Book with {c.name.split(" ")[0]} <Icon name="arrow" size={13}/></a>
            <span className="note">Same-week appointments usually available.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTABand(){
  return (
    <section className="sec" style={{paddingTop:80}}>
      <div className="wrap">
        <div className="final">
          <div className="final-photo" style={{backgroundImage:"url('assets/clinic/treatment-room.webp')"}}><div className="pin">Maldon · Essex</div></div>
          <div className="final-body">
            <h2>Care from people <span className="em">who care.</span></h2>
            <div className="final-side">
              <p>Book a thorough initial assessment with one of our team — and stay with the same clinician throughout your recovery.</p>
              <div className="final-actions">
                <a className="btn btn-primary btn-primary-xl" href={BOOKING_URL} target="_blank" rel="noopener">Book online <Icon name="arrow" size={14}/></a>
                <a className="btn btn-outline-light" href="tel:+441621000000">01621 000 000</a>
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
      <Nav active="team"/>
      <PageHero/>
      <Accred/>
      <div className="profiles">
        {TEAM.map((c,i) => <Profile c={c} i={i} key={c.slug}/>)}
      </div>
      <CTABand/>
      <Footer/>
      <BookTab/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
