/* ===========================================================================
   Blackwater Physiotherapy — Mobile menu
   Standalone React component (prototype). For the WordPress/Elementor build this
   should be re-authored as a small vanilla-JS module loaded globally (see prd.md).
   Exposed as window.MobileMenu — Nav renders it and passes the nav data in.
   =========================================================================== */
(function(){
  const { useState, useEffect } = React;

  function Burger({ onClick }){
    return (
      <button className="m-burger" onClick={onClick} aria-label="Open menu" aria-haspopup="true">
        <span></span><span></span><span></span>
      </button>
    );
  }

  function MobileMenu({ mainNav, services, conditionGroups, conditions, whoWeHelp, Icon }){
    const [open, setOpen] = useState(false);
    const [acc, setAcc] = useState(null);

    useEffect(() => {
      document.documentElement.style.overflow = open ? "hidden" : "";
      return () => { document.documentElement.style.overflow = ""; };
    }, [open]);

    // Close on Escape
    useEffect(() => {
      if (!open) return;
      const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const close = () => { setOpen(false); setAcc(null); };
    const toggle = (k) => setAcc(a => (a === k ? null : k));

    const subItems = (dd) => {
      const P = (window.BW && window.BW.PAGES) || {};
      const svcBase = P.services || "";
      const condBase = P.conditions || "";
      if (dd === "services") return services.map(s => ({ label:s.name, href:`service-${s.slug}.html` }));
      if (dd === "conditions") return [...conditions.map(c => ({ label:c.name, href:`condition-${c.slug}.html` })), { label:"All conditions", href:condBase, strong:true }];
      if (dd === "who") return whoWeHelp.map(w => ({ label:w.name, href:w.href }));
      return [];
    };

    const Arrow = Icon ? () => <Icon name="arrow" size={14}/> : () => <span>→</span>;

    const overlay = (
      <React.Fragment>
        <div className="m-scrim" onClick={close} style={{opacity: open ? 1 : 0, visibility: open ? "visible" : "hidden"}}></div>
        <aside className="m-panel" aria-hidden={!open} style={{transform: open ? "translateX(0)" : "translateX(100%)"}}>
          <div className="m-head">
            <span className="m-brand">
              <img src="assets/logo-bp-full.webp" alt="" width="34" height="40"/>
              <span className="m-brand-name"><span className="bw">Blackwater</span> <span className="py">Physiotherapy</span></span>
            </span>
            <button className="m-close" onClick={close} aria-label="Close menu">✕</button>
          </div>

          <nav className="m-list" aria-label="Mobile">
            {mainNav.map(n => n.dd ? (
              <div className={"m-group" + (acc === n.dd ? " open" : "")} key={n.label}>
                <button className="m-acc" onClick={() => toggle(n.dd)} aria-expanded={acc === n.dd}>
                  <span>{n.label}</span><span className="m-chev">▾</span>
                </button>
                <div className="m-sub" style={{ maxHeight: acc === n.dd ? (subItems(n.dd).length * 52 + 8) + "px" : "0px" }}>
                  {subItems(n.dd).map(s => (
                    <a key={s.label} href={s.href} className={"m-sublink" + (s.strong ? " strong" : "")} onClick={close}>
                      {s.label}<Arrow/>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={n.label} href={n.href} className={"m-link" + (n.active ? " active" : "")} onClick={close}>{n.label}</a>
            ))}
          </nav>

          <div className="m-foot">
            <a className="btn m-book" href={(window.BW && window.BW.BOOKING_URL) || "#contact"} target="_blank" rel="noopener" onClick={close}>Book Now <Arrow/></a>
            <div className="m-contact">
              <a href="tel:+447790717056">07790 717056</a>
              <a href="mailto:info@blackwaterphysiotherapy.co.uk">info@blackwaterphysiotherapy.co.uk</a>
              <span>The Old Ironworks, Maldon CM9 4LE</span>
            </div>
          </div>
        </aside>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <Burger onClick={() => setOpen(true)}/>
        {ReactDOM.createPortal(overlay, document.body)}
      </React.Fragment>
    );
  }

  window.MobileMenu = MobileMenu;
})();
