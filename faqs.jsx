const { useState } = React;
const { Icon, Nav, Footer, BookTab, useScrollMotion, PAGES, BOOKING_URL } = window.BW;

const FAQ_GROUPS = [
  {
    title:"Getting started",
    items:[
      ["Do I need a GP referral to be seen?","No — you can book directly with us as a self-referral. If you're claiming through private health insurance, check whether your policy requires a GP referral first, as some do."],
      ["How do I book an appointment?","Book online in under two minutes using the booking button, or call us on 01621 000 000. We'll always confirm your appointment and answer any questions before your first visit."],
      ["How quickly can I be seen?","We usually have same-week appointments available, and often sooner. If you're in significant pain, let us know and we'll do our best to fit you in quickly."],
      ["Where are you based and is there parking?","We're at The Old Ironworks in Maldon, Essex, with free on-site parking and easy access — a short distance from Maldon High Street."],
    ],
  },
  {
    title:"Your appointment",
    items:[
      ["What happens at the first appointment?","Your Initial Assessment is a thorough one-to-one session. We'll discuss your symptoms, history and goals, carry out a physical and movement assessment, explain what's going on, and start treatment with a clear plan for what comes next."],
      ["What should I wear?","Comfortable clothing you can move in. We may need to see the area we're treating, so loose layers (or shorts/a vest top) are helpful."],
      ["How long are appointments?","Initial Assessments are around 45–60 minutes; follow-up and rehabilitation sessions are typically 30–45 minutes."],
      ["How many sessions will I need?","It varies by condition and goal. We'll give you an honest estimate at your assessment and review it as you progress — our aim is to make you independent, not dependent."],
    ],
  },
  {
    title:"Treatment & payment",
    items:[
      ["Do you accept private health insurance?","Yes — we work with Bupa, AXA, Aviva, WPA, HCML and Proclaim Group, among others. Please bring your policy and authorisation details, and check any referral requirements with your insurer."],
      ["Do you offer home visits?","Yes. Home visits bring assessment-led physiotherapy to your own home — ideal after surgery or when getting to the clinic is difficult. See our Home Visits service for details."],
      ["What conditions do you treat?","We treat a wide range of musculoskeletal problems — back and neck pain, sciatica, joint and sports injuries, post-operative rehab and persistent pain. If you're unsure, get in touch and we'll advise."],
      ["What if I need to cancel or reschedule?","No problem — just let us know as far in advance as you can so we can offer the slot to someone else. We'll explain our cancellation policy when you book."],
    ],
  },
];

function PageHero(){
  return (
    <section className="page-hero">
      <div className="page-hero-photo" style={{backgroundImage:"url('assets/faq-hero.webp')"}} role="img" aria-label="Physiotherapist explaining spine anatomy"></div>
      <div className="wrap page-hero-body">
        <nav className="crumb" aria-label="Breadcrumb">
          <a href={PAGES.home}>Home</a><span>/</span><span aria-current="page">FAQs</span>
        </nav>
        <div className="page-eyebrow"><span className="bar"></span>FAQs</div>
        <h1>Your questions, <span className="em">answered.</span></h1>
        <p className="page-hero-sub">Everything you need to know about booking, your first appointment, treatment and payment. Can't find your answer? Just get in touch.</p>
        <div className="page-hero-actions">
          <a className="btn btn-primary btn-primary-xl" href={BOOKING_URL} target="_blank" rel="noopener">Book an appointment <Icon name="arrow" size={14}/></a>
          <a className="btn btn-outline-light" href={PAGES.contact}>Contact us</a>
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

function Faqs(){
  return (
    <section className="sec" style={{paddingTop:72}}>
      <div className="wrap faq-layout">
        <div className="faq-groups">
          {FAQ_GROUPS.map((g, gi) => (
            <div className="faq-group" key={g.title}>
              <div className="faq-group-head">
                <span className="fg-n">{String(gi+1).padStart(2,"0")}</span>
                <h2>{g.title}</h2>
              </div>
              <div className="faqs">
                {g.items.map(([q,a],i) => <FaqItem key={q} q={q} a={a} open={gi===0 && i===0}/>)}
              </div>
            </div>
          ))}
        </div>
        <aside className="faq-side">
          <div className="side-card">
            <div className="side-eyebrow">Still have a question?</div>
            <h3>We're happy to help</h3>
            <p>If your question isn't answered here, get in touch and we'll talk it through — no obligation.</p>
            <a className="btn btn-primary btn-block" href={BOOKING_URL} target="_blank" rel="noopener">Book online <Icon name="arrow" size={13}/></a>
            <a className="btn btn-outline btn-block" href="tel:+441621000000">01621 000 000</a>
            <div className="side-meta">
              <div><Icon name="mail" size={15}/> hello@blackwaterphysiotherapy.co.uk</div>
              <div><Icon name="home" size={15}/> The Old Ironworks, Maldon</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function CTABand(){
  return (
    <section className="sec" style={{paddingTop:0}}>
      <div className="wrap">
        <div className="final">
          <div className="final-photo" style={{backgroundImage:"url('assets/clinic/contact-hero.webp')"}}><div className="pin">Maldon · Essex</div></div>
          <div className="final-body">
            <h2>Ready when <span className="em">you are.</span></h2>
            <div className="final-side">
              <p>Book a thorough initial assessment online in under two minutes — or call and we'll happily answer any questions first.</p>
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
      <Nav active="faqs"/>
      <PageHero/>
      <Faqs/>
      <CTABand/>
      <Footer/>
      <BookTab/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
