const { Icon, Nav, Footer, BookTab, useScrollMotion, PAGES, BOOKING_URL } = window.BW;

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/search/Blackwater+Physiotherapy+Maldon";

const REVIEWS = [
  { quote:"From the first phone call I felt heard. Cam took the time to understand my running history and built a plan that finally got me through to marathon day pain-free.", name:"Helen R.", meta:"Running injury · 8 sessions" },
  { quote:"After two years of back pain I'd almost given up. The assessment was the most thorough I've had, and within six weeks I was back lifting my kids without a thought.", name:"James P.", meta:"Lower back pain" },
  { quote:"Stef explained every step, every exercise, and why it mattered. Post-op recovery felt like a partnership rather than a chore.", name:"Aiyana K.", meta:"Post-op rehab" },
  { quote:"Genuinely the best healthcare experience I've had in years. Calm, professional, and they actually follow up between sessions.", name:"David M.", meta:"Sciatica" },
  { quote:"My shoulder hadn't moved properly in eighteen months. Three weeks in and I was sleeping through the night again.", name:"Priya S.", meta:"Frozen shoulder" },
  { quote:"Clear explanation, a well-structured plan and the confidence to get back to the gym. Couldn't recommend them more highly.", name:"Tom B.", meta:"Knee pain" },
  { quote:"Friendly, knowledgeable and never rushed. The home visits were a lifeline for my mum after her hip operation.", name:"Sarah W.", meta:"Home visits" },
  { quote:"I came in barely able to turn my head. A proper assessment, hands-on treatment and simple exercises sorted it within weeks.", name:"Mark D.", meta:"Neck pain" },
  { quote:"Professional from start to finish. They treat the cause, not just the symptom — and they take the time to make sure you understand why.", name:"Rebecca L.", meta:"Persistent pain" },
];

const STARS = "★★★★★";
const GoogleG = () => (
  <svg viewBox="0 0 48 48" width="22" height="22" aria-hidden="true">
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
    <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/>
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
  </svg>
);

function PageHero(){
  return (
    <section className="page-hero">
      <div className="page-hero-photo" style={{backgroundImage:"url('assets/who/community-v2.webp')"}} role="img" aria-label="Patients of Blackwater Physiotherapy"></div>
      <div className="wrap page-hero-body">
        <nav className="crumb" aria-label="Breadcrumb">
          <a href={PAGES.home}>Home</a><span>/</span><span aria-current="page">Reviews</span>
        </nav>
        <div className="page-eyebrow"><span className="bar"></span>Reviews</div>
        <h1>In their <span className="em">own words.</span></h1>
        <p className="page-hero-sub">Don't just take our word for it — here's what patients across Maldon and Essex say about their care at Blackwater Physiotherapy.</p>
      </div>
    </section>
  );
}

function RatingBar(){
  return (
    <section className="rating-bar">
      <div className="wrap rb-inner">
        <div className="rb-score">
          <div className="rb-num">4.9</div>
          <div className="rb-stars-wrap">
            <span className="rb-stars">{STARS}</span>
            <span className="rb-count">Based on 312 Google reviews</span>
          </div>
        </div>
        <div className="rb-divider"></div>
        <div className="rb-google">
          <GoogleG/>
          <span className="g-word"><span className="b">G</span><span className="o1">o</span><span className="y">o</span><span className="b">g</span><span className="g">l</span><span className="r">e</span></span>
          <span className="rb-verified"><Icon name="check" size={13} stroke={3}/> Verified reviews</span>
        </div>
        <a className="btn btn-primary rb-cta" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener">Read on Google <Icon name="arrow" size={13}/></a>
      </div>
    </section>
  );
}

function Reviews(){
  return (
    <section className="sec" style={{paddingTop:0}}>
      <div className="wrap">
        <div className="rv-grid">
          {REVIEWS.map((r,i) => (
            <figure className="rv-card" key={i}>
              <div className="rv-top"><span className="rv-stars">{STARS}</span><GoogleG/></div>
              <blockquote>"{r.quote}"</blockquote>
              <figcaption>
                <span className="rv-avatar">{r.name.charAt(0)}</span>
                <span className="rv-who"><span className="rv-name">{r.name}</span><span className="rv-meta">{r.meta}</span></span>
              </figcaption>
            </figure>
          ))}
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
          <div className="final-photo" style={{backgroundImage:"url('assets/services/initial-assessment.webp')"}}><div className="pin">Maldon · Essex</div></div>
          <div className="final-body">
            <h2>Become our next <span className="em">success story.</span></h2>
            <div className="final-side">
              <p>Book a thorough initial assessment and find out why our patients rate us so highly.</p>
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
      <Nav active="reviews"/>
      <PageHero/>
      <RatingBar/>
      <Reviews/>
      <CTABand/>
      <Footer/>
      <BookTab/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
