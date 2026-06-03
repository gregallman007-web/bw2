const { Icon, Nav, Footer, Accred, BookTab, useScrollMotion, PAGES, BOOKING_URL, SERVICES } = window.BW;

const svcName = (slug) => (SERVICES.find(s => s.slug === slug) || {}).name || slug;

const PERSONAS = [
  {
    id:"general", eyebrow:"General population", title:"Everyday aches, injuries & pain",
    img:"assets/hero.webp", pos:"center",
    lead:"Most of the people we see aren't elite athletes — they're parents, workers and busy people who just want to move without pain and get on with life.",
    body:"Whether it's a niggle that won't shift, a flare-up of an old injury, or pain that's crept in from desk work and daily life, we find the root cause and give you a clear, practical plan to fix it — not just mask it.",
    needs:["Back, neck & joint pain","Posture & desk-related aches","Recent strains & injuries","Staying active and pain-free"],
    services:["initial-assessment","follow-up","sports-massage"],
  },
  {
    id:"older-adults", eyebrow:"Older adults", title:"Strength, mobility & independence",
    img:"assets/who/older-adults.webp", pos:"center",
    lead:"Staying strong, steady and independent is one of the most powerful things you can do for your long-term health — and it's never too late to start.",
    body:"We help older adults rebuild strength and balance, recover well after surgery, and keep doing the things they love. Sessions are paced to you, and home visits mean care can come to you when getting out is harder.",
    needs:["Balance, strength & falls prevention","Post-operative recovery","Arthritis & joint pain","Staying mobile & independent"],
    services:["rehabilitation","home-visits","follow-up"],
  },
  {
    id:"athletes", eyebrow:"Athletes", title:"Back to sport, stronger",
    img:"assets/who/athletes.webp", pos:"center",
    lead:"From weekend runners to competitive players, we get you back to training and performing — and build the resilience to stay there.",
    body:"With NHS and elite-sport experience, we assess the true cause of sporting injuries, manage your return-to-play sensibly, and use rehab and hands-on treatment to keep you performing at your best.",
    needs:["Running & overuse injuries","Sprains, strains & sport injuries","Return-to-sport rehabilitation","Performance & recovery"],
    services:["initial-assessment","sports-massage","rehabilitation"],
  },
  {
    id:"children", eyebrow:"Children & young people", title:"Growing, active & supported",
    img:"assets/who/children.webp", pos:"center",
    lead:"Active children and teenagers have their own unique needs — especially through growth spurts and busy sporting schedules.",
    body:"We provide friendly, age-appropriate assessment and treatment for growth-related and sporting complaints, helping young people stay active, confident and pain-free, with parents involved every step of the way.",
    needs:["Growth-related aches & pains","Youth sporting injuries","Posture & movement confidence","Reassurance for parents"],
    services:["initial-assessment","rehabilitation"],
  },
];

function PageHero(){
  return (
    <section className="page-hero">
      <div className="page-hero-photo" style={{backgroundImage:"url('assets/who/community-v2.webp')"}} role="img" aria-label="A diverse community of patients at Blackwater Physiotherapy"></div>
      <div className="wrap page-hero-body">
        <nav className="crumb" aria-label="Breadcrumb">
          <a href={PAGES.home}>Home</a><span>/</span><span aria-current="page">Who we help</span>
        </nav>
        <div className="page-eyebrow"><span className="bar"></span>Who we help</div>
        <h1>Care for <span className="em">every body.</span></h1>
        <p className="page-hero-sub">From everyday aches to elite sport, active over-60s to growing children — whoever you are, we meet you where you are and build the plan around you.</p>
        <div className="page-hero-actions">
          <a className="btn btn-primary btn-primary-xl" href={BOOKING_URL} target="_blank" rel="noopener">Book an appointment <Icon name="arrow" size={14}/></a>
          <a className="btn btn-outline-light" href="#general">Explore</a>
        </div>
      </div>
    </section>
  );
}

function Persona({p, i}){
  const flip = i % 2 === 1;
  return (
    <section className={"persona" + (flip ? " flip" : "")} id={p.id}>
      <div className="wrap persona-grid">
        <div className="persona-media">
          <div className="pm-photo" style={{backgroundImage:`url('${p.img}')`, backgroundPosition:p.pos}}></div>
          <span className="pm-index"><b>{String(i+1).padStart(2,"0")}</b></span>
        </div>
        <div className="persona-body">
          <div className="sec-tag"><span className="bar"></span><span className="t">{p.eyebrow}</span></div>
          <h2>{p.title}</h2>
          <p className="p-lead">{p.lead}</p>
          <p className="p-body">{p.body}</p>
          <ul className="ticks big">
            {p.needs.map(n => <li key={n}><Icon name="check" size={15} stroke={3}/>{n}</li>)}
          </ul>
          <div className="p-services">
            <span className="ps-label">How we help</span>
            <div className="ps-chips">
              {p.services.map(slug => (
                <a className="ps-chip" href={"service-" + slug + ".html"} key={slug}>{svcName(slug)}<Icon name="arrow" size={12}/></a>
              ))}
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
          <div className="final-photo" style={{backgroundImage:"url('assets/clinic/treatment-room.webp')"}}><div className="pin">Maldon · Essex</div></div>
          <div className="final-body">
            <h2>Not sure where <span className="em">you fit?</span></h2>
            <div className="final-side">
              <p>It doesn't matter how you'd label yourself — book an Initial Assessment and we'll build the right plan around you, or call and we'll point you in the right direction.</p>
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
      <Nav active="who"/>
      <PageHero/>
      <Accred/>
      <div className="personas">
        {PERSONAS.map((p,i) => <Persona p={p} i={i} key={p.id}/>)}
      </div>
      <CTABand/>
      <Footer/>
      <BookTab/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
