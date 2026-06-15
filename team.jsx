const { Icon, Nav, Footer, Accred, BookTab, useScrollMotion, PAGES, BOOKING_URL } = window.BW;

const TEAM = [
  {
    slug:"cam", name:"Cam Ward", role:"Clinic Owner & Lead Physiotherapist",
    img:"assets/team-cam.webp", pos:"center 18%",
    bio:[
      "Cam Ward is the founder and lead physiotherapist at Blackwater Physiotherapy, with a strong background in musculoskeletal care across both the NHS and private practice.",
      "After graduating with a BSc (Hons) in Physiotherapy from the University of Hertfordshire in 2017, Cam has continued to develop his expertise through advanced postgraduate training at the University of Essex. He currently works as a Musculoskeletal Team Lead within the NHS, giving him extensive experience in diagnosing and treating a wide range of injuries and conditions.",
      "Alongside his NHS role, Cam has worked in private practice and sport, including with Colchester United Football Club Academy teams, and as part of the England Men's 30s Touch Rugby World Cup medical team in 2024.",
      "Cam has a special interest in lower limb injuries, helping patients recover from issues such as knee pain, ankle injuries, and running-related problems — whether you're an athlete or simply looking to get back to everyday activities pain-free.",
      "He is registered with the Health and Care Professions Council (HCPC) and is a member of the Chartered Society of Physiotherapy (MCSP), ensuring high standards of care and evidence-based treatment."
    ],
    specialisms:["Knee, foot & ankle","Sports rehabilitation","Post-op rehabilitation"],
    creds:[["BSc (Hons)","Physiotherapy"],["HCPC","Registered"],["MCSP","Member"]],
  },
  {
    slug:"stef", name:"Stefano De Felice", role:"Clinic Owner & Lead Physiotherapist",
    img:"assets/team-stef.webp", pos:"center 14%",
    bio:[
      "Stef is co-founder and lead physiotherapist at Blackwater Physiotherapy, bringing a well-rounded mix of clinical and sporting experience to his role. He first completed a degree in Sports Therapy in 2020 before going on to qualify with a master's degree in Physiotherapy in 2022, developing a strong focus on musculoskeletal health.",
      "Alongside running the clinic, Stef works as a Specialist MSK Physiotherapist within a respected London sports medicine setting, where he regularly manages a wide variety of injuries and conditions. His experience spans the NHS, private practice, and performance sport, including work with Stevenage FC, Chelmsford City FC Academy, and athletes competing at an elite level — such as those representing England's U16 Ice Hockey team.",
      "Over time, Stef has developed a particular clinical interest in upper limb conditions, especially shoulder and elbow injuries, as well as hip-related pain and running injuries. He enjoys working with people of all ages and activity levels, tailoring rehabilitation to suit individual goals.",
      "Stef is committed to helping patients return to what matters most to them — whether that's everyday activities or high-level performance — using a combination of evidence-based practice and a personalised, patient-focused approach. He is registered with the Health and Care Professions Council (HCPC) and is a member of the Chartered Society of Physiotherapy (MCSP)."
    ],
    specialisms:["Shoulder, elbow & hip","Sports injury rehab","Running injuries"],
    creds:[["MSc","Physiotherapy"],["HCPC","Registered"],["MCSP","Member"]],
  },
  {
    slug:"laurie", name:"Laurie Clarke", role:"Senior Physiotherapist",
    img:"assets/team-laurie.webp", pos:"center 26%",
    bio:[
      "Laurie is an experienced physiotherapist specialising in post-surgical rehabilitation and complex conditions, with a strong background in both hospital and community care.",
      "After graduating with a BSc (Hons) in Physiotherapy from the University of Hertfordshire in 2017, Laurie has developed significantly within the NHS, currently working at Basildon University Hospital as the Team Lead for Surgical and Vascular services. Laurie supports patients in their recovery after major operations — helping them regain movement, strength, and confidence. He also leads therapy coordination for the vascular hub within Mid and South Essex NHS Foundation Trust and runs a specialist outpatient amputee clinic, supporting individuals as they learn to walk again and adapt to life after limb loss.",
      "In addition to hospital-based care, Laurie has several years of experience working in the community, treating patients in their own homes and helping them restore independence in everyday life.",
      "Laurie is passionate about guiding patients through every stage of recovery, providing clear, supportive rehabilitation tailored to each individual's goals — whether that's getting back on your feet after surgery or returning to day-to-day activities safely and confidently."
    ],
    specialisms:["Fall prevention","Mobility improvement","Balance development"],
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
        <p className="page-hero-sub">Three experienced physiotherapists, one consistent standard of care. The person who assesses you is the person who treats you — no locums, no rotating staff.</p>
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
