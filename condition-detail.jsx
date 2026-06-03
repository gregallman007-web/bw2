const { useState } = React;
const { Icon, Nav, Footer, Accred, BookTab, useScrollMotion, PAGES, BOOKING_URL, SERVICES } = window.BW;
const svcName = (slug) => (SERVICES.find(s => s.slug === slug) || {}).name || slug;

const COND = {
  "back-pain": {
    name:"Back Pain", img:"assets/conditions/back-pain.webp", pos:"center", tag:"Spine & nerve pain",
    lead:"Lower-back pain is one of the most common reasons people see us — and one of the most treatable with the right assessment and plan.",
    overview:"Most back pain isn't serious, but it can be alarming and disruptive. Whether it came on suddenly or has built up over time, we assess how your spine, muscles and movement are working together, identify what's driving the pain, and give you a clear plan to settle it and prevent it returning.",
    symptoms:["Aching or sharp lower-back pain","Stiffness, especially in the morning","Pain that worsens with sitting or bending","Muscle spasm or tightness"],
    seek:["Pain following a fall or injury","Pain with numbness, tingling or leg weakness","Pain that wakes you at night","Symptoms that aren't improving"],
    related:["initial-assessment","rehabilitation","sports-massage"],
    faqs:[["Should I rest or keep moving?","Gentle movement is almost always better than bed rest — we'll guide you on what's safe and helpful."],["Do I need a scan?","Most back pain doesn't need imaging. We'll advise if a referral is appropriate."]],
  },
  "neck-shoulder-pain": {
    name:"Neck & Shoulder Pain", img:"assets/conditions/neck-shoulder-pain.webp", pos:"center", tag:"Spine & nerve pain",
    lead:"Desk work, stress and posture often show up as neck and shoulder tension — stiffness, headaches and referred pain into the arm.",
    overview:"Neck and shoulder pain frequently stems from how we sit, work and move. We assess the neck, shoulder and upper back together, ease the tension with hands-on treatment, and rebuild the strength and posture habits that keep it from coming back.",
    symptoms:["Neck stiffness or restricted turning","Aching across the shoulders","Tension headaches","Pain or tingling into the arm"],
    seek:["Pain after a whiplash-type injury","Persistent pins and needles or weakness","Severe or worsening headaches","Symptoms not settling with rest"],
    related:["initial-assessment","acupuncture","sports-massage"],
    faqs:[["Is my posture to blame?","Posture is part of it, but strength and movement variety matter more — we'll help with both."],["Can you help my headaches?","Many tension-type headaches are neck-related and respond well to treatment."]],
  },
  "sciatica": {
    name:"Sciatica & Nerve Pain", img:"assets/conditions/back-pain-active.webp", pos:"center", tag:"Spine & nerve pain",
    lead:"Pain, pins and needles or weakness travelling into the leg can be frightening — but sciatica usually responds very well to physiotherapy.",
    overview:"Sciatica describes symptoms from an irritated nerve, often felt down the leg. We assess where the nerve is being aggravated, calm the symptoms with targeted treatment and movement, and progress a plan to restore comfortable, confident movement.",
    symptoms:["Pain radiating into the buttock or leg","Pins and needles or numbness","Pain worse with sitting or bending","A feeling of leg weakness"],
    seek:["Significant or worsening leg weakness","Numbness around the saddle area","Loss of bladder or bowel control (urgent)","Symptoms after a significant injury"],
    related:["initial-assessment","rehabilitation","follow-up"],
    faqs:[["Will it go away on its own?","Many cases settle, but the right plan speeds recovery and reduces the chance of recurrence."],["Is exercise safe?","Specific, graded movement is usually a key part of recovery — we'll show you what helps."]],
  },
  "knee-pain": {
    name:"Knee & Joint Pain", img:"assets/conditions/knee-pain.webp", pos:"center", tag:"Joint & movement",
    lead:"Knee, hip and joint pain — from wear-and-tear to sudden injury — assessed thoroughly and rehabilitated properly.",
    overview:"Joint pain can come from injury, overload or age-related change. We assess how the joint and surrounding muscles are working, reduce your pain, and build a strengthening plan that restores function and keeps you active — often avoiding the need for more invasive options.",
    symptoms:["Pain on stairs, squatting or kneeling","Swelling or stiffness","Clicking, catching or giving way","Pain after activity"],
    seek:["A locked or unstable joint","Significant swelling after injury","Inability to bear weight","Pain that's steadily worsening"],
    related:["initial-assessment","rehabilitation","sports-massage"],
    faqs:[["Is it just wear and tear?","Even age-related change responds well to strengthening — pain and damage aren't the same thing."],["Should I avoid exercise?","Usually not — the right loading is often the best medicine. We'll tailor it to you."]],
  },
  "running-injuries": {
    name:"Running Injuries", img:"assets/conditions/running-injuries.webp", pos:"center 35%", tag:"Sport & activity",
    lead:"Shin pain, Achilles trouble, ITB and other overuse injuries — diagnosed accurately and built back to mileage.",
    overview:"Most running injuries are load-related — too much, too soon, or a weak link in the chain. We assess your injury and your training, settle the symptoms, and build a structured return-to-running plan so you come back stronger and stay injury-free.",
    symptoms:["Pain that builds during or after runs","Localised tenderness (shin, Achilles, knee)","Tightness or niggles that won't shift","Pain forcing you to cut runs short"],
    seek:["Pain that's worsening week on week","Sharp pain altering how you run","Swelling or inability to weight-bear","Recurrent injuries in the same spot"],
    related:["initial-assessment","rehabilitation","sports-massage"],
    faqs:[["Do I have to stop running?","Often not entirely — we'll usually modify rather than stop, where it's safe."],["Will you look at my training?","Yes — load management is central to fixing and preventing running injuries."]],
  },
  "post-op-rehab": {
    name:"Post-Operative Rehab", img:"assets/services/rehabilitation.webp", pos:"center", tag:"Recovery",
    lead:"Structured recovery after surgery to restore strength, movement and confidence — safely and at the right pace.",
    overview:"The right rehabilitation makes a real difference to surgical outcomes. Working alongside your surgical team's protocol, we guide you through each stage — protecting your recovery early, then progressively rebuilding strength, mobility and confidence to get you back to what matters.",
    symptoms:["Post-surgical stiffness and weakness","Reduced range of movement","Loss of confidence in the joint/limb","Uncertainty about what's safe to do"],
    seek:["Signs of infection (redness, heat, fever)","Sudden severe pain or swelling","Calf pain or swelling (urgent)","Anything outside your surgeon's guidance"],
    related:["initial-assessment","rehabilitation","home-visits"],
    faqs:[["When should rehab start?","Often sooner than people expect — guided by your surgeon's protocol. Get in touch and we'll advise."],["Can you do home visits?","Yes — particularly valuable in early post-op recovery. See our Home Visits service."]],
  },
};

const SLUG = window.CONDITION_SLUG;
const c = COND[SLUG];

function PageHero(){
  return (
    <section className="page-hero">
      <div className="page-hero-photo" style={{backgroundImage:`url('${c.img}')`, backgroundPosition:c.pos}} role="img" aria-label={c.name}></div>
      <div className="wrap page-hero-body">
        <nav className="crumb" aria-label="Breadcrumb">
          <a href={PAGES.home}>Home</a><span>/</span><a href={PAGES.conditions}>Conditions</a><span>/</span><span aria-current="page">{c.name}</span>
        </nav>
        <div className="page-eyebrow"><span className="bar"></span>{c.tag}</div>
        <h1>{c.name}</h1>
        <p className="page-hero-sub">{c.lead}</p>
        <div className="page-hero-actions">
          <a className="btn btn-primary btn-primary-xl" href={BOOKING_URL} target="_blank" rel="noopener">Book an assessment <Icon name="arrow" size={14}/></a>
          <a className="btn btn-outline-light" href={PAGES.conditions}>All conditions</a>
        </div>
      </div>
    </section>
  );
}

function Body(){
  const related = c.related.map(s => SERVICES.find(x => x.slug === s)).filter(Boolean);
  return (
    <section className="sec" style={{paddingTop:72}}>
      <div className="wrap detail-grid">
        <div className="detail-main">
          <div className="block">
            <div className="sec-tag"><span className="bar"></span><span className="t">Overview</span></div>
            <p className="detail-lead">{c.overview}</p>
          </div>
          <div className="block two-col">
            <div className="panel">
              <h3>Common symptoms</h3>
              <ul className="ticks">{c.symptoms.map(s => <li key={s}><Icon name="check" size={13} stroke={3}/>{s}</li>)}</ul>
            </div>
            <div className="panel warn">
              <h3>When to seek help</h3>
              <ul className="ticks">{c.seek.map(s => <li key={s}><Icon name="plus" size={13} stroke={3}/>{s}</li>)}</ul>
            </div>
          </div>
          <div className="block">
            <h2 className="block-h">How we help</h2>
            <div className="howto">
              <div className="ht"><span className="n">01</span><h4>Assess</h4><p>A thorough assessment to pinpoint the root cause — not just where it hurts.</p></div>
              <div className="ht"><span className="n">02</span><h4>Relieve</h4><p>Hands-on treatment and guidance to settle your symptoms and get you moving.</p></div>
              <div className="ht"><span className="n">03</span><h4>Rebuild</h4><p>A progressive plan to restore strength and movement so it lasts.</p></div>
              <div className="ht"><span className="n">04</span><h4>Prevent</h4><p>Practical strategies to keep the problem from coming back.</p></div>
            </div>
          </div>
          <div className="block">
            <h2 className="block-h">Common questions</h2>
            <div className="faqs">{c.faqs.map((f,i) => <FaqItem key={i} q={f[0]} a={f[1]} open={i===0}/>)}</div>
          </div>
        </div>
        <aside className="detail-side">
          <div className="side-card">
            <div className="side-eyebrow">Start here</div>
            <h3>Book an assessment</h3>
            <p>The fastest way to understand your {c.name.toLowerCase()} and what to do about it.</p>
            <a className="btn btn-primary btn-block" href={BOOKING_URL} target="_blank" rel="noopener">Book online <Icon name="arrow" size={13}/></a>
            <a className="btn btn-outline btn-block" href="tel:+441621000000">01621 000 000</a>
            <div className="side-rel">
              <span className="sr-label">How we treat it</span>
              {related.map(r => <a className="sr-link" href={"service-"+r.slug+".html"} key={r.slug}>{r.name}<Icon name="arrow" size={12}/></a>)}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function FaqItem({q,a,open}){
  const [isOpen,setOpen] = useState(open);
  return (
    <div className={"faq" + (isOpen ? " open" : "")}>
      <button className="faq-q" onClick={()=>setOpen(o=>!o)} aria-expanded={isOpen}><span>{q}</span><span className="faq-ic">{isOpen?"–":"+"}</span></button>
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
            <h2>Don't put up <span className="em">with the pain.</span></h2>
            <div className="final-side">
              <p>Book a thorough assessment and get a clear plan — same-week appointments usually available.</p>
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
      <Nav active="conditions"/>
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
