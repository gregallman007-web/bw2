const { useState } = React;
const { Icon, Nav, Footer, Accred, BookTab, useScrollMotion, PAGES, BOOKING_URL, SERVICES } = window.BW;

/* Full detail content, keyed by service slug. A detail page sets window.SERVICE_SLUG. */
const CONTENT = {
  "initial-assessment": {
    tag:"Where every journey starts",
    heroPos:"72% 22%",
    lead:"A thorough first appointment to understand your pain, your history and your goals — ending with a clear diagnosis and an honest plan.",
    overview:"Your Initial Assessment is the foundation of everything that follows. We take the time to listen, examine how you move, and identify the root cause of your symptoms — not just the pain itself. You'll leave understanding what's going on, what we can do about it, and exactly what the next steps are.",
    duration:"45 minutes", price:"One-to-one", cost:"£60", best:"New patients & new problems",
    expect:[
      ["Listen","A detailed conversation about your symptoms, history, work, sport and daily life."],
      ["Assess","A hands-on physical and movement assessment to pinpoint the root cause — and set clear, shared goals for your recovery."],
      ["Diagnose","A clear explanation of what's going on, in language that makes sense."],
      ["Plan","A personalised treatment plan and practical next steps you can start straight away."],
    ],
    forYou:["You've got a new injury, ache or pain","Pain has lingered and you want answers","You're not sure what's wrong or where to start","You want a plan tailored to your goals"],
    includes:["Full subjective & physical assessment","Working diagnosis","Initial hands-on treatment where appropriate","Tailored exercise & self-management advice","A clear plan for follow-up"],
    faqs:[
      ["Do I need a GP referral?","No — you can book directly. If you're using private insurance, check whether your policy needs a referral first."],
      ["What should I wear?","Comfortable clothing you can move in. We may ask to see the area we're treating, so loose layers help."],
      ["Will I get treatment on the first visit?","Usually yes — where it's appropriate we'll begin treatment and give you something practical to take away."],
      ["How many sessions will I need?","Our goal is to help you recover as efficiently as possible, not to keep you coming back unnecessarily. We'll recommend follow-up appointments only when they add value and support your progress."],
    ],
    related:["follow-up","rehabilitation","sports-massage"],
  },
  "follow-up": {
    tag:"Continuing your care",
    heroPos:"center 22%",
    lead:"Focused treatment sessions that build on your assessment, track progress and adapt the plan as you recover.",
    overview:"Follow-Up sessions are where recovery happens. Each visit reviews how you're progressing, delivers hands-on treatment, and moves your plan forward — so every appointment has a purpose and you always know what's next.",
    duration:"30 minutes", price:"One-to-one", cost:"£50", best:"Continuing an existing plan",
    expect:[
      ["Review","Check progress since your last visit and adjust based on how you've responded."],
      ["Treat","Hands-on treatment, acupuncture or soft-tissue work as needed."],
      ["Progress","Update your exercises and loading to keep moving forward."],
      ["Plan","Agree the next step and timeframe — no open-ended treatment."],
    ],
    forYou:["You've had an Initial Assessment with us","You're working through a treatment plan","You want hands-on treatment plus progression","You're building back towards a goal"],
    includes:["Progress review","Hands-on treatment","Updated rehabilitation programme","Clear next steps"],
    faqs:[
      ["How many sessions will I need?","Our goal is to help you recover as efficiently as possible, not to keep you coming back unnecessarily. We'll recommend follow-up appointments only when they add value and support your progress."],
    ],
    related:["initial-assessment","rehabilitation","acupuncture"],
  },
  "rehabilitation": {
    tag:"Rebuild & prevent",
    heroPos:"center 30%",
    lead:"Focused, longer, progressive sessions that rebuild strength, mobility and confidence — and keep symptoms from coming back.",
    overview:"Rehabilitation is how short-term relief becomes lasting results. We build a progressive programme around your goals — loading the right tissues, restoring movement and control — so you don't just feel better, you stay better and return to what matters.",
    duration:"30–60 minutes", price:"One-to-one", cost:"£40 / £60", best:"Returning to activity & prevention",
    expect:[
      ["Baseline","Measure strength, mobility and control to set a clear starting point."],
      ["Programme","A progressive, individualised exercise plan matched to your goal."],
      ["Coach","Hands-on coaching of technique, load and progression in each session."],
      ["Progress","Re-test and advance — building towards confident return to activity."],
    ],
    forYou:["You're recovering from injury or surgery","You keep getting the same niggle back","You want to return to sport or activity safely","You want to build strength & resilience"],
    includes:["Objective strength & movement testing","Individualised exercise programme","In-session coaching & progression","Return-to-activity guidance"],
    faqs:[
      ["Do I need to be sporty?","Not at all. Rehab is about restoring confident, pain-free movement — whether that's running a marathon or lifting the shopping."],
      ["Where do the sessions happen?","In our studio space at The Old Ironworks, with equipment to load and progress you safely."],
    ],
    related:["follow-up","initial-assessment","sports-massage"],
  },
  "acupuncture": {
    tag:"An add-on to your plan",
    heroPos:"center 20%",
    lead:"Western medical acupuncture used within your physiotherapy plan to ease pain, relax tight muscles and support recovery.",
    overview:"Acupuncture can be a valuable part of treatment for certain conditions — helping to reduce pain and muscle tension so you can move and progress more comfortably. We use it as one tool within a wider, assessment-led plan, never in isolation.",
    duration:"30 minutes", price:"One-to-one", cost:"£40", best:"Pain & muscle tension relief",
    expect:[
      ["Assess","We confirm acupuncture is suitable and right for your condition."],
      ["Treat","Fine, sterile, single-use needles placed to target pain and tension."],
      ["Settle","A short period to let the treatment take effect."],
      ["Integrate","Combined with hands-on treatment and exercise for best results."],
    ],
    forYou:["You have persistent muscle tension or pain","You've found manual therapy alone isn't enough","You're comfortable trying needling","It's been recommended as part of your plan"],
    includes:["Suitability check","Sterile, single-use needles","Combined with wider treatment","Aftercare advice"],
    faqs:[
      ["Does it hurt?","Most people feel very little — a small scratch at most. Needles are far finer than those used for injections."],
      ["Is it safe?","Yes, when performed by a trained physiotherapist using sterile, single-use needles, after assessment."],
    ],
    related:["follow-up","sports-massage","rehabilitation"],
  },
  "sports-massage": {
    tag:"Recovery & performance",
    heroPos:"72% 24%",
    lead:"Targeted soft-tissue therapy to reduce pain, release tightness, improve mobility, and support recovery and performance.",
    overview:"Sports massage isn't just for athletes. Targeted techniques help ease aches and pains, reduce muscle tension, improve movement, and support recovery — whether you're training hard, working at a desk, or simply feeling tight and stiff.",
    duration:"30–60 minutes", price:"One-to-one", cost:"£40 / £60", best:"Pain, tension, mobility & recovery",
    expect:[
      ["Discuss","A quick chat about problem areas, training and goals."],
      ["Treat","Targeted soft-tissue work."],
      ["Release","Improve tissue quality, mobility and comfort."],
      ["Advise","Stretches and self-care to maintain the benefit."],
    ],
    forYou:["You feel tight, stiff or overloaded","You train and want to aid recovery","You carry desk-related tension","You want to complement your treatment plan"],
    includes:["Targeted soft-tissue treatment","Mobility-focused techniques","Self-care & stretching advice","Pre / post-event options"],
    faqs:[
      ["Is it the same as a relaxing massage?","It's more targeted and therapeutic — focused on specific tissues and movement, though it can still feel great. But, we can adapt pressure to meet your needs."],
      ["Should I book this or an assessment?","If you have a specific injury or pain, start with an Initial Assessment. For general tension and recovery, sports massage is ideal."],
    ],
    related:["initial-assessment","acupuncture","rehabilitation"],
  },
  "home-visits": {
    tag:"Care that comes to you",
    heroPos:"center 28%",
    lead:"Assessment-led physiotherapy in your own home — ideal after surgery, or when getting to the clinic is difficult.",
    overview:"Home visits bring the full Blackwater Physiotherapy approach to your front door. Particularly valuable after surgery or for those with reduced mobility we assess, treat and build a rehabilitation plan in the comfort and familiarity of your own environment.",
    duration:"30 / 45 minutes", price:"In your home", cost:"£70 / £80", best:"Post-surgery & reduced mobility",
    expect:[
      ["Visit","We come to you, anywhere across Maldon and the surrounding area."],
      ["Assess","A full assessment adapted to your home environment."],
      ["Treat","Hands-on treatment and a practical, home-based exercise plan."],
      ["Support","Ongoing visits to progress your recovery and independence."],
    ],
    forYou:["You're recovering from an operation","Getting to the clinic is difficult","You'd benefit from rehab in your own space","You're supporting an older relative's recovery"],
    includes:["Home-based assessment & treatment","Practical exercises using what you have","Mobility & independence focus","Coordination with other care where needed"],
    faqs:[
      ["What areas do you cover?","Maldon and the surrounding areas. Get in touch with your postcode and we'll confirm."],
      ["Is there an extra charge?","Home visits are priced to reflect travel and time — we'll be transparent about cost when you book."],
    ],
    related:["initial-assessment","rehabilitation","follow-up"],
  },
};

const SLUG = window.SERVICE_SLUG;
const svc = SERVICES.find(s => s.slug === SLUG);
const c = CONTENT[SLUG];

function PageHero(){
  return (
    <section className="page-hero">
      <div className="page-hero-photo" style={{backgroundImage:`url('${svc.img}')`, backgroundPosition: c.heroPos || "center 28%"}} role="img" aria-label={svc.name}></div>
      <div className="wrap page-hero-body">
        <nav className="crumb" aria-label="Breadcrumb">
          <a href={PAGES.home}>Home</a><span>/</span><a href={PAGES.services}>Services</a><span>/</span><span aria-current="page">{svc.name}</span>
        </nav>
        <div className="page-eyebrow"><span className="bar"></span>{c.tag}</div>
        <h1>{svc.name}</h1>
        <p className="page-hero-sub">{c.lead}</p>
        <div className="page-hero-actions">
          <a className="btn btn-primary btn-primary-xl" href={BOOKING_URL} target="_blank" rel="noopener">Book {svc.name} <Icon name="arrow" size={14}/></a>
          <a className="btn btn-outline-light" href={PAGES.services}>All services</a>
        </div>
        <div className="hero-facts">
          <div className="fact"><span className="l">Duration</span><span className="v">{c.duration}</span></div>
          <div className="fact"><span className="l">Price</span><span className="v">{c.cost}</span></div>
          <div className="fact"><span className="l">Format</span><span className="v">{c.price}</span></div>
          <div className="fact"><span className="l">Best for</span><span className="v">{c.best}</span></div>
        </div>
      </div>
    </section>
  );
}

function Body(){
  const related = c.related.map(slug => SERVICES.find(s => s.slug === slug)).filter(Boolean);
  return (
    <section className="sec" style={{paddingTop:72}}>
      <div className="wrap detail-grid">
        <div className="detail-main">
          <div className="block">
            <div className="sec-tag"><span className="bar"></span><span className="t">Overview</span></div>
            <p className="detail-lead">{c.overview}</p>
          </div>

          <div className="block">
            <h2 className="block-h">What to expect</h2>
            <div className="expect-grid">
              {c.expect.map((e,i) => (
                <div className="expect" key={i}>
                  <span className="en">{String(i+1).padStart(2,"0")}</span>
                  <h4>{e[0]}</h4>
                  <p>{e[1]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="block two-col">
            <div className="fy-col">
              <h2 className="block-h">Is it right for you?</h2>
              <ul className="ticks big">
                {c.forYou.map(p => <li key={p}><Icon name="check" size={15} stroke={3}/>{p}</li>)}
              </ul>
              <div className="fy-note">
                <p>Not sure if this is the right fit? Book an Initial Assessment and we'll recommend the best route for you — no obligation.</p>
                <a className="fy-link" href={BOOKING_URL} target="_blank" rel="noopener">Book an assessment <Icon name="arrow" size={13}/></a>
              </div>
            </div>
            <div className="includes-card">
              <h3>What's included</h3>
              <div className="price-tag"><span className="pt-amount">{c.cost}</span><span className="pt-note">{c.price === "In your home" ? "30 / 45 min visit" : "per session"}</span></div>
              <ul className="ticks">
                {c.includes.map(p => <li key={p}><Icon name="check" size={13} stroke={3}/>{p}</li>)}
              </ul>
              <a className="btn btn-primary btn-block" href={BOOKING_URL} target="_blank" rel="noopener">Book now <Icon name="arrow" size={13}/></a>
            </div>
          </div>

          <div className="block">
            <h2 className="block-h">Common questions</h2>
            <div className="faqs">
              {c.faqs.map((f,i) => <FaqItem key={i} q={f[0]} a={f[1]} open={i===0}/>)}
            </div>
          </div>
        </div>

        <aside className="detail-side">
          <div className="side-card">
            <div className="side-eyebrow">Ready to start?</div>
            <h3>Book {svc.name}</h3>
            <p>Same-week appointments usually available. We'll confirm by phone before your visit.</p>
            <a className="btn btn-primary btn-block" href={BOOKING_URL} target="_blank" rel="noopener">Book online <Icon name="arrow" size={13}/></a>
            <a className="btn btn-outline btn-block" href="tel:+447790717056">07790 717056</a>
            <div className="side-meta">
              <div><Icon name="home" size={15}/> Gracie Barra Studio, The Old Ironworks, Maldon CM9 4LE</div>
              <div><Icon name="refresh" size={15}/> Mon–Fri 7am–8pm · Sat 8am–2pm</div>
            </div>
          </div>
        </aside>
      </div>

      <div className="wrap" style={{marginTop:64}}>
        <h2 className="block-h">Related services</h2>
        <div className="related-grid">
          {related.map(r => (
            <a className="rel-card" href={`service-${r.slug}.html`} key={r.slug} style={{backgroundImage:`url('${r.img}')`}}>
              <span className="rel-scrim"></span>
              <span className="rel-name">{r.name} <Icon name="arrow" size={14}/></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({q, a, open}){
  const [isOpen, setOpen] = useState(open);
  return (
    <div className={"faq" + (isOpen ? " open" : "")}>
      <button className="faq-q" onClick={() => setOpen(o => !o)} aria-expanded={isOpen}>
        <span>{q}</span><span className="faq-ic">{isOpen ? "–" : "+"}</span>
      </button>
      <div className="faq-a"><p>{a}</p></div>
    </div>
  );
}

function CTABand(){
  return (
    <section className="sec" style={{paddingTop:0}}>
      <div className="wrap">
        <div className="final">
          <div className="final-photo" style={{backgroundImage:"url('assets/clinic/treatment-room.webp')"}}><div className="pin">Maldon · Essex</div></div>
          <div className="final-body">
            <h2>Let's get you <span className="em">moving again.</span></h2>
            <div className="final-side">
              <p>Book online in under two minutes, or call and we'll happily talk through whether this is the right starting point for you.</p>
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
      <Nav active="services"/>
      <PageHero/>
      <Accred/>
      <Body/>
      <CTABand/>
      <Footer/>
      <BookTab/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
