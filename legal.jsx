const { Icon, Nav, Footer, BookTab, useScrollMotion, PAGES, BOOKING_URL } = window.BW;

/* Generic template content — review with a solicitor before publishing. */
const DOCS = {
  privacy: {
    title:"Privacy Policy",
    updated:"June 2026",
    intro:"This Privacy Policy explains how Blackwater Physiotherapy Ltd (\"we\", \"us\", \"our\") collects, uses and protects the personal information you provide when you use our website or our services. We are committed to protecting your privacy and handling your data in line with UK data protection law, including the UK GDPR and the Data Protection Act 2018.",
    sections:[
      ["Who we are","Blackwater Physiotherapy Ltd is a physiotherapy clinic based in Maldon, Essex. For any questions about this policy or your data, please contact us using the details on our Contact page. We are the \"data controller\" responsible for your personal information."],
      ["Information we collect","We may collect: your name, contact details (email, phone, address), date of birth, GP details and relevant medical or health information you provide; appointment and treatment records; payment and insurance details; and information collected automatically when you use our website, such as your IP address, browser type and pages visited."],
      ["How we use your information","We use your information to provide and manage your physiotherapy care; arrange and confirm appointments; keep accurate clinical records; process payments and insurance claims; respond to your enquiries; meet our legal and regulatory obligations; and, where you have agreed, to send you relevant updates. Health information is processed for the purposes of providing healthcare."],
      ["Legal basis for processing","We process your personal data on the basis of: providing healthcare services and the management of those services; our legitimate interests in running the clinic; your consent (which you can withdraw at any time); and compliance with our legal obligations."],
      ["Sharing your information","We will never sell your data. We may share information, where necessary and lawful, with: your GP or other healthcare professionals involved in your care; your insurer where you are claiming; and trusted service providers who help us run the clinic (for example, booking and payment systems). We may also disclose information where required by law."],
      ["How long we keep it","We keep clinical records in line with professional and legal retention requirements. Other personal information is kept only for as long as necessary for the purposes described above, after which it is securely deleted or anonymised."],
      ["Your rights","You have the right to access the personal information we hold about you; ask us to correct inaccurate data; request erasure in certain circumstances; restrict or object to processing; and request data portability. To exercise any of these rights, please contact us. You also have the right to complain to the Information Commissioner's Office (ICO)."],
      ["Cookies & website data","Our website may use cookies and similar technologies to help it function and to understand how it is used. You can control cookies through your browser settings. Disabling cookies may affect how parts of the site work."],
      ["Security","We take appropriate technical and organisational measures to protect your personal information against unauthorised access, loss or misuse."],
      ["Changes to this policy","We may update this Privacy Policy from time to time. The latest version will always be available on this page, with the date it was last updated shown above."],
    ],
  },
  terms: {
    title:"Terms & Conditions",
    updated:"June 2026",
    intro:"These Terms & Conditions govern your use of the Blackwater Physiotherapy website and the services we provide. By using our website or booking an appointment with us, you agree to these terms. Please read them carefully.",
    sections:[
      ["About us","Blackwater Physiotherapy Ltd is a physiotherapy clinic based in Maldon, Essex. Our clinicians are registered with the Health and Care Professions Council (HCPC) and are members of the Chartered Society of Physiotherapy (CSP)."],
      ["Appointments & bookings","Appointments can be booked online, by phone or by email. When you book, you agree to provide accurate information. We will confirm your appointment before your visit. Please arrive in good time; late arrival may shorten your appointment."],
      ["Cancellations & missed appointments","We ask for reasonable notice if you need to cancel or reschedule so the slot can be offered to someone else. Cancellations made with insufficient notice, or missed appointments, may be subject to a charge. Our current cancellation policy will be explained when you book."],
      ["Fees & payment","Our fees are shown on the relevant service pages and may be updated from time to time. Payment is due at the time of your appointment unless otherwise agreed. Where you are claiming through private health insurance, you remain responsible for any amount not covered by your insurer."],
      ["Your care & responsibilities","Our treatment is based on the information you provide and our professional assessment. It is important that you give us accurate and complete information about your health. Following the advice and exercise plans we provide is an important part of your recovery, but outcomes can vary between individuals."],
      ["Medical disclaimer","Information on this website is provided for general guidance only and is not a substitute for individual professional assessment, diagnosis or treatment. If you have an urgent or serious medical concern, please contact your GP, call NHS 111, or in an emergency call 999."],
      ["Insurance","We work with a number of private health insurers. It is your responsibility to check your cover, any excess, and whether a GP referral or pre-authorisation is required before your appointment."],
      ["Website use","You may use this website for lawful purposes only. The content on this site, including text, images and branding, is owned by or licensed to Blackwater Physiotherapy Ltd and may not be reproduced without permission."],
      ["Liability","To the fullest extent permitted by law, we are not liable for any loss arising from reliance on website content, or from circumstances outside our reasonable control. Nothing in these terms limits our liability where it would be unlawful to do so."],
      ["Governing law","These terms are governed by the law of England and Wales, and any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales."],
    ],
  },
};

const DOC = DOCS[window.LEGAL_PAGE];

function PageHero(){
  return (
    <section className="legal-hero">
      <div className="wrap">
        <nav className="crumb" aria-label="Breadcrumb">
          <a href={PAGES.home}>Home</a><span>/</span><span aria-current="page">{DOC.title}</span>
        </nav>
        <div className="page-eyebrow"><span className="bar"></span>Legal</div>
        <h1>{DOC.title}</h1>
        <p className="legal-updated">Last updated: {DOC.updated}</p>
      </div>
    </section>
  );
}

function Body(){
  return (
    <section className="sec" style={{paddingTop:56}}>
      <div className="wrap legal-wrap">
        <p className="legal-intro">{DOC.intro}</p>
        <div className="legal-sections">
          {DOC.sections.map(([h, body], i) => (
            <div className="legal-block" key={i}>
              <h2>{String(i+1).padStart(2,"0")}. {h}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>
        <div className="legal-note">
          <p>If you have any questions about this {DOC.title.toLowerCase()}, please <a href={PAGES.contact}>get in touch</a>.</p>
        </div>
      </div>
    </section>
  );
}

function App(){
  useScrollMotion();
  return (
    <div>
      <Nav active=""/>
      <PageHero/>
      <Body/>
      <Footer/>
      <BookTab/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
