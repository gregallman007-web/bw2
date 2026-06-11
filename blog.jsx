const { useState, useMemo } = React;
const { Icon, Nav, Footer, BookTab, useScrollMotion, PAGES, BOOKING_URL } = window.BW;

/* ── Posts data ───────────────────────────────────────────────
   Built from window.BLOG_POSTS / window.BLOG_ORDER (blog-data.js).
   In production this list is replaced by Elementor's Posts/Archive
   widget pulling native WordPress posts; the card markup below mirrors
   the design the Theme Builder archive template should use.
   ------------------------------------------------------------------- */
const stripHtml = (s) => (s || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const POSTS = (window.BLOG_ORDER || []).map(slug => {
  const p = window.BLOG_POSTS[slug];
  return {
    slug, cat:p.category, title:p.title, img:p.img,
    excerpt: p.answer || stripHtml(p.bodyHtml).slice(0, 150) + "…",
    date:p.date, read:p.read, author:p.author,
  };
});

const CATEGORIES = ["All", ...Array.from(new Set(POSTS.map(p => p.cat)))];
const PAGE_SIZE = 6; // archive shows up to 6 per page; pagination appears once exceeded

function PageHero(){
  return (
    <section className="page-hero">
      <div className="page-hero-photo" style={{backgroundImage:"url('assets/faq-hero.webp')"}} role="img" aria-label="Blackwater Physiotherapy blog"></div>
      <div className="wrap page-hero-body">
        <nav className="crumb" aria-label="Breadcrumb">
          <a href={PAGES.home}>Home</a><span>/</span><span aria-current="page">Blog</span>
        </nav>
        <div className="page-eyebrow"><span className="bar"></span>Blog &amp; advice</div>
        <h1>Expert advice, <span className="em">clearly explained.</span></h1>
        <p className="page-hero-sub">Practical, jargon-free guidance on pain, injury and recovery from the Blackwater Physiotherapy team.</p>
      </div>
    </section>
  );
}

function Blog(){
  const [cat, setCat] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => cat === "All" ? POSTS : POSTS.filter(p => p.cat === cat), [cat]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const shown = filtered.slice((safePage-1)*PAGE_SIZE, safePage*PAGE_SIZE);

  const pickCat = (c) => { setCat(c); setPage(1); };

  return (
    <section className="sec" style={{paddingTop:64}}>
      <div className="wrap">
        <div className="blog-filter">
          {CATEGORIES.map(c => (
            <button key={c} className={"chip" + (c === cat ? " on" : "")} onClick={() => pickCat(c)}>{c}</button>
          ))}
        </div>

        <div className="blog-grid">
          {shown.map((p,i) => (
            <a className="post-card" href={p.slug + ".html"} key={p.slug}>
              <div className="pc-photo" style={{backgroundImage:`url('${p.img}')`}}>
                <span className="pc-cat">{p.cat}</span>
              </div>
              <div className="pc-body">
                <div className="pc-meta">{p.date} · {p.read}</div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="pc-link">Read article <Icon name="arrow" size={13}/></span>
              </div>
            </a>
          ))}
        </div>

        <div className="pager">
          <button className="pg-arr" onClick={() => setPage(p => Math.max(1, p-1))} disabled={safePage === 1} aria-label="Previous page">←</button>
          <div className="pg-nums">
            {Array.from({length: pages}).map((_,i) => (
              <button key={i} className={"pg-n" + (i+1 === safePage ? " on" : "")} onClick={() => setPage(i+1)}>{i+1}</button>
            ))}
          </div>
          <button className="pg-arr" onClick={() => setPage(p => Math.min(pages, p+1))} disabled={safePage === pages} aria-label="Next page">→</button>
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
            <h2>Reading isn't the <span className="em">same as fixing.</span></h2>
            <div className="final-side">
              <p>Advice is a great start — but the fastest route to recovery is a thorough assessment tailored to you.</p>
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
      <Nav active="blog"/>
      <PageHero/>
      <Blog/>
      <CTABand/>
      <Footer/>
      <BookTab/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
