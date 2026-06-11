/* ============================================================================
   Blackwater Physiotherapy — SEO & structured data injector
   Loaded in <head> of every page, AFTER a small inline:
     <script>window.SEO = { title, description, path, image, type };</script>
   Injects: canonical, Open Graph + Twitter meta, and JSON-LD schema
   (MedicalClinic site-wide; WebPage + BreadcrumbList per page;
    BlogPosting for blog posts when window.POST_SLUG + window.BLOG_POSTS exist).
   In production (WordPress) this is replaced by the SEO plugin (Yoast/RankMath).
   ========================================================================== */
(function () {
  var S = window.SEO || {};
  var ORIGIN = "https://www.blackwaterphysiotherapy.co.uk";
  var path = S.path || (location.pathname.split("/").pop() || "index.html");
  var url = ORIGIN + "/" + encodeURI(path);
  var title = S.title || document.title;
  var desc = S.description ||
    (document.querySelector('meta[name="description"]') || {}).content || "";
  var image = ORIGIN + "/" + (S.image || "assets/about-hero-2.webp");
  var head = document.head;

  function meta(attr, key, val) {
    if (!val) return;
    var m = document.createElement("meta");
    m.setAttribute(attr, key);
    m.setAttribute("content", val);
    head.appendChild(m);
  }
  function link(rel, href) {
    var l = document.createElement("link");
    l.setAttribute("rel", rel);
    l.setAttribute("href", href);
    head.appendChild(l);
  }
  function jsonld(obj) {
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(obj);
    head.appendChild(s);
  }

  /* ---- Canonical + Open Graph + Twitter ---- */
  if (!document.querySelector('link[rel="canonical"]')) link("canonical", url);
  meta("property", "og:type", S.type === "article" ? "article" : "website");
  meta("property", "og:site_name", "Blackwater Physiotherapy");
  meta("property", "og:title", title);
  meta("property", "og:description", desc);
  meta("property", "og:url", url);
  meta("property", "og:image", image);
  meta("property", "og:locale", "en_GB");
  meta("name", "twitter:card", "summary_large_image");
  meta("name", "twitter:title", title);
  meta("name", "twitter:description", desc);
  meta("name", "twitter:image", image);
  meta("name", "robots", "index, follow");

  /* ---- Site-wide MedicalClinic / LocalBusiness ---- */
  var CLINIC = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "Physiotherapy", "LocalBusiness"],
    "@id": ORIGIN + "/#clinic",
    "name": "Blackwater Physiotherapy",
    "url": ORIGIN + "/",
    "logo": ORIGIN + "/assets/logo-bp-full.webp",
    "image": image,
    "description": "Clinician-owned, assessment-led physiotherapy in Maldon, Essex. Expert care, honest advice and treatment that puts your needs first.",
    "telephone": "+44 7790 717056",
    "email": "hello@blackwaterphysiotherapy.co.uk",
    "priceRange": "££",
    "currenciesAccepted": "GBP",
    "medicalSpecialty": "Physiotherapy",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "The Old Ironworks",
      "addressLocality": "Maldon",
      "addressRegion": "Essex",
      "postalCode": "CM9 4LE",
      "addressCountry": "GB"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 51.7314, "longitude": 0.6757 },
    "areaServed": ["Maldon", "Chelmsford", "Essex"],
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "20:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "14:00" }
    ],
    "sameAs": [
      "https://www.instagram.com/blackwaterphysiotherapy",
      "https://www.facebook.com/share/14ScM7tHX52/"
    ],
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "312" }
  };
  jsonld(CLINIC);

  /* ---- WebPage + BreadcrumbList ---- */
  var crumbItems = [{ "@type": "ListItem", "position": 1, "name": "Home", "item": ORIGIN + "/" }];
  if (S.type !== "home" && title) {
    crumbItems.push({ "@type": "ListItem", "position": 2, "name": (S.crumb || title), "item": url });
  }
  jsonld({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbItems
  });

  /* ---- BlogPosting (single post pages) ---- */
  if (S.type === "article" && window.POST_SLUG && window.BLOG_POSTS) {
    var P = window.BLOG_POSTS[window.POST_SLUG];
    if (P) {
      jsonld({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": P.title,
        "description": P.answer,
        "image": ORIGIN + "/" + P.img,
        "datePublished": S.datePublished || undefined,
        "author": { "@type": "Person", "name": P.author + " — " + (P.authorRole || "Physiotherapist"), "worksFor": { "@id": ORIGIN + "/#clinic" } },
        "publisher": { "@id": ORIGIN + "/#clinic" },
        "mainEntityOfPage": url
      });
    }
  }

  /* ---- FAQPage (when window.SEO.faqs provided) ---- */
  if (S.faqs && S.faqs.length) {
    jsonld({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": S.faqs.map(function (f) {
        return { "@type": "Question", "name": f[0], "acceptedAnswer": { "@type": "Answer", "text": f[1] } };
      })
    });
  }
})();
