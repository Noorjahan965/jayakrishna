import { useEffect, useMemo, useState } from "react";

/* ---------- CONTENT (edit here) ---------- */
const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`;
const IMG = {
  wheat: U("photo-1574323347407-f5e1ad6d020b"),
  bread1: U("photo-1509440159596-0249088772ff"),
  bread2: U("photo-1549931319-a545dcf3bc73"),
};
const PHONE = "+91 94433 52716";
const EMAIL = "contact@jayakrishna.org";
const ADDRESS = "82/3, Maravankulam, Thirumangalam, Madurai – 625706, Tamil Nadu, India";

const SLIDES = [
  { tag: "Pure grain inspection", title: "Golden Wheat Bunch", sub: "Supplied Reference • Handpicked Pure Wheat Grain", img: IMG.wheat },
  { tag: "Stone-ground goodness", title: "Whole Wheat Atta", sub: "Preserves bran, endosperm and golden germ", img: IMG.bread1 },
  { tag: "Bakery grade", title: "Premium Maida", sub: "Ultra-fine, unbleached, consistent batch after batch", img: IMG.bread2 },
];

const BRANDS = [
  { id: "Lion", name: "Lion Brand", sub: "Flagship Atta & Maida" },
  { id: "Kili", name: "Kili Brand", sub: "Hotel & Bakery Grade" },
  { id: "Cycle", name: "Cycle Brand", sub: "Pure Suji & Rava" },
];

// sizes: [label, price, mrp]
const PRODUCTS = [
  { id: 1, brand: "Lion", type: "Whole Wheat Atta", name: "Lion Whole Wheat Atta", badge: "10% OFF", badgeColor: "#ef4444", img: IMG.bread1,
    desc: "100% pure stone-ground whole wheat flour milled from Sharbati grains for soft rots.", def: 1,
    sizes: [["500g", 26, 29], ["1KG", 50, 56], ["2KG", 98, 110], ["5KG", 240, 270], ["10KG", 470, 530]] },
  { id: 2, brand: "Lion", type: "Premium Maida", name: "Lion Premium Maida", badge: "10% OFF", badgeColor: "#ef4444", img: IMG.wheat,
    desc: "Superfine maida ideal for bakery breads, parottas, and crispy snacks.", def: 1,
    sizes: [["500g", 26, 29], ["1KG", 50, 56], ["2KG", 98, 110], ["5KG", 240, 270], ["25KG", 1150, 1300]] },
  { id: 3, brand: "Kili", type: "Pure Maida", name: "Kili Pure Maida", badge: "HOTEL GRADE", badgeColor: "#16a34a", img: IMG.bread2,
    desc: "Ultra-fine, unbleached premium maida crafted for layered South Indian parottas.", def: 0,
    sizes: [["500g", 24, 26], ["1KG", 46, 50], ["5KG", 225, 245], ["50KG", 2200, 2400]] },
  { id: 4, brand: "Cycle", type: "Golden Suji", name: "Cycle Golden Roasted Rava", badge: "FLAGSHIP SUJI", badgeColor: "#2563eb", img: "",
    desc: "Evenly granulated, pre-roasted durum wheat semolina for non-sticky breakfasts.", def: 0,
    sizes: [["500g", 28, 30], ["1KG", 54, 58], ["5KG", 262, 285], ["25KG", 1280, 1400]] },
];

const FEATURES = [
  { icon: "🌱", t: "100% Whole Grain Integrity", d: "Preserves the dietary bran, endosperm, and golden germ for authentic wheat sweetness and digestive health." },
  { icon: "❄️", t: "Chilled Roller Milling", d: "Low-friction shearing prevents heat buildup, protecting heat-sensitive vitamins and gluten elasticity." },
  { icon: "🧪", t: "FSSAI & Lab Audited", d: "Continuous testing of moisture, ash content, and wet gluten guarantees batch-after-batch baking consistency." },
];

const STEPS = [
  ["Grain Selection", "Procuring premium Sharbati and Lokwan hard wheat lots, rigorously audited for test weight and protein levels."],
  ["Multi-Stage Cleaning", "Aspiration channels, vibrating sieves, gravity destoners, and magnetic separators remove 100% of field impurities."],
  ["Tempering & Conditioning", "Pure water hydration restoughens the outer bran for clean separation while mellowing the endosperm."],
  ["Chilled Roller Milling", "Low-friction fluted roller stands gradually break kernels without overheating, safeguarding natural vitamins."],
  ["Plansifter Purification", "High-speed multi-deck sieves separate flour fractions into precise uniform mesh granulations."],
  ["Hygienic Packaging", "Automated packing into consumer pouches and 25KG, 50KG, 90KG moisture-barrier sacks."],
];

const GALLERY = [
  { cat: "Milling Plant", tag: "JFM • PLANT", cap: "Pneumatic Roller Stand Operations", img: IMG.bread1 },
  { cat: "Products & Brands", tag: "JFM • PRODUCTS", cap: "Lion Brand Wheat Packaging Line", img: IMG.wheat },
  { cat: "Lab & Process", tag: "JFM • PROCESS", cap: "Laboratory Gluten & Moisture Testing", img: IMG.bread2 },
];

const TA = {
  Home: "முகப்பு", About: "எங்களைப் பற்றி", Products: "தயாரிப்புகள்", Gallery: "படத்தொகுப்பு", Insights: "நுண்ணறிவு",
  "Contact Us": "தொடர்புக்கு", "Sign In": "உள்நுழை", "Explore Products": "தயாரிப்புகளைப் பார்க்க", "About Jayakrishna": "ஜெயகிருஷ்ணா பற்றி",
  h1: "நோக்கத்துடன் உருவானது.", h2: "ஆரோக்கிய வாழ்விற்காக அரைக்கப்பட்டது.",
};

const SIZES_LABEL = ["500g • 1kg • 2kg • 5kg • 10kg", "25kg • 50kg • 90kg", "Thirumangalam, TN"];

/* ---------- SMALL HELPERS ---------- */
const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

function Img({ src, alt, className }) {
  const [bad, setBad] = useState(!src);
  return bad ? <div className={`${className || ""} img-fallback`} role="img" aria-label={alt}>🌾</div>
    : <img className={className} src={src} alt={alt} loading="lazy" onError={() => setBad(true)} />;
}

/* ---------- APP ---------- */
export default function App() {
  const [lang, setLang] = useState("en");
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(null); // open dropdown
  const [slide, setSlide] = useState(0);
  const [brand, setBrand] = useState("All");
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(() => Object.fromEntries(PRODUCTS.map((p) => [p.id, p.def])));
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [gcat, setGcat] = useState("All Photos");
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", biz: "", type: "Dealership / Distributorship", region: "", msg: "" });
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);

  const t = (k) => (lang === "ta" && TA[k]) || k;

  useEffect(() => { const i = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000); return () => clearInterval(i); }, []);
  useEffect(() => { if (!toast) return; const i = setTimeout(() => setToast(""), 2000); return () => clearTimeout(i); }, [toast]);
  useEffect(() => { document.body.style.overflow = cartOpen || signIn ? "hidden" : ""; }, [cartOpen, signIn]);

  const shown = useMemo(() => PRODUCTS.filter((p) =>
    (brand === "All" || p.brand === brand) &&
    `${p.name} ${p.type} ${p.brand}`.toLowerCase().includes(query.toLowerCase())), [brand, query]);

  const count = cart.reduce((n, i) => n + i.qty, 0);
  const total = cart.reduce((n, i) => n + i.qty * i.price, 0);

  const addToCart = (p) => {
    const [size, price] = p.sizes[sel[p.id]];
    const key = `${p.id}-${size}`;
    setCart((c) => c.find((i) => i.key === key) ? c.map((i) => i.key === key ? { ...i, qty: i.qty + 1 } : i) : [...c, { key, name: p.name, size, price, qty: 1 }]);
    setToast(`${p.name} (${size}) added to cart`);
  };
  const changeQty = (key, d) => setCart((c) => c.map((i) => i.key === key ? { ...i, qty: i.qty + d } : i).filter((i) => i.qty > 0));

  const nav = (id) => { go(id); setMenu(false); setOpen(null); };
  const pickBrand = (b) => { setBrand(b); nav("products"); };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "Enter your full name";
    if (!/^(\+91)?[\s-]?[6-9]\d{4}[\s-]?\d{5}$/.test(form.phone.trim())) er.phone = "Enter a valid 10-digit mobile number";
    setErrs(er);
    if (Object.keys(er).length) return;
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nBusiness: ${form.biz}\nType: ${form.type}\nRegion: ${form.region}\n\n${form.msg}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Partnership enquiry: " + form.type)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const f = (k) => ({ value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }) });

  const navItems = [
    ["Home", "home"],
    ["About", "about", [["About Jayakrishna", "about"], ["Vision & Mission", "vision"]]],
    ["Products", "products", BRANDS.map((b) => [b.name, b.id])],
    ["Gallery", "gallery"], ["Insights", "insights"], ["Contact Us", "contact"],
  ];

  return (
    <>
      <div className="topbar">
        <div className="wrap row between">
          <div className="row gap">
            <span>📍 Thirumangalam, Madurai, TN</span>
            <a href={`tel:${PHONE.replace(/\s/g, "")}`}>📞 {PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="hide-sm">✉️ {EMAIL}</a>
          </div>
          <div className="row gap">
            <span className="fssai hide-sm">FSSAI CERTIFIED</span>
            <button className="lang" onClick={() => setLang(lang === "en" ? "ta" : "en")} aria-label="Switch language">
              🌐 {lang === "en" ? "Tamil (தமிழ்)" : "English"}
            </button>
          </div>
        </div>
      </div>

      <header className="nav">
        <div className="wrap row between">
          <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); nav("home"); }}>
            <span className="logo-mark">🌾</span>
            <span><b>JAYAKRISHNA</b><em>FLOUR MILLS</em><small>QUALITY LIES IN CONSISTENCY</small></span>
          </a>
          <nav className={`links ${menu ? "show" : ""}`} aria-label="Main">
            {navItems.map(([label, id, sub]) => (
              <div key={label} className="item" onMouseLeave={() => setOpen(null)}>
                <button onClick={() => (sub ? setOpen(open === label ? null : label) : nav(id))}
                  onMouseEnter={() => sub && setOpen(label)} aria-expanded={sub ? open === label : undefined}>
                  {t(label)} {sub && "▾"}
                </button>
                {sub && open === label && (
                  <div className="drop">
                    {sub.map(([l, target]) => (
                      <button key={l} onClick={() => (label === "Products" ? pickBrand(target) : nav(target))}>{l}</button>
                    ))}
                    {label === "Products" && <button onClick={() => pickBrand("All")}>All Products</button>}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="row gap">
            <button className="pill" onClick={() => setSignIn(true)}>👤 {t("Sign In")}</button>
            <button className="cart" onClick={() => setCartOpen(true)} aria-label={`Cart, ${count} items`}>
              🛒{count > 0 && <span className="count">{count}</span>}
            </button>
            <button className="burger" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? "✕" : "☰"}</button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="hero wrap">
          <div>
            <span className="chip">• Pneumatic Roller Mills • Madurai, TN</span>
            <h1>{lang === "ta" ? <>{TA.h1} <span>{TA.h2}</span></> : <>Built with Purpose. <span>Milled for Healthy Living.</span></>}</h1>
            <p className="lead">Discover Jayakrishna Flour Mills — premium whole wheat atta, superfine maida, and golden suji shaped by quality, pure wheat grains, and continuous innovation for generations.</p>
            <p className="label">OUR TRUSTED BRANDS:</p>
            <div className="row gap wrapx">
              {BRANDS.map((b) => (
                <button key={b.id} className="brand" onClick={() => pickBrand(b.id)}>
                  <span><b>{b.name}</b><small>{b.sub}</small></span>
                </button>
              ))}
            </div>
            <div className="row gap wrapx cta">
              <button className="btn" onClick={() => nav("products")}>{t("Explore Products")} →</button>
              <button className="btn ghost" onClick={() => nav("about")}>{t("About Jayakrishna")}</button>
            </div>
            <div className="stats">
              {["PACKAGES", "COMMERCIAL SACKS", "LOCATION"].map((l, i) => <div key={l}><small>{l}</small><b>{SIZES_LABEL[i]}</b></div>)}
            </div>
          </div>
          <div className="slider">
            {SLIDES.map((s, i) => (
              <div key={s.title} className={`slide ${i === slide ? "on" : ""}`} aria-hidden={i !== slide}>
                <Img src={s.img} alt={s.title} />
                <div className="cap"><span className="tag">{s.tag}</span><h3>{s.title}</h3><p>{s.sub}</p></div>
              </div>
            ))}
            <button className="arrow l" onClick={() => setSlide((slide + SLIDES.length - 1) % SLIDES.length)} aria-label="Previous slide">‹</button>
            <button className="arrow r" onClick={() => setSlide((slide + 1) % SLIDES.length)} aria-label="Next slide">›</button>
            <div className="dots">{SLIDES.map((_, i) => <button key={i} className={i === slide ? "on" : ""} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} />)}</div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="sec white">
          <div className="wrap center">
            <span className="chip">ABOUT JAYAKRISHNA FLOUR MILLS</span>
            <h2>Where experience meets a forward-looking approach.</h2>
            <p className="muted narrow">Flour is valuable, versatile and nutritious. Packed with vitamins and minerals, it forms an essential foundation of daily life — from fresh morning rotis to artisanal bakery loaves.</p>
            <div className="grid3 left">
              {FEATURES.map((x) => <div className="card" key={x.t}><i className="ico">{x.icon}</i><h4>{x.t}</h4><p>{x.d}</p></div>)}
            </div>
            <div id="vision" className="vm left">
              <div><small>◉ OUR VISION</small><h3>To be South India's most trusted benchmark for pure, unadulterated wheat nutrition.</h3><p>Empowering households and food creators with pure whole grain products through honest milling and sustainable farmer relationships.</p></div>
              <div><small>◎ OUR MISSION</small><h3>To deliver batch-after-batch consistency that bakers and families can depend upon.</h3><p>Combining advanced pneumatic roller stands, multi-stage aspiration cleaning, and strict lab auditing to eliminate batch variation.</p></div>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="products" className="sec cream">
          <div className="wrap">
            <div className="row between wrapx">
              <div>
                <span className="chip">OUR PRODUCT RANGE</span>
                <h2 className="l">Featured Flours & Packaging</h2>
                <p className="muted small">Choose your preferred pack size and order directly or inquire in bulk.</p>
              </div>
              <input className="search" type="search" placeholder="🔍 Search flour, brand..." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search products" />
            </div>
            <div className="tabs">
              {["All", ...BRANDS.map((b) => b.id)].map((b) => (
                <button key={b} className={brand === b ? "on" : ""} onClick={() => setBrand(b)}>
                  {b === "All" ? "All Products" : `${b} Brand`}
                </button>
              ))}
            </div>
            <div className="grid4">
              {shown.map((p) => {
                const [, price, mrp] = p.sizes[sel[p.id]];
                return (
                  <article className="prod" key={p.id}>
                    <div className="pimg"><Img src={p.img} alt={p.name} /><span className="badge" style={{ background: p.badgeColor }}>{p.badge}</span></div>
                    <small className="ptag">{p.brand.toUpperCase()} BRAND • {p.type.toUpperCase()}</small>
                    <h4>{p.name}</h4><p>{p.desc}</p>
                    <div className="size"><label htmlFor={`s${p.id}`}>Select Size:</label>
                      <select id={`s${p.id}`} value={sel[p.id]} onChange={(e) => setSel({ ...sel, [p.id]: +e.target.value })}>
                        {p.sizes.map(([l, pr], i) => <option key={l} value={i}>{l} – ₹{pr}</option>)}
                      </select></div>
                    <div className="row between buy">
                      <div><b>₹{price}</b> <s>₹{mrp}</s></div>
                      <button className="add" onClick={() => addToCart(p)}>🛒 Add to Cart</button>
                    </div>
                  </article>
                );
              })}
            </div>
            {!shown.length && <p className="muted center pad">No products match your search. Try another name or brand.</p>}
          </div>
        </section>

        {/* INSIGHTS */}
        <section id="insights" className="sec white">
          <div className="wrap center">
            <span className="chip">THE MILLING JOURNEY</span>
            <h2>From Golden Harvest Fields to Pure Culinary Flour</h2>
            <div className="grid3 left">
              {STEPS.map(([h, d], i) => <div className="card" key={h}><b className="num">0{i + 1}</b><h4>{h}</h4><p>{d}</p></div>)}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="sec cream">
          <div className="wrap">
            <div className="row between wrapx">
              <div><span className="chip">VISUAL TOUR</span><h2 className="l">Media & Photo Gallery</h2></div>
              <div className="tabs sm">
                {["All Photos", "Milling Plant", "Products & Brands", "Lab & Process"].map((c) => <button key={c} className={gcat === c ? "on" : ""} onClick={() => setGcat(c)}>{c}</button>)}
              </div>
            </div>
            <div className="grid3">
              {GALLERY.filter((g) => gcat === "All Photos" || g.cat === gcat).map((g) => (
                <figure className="gitem" key={g.cap}><Img src={g.img} alt={g.cap} /><figcaption><small>{g.tag}</small><b>{g.cap}</b></figcaption></figure>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="sec white">
          <div className="wrap contact">
            <form className="enq" onSubmit={submit} noValidate>
              <span className="chip">DEALERSHIP & COMMERCIAL ENQUIRIES</span>
              <h2 className="l">Partner with Jayakrishna Flour Mills</h2>
              <p className="muted small">Expand your wholesale business with our trusted milling legacy. Reach out for dealership or commercial supply contracts.</p>
              <div className="fgrid">
                <label>Full Name *<input placeholder="e.g. Anand Kumar" {...f("name")} aria-invalid={!!errs.name} />{errs.name && <em className="err">{errs.name}</em>}</label>
                <label>Contact Phone *<input placeholder="+91 94433 52716" inputMode="tel" {...f("phone")} aria-invalid={!!errs.phone} />{errs.phone && <em className="err">{errs.phone}</em>}</label>
                <label>Business / Enterprise Name<input placeholder="Distribution Agency, Bakery, etc." {...f("biz")} /></label>
                <label>Partnership Type<select {...f("type")}><option>Dealership / Distributorship</option><option>Bakery / Hotel Supply</option><option>Bulk Commercial Supply</option><option>Retail / Wholesale</option></select></label>
                <label className="full">Operating Region / District<input placeholder="e.g. Madurai, Chennai, Coimbatore, Kerala" {...f("region")} /></label>
                <label className="full">Proposal / Business Details<textarea rows="3" placeholder="Tell us about your distribution reach, existing network, or requirement details..." {...f("msg")} /></label>
              </div>
              <button className="btn wide" type="submit">SUBMIT PARTNERSHIP ENQUIRY ➤</button>
              {sent && <p className="ok" role="status">Your email app should open with the enquiry. If it did not, write to {EMAIL} or call {PHONE}.</p>}
            </form>
            <aside>
              <div className="dark">
                <h3>Direct Mill Contacts</h3>
                <div className="crow"><i>📞</i><div><small>Direct Contact</small><a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a></div></div>
                <div className="crow"><i>✉️</i><div><small>Email Inquiries</small><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div></div>
                <div className="crow"><i>📍</i><div><small>Mill Location & Office</small><span>Jayakrishna Flour Mills<br />{ADDRESS.replace(", Madurai", ",\nMadurai")}</span></div></div>
              </div>
              <div className="map">
                <div className="row between"><b>📌 Thirumangalam Mill Site</b><span className="open">Open Mon-Sat</span></div>
                <iframe title="Mill location map" loading="lazy" src="https://www.google.com/maps?q=Thirumangalam,Madurai&output=embed" />
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap fgrid4">
          <div><h3>🌾 JAYAKRISHNA FLOUR MILLS</h3><p>Milling premium Whole Wheat Atta, Maida, Commercial Atta, and Golden Suji across our trusted brand portfolio: Lion, Kili, and Cycle.</p>
            <div className="row gap soc">{[["f", "Facebook"], ["◎", "Instagram"], ["✆", "WhatsApp"]].map(([s, n]) => <a key={n} href={n === "WhatsApp" ? "https://wa.me/919443352716" : "#"} aria-label={n}>{s}</a>)}</div></div>
          <div><h5>PRODUCTS & COMPANY</h5>
            <a href="#about" onClick={(e) => { e.preventDefault(); nav("about"); }}>About JFM Heritage</a>
            <a href="#products" onClick={(e) => { e.preventDefault(); pickBrand("Lion"); }}>Lion Whole Wheat Atta</a>
            <a href="#products" onClick={(e) => { e.preventDefault(); pickBrand("Lion"); }}>Lion Premium Maida</a>
            <a href="#products" onClick={(e) => { e.preventDefault(); pickBrand("Kili"); }}>Kili Pure Maida</a>
            <a href="#products" onClick={(e) => { e.preventDefault(); pickBrand("Cycle"); }}>Cycle Commercial Flours</a></div>
          <div><h5>CORPORATE POLICIES</h5><a href="#">Terms & Conditions</a><a href="#">Privacy Policy</a><a href="#">Return Policy</a><a href="#gallery" onClick={(e) => { e.preventDefault(); nav("gallery"); }}>Plant Infrastructure Gallery</a></div>
          <div><h5>MILL & OFFICE</h5><p>{ADDRESS}</p><a href={`tel:${PHONE.replace(/\s/g, "")}`}>📞 {PHONE}</a><a href={`mailto:${EMAIL}`}>✉️ {EMAIL}</a></div>
        </div>
        <div className="wrap row between wrapx copy"><span>© 2026 Jayakrishna Flour Mills (JFM). All rights reserved. • FSSAI Certified</span><span>Pure wheat nutrition. Milled with consistency for generations.</span></div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)} />}
      <aside className={`drawer ${cartOpen ? "on" : ""}`} aria-hidden={!cartOpen} aria-label="Shopping cart">
        <div className="row between dh"><h3>Your Cart</h3><button onClick={() => setCartOpen(false)} aria-label="Close cart">✕</button></div>
        {!cart.length ? <p className="muted pad">Your cart is empty. Add a flour pack from the product range.</p> : (
          <>
            <ul>{cart.map((i) => (
              <li key={i.key}><div><b>{i.name}</b><small>{i.size} • ₹{i.price}</small></div>
                <div className="qty"><button onClick={() => changeQty(i.key, -1)} aria-label="Decrease">−</button><span>{i.qty}</span><button onClick={() => changeQty(i.key, 1)} aria-label="Increase">+</button></div>
                <b>₹{i.price * i.qty}</b></li>))}</ul>
            <div className="row between tot"><span>Total</span><b>₹{total}</b></div>
            <a className="btn wide" target="_blank" rel="noreferrer"
              href={`https://wa.me/919443352716?text=${encodeURIComponent("Hello Jayakrishna Flour Mills, I would like to order:\n" + cart.map((i) => `${i.qty} x ${i.name} (${i.size}) = ₹${i.qty * i.price}`).join("\n") + `\nTotal: ₹${total}`)}`}>
              Order on WhatsApp</a>
          </>)}
      </aside>

      {/* SIGN IN */}
      {signIn && (
        <div className="overlay center-o" onClick={() => setSignIn(false)}>
          <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={(e) => { e.preventDefault(); setSignIn(false); setToast("Signed in successfully"); }}>
            <div className="row between"><h3>Sign In</h3><button type="button" onClick={() => setSignIn(false)} aria-label="Close">✕</button></div>
            <label>Email<input type="email" required placeholder="you@example.com" /></label>
            <label>Password<input type="password" required placeholder="••••••••" /></label>
            <button className="btn wide" type="submit">Sign In</button>
            <small className="muted">Demo form only. Connect a backend to enable real accounts.</small>
          </form>
        </div>
      )}

      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}
