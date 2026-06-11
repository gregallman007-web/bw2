const { Icon, Nav, Footer, BookTab, useScrollMotion, PAGES, BOOKING_URL } = window.BW;

/* ── SINGLE POST TEMPLATE ──────────────────────────────────────────
   Reads window.POST_SLUG and renders the matching entry from
   window.BLOG_POSTS (blog-data.js). In production this becomes the
   Elementor Theme Builder → Single Post template; the .entry-content
   block is replaced by the native WordPress post body.
   ------------------------------------------------------------------- */
const SLUG = window.POST_SLUG;
const POST = (window.BLOG_POSTS && window.BLOG_POSTS[SLUG]) || {};
const SITE = "https://www.blackwaterphysiotherapy.co.uk";

function PageHero(){
  return (
    <section className="post-hero">
      <div className="wrap">
        <nav className="crumb" aria-label="Breadcrumb">
          <a href={PAGES.home}>Home</a><span>/</span><a href={PAGES.blog}>Blog</a><span>/</span><span aria-current="page">{POST.category}</span>
        </nav>
        <span className="ph-cat">{POST.category}</span>
        <h1>{POST.title}</h1>
        <div className="ph-meta">
          <span className="pm-author"><span className="pm-avatar">{(POST.author||"B").charAt(0)}</span>By {POST.author}</span>
          <span className="pm-dot">·</span><span>{POST.date}</span>
          <span className="pm-dot">·</span><span>{POST.read}</span>
        </div>
      </div>
      <div className="post-featured" style={{backgroundImage:`url('${POST.img}')`, backgroundPosition: POST.imgPos || "center"}} role="img" aria-label={POST.title}></div>
    </section>
  );
}

function ShareIcon({name}){
  const c = {width:18, height:18, viewBox:"0 0 24 24", fill:"currentColor"};
  const paths = {
    facebook: <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z"/>,
    x: <path d="M17.5 3h3l-7 8 8.2 10h-6.4l-4.3-5.6L5.4 21H2.4l7.5-8.6L2 3h6.5l3.9 5.2L17.5 3zm-1.1 16h1.7L7.7 4.8H5.9L16.4 19z"/>,
    linkedin: <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3 8.5h3.8V21H3V8.5zM9.5 8.5h3.6v1.7h.05c.5-.95 1.7-1.95 3.5-1.95 3.75 0 4.45 2.45 4.45 5.65V21h-3.8v-5.4c0-1.3 0-2.95-1.8-2.95s-2.1 1.4-2.1 2.85V21H9.5V8.5z"/>,
    whatsapp: <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.4A10 10 0 1 0 12 2zm5.5 14.1c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.7-1.2-4.4-3.9-4.5-4-.1-.2-1.1-1.4-1.1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.5c-.1.2-.3.3-.1.6.1.3.7 1.1 1.4 1.8.95.85 1.7 1.1 2 1.2.2.1.4.1.5-.1l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.5.3.1.2.1.7-.1 1.4z"/>,
  };
  return <svg {...c}>{paths[name]}</svg>;
}

function ShareBar(){
  const url = `${SITE}/blog/${SLUG}`;
  const title = POST.title || "";
  const links = [
    { name:"Facebook", icon:"facebook", href:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name:"X", icon:"x", href:`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    { name:"LinkedIn", icon:"linkedin", href:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { name:"WhatsApp", icon:"whatsapp", href:`https://wa.me/?text=${encodeURIComponent(title + " " + url)}` },
  ];
  return (
    <div className="share-bar">
      <span className="sb-label">Share</span>
      <div className="sb-btns">
        {links.map(l => (
          <a className="sb-btn" key={l.name} href={l.href} target="_blank" rel="noopener" aria-label={`Share on ${l.name}`}><ShareIcon name={l.icon}/></a>
        ))}
      </div>
    </div>
  );
}

function Article(){
  return (
    <section className="sec" style={{paddingTop:56}}>
      <div className="wrap post-layout">
        <article className="post-main">
          {/* .entry-content — replaced by the WordPress post body in production */}
          <div className="entry-content">
            <p className="lead">{POST.answer}</p>
            <div dangerouslySetInnerHTML={{__html: POST.bodyHtml || ""}}></div>
          </div>

          <div className="post-footer">
            <div className="post-tags">
              <span className="pt-label">Filed under</span>
              <a className="pt" href={PAGES.blog}>{POST.category}</a>
            </div>
            <ShareBar/>
          </div>
        </article>

        <aside className="post-side">
          <div className="side-card">
            <div className="side-eyebrow">In pain right now?</div>
            <h3>Book an assessment</h3>
            <p>Reading helps — but a tailored assessment is the fastest route to recovery.</p>
            <a className="btn btn-primary btn-block" href={BOOKING_URL} target="_blank" rel="noopener">Book online <Icon name="arrow" size={13}/></a>
            <a className="btn btn-outline btn-block" href="tel:+447790717056">07790 717056</a>
          </div>
          {POST.related && POST.related.length > 0 && (
            <div className="rel-card-box">
              <span className="rc-label">Related</span>
              {POST.related.map(r => <a className="rc-link" href={r.href} key={r.label}>{r.label}<Icon name="arrow" size={12}/></a>)}
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

function AuthorBox(){
  return (
    <section className="sec" style={{paddingTop:0}}>
      <div className="wrap">
        <div className="author-box">
          <div className="au-photo" style={{backgroundImage:"url('assets/team.webp')"}}></div>
          <div className="au-body">
            <span className="au-label">Written by</span>
            <h3>{POST.author}</h3>
            <div className="au-role">{POST.authorRole}</div>
            <p>{POST.authorBio}</p>
            <a className="au-link" href={PAGES.team}>Meet the team <Icon name="arrow" size={13}/></a>
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
            <h2>Don't just read — <span className="em">recover.</span></h2>
            <div className="final-side">
              <p>Book a thorough initial assessment and get a clear, personalised plan for your recovery.</p>
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

function RecentPosts(){
  const order = (window.BLOG_ORDER || []).filter(s => s !== SLUG).slice(0, 3);
  const recent = order.map(s => ({ slug:s, ...window.BLOG_POSTS[s] }));
  if (recent.length === 0) return null;
  return (
    <section className="sec recent-sec">
      <div className="wrap">
        <div className="recent-head">
          <h2>More from the <span className="em">blog</span></h2>
          <a className="btn btn-outline" href={PAGES.blog}>All articles <Icon name="arrow" size={13}/></a>
        </div>
        <div className="recent-grid">
          {recent.map((p) => (
            <a className="post-card" href={p.slug + ".html"} key={p.slug}>
              <div className="pc-photo" style={{backgroundImage:`url('${p.img}')`}}><span className="pc-cat">{p.category}</span></div>
              <div className="pc-body">
                <div className="pc-meta">{p.date} · {p.read}</div>
                <h3>{p.title}</h3>
                <span className="pc-link">Read article <Icon name="arrow" size={13}/></span>
              </div>
            </a>
          ))}
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
      <Article/>
      <AuthorBox/>
      <RecentPosts/>
      <CTABand/>
      <Footer/>
      <BookTab/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
