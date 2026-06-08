const { useState } = React;
const { Icon, Nav, Footer, Accred, BookTab, useScrollMotion, PAGES, BOOKING_URL, SERVICES } = window.BW;
const svcName = (slug) => (SERVICES.find(s => s.slug === slug) || {}).name || slug;

const COND = {
  "back-neck-pain": {
    name:"Back & Neck Pain", img:"assets/conditions/back-pain.webp", pos:"center", tag:"Back & neck",
    lead:"From sudden strain to long-standing stiffness, headaches or pain into the arm — back and neck pain responds well to the right approach.",
    overview:"Most back pain improves with the right approach, but that doesn't make it any less frustrating. Whether it came on suddenly or has built up over time, we assess how your spine, muscles, and movement are working together, identify what's driving the pain, and give you a clear plan to settle it and prevent it returning.\n\nNeck pain can develop for many reasons, from long days at work to sport, injury, or simply building up over time. Common symptoms include stiffness, headaches, and pain that travels into the arm.\n\nWhether your symptoms started suddenly or built up over time, we assess the neck, shoulder, and upper back as a whole. Treatment focuses on reducing pain, improving movement, and helping you return to normal activities without ongoing flare-ups.",
    symptoms:["Aching or sharp back pain","Neck stiffness or restricted turning","Headaches or pain into the arm","Muscle spasm or tightness"],
    seek:["Pain following a fall or injury","Pain with numbness, tingling or weakness","Pain that wakes you at night","Symptoms that aren't improving"],
    related:["initial-assessment","rehabilitation","sports-massage"],
    faqs:[["Should I rest or keep moving?","Gentle movement is almost always better than bed rest — we'll guide you on what's safe and helpful."],["Do I need a scan?","In many cases, back pain can be assessed without scans or imaging. If we feel a referral is appropriate, we'll let you know."]],
  },
  "shoulder-pain": {
    name:"Shoulder Pain", img:"assets/conditions/neck-shoulder-pain.webp", pos:"center", tag:"Shoulder",
    lead:"Stiffness, weakness or pain reaching and lifting can affect work, sport and sleep — but the shoulder responds well to the right plan.",
    overview:"Shoulder pain can develop for many reasons — from injury or overuse to gradual wear, or simply building up over time. It often shows up as difficulty reaching, lifting or sleeping on the affected side. Whether your symptoms started suddenly or crept in slowly, we assess the shoulder, neck and upper back as a whole, identify what's driving the pain, and focus treatment on reducing pain, restoring movement and rebuilding strength so you can return to normal activities without ongoing flare-ups.",
    symptoms:["Pain reaching, lifting or overhead","Stiffness or restricted movement","Weakness or difficulty sleeping on it","Aching around the shoulder or upper arm"],
    seek:["Pain after a fall or injury","Significant weakness or inability to lift the arm","Sudden loss of movement","Symptoms not settling with rest"],
    related:["initial-assessment","rehabilitation","sports-massage"],
    faqs:[["Will it get better on its own?","Some shoulder pain settles, but the right plan speeds recovery and reduces the chance of it returning."],["Can you help if it's been there a while?","Yes — even long-standing shoulder pain usually responds well to assessment-led treatment and strengthening."]],
  },
  "knee-hip-pain": {
    name:"Knee & Hip Pain", img:"assets/conditions/knee-pain.webp", pos:"center", tag:"Knee & hip",
    lead:"From wear-and-tear to sudden injury, knee and hip pain responds well to a thorough assessment and a proper plan.",
    overview:"Knee and hip pain can come from injury, overload or age-related change, and often affects walking, stairs, sport and sleep. Whether it came on suddenly or built up over time, we assess how the joint and surrounding muscles are working together, identify what's driving the pain, and build a clear, progressive plan that reduces pain, restores function and keeps you active — frequently avoiding the need for more invasive options.",
    symptoms:["Pain on stairs, squatting or walking","Swelling or stiffness","Clicking, catching or giving way","Pain after activity or at night"],
    seek:["A locked or unstable joint","Significant swelling after injury","Inability to bear weight","Pain that's steadily worsening"],
    related:["initial-assessment","rehabilitation","sports-massage"],
    faqs:[["Is it just wear and tear?","Even age-related change responds well to strengthening — pain and damage aren't the same thing."],["Should I avoid exercise?","Usually not — the right loading is often the best medicine. We'll tailor it to you."]],
  },
  "sports-injuries": {
    name:"Sports Injuries", img:"assets/conditions/back-pain-active.webp", pos:"center 30%", tag:"Sport & activity",
    lead:"Running injuries, muscle strains and overuse problems — diagnosed accurately and built back to full activity.",
    overview:"Sports injuries can range from a sudden muscle strain to a gradual, load-related problem that builds over time — including running injuries, tendon pain and recurrent niggles. Whether you're training hard or returning to activity, we assess both the injury and the demands you're placing on your body, settle the symptoms, and build a structured return-to-sport plan so you come back stronger and stay injury-free.",
    symptoms:["Pain that builds during or after activity","Localised tenderness or tightness","A sudden 'pull' or strain","Niggles that keep returning"],
    seek:["Pain that's worsening week on week","Sharp pain altering how you move","Swelling or inability to weight-bear","Recurrent injuries in the same spot"],
    related:["initial-assessment","rehabilitation","sports-massage"],
    faqs:[["Do I have to stop training?","Often not entirely — we'll usually modify rather than stop, where it's safe."],["Will you look at my training load?","Yes — managing load is central to fixing and preventing sports injuries."]],
  },
  "other-joint-pain": {
    name:"Other Joint Pain", img:"assets/conditions/running-injuries.webp", pos:"center 35%", tag:"Joint & movement",
    lead:"Ankle, foot, elbow, wrist and other joint pain — assessed thoroughly and rehabilitated properly.",
    overview:"Pain isn't limited to the big joints — ankles, feet, elbows and wrists can all be affected by injury, overuse or gradual change, and can have a real impact on daily life and activity. Whether it came on suddenly or built up over time, we assess how the joint and surrounding structures are working, identify what's driving the pain, and build a clear plan to reduce pain, restore movement and get you back to what matters.",
    symptoms:["Pain with specific movements or loading","Swelling, stiffness or tenderness","Reduced grip, balance or control","Pain after activity"],
    seek:["Inability to bear weight or use the joint","Significant swelling after injury","A locked or unstable joint","Pain that's steadily worsening"],
    related:["initial-assessment","rehabilitation","sports-massage"],
    faqs:[["Do you treat smaller joints too?","Yes — ankles, feet, elbows and wrists all respond well to assessment-led treatment and rehabilitation."],["Should I avoid using it?","Usually not entirely — we'll guide you on what's safe and helpful as it settles."]],
  },
  "post-op": {
    name:"Post-Op", img:"assets/services/rehabilitation.webp", pos:"center", tag:"Recovery",
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
            {c.overview.split("\n\n").filter(s => s.trim()).map((para, idx) => (
              <p className="detail-lead" key={idx} style={idx > 0 ? {marginTop:18} : null}>{para.trim()}</p>
            ))}
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
            <a className="btn btn-outline btn-block" href="tel:+447790717056">07790 717056</a>
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
