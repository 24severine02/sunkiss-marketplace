import { useCallback, useEffect, useMemo, useState } from "react";

const PRODUCT_IMAGE = "/assets/sunkiss-product.png";
const LOGO_IMAGE = "/assets/sunkiss-logo.png";

type IconName =
  | "account"
  | "arrow"
  | "bag"
  | "check"
  | "chevron"
  | "clock"
  | "compare"
  | "delivery"
  | "eye"
  | "facebook"
  | "heart"
  | "help"
  | "home"
  | "instagram"
  | "menu"
  | "minus"
  | "plus"
  | "search"
  | "shield"
  | "shop"
  | "star"
  | "x";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    account: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    compare: <><path d="M7 7h11l-3-3" /><path d="M17 17H6l3 3" /></>,
    delivery: <><path d="M3 6h11v11H3z" /><path d="M14 10h4l3 3v4h-7" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    eye: <><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
    facebook: <path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1Z" />,
    heart: <path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z" />,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.8 9a2.3 2.3 0 1 1 3.5 2c-.8.5-1.3 1-1.3 2" /><path d="M12 17h.01" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10M9 21v-7h6v7" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    minus: <path d="M5 12h14" />,
    plus: <path d="M12 5v14M5 12h14" />,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    shield: <><path d="M12 3 4 6v5c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></>,
    shop: <><path d="M4 9h16l-1-5H5L4 9Z" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
    star: <path d="m12 2 3 6 7 .9-5 4.8 1.3 6.8L12 17.3l-6.3 3.2L7 13.7 2 8.9 9 8l3-6Z" />,
    x: <path d="M6 6l12 12M18 6 6 18" />,
  };
  return <svg aria-hidden="true" className="icon" fill="none" height={size} viewBox="0 0 24 24" width={size}>{paths[name]}</svg>;
}

type Page = "home" | "shop" | "product" | "cart" | "checkout" | "about" | "contact" | "faq" | "track" | "account" | "wishlist" | "vendor" | "terms" | "privacy" | "returns";

type Product = {
  id: number;
  name: string;
  price: number;
  badge: string;
  vendor: string;
  category: string;
  sizes: string[];
  inStock: boolean;
  added: number;
  rating: number;
  reviews: number;
  description: string;
};

// Demo catalog — will be replaced by the backend.
const products: Product[] = [
  { id: 1, name: "NEW – BLACK Sunkiss Intimates S/M size 10 pcs", price: 116.44, badge: "New", vendor: "Sunkiss Official", category: "Feminine Care", sizes: ["S/M"], inStock: true, added: 13, rating: 4.8, reviews: 24, description: "Soft, stretchy period underwear created for reliable day and night protection, with up to 360° worry-free coverage." },
  { id: 2, name: "Sunkiss Intimates M/L size 10 pcs", price: 129.95, badge: "-12%", vendor: "Wellness Mauritius", category: "Feminine Care", sizes: ["M/L"], inStock: true, added: 9, rating: 4.7, reviews: 18, description: "The same trusted Sunkiss protection in a roomier M/L fit, soft against the skin and discreet under clothing." },
  { id: 3, name: "Soft Adult Care Pants – Medium", price: 245.0, badge: "New", vendor: "Care Plus", category: "For Adults", sizes: ["M"], inStock: true, added: 12, rating: 4.6, reviews: 31, description: "Pull-up adult care pants with a breathable outer layer and secure leak guards for all-day confidence." },
  { id: 4, name: "Sunkiss Daily Comfort Underpads", price: 189.5, badge: "", vendor: "Sunkiss Official", category: "For Adults", sizes: ["One size"], inStock: true, added: 4, rating: 4.9, reviews: 42, description: "Highly absorbent underpads that protect beds and chairs, with a soft quilted top and non-slip backing." },
  { id: 5, name: "Gentle Unscented Care Wipes", price: 98.0, badge: "New", vendor: "Island Hygiene", category: "Wipes", sizes: ["One size"], inStock: true, added: 11, rating: 4.5, reviews: 15, description: "Thick, soft and fragrance-free wipes for sensitive skin, ideal for everyday personal care." },
  { id: 6, name: "Maternity Comfort Pants – Large", price: 210.0, badge: "", vendor: "Wellness Mauritius", category: "Feminine Care", sizes: ["L"], inStock: true, added: 6, rating: 4.4, reviews: 9, description: "Gentle, high-waisted maternity pants designed for comfort and protection after birth." },
  { id: 7, name: "Adult Booster Pads 20 pcs", price: 155.0, badge: "-10%", vendor: "Care Plus", category: "For Adults", sizes: ["One size"], inStock: true, added: 3, rating: 4.3, reviews: 12, description: "Slim booster pads that add extra absorbency to any adult pant or diaper." },
  { id: 8, name: "Flushable Fresh Wipes 3-pack", price: 135.0, badge: "", vendor: "Island Hygiene", category: "Wipes", sizes: ["One size"], inStock: false, added: 7, rating: 4.2, reviews: 20, description: "Flushable, plant-based wipes with a light fresh scent, in a convenient 3-pack." },
  { id: 9, name: "Ultra-Thin Panty Liners 40 pcs", price: 85.0, badge: "", vendor: "Sunkiss Official", category: "Feminine Care", sizes: ["One size"], inStock: true, added: 2, rating: 4.6, reviews: 27, description: "Barely-there liners for everyday freshness, individually wrapped for your bag." },
  { id: 10, name: "Adult Diapers – Large 10 pcs", price: 299.0, badge: "", vendor: "Care Plus", category: "For Adults", sizes: ["L"], inStock: true, added: 5, rating: 4.7, reviews: 38, description: "Maximum-absorbency adult diapers with refastenable tabs and a cloth-like feel." },
  { id: 11, name: "Scented Bathing Wipes 48 pcs", price: 112.0, badge: "-15%", vendor: "Island Hygiene", category: "Wipes", sizes: ["One size"], inStock: true, added: 8, rating: 4.4, reviews: 11, description: "Large, no-rinse bathing wipes with a soft aloe scent for refreshing bed baths." },
  { id: 12, name: "Soothing Intimate Wash 250 ml", price: 165.0, badge: "New", vendor: "Wellness Mauritius", category: "Self-Care", sizes: ["One size"], inStock: true, added: 10, rating: 4.8, reviews: 14, description: "A pH-balanced, gentle intimate wash with chamomile, suitable for daily use." },
  { id: 13, name: "Self-Care Travel Kit", price: 340.0, badge: "", vendor: "Sunkiss Official", category: "Self-Care", sizes: ["One size"], inStock: false, added: 1, rating: 4.9, reviews: 6, description: "A discreet travel pouch with liners, wipes and intimate wash — everything you need on the go." },
];

const categoryNames = ["Feminine Care", "For Adults", "Wipes", "Self-Care"];
const sizeNames = ["S/M", "M/L", "M", "L", "One size"];
const vendorNames = ["Sunkiss Official", "Wellness Mauritius", "Care Plus", "Island Hygiene"];
const sizeNotes: Record<string, string> = { "S/M": "50–78 cm", "M/L": "70–100 cm", M: "Waist 70–110 cm", L: "Waist 100–140 cm", "One size": "Fits all" };
const categoryDetails: Record<string, { advantages: string; composition: string }> = {
  "Feminine Care": { advantages: "Plus absorbency, dry and night protection, a soft flexible fit, and worry-free 360° coverage.", composition: "Non-Woven Fabric, Polyethylene film, Soft and Stretchy material" },
  "For Adults": { advantages: "Fast-absorbing core, odour control, breathable layers and secure leak guards.", composition: "Non-Woven Fabric, Super-absorbent polymer, Fluff pulp, Elastic leg cuffs" },
  Wipes: { advantages: "Soft, thick and dermatologically tested — gentle enough for daily use.", composition: "Plant-based viscose fibres, Purified water, Aloe vera extract" },
  "Self-Care": { advantages: "Gentle on skin, pH-balanced and thoughtfully packaged for discretion.", composition: "Aqua, Chamomile extract, Lactic acid, Glycerin" },
};

type CartLine = { id: number; size: string; qty: number };
type Toast = { key: number; title: string; text: string; action?: { label: string; onClick: () => void } };

const findProduct = (id: number) => products.find((p) => p.id === id) ?? products[0];
const money = (value: number) => `₨${value.toFixed(2)}`;
const stars = (rating: number) => "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));

function Logo({ onClick }: { onClick: () => void }) {
  return <button aria-label="Sunkiss home" className="logo-button" onClick={onClick}><img alt="Sunkiss" src={LOGO_IMAGE} /></button>;
}

type CardActions = { openProduct: (id: number) => void; addCart: (product: Product) => void; wishlist: number[]; toggleWish: (product: Product) => void; compare: number[]; toggleCompare: (product: Product) => void };

function ProductCard({ item, openProduct, addCart, wishlist, toggleWish, compare, toggleCompare }: CardActions & { item: Product }) {
  const wished = wishlist.includes(item.id);
  const compared = compare.includes(item.id);
  return (
    <article className="product-card">
      <div className="product-visual" onClick={() => openProduct(item.id)}>
        {item.badge && <span className={item.badge.includes("%") ? "badge sale" : "badge"}>{item.badge}</span>}
        <button aria-label={wished ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={wished} className={`round-action heart-action ${wished ? "active" : ""}`} onClick={(e) => { e.stopPropagation(); toggleWish(item); }}><Icon name="heart" size={17} /></button>
        <img alt={item.name} src={PRODUCT_IMAGE} />
        <div className="hover-actions">
          <button aria-label="Quick view" onClick={(e) => { e.stopPropagation(); openProduct(item.id); }}><Icon name="eye" size={17} /></button>
          <button aria-label={compared ? "Remove from compare" : "Add to compare"} aria-pressed={compared} className={compared ? "active" : ""} onClick={(e) => { e.stopPropagation(); toggleCompare(item); }}><Icon name="compare" size={17} /></button>
        </div>
      </div>
      <div className="product-info">
        <span className="vendor-label">Sold by {item.vendor}</span>
        <h3 onClick={() => openProduct(item.id)}>{item.name}</h3>
        <div className="rating"><span>{stars(item.rating)}</span><small>({item.reviews})</small></div>
        <div className="product-bottom">
          <strong>{money(item.price)}</strong>
          {item.inStock
            ? <button aria-label={`Add ${item.name} to cart`} className="add-button" onClick={() => addCart(item)}><Icon name="bag" size={18} /><span>Add to cart</span></button>
            : <span className="sold-out">Out of stock</span>}
        </div>
      </div>
    </article>
  );
}

function SectionHead({ eyebrow, title, action, onAction }: { eyebrow?: string; title: string; action?: string; onAction?: () => void }) {
  return <div className="section-head"><div>{eyebrow && <span>{eyebrow}</span>}<h2>{title}</h2></div>{action && <button className="text-link" onClick={onAction}>{action}<Icon name="arrow" size={17} /></button>}</div>;
}

function Home({ openShop, ...actions }: CardActions & { openShop: (category?: string) => void }) {
  const categories = [
    ["Feminine Care", "Intimate protection, thoughtfully made", "01"],
    ["For Adults", "Dependable comfort, day and night", "02"],
    ["Wipes", "A fresh, gentle everyday essential", "03"],
    ["Self-Care", "Small comforts that make a difference", "04"],
  ];
  const offers = products.filter((p) => p.badge && p.inStock).slice(0, 4);
  const adults = products.filter((p) => p.category === "For Adults").slice(0, 4);
  return <>
    <section className="hero">
      <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
      <div className="hero-copy">
        <span className="eyebrow-pill">Care that brings a better life</span>
        <h1>Comfort and confidence, <em>every day.</em></h1>
        <p>Discreet, dependable intimate and hygiene essentials, delivered with care anywhere in Mauritius.</p>
        <div className="hero-actions"><button className="primary-button" onClick={() => openShop()}>Shop essentials <Icon name="arrow" /></button><button className="secondary-button" onClick={() => actions.openProduct(1)}>Explore Sunkiss Intimates</button></div>
        <div className="hero-note"><Icon name="check" size={16} /> Discreet packaging, always</div>
      </div>
      <div className="hero-product">
        <div className="hero-product-card">
          <span className="mini-label">MOST LOVED</span>
          <img alt="Sunkiss Intimates period underwear" src={PRODUCT_IMAGE} />
          <div><strong>Sunkiss Intimates</strong><span>10 pieces · S/M</span></div>
        </div>
        <div className="floating-note"><Icon name="delivery" /><div><strong>Island-wide</strong><span>Reliable delivery</span></div></div>
      </div>
    </section>

    <section className="trust-row">
      <div><Icon name="delivery" /><span><strong>Island-Wide Delivery</strong><small>Across Mauritius</small></span></div>
      <div><Icon name="shield" /><span><strong>Secure Checkout</strong><small>Your details stay private</small></span></div>
      <div><Icon name="help" /><span><strong>Here When You Need Us</strong><small>Friendly 24/7 help center</small></span></div>
    </section>

    <section className="content-section categories-section">
      <SectionHead eyebrow="SHOP WITH EASE" title="Care for every need" action="View all categories" onAction={() => openShop()} />
      <div className="category-grid">{categories.map(([name, desc, number], index) =>
        <button className={`category-card c${index + 1}`} key={name} onClick={() => openShop(name)}>
          <span className="category-number">{number}</span>
          <span className="category-copy"><strong>{name}</strong><small>{desc}</small><i><Icon name="arrow" size={18} /></i></span>
          <img alt="" src={PRODUCT_IMAGE} />
        </button>)}
      </div>
    </section>

    <section className="content-section products-section">
      <SectionHead eyebrow="CURATED FOR YOU" title="Special offers" action="Shop all offers" onAction={() => openShop()} />
      <div className="product-grid">{offers.map((item) => <ProductCard item={item} key={item.id} {...actions} />)}</div>
    </section>

    <section className="care-banner">
      <div className="care-mark">SK</div>
      <div><span>THE SUNKISS PROMISE</span><h2>Personal care should feel personal.</h2><p>Products selected for comfort, confidence and dignity, with a team that is ready to help you choose.</p></div>
      <button className="light-button" onClick={() => openShop()}>Discover our range <Icon name="arrow" /></button>
    </section>

    <section className="content-section products-section">
      <SectionHead eyebrow="EVERYDAY COMFORT" title="For adults" action="View collection" onAction={() => openShop("For Adults")} />
      <div className="product-grid">{adults.map((item) => <ProductCard item={item} key={item.id} {...actions} />)}</div>
    </section>

    <Testimonials />
  </>;
}

const testimonials = [
  { quote: "A very easy and discreet experience from beginning to end. My order arrived quickly, and the product is exactly as described.", name: "Amélie M.", place: "Moka" },
  { quote: "The team was kind and helpful with sizing. It made choosing the right product feel simple.", name: "Rajesh J.", place: "Flacq" },
  { quote: "Ordering supplies for my mother used to be stressful. Now it arrives at her door in plain packaging, every month.", name: "Nadia P.", place: "Curepipe" },
  { quote: "Paying by bank transfer was straightforward and I got a confirmation right away. Delivery came the next day.", name: "Kevin L.", place: "Port Louis" },
  { quote: "The underwear is genuinely comfortable and I can sleep without worrying. I will definitely order again.", name: "Priya R.", place: "Quatre Bornes" },
  { quote: "Lovely local service. They answered my questions on WhatsApp within minutes and helped me choose the right size.", name: "Sophie D.", place: "Grand Baie" },
];

function Testimonials() {
  const [index, setIndex] = useState(0);
  const step = (delta: number) => setIndex((i) => (i + delta + testimonials.length) % testimonials.length);
  const card = (offset: number) => {
    const t = testimonials[(index + offset) % testimonials.length];
    const initials = t.name.split(" ").map((w) => w[0]).join("").replace(".", "");
    return <article className={`quote-card ${offset ? "secondary-quote" : ""}`} key={`${t.name}-${offset}`}><div className="quote-stars">★★★★★</div><blockquote>“{t.quote}”</blockquote><div className="quote-person"><span>{initials}</span><div><strong>{t.name}</strong><small>Verified customer · {t.place}</small></div><Icon name="check" /></div></article>;
  };
  return <section className="testimonials">
    <div className="quote-intro"><span>WHAT OUR CLIENTS SAY</span><h2>Trusted care,<br />felt every day.</h2><p>Real words from customers who trust Sunkiss for their personal care essentials.</p>
      <div className="slider-buttons"><button aria-label="Previous testimonial" onClick={() => step(-1)}><Icon name="arrow" /></button><button aria-label="Next testimonial" onClick={() => step(1)}><Icon name="arrow" /></button><small className="slider-count">{String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</small></div>
    </div>
    {card(0)}
    {card(1)}
  </section>;
}

function CompareBar({ items, open, remove, clear }: { items: Product[]; open: () => void; remove: (p: Product) => void; clear: () => void }) {
  return <div className="compare-bar" role="region" aria-label="Compare products">
    <div className="compare-thumbs">{items.map((p) => <button aria-label={`Remove ${p.name} from compare`} key={p.id} onClick={() => remove(p)} title={p.name}><img alt="" src={PRODUCT_IMAGE} /><Icon name="x" size={11} /></button>)}{Array.from({ length: 4 - items.length }, (_, i) => <span key={i} />)}</div>
    <div className="compare-actions"><button className="primary-button" disabled={items.length < 2} onClick={open}><Icon name="compare" size={17} /> Compare ({items.length})</button><button className="text-link" onClick={clear}>Clear</button></div>
    {items.length < 2 && <small>Add one more product to compare</small>}
  </div>;
}

function CompareModal({ items, close, remove, addCart, openProduct }: { items: Product[]; close: () => void; remove: (p: Product) => void; addCart: (p: Product) => void; openProduct: (id: number) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);
  const cheapest = Math.min(...items.map((p) => p.price));
  const best = Math.max(...items.map((p) => p.rating));
  const rows: [string, (p: Product) => React.ReactNode][] = [
    ["Price", (p) => <strong className={p.price === cheapest ? "best" : ""}>{money(p.price)}{p.price === cheapest && <small>Lowest price</small>}</strong>],
    ["Rating", (p) => <span className={p.rating === best ? "best" : ""}><span className="stars">{stars(p.rating)}</span> {p.rating} ({p.reviews})</span>],
    ["Category", (p) => p.category],
    ["Sold by", (p) => p.vendor],
    ["Sizes", (p) => p.sizes.map((s) => (s === "One size" ? s : `${s} (${sizeNotes[s]})`)).join(", ")],
    ["Availability", (p) => <span className={p.inStock ? "stock-yes" : "stock-no"}>{availabilityOf(p)}</span>],
    ["About", (p) => p.description],
  ];
  return <div className="compare-wrap">
    <button aria-label="Close compare" className="drawer-backdrop" onClick={close} />
    <div aria-modal="true" className="compare-modal" role="dialog" aria-label="Compare products">
      <div className="compare-head"><div><span className="overline">SIDE BY SIDE</span><h2>Compare products</h2></div><button aria-label="Close" onClick={close}><Icon name="x" /></button></div>
      <div className="compare-scroll">
        <table className="compare-table">
          <thead><tr><th />{items.map((p) => <th key={p.id}><button className="compare-remove" onClick={() => remove(p)}>Remove</button><img alt="" onClick={() => { close(); openProduct(p.id); }} src={PRODUCT_IMAGE} /><span onClick={() => { close(); openProduct(p.id); }}>{p.name}</span></th>)}</tr></thead>
          <tbody>
            {rows.map(([label, render]) => <tr key={label}><th>{label}</th>{items.map((p) => <td key={p.id}>{render(p)}</td>)}</tr>)}
            <tr><th /> {items.map((p) => <td key={p.id}>{p.inStock ? <button className="primary-button" onClick={() => addCart(p)}><Icon name="bag" size={17} /> Add to cart</button> : <span className="sold-out">Out of stock</span>}</td>)}</tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>;
}

type ListFilter = "categories" | "sizes" | "availability" | "vendors";
type Filters = Record<ListFilter, string[]> & { price: string };
type SortKey = "featured" | "price-asc" | "price-desc" | "newest" | "rating";

const PAGE_SIZE = 9;
const priceRanges: [string, string, number, number][] = [
  ["all", "Any price", 0, Infinity],
  ["under-100", "Under ₨100", 0, 100],
  ["100-200", "₨100 – ₨200", 100, 200],
  ["200-300", "₨200 – ₨300", 200, 300],
  ["over-300", "₨300 and above", 300, Infinity],
];
const availabilityOf = (p: Product) => (p.inStock ? "In stock" : "Out of stock");
const listFilterValue: Record<ListFilter, (p: Product) => string[]> = {
  categories: (p) => [p.category],
  sizes: (p) => p.sizes,
  availability: (p) => [availabilityOf(p)],
  vendors: (p) => [p.vendor],
};
const emptyFilters = (category?: string): Filters => ({ categories: category ? [category] : [], sizes: [], availability: [], vendors: [], price: "all" });

function FilterGroup({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return <div className={`filter-group ${open ? "open" : ""}`}><button aria-expanded={open} onClick={onToggle}><span>{title}</span><Icon name="chevron" size={17} /></button>{open && <div className="filter-options">{children}</div>}</div>;
}

const matchesSearch = (p: Product, query: string) => {
  const haystack = `${p.name} ${p.vendor} ${p.category} ${p.description}`.toLowerCase();
  return query.toLowerCase().split(/\s+/).filter(Boolean).every((word) => haystack.includes(word));
};

function Shop({ initialCategory, initialQuery = "", ...actions }: CardActions & { initialCategory?: string; initialQuery?: string }) {
  const [filters, setFilters] = useState<Filters>(() => emptyFilters(initialCategory));
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<SortKey>("featured");
  const [openGroups, setOpenGroups] = useState<string[]>(["Category", "Price range"]);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const results = useMemo(() => {
    const [, , min, max] = priceRanges.find(([key]) => key === filters.price) ?? priceRanges[0];
    const matches = products.filter((p) =>
      p.price >= min && p.price < max && matchesSearch(p, query) &&
      (Object.keys(listFilterValue) as ListFilter[]).every((key) => filters[key].length === 0 || listFilterValue[key](p).some((v) => filters[key].includes(v))));
    const sorters: Record<SortKey, (a: Product, b: Product) => number> = {
      featured: () => 0,
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      newest: (a, b) => b.added - a.added,
      rating: (a, b) => b.rating - a.rating,
    };
    return [...matches].sort(sorters[sort]);
  }, [filters, sort, query]);

  const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(pageNum, pages);
  const start = (current - 1) * PAGE_SIZE;
  const visible = results.slice(start, start + PAGE_SIZE);
  const activeCount = filters.categories.length + filters.sizes.length + filters.availability.length + filters.vendors.length + (filters.price === "all" ? 0 : 1);

  const update = (next: Filters) => { setFilters(next); setPageNum(1); };
  const toggleValue = (key: ListFilter, value: string) => update({ ...filters, [key]: filters[key].includes(value) ? filters[key].filter((v) => v !== value) : [...filters[key], value] });
  const toggleGroup = (title: string) => setOpenGroups(openGroups.includes(title) ? openGroups.filter((g) => g !== title) : [...openGroups, title]);
  const checkboxes = (key: ListFilter, options: string[]) => options.map((option) =>
    <label key={option}><input checked={filters[key].includes(option)} onChange={() => toggleValue(key, option)} type="checkbox" /> {option} <small>{products.filter((p) => listFilterValue[key](p).includes(option)).length}</small></label>);
  const title = query ? `Results for “${query}”` : filters.categories.length === 1 ? filters.categories[0] : "Shop all essentials";
  const clearAll = () => { update(emptyFilters()); setQuery(""); };

  return <main className="page-shell">
    <div className="breadcrumbs">Home <span>/</span> Shop all{filters.categories.length === 1 && <><span>/</span> {filters.categories[0]}</>}</div>
    <div className="shop-title"><div><span className="overline">SUN KISSED CARE</span><h1>{title}</h1>{query ? <p className="search-chip">Searching for <b>{query}</b><button aria-label="Clear search" onClick={() => { setQuery(""); setPageNum(1); }}><Icon name="x" size={13} /></button></p> : <p>Comfort, hygiene and confidence—chosen with care.</p>}</div><strong>{results.length} product{results.length !== 1 ? "s" : ""}</strong></div>
    <div className="shop-layout">
      <aside className={`filters ${mobileFilters ? "mobile-open" : ""}`}>
        <div className="filter-head"><strong>Filters{activeCount > 0 && ` (${activeCount})`}</strong><button disabled={activeCount === 0 && !query} onClick={clearAll}>Clear all</button></div>
        <FilterGroup onToggle={() => toggleGroup("Category")} open={openGroups.includes("Category")} title="Category">{checkboxes("categories", categoryNames)}</FilterGroup>
        <FilterGroup onToggle={() => toggleGroup("Price range")} open={openGroups.includes("Price range")} title="Price range">
          {priceRanges.map(([key, label, min, max]) => <label key={key}><input checked={filters.price === key} name="price" onChange={() => update({ ...filters, price: key })} type="radio" /> {label} <small>{products.filter((p) => p.price >= min && p.price < max).length}</small></label>)}
        </FilterGroup>
        <FilterGroup onToggle={() => toggleGroup("Size")} open={openGroups.includes("Size")} title="Size / Waist size">{checkboxes("sizes", sizeNames)}</FilterGroup>
        <FilterGroup onToggle={() => toggleGroup("Availability")} open={openGroups.includes("Availability")} title="Availability">{checkboxes("availability", ["In stock", "Out of stock"])}</FilterGroup>
        <FilterGroup onToggle={() => toggleGroup("Vendor")} open={openGroups.includes("Vendor")} title="Vendor">{checkboxes("vendors", vendorNames)}</FilterGroup>
        <button className="primary-button filters-done" onClick={() => setMobileFilters(false)}>Show {results.length} result{results.length !== 1 ? "s" : ""}</button>
      </aside>
      <section className="shop-results">
        <div className="sort-row">
          <button className="filter-mobile" onClick={() => setMobileFilters(!mobileFilters)}><Icon name="menu" /> Filters{activeCount > 0 && ` (${activeCount})`}</button>
          <span>{results.length === 0 ? "No products found" : `Showing ${start + 1}–${start + visible.length} of ${results.length}`}</span>
          <label>Sort by <select onChange={(e) => { setSort(e.target.value as SortKey); setPageNum(1); }} value={sort}><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="newest">Newest</option><option value="rating">Top rated</option></select></label>
        </div>
        {results.length === 0
          ? <div className="empty-state"><Icon name="search" size={38} /><h2>{query ? `No products match “${query}”` : "No products match these filters"}</h2><p>{query ? "Check the spelling, try a more general word, or browse all products." : "Try removing a filter or choosing a different price range."}</p><button className="primary-button" onClick={clearAll}>Clear all filters</button></div>
          : <div className="product-grid shop-grid">{visible.map((item) => <ProductCard item={item} key={item.id} {...actions} />)}</div>}
        {pages > 1 && <div className="pagination">
          <button aria-label="Previous page" disabled={current === 1} onClick={() => setPageNum(current - 1)}>‹</button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => <button className={n === current ? "current" : ""} key={n} onClick={() => setPageNum(n)}>{n}</button>)}
          <button aria-label="Next page" disabled={current === pages} onClick={() => setPageNum(current + 1)}>›</button>
        </div>}
      </section>
    </div>
  </main>;
}

function ProductDetail({ product, addCart, ...actions }: Omit<CardActions, "addCart"> & { product: Product; addCart: (product: Product, qty: number, size: string) => void }) {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("About the product");
  const [size, setSize] = useState(product.sizes[0]);
  const [thumb, setThumb] = useState(0);
  const wished = actions.wishlist.includes(product.id);
  const details = categoryDetails[product.category];
  const related = [...products.filter((p) => p.id !== product.id && p.category === product.category), ...products.filter((p) => p.category !== product.category)].slice(0, 4);
  return <main className="page-shell">
    <div className="breadcrumbs">Home <span>/</span> {product.category} <span>/</span> {product.name}</div>
    <section className="detail-layout">
      <div className="detail-gallery"><div className="thumbnails">{[0, 1, 2].map((i) => <button className={thumb === i ? "selected" : ""} key={i} onClick={() => setThumb(i)}><img alt="" src={PRODUCT_IMAGE} /></button>)}</div><div className="main-image">{product.badge && <span className={product.badge.includes("%") ? "badge sale" : "badge"}>{product.badge}</span>}<img alt={product.name} src={PRODUCT_IMAGE} /></div></div>
      <div className="detail-info">
        <span className="overline">{product.category}</span>
        <h1>{product.name} {sizeNotes[size] && size !== "One size" && <small>(Waist Size: {sizeNotes[size].replace("Waist ", "")})</small>}</h1>
        <div className="detail-rating"><span>{stars(product.rating)}</span><a href="#reviews">{product.rating} ({product.reviews} reviews)</a></div>
        <div className="detail-price">{money(product.price)}</div>
        <p className="detail-lead">{product.description}</p>
        <div className="seller-row"><span>Sold by</span><strong>{product.vendor}</strong><i><Icon name="check" size={13} /></i></div>
        {product.inStock ? <div className="in-stock"><span /> In stock — ready to dispatch</div> : <div className="in-stock out"><span /> Out of stock — back soon</div>}
        <div className="size-block"><div><strong>Select size</strong><small>Waist size guide</small></div><div className="size-buttons">{product.sizes.map((s) => <button className={size === s ? "selected" : ""} key={s} onClick={() => setSize(s)}>{s} <small>{sizeNotes[s]}</small></button>)}</div></div>
        <div className="purchase-row"><div className="stepper"><button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}><Icon name="minus" size={16} /></button><span>{qty}</span><button aria-label="Increase quantity" onClick={() => setQty(qty + 1)}><Icon name="plus" size={16} /></button></div><button className="primary-button grow" disabled={!product.inStock} onClick={() => addCart(product, qty, size)}><Icon name="bag" /> {product.inStock ? `Add to cart · ${money(product.price * qty)}` : "Out of stock"}</button><button aria-label={wished ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={wished} className={`wish-large ${wished ? "active" : ""}`} onClick={() => actions.toggleWish(product)}><Icon name="heart" /></button></div>
        <div className="micro-trust"><span><Icon name="delivery" /> Island-wide delivery</span><span><Icon name="shield" /> Discreet packaging</span></div>
      </div>
    </section>
    <section className="product-tabs">
      <div className="tab-list">{["About the product", "Advantages", "Composition & Materials"].map((name) => <button className={tab === name ? "active" : ""} key={name} onClick={() => setTab(name)}>{name}</button>)}</div>
      <div className="tab-content">{tab === "Composition & Materials" ? <><h3>Composition & Materials</h3><p>{details.composition}</p></> : tab === "Advantages" ? <><h3>Everyday confidence</h3><p>{details.advantages}</p></> : <><h3>Comfortable protection you can trust</h3><p>{product.description} Sold and shipped by {product.vendor}, delivered island-wide in discreet packaging.</p></>}</div>
    </section>
    <section className="products-section"><SectionHead eyebrow="YOU MAY ALSO LIKE" title="Related products" /><div className="product-grid">{related.map((item) => <ProductCard item={item} key={item.id} addCart={(p) => addCart(p, 1, p.sizes[0])} {...actions} />)}</div></section>
  </main>;
}

function Cart({ lines, setPage, changeQty, remove }: { lines: CartLine[]; setPage: (page: Page) => void; changeQty: (line: CartLine, delta: number) => void; remove: (line: CartLine) => void }) {
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = lines.reduce((sum, l) => sum + findProduct(l.id).price * l.qty, 0);
  const vendors = [...new Set(lines.map((l) => findProduct(l.id).vendor))];
  return <main className="page-shell narrow-page"><div className="breadcrumbs">Home <span>/</span> Cart</div><h1 className="page-title">Your cart <span>{count} item{count !== 1 ? "s" : ""}</span></h1>
    {lines.length === 0 ? <div className="empty-state"><Icon name="bag" size={38} /><h2>Your cart is feeling light</h2><p>Explore personal care essentials selected with your comfort in mind.</p><button className="primary-button" onClick={() => setPage("shop")}>Continue shopping</button></div> :
    <div className="cart-layout"><section className="cart-items">
      {vendors.map((vendor) => <div className="vendor-group" key={vendor}><div className="vendor-heading"><span>Sold by <strong>{vendor}</strong></span><span><Icon name="check" size={13} /> Verified vendor</span></div>
        {lines.filter((l) => findProduct(l.id).vendor === vendor).map((line) => { const p = findProduct(line.id); return <div className="cart-item" key={`${line.id}-${line.size}`}><img alt={p.name} src={PRODUCT_IMAGE} /><div><h3>{p.name}</h3><p>Size: {line.size}{sizeNotes[line.size] && line.size !== "One size" ? ` · ${sizeNotes[line.size]}` : ""}</p><button onClick={() => remove(line)}>Remove</button></div><div className="cart-item-price"><strong>{money(p.price * line.qty)}</strong><div className="stepper"><button aria-label="Decrease quantity" onClick={() => changeQty(line, -1)}><Icon name="minus" size={14} /></button><span>{line.qty}</span><button aria-label="Increase quantity" onClick={() => changeQty(line, 1)}><Icon name="plus" size={14} /></button></div></div></div>; })}
      </div>)}
      <div className="cart-reassure"><Icon name="shield" /><span><strong>Discreet packaging</strong><small>Your privacy is important to us.</small></span></div></section>
      <aside className="order-summary"><h2>Order summary</h2><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Delivery</span><span>Calculated at checkout</span></div><hr /><div className="summary-total"><span>Total</span><strong>{money(subtotal)}</strong></div><button className="primary-button" onClick={() => setPage("checkout")}>Proceed to checkout <Icon name="arrow" /></button><button className="text-link center" onClick={() => setPage("shop")}>Continue shopping</button></aside></div>}
  </main>;
}

function Checkout({ lines, complete }: { lines: CartLine[]; complete: (total: number) => void }) {
  const [payment, setPayment] = useState("bank");
  const subtotal = lines.reduce((sum, l) => sum + findProduct(l.id).price * l.qty, 0);
  return <main className="page-shell checkout-page"><div className="checkout-heading"><span className="overline">SECURE CHECKOUT</span><h1>Complete your order</h1><div className="checkout-steps"><span className="done">1</span><i /><span className="active">2</span><i /><span>3</span></div></div>
    <div className="checkout-layout"><section className="checkout-form">
      <div className="form-section"><h2><span>1</span> Contact details</h2><div className="form-grid"><label>Full name<input placeholder="Your full name" /></label><label>Email address<input placeholder="you@example.com" type="email" /></label><label className="full">Phone number<input placeholder="+230 5xxx xxxx" /></label></div></div>
      <div className="form-section"><h2><span>2</span> Delivery address</h2><div className="form-grid"><label className="full">Address<input placeholder="Street address" /></label><label>District<select defaultValue=""><option disabled value="">Select district</option>{["Black River", "Flacq", "Grand Port", "Moka", "Pamplemousses", "Plaines Wilhems", "Port Louis", "Rivière du Rempart", "Savanne"].map(d => <option key={d}>{d}</option>)}</select></label><label>Locality<input placeholder="Town or village" /></label></div></div>
      <div className="form-section"><h2><span>3</span> Delivery method</h2><label className="option-card selected"><input defaultChecked name="delivery" type="radio" /><Icon name="delivery" /><span><strong>Island-wide delivery</strong><small>2–4 business days</small></span><b>₨100.00</b></label></div>
      <div className="form-section"><h2><span>4</span> Payment method</h2><p className="payment-note">Choose how you would like to pay. We do not accept online card payments.</p>
        <label className={`option-card ${payment === "bank" ? "selected" : ""}`}><input checked={payment === "bank"} name="payment" onChange={() => setPayment("bank")} type="radio" /><Icon name="shop" /><span><strong>Bank Transfer</strong><small>Pay securely using your bank account. Instructions appear after ordering.</small></span></label>
        <label className={`option-card ${payment === "cod" ? "selected" : ""}`}><input checked={payment === "cod"} name="payment" onChange={() => setPayment("cod")} type="radio" /><Icon name="delivery" /><span><strong>Cash on Delivery</strong><small>Pay the courier when your order arrives.</small></span></label>
      </div>
    </section><aside className="order-summary sticky"><h2>Your order</h2>
      {lines.map((line) => { const p = findProduct(line.id); return <div className="summary-product" key={`${line.id}-${line.size}`}><img alt="" src={PRODUCT_IMAGE} /><span><strong>{p.name}</strong><small>Size: {line.size} · Qty: {line.qty}</small></span><b>{money(p.price * line.qty)}</b></div>; })}
      <hr /><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Delivery</span><strong>₨100.00</strong></div><hr /><div className="summary-total"><span>Total</span><strong>{money(subtotal + 100)}</strong></div><button className="primary-button" onClick={() => complete(subtotal + 100)}>Place order <Icon name="arrow" /></button><p className="summary-disclaimer"><Icon name="shield" size={15} /> Your details are protected and private.</p></aside></div>
  </main>;
}

function AccountForms({ notify }: { notify: (title: string, text: string) => void }) {
  const demoSubmit = (title: string) => (e: React.FormEvent) => { e.preventDefault(); notify(title, "This is a demo form — accounts will be enabled once the backend is connected."); };
  return <div className="auth-grid">
    <form className="auth-card" onSubmit={demoSubmit("Signed in (demo)")}>
      <h2>Sign in</h2>
      <p>Welcome back. Sign in to view your orders and saved items.</p>
      <div className="form-grid">
        <label className="full">Email address<input autoComplete="email" placeholder="you@example.com" type="email" /></label>
        <label className="full">Password<input autoComplete="current-password" placeholder="Your password" type="password" /></label>
      </div>
      <div className="auth-row"><label><input type="checkbox" /> Remember me</label><button className="auth-link" type="button">Forgot password?</button></div>
      <button className="primary-button" type="submit">Sign in <Icon name="arrow" /></button>
    </form>
    <form className="auth-card highlight" onSubmit={demoSubmit("Account created (demo)")}>
      <h2>Create an account</h2>
      <p>Check out faster, track orders and keep a wishlist of your essentials.</p>
      <div className="form-grid">
        <label>First name<input autoComplete="given-name" placeholder="First name" /></label>
        <label>Last name<input autoComplete="family-name" placeholder="Last name" /></label>
        <label className="full">Email address<input autoComplete="email" placeholder="you@example.com" type="email" /></label>
        <label className="full">Phone number<input autoComplete="tel" placeholder="+230 5xxx xxxx" type="tel" /></label>
        <label>Password<input autoComplete="new-password" placeholder="Create a password" type="password" /></label>
        <label>Confirm password<input autoComplete="new-password" placeholder="Repeat password" type="password" /></label>
      </div>
      <div className="auth-row"><label><input type="checkbox" /> I agree to the Terms & Conditions and Privacy Policy</label></div>
      <button className="primary-button" type="submit">Create account <Icon name="arrow" /></button>
    </form>
  </div>;
}

function TrackOrder() {
  const [orderNo, setOrderNo] = useState("SK-10482");
  const [shown, setShown] = useState(false);
  const day = (offset: number) => { const d = new Date(); d.setDate(d.getDate() + offset); return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }); };
  const steps = [
    { title: "Order placed", note: `${day(-3)} · 10:24`, state: "done" },
    { title: "Payment confirmed", note: `${day(-3)} · 14:05`, state: "done" },
    { title: "Packed discreetly", note: `${day(-2)} · 09:40`, state: "done" },
    { title: "Out for delivery", note: `${day(0)} · 08:15`, state: "current" },
    { title: "Delivered", note: `Expected ${day(0)}`, state: "" },
  ];
  const items = [{ p: findProduct(1), qty: 2 }, { p: findProduct(5), qty: 1 }];
  const subtotal = items.reduce((sum, { p, qty }) => sum + p.price * qty, 0);
  return <>
    <form className="track-box" onSubmit={(e) => { e.preventDefault(); setShown(true); }}>
      <label>Order number<input onChange={(e) => setOrderNo(e.target.value)} placeholder="e.g. SK-10482" value={orderNo} /></label>
      <label>Email address<input defaultValue="amelie@example.com" placeholder="you@example.com" type="email" /></label>
      <button className="primary-button" type="submit">Track order</button>
      <small className="track-hint">Demo: any order number shows the sample order below.</small>
    </form>
    {shown && <section className="track-result">
      <div className="track-card">
        <div className="track-summary">
          <div><span className="overline">ORDER</span><h2>{orderNo.trim() || "SK-10482"}</h2><p>Placed on {day(-3)} · 3 items · {money(subtotal + 100)}</p></div>
          <div className="track-eta"><span className="status-pill"><Icon name="delivery" size={15} /> Out for delivery</span><p>Estimated arrival <strong>today, 12:00 – 17:00</strong></p></div>
        </div>
        <ol className="timeline">{steps.map((s) => <li className={s.state} key={s.title}><span className="timeline-dot">{s.state === "done" ? <Icon name="check" size={15} /> : s.state === "current" ? <Icon name="delivery" size={15} /> : <Icon name="clock" size={15} />}</span><strong>{s.title}</strong><small>{s.note}</small></li>)}</ol>
        <div className="track-details">
          <div><h3>Items in this order</h3>{items.map(({ p, qty }) => <div className="summary-product" key={p.id}><img alt="" src={PRODUCT_IMAGE} /><span><strong>{p.name}</strong><small>Qty: {qty} · Sold by {p.vendor}</small></span><b>{money(p.price * qty)}</b></div>)}</div>
          <div><h3>Delivery details</h3><dl><dt>Deliver to</dt><dd>Amélie M., Royal Road, Moka</dd><dt>Courier</dt><dd>Sunkiss Express · Driver Kevin</dd><dt>Payment</dt><dd>Bank transfer · Paid</dd><dt>Packaging</dt><dd>Plain, unbranded box</dd></dl></div>
        </div>
      </div>
    </section>}
  </>;
}

function Wishlist({ setPage, addAll, ...actions }: CardActions & { setPage: (page: Page) => void; addAll: () => void }) {
  const saved = actions.wishlist.map(findProduct);
  const suggestions = products.filter((p) => p.inStock && !actions.wishlist.includes(p.id)).slice(0, 4);
  return <section className="wishlist-body">
    {saved.length === 0
      ? <div className="empty-state"><Icon name="heart" size={38} /><h2>Your wishlist is empty</h2><p>Tap the heart on any product to save it here for later.</p><button className="primary-button" onClick={() => setPage("shop")}>Browse products</button></div>
      : <><div className="wishlist-head"><strong>{saved.length} saved item{saved.length !== 1 ? "s" : ""}</strong><button className="primary-button" onClick={addAll}><Icon name="bag" /> Add all to cart</button></div><div className="product-grid">{saved.map((item) => <ProductCard item={item} key={item.id} {...actions} />)}</div></>}
    {suggestions.length > 0 && <div className="wishlist-suggestions"><SectionHead eyebrow="YOU MAY ALSO LIKE" title="Popular picks" /><div className="product-grid">{suggestions.map((item) => <ProductCard item={item} key={item.id} {...actions} />)}</div></div>}
  </section>;
}

function InfoPage({ page, setPage, children }: { page: Page; setPage: (page: Page) => void; children?: React.ReactNode }) {
  const content: Partial<Record<Page, [string, string, string]>> = {
    about: ["About Sunkiss", "Care that brings a better life.", "We believe everyone deserves to feel comfortable, confident and cared for. Sunkiss brings dependable personal care essentials to families across Mauritius with discretion, kindness and respect."],
    contact: ["Contact us", "We're here to help.", "Questions about a product, sizing or your order? Our friendly local team is ready to support you."],
    faq: ["Help center", "Frequently asked questions", "Find clear answers about orders, delivery, payment, returns and our products."],
    track: ["Order tracking", "Where is your order?", "Enter your order number and email address to see the latest delivery update."],
    account: ["My account", "Welcome back.", "Sign in or create an account to view your orders, wishlist, saved addresses and account details in one private place."],
    wishlist: ["Saved for later", "Your wishlist", "Keep your preferred personal care essentials close at hand."],
    vendor: ["Marketplace partners", "Become a Sunkiss vendor", "Reach customers across Mauritius and manage your products, orders and earnings from one simple dashboard."],
    terms: ["Legal", "Terms & Conditions", "The terms that apply when you browse and shop with Sunkiss."],
    privacy: ["Your privacy", "Privacy Policy", "How we collect, use and protect your personal information."],
    returns: ["Customer care", "Refund & Returns Policy", "Clear, fair guidance for returns and refunds on eligible products."],
  };
  const [eyebrow, title, text] = content[page] || content.about!;
  const faqItems = ["Orders", "Delivery across Mauritius", "Payment methods", "Returns & refunds", "Product information"];
  return <main className="info-page"><section className="info-hero"><span className="overline">{eyebrow}</span><h1>{title}</h1><p>{text}</p></section>
    {children ? children
    : page === "contact" ? <div className="info-content two-col"><section><h2>Send us a message</h2><div className="form-grid"><label>Name<input placeholder="Your name" /></label><label>Email<input placeholder="you@example.com" /></label><label className="full">Phone<input placeholder="+230" /></label><label className="full">Message<textarea placeholder="How can we help?" rows={5} /></label></div><button className="primary-button">Send message</button></section><aside><h2>Contact details</h2><p>Port Louis, Mauritius</p><p>hello@sunkiss.mu</p><p>+230 5252 5252</p><div className="map-placeholder">SUNKISS · MAURITIUS</div></aside></div>
    : page === "faq" ? <div className="faq-list">{faqItems.map((item, i) => <details key={item} open={i === 0}><summary>{item}<Icon name="plus" /></summary><p>Our support team has put together helpful guidance for {item.toLowerCase()}. If you still need help, please contact us and we will be happy to assist.</p></details>)}</div>
    : <div className="story-grid"><div><span>OUR MISSION</span><h2>Dignity, comfort and confidence in every delivery.</h2><p>{text}</p><p>Our values are simple: thoughtful service, trusted products, discreet delivery and genuine care for every customer.</p><button className="primary-button" onClick={() => setPage("shop")}>Shop our essentials <Icon name="arrow" /></button></div><div className="value-cards"><article><Icon name="heart" /><h3>Care with respect</h3><p>Personal support without judgement.</p></article><article><Icon name="shield" /><h3>Trusted essentials</h3><p>Quality products for daily confidence.</p></article><article><Icon name="delivery" /><h3>Local delivery</h3><p>Reliable service throughout Mauritius.</p></article></div></div>}
  </main>;
}

function ToastMessage({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  return <div className="toast" role="status">
    <span className="toast-icon"><Icon name="check" size={16} /></span>
    <div className="toast-body"><strong>{toast.title}</strong><span>{toast.text}</span>{toast.action && <button onClick={() => { toast.action!.onClick(); onClose(); }}>{toast.action.label} →</button>}</div>
    <button aria-label="Dismiss" className="toast-close" onClick={onClose}><Icon name="x" size={16} /></button>
  </div>;
}

function App() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [productId, setProductId] = useState(1);
  const [shopView, setShopView] = useState<{ key: number; category?: string; query?: string }>({ key: 0 });
  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [compare, setCompare] = useState<number[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [orderTotal, setOrderTotal] = useState<number | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const go = (next: Page) => { setPage(next); setOrderTotal(null); setMenuOpen(false); setMegaOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const openShop = (category?: string, query = "") => { setShopView((v) => ({ key: v.key + 1, category, query: query.trim() })); setSearch(query.trim()); setSearchCategory(category && query.trim() ? category : ""); go("shop"); };
  const submitSearch = (e: React.FormEvent) => { e.preventDefault(); openShop(searchCategory || undefined, search); };
  const openProduct = (id: number) => { setProductId(id); go("product"); };
  const notify = (title: string, text: string, action?: Toast["action"]) => setToast({ key: Date.now(), title, text, action });

  const cartCount = cart.reduce((sum, l) => sum + l.qty, 0);
  const total = useMemo(() => money(cart.reduce((sum, l) => sum + findProduct(l.id).price * l.qty, 0)), [cart]);

  const addCart = (product: Product, qty = 1, size = product.sizes[0]) => {
    setCart((lines) => lines.some((l) => l.id === product.id && l.size === size)
      ? lines.map((l) => (l.id === product.id && l.size === size ? { ...l, qty: l.qty + qty } : l))
      : [...lines, { id: product.id, size, qty }]);
    notify("Added to cart", `${qty} × ${product.name}`, { label: "View cart", onClick: () => go("cart") });
  };
  const changeQty = (line: CartLine, delta: number) => setCart((lines) => lines.map((l) => (l === line ? { ...l, qty: Math.max(1, l.qty + delta) } : l)));
  const removeLine = (line: CartLine) => setCart((lines) => lines.filter((l) => l !== line));
  const toggleWish = (product: Product) => {
    if (wishlist.includes(product.id)) {
      setWishlist(wishlist.filter((id) => id !== product.id));
      notify("Removed from wishlist", product.name);
    } else {
      setWishlist([...wishlist, product.id]);
      notify("Saved to wishlist", product.name, { label: "View wishlist", onClick: () => go("wishlist") });
    }
  };
  const addAllToCart = () => {
    const items = wishlist.map(findProduct).filter((p) => p.inStock);
    setCart((lines) => items.reduce((acc, p) => acc.some((l) => l.id === p.id && l.size === p.sizes[0]) ? acc.map((l) => (l.id === p.id && l.size === p.sizes[0] ? { ...l, qty: l.qty + 1 } : l)) : [...acc, { id: p.id, size: p.sizes[0], qty: 1 }], lines));
    notify("Added to cart", `${items.length} item${items.length !== 1 ? "s" : ""} from your wishlist`, { label: "View cart", onClick: () => go("cart") });
  };

  const toggleCompare = (product: Product) => {
    if (compare.includes(product.id)) {
      setCompare(compare.filter((id) => id !== product.id));
    } else if (compare.length >= 4) {
      notify("Compare is full", "You can compare up to 4 products. Remove one to add another.", { label: "Open compare", onClick: () => setCompareOpen(true) });
    } else {
      setCompare([...compare, product.id]);
      notify("Added to compare", product.name, compare.length >= 1 ? { label: `Compare ${compare.length + 1} products`, onClick: () => setCompareOpen(true) } : undefined);
    }
  };
  const compareItems = compare.map(findProduct);
  const closeCompare = useCallback(() => setCompareOpen(false), []);
  const showCompare = compareOpen && compareItems.length > 0;

  const cardActions: CardActions = { openProduct, addCart: (p) => addCart(p), wishlist, toggleWish, compare, toggleCompare };
  const nav = [["Home", "home"], ["About Us", "about"], ["Shop All", "shop"], ["Contact Us", "contact"], ["FAQ", "faq"]] as [string, Page][];
  const navTo = (target: Page) => (target === "shop" ? openShop() : go(target));

  return <div className={`app ${compare.length > 0 ? "has-compare" : ""}`}>
    <div className="announcement">Free island-wide delivery on orders over ₨1,500 <span>·</span> Discreet packaging, always</div>
    <header>
      <div className="header-main">
        <button className="mobile-menu" onClick={() => setMenuOpen(true)}><Icon name="menu" /></button>
        <Logo onClick={() => go("home")} />
        <form className="search-bar" onSubmit={submitSearch} role="search"><select aria-label="Search category" onChange={(e) => setSearchCategory(e.target.value)} value={searchCategory}><option value="">All categories</option>{categoryNames.map((c) => <option key={c}>{c}</option>)}</select><input aria-label="Search products" onChange={(e) => setSearch(e.target.value)} placeholder="What are you looking for?" type="search" value={search} /><button aria-label="Search" type="submit"><Icon name="search" /></button></form>
        <div className="header-actions">
          <button onClick={() => go("track")}><Icon name="delivery" /><span><small>Need help?</small>Track your order</span></button>
          <button onClick={() => go("account")}><Icon name="account" /><span><small>Welcome</small>Sign in / Register</span></button>
          <button aria-label="Wishlist" className="count-action" onClick={() => go("wishlist")}><Icon name="heart" /><i>{wishlist.length}</i></button>
          <button className="cart-action" onClick={() => go("cart")}><span className="count-action"><Icon name="bag" /><i>{cartCount}</i></span><span><small>Your cart</small>{total}</span></button>
        </div>
      </div>
      <nav className="desktop-nav">
        <button className="category-trigger" onClick={() => setMegaOpen(!megaOpen)}><Icon name="menu" size={18} /> Shop by Categories <Icon name="chevron" size={15} /></button>
        <div className="nav-links">{nav.map(([label, target]) => <button className={page === target ? "active" : ""} key={target} onClick={() => navTo(target)}>{label}</button>)}</div>
        <button className="vendor-link" onClick={() => go("vendor")}>Become a Vendor <Icon name="arrow" size={16} /></button>
      </nav>
      {megaOpen && <div className="mega-menu"><div><span>FEMININE CARE</span><button onClick={() => openShop("Feminine Care")}>Adult Booster Pads</button><button onClick={() => openShop("Feminine Care")}>Maternity Pants</button></div><div><span>FOR ADULTS</span><button onClick={() => openShop("For Adults")}>Adult Diapers</button><button onClick={() => openShop("For Adults")}>Adult Pants</button><button onClick={() => openShop("For Adults")}>Adult Underpads</button><button onClick={() => openShop("For Adults")}>Panty Liner</button></div><div><span>WIPES</span><button onClick={() => openShop("Wipes")}>Bathing</button><button onClick={() => openShop("Wipes")}>Flushable</button><button onClick={() => openShop("Wipes")}>Scented</button><button onClick={() => openShop("Wipes")}>Unscented</button></div><div className="mega-feature"><strong>Care, delivered.</strong><p>Island-wide delivery with privacy and respect.</p><button onClick={() => openShop()}>Shop all essentials <Icon name="arrow" /></button></div></div>}
    </header>

    {menuOpen && <div className="drawer-wrap"><button aria-label="Close menu" className="drawer-backdrop" onClick={() => setMenuOpen(false)} /><aside className="mobile-drawer"><div><Logo onClick={() => go("home")} /><button onClick={() => setMenuOpen(false)}><Icon name="x" /></button></div><form className="drawer-search" onSubmit={(e) => { e.preventDefault(); openShop(undefined, search); }} role="search"><Icon name="search" /><input aria-label="Search products" onChange={(e) => setSearch(e.target.value)} placeholder="Search products" type="search" value={search} /></form><span>MENU</span>{nav.map(([label, target]) => <button key={target} onClick={() => navTo(target)}>{label}<Icon name="arrow" /></button>)}<hr /><button onClick={() => go("wishlist")}>Wishlist ({wishlist.length})<Icon name="heart" /></button><button onClick={() => go("track")}>Track your order<Icon name="delivery" /></button><button onClick={() => go("vendor")}>Become a vendor<Icon name="shop" /></button></aside></div>}

    {orderTotal !== null ? <main className="confirmation"><div className="confirmation-icon"><Icon name="check" size={34} /></div><span className="overline">ORDER RECEIVED</span><h1>Thank you for your order.</h1><p>Your order number is <strong>SK-10482</strong>. We have sent a confirmation to your email.</p><div className="payment-instructions"><h2>Bank transfer instructions</h2><p>Please transfer <strong>{money(orderTotal)}</strong> using <strong>SK-10482</strong> as your payment reference.</p><div><span>Bank</span><strong>Mauritius Commercial Bank</strong><span>Account</span><strong>00044321987</strong></div><label>Upload proof of payment<input type="file" /></label><small>Order status: <b>Awaiting payment</b></small></div><button className="primary-button" onClick={() => go("track")}>Track your order <Icon name="arrow" /></button></main>
    : page === "home" ? <Home openShop={openShop} {...cardActions} />
    : page === "shop" ? <Shop initialCategory={shopView.category} initialQuery={shopView.query} key={shopView.key} {...cardActions} />
    : page === "product" ? <ProductDetail {...cardActions} addCart={addCart} key={productId} product={findProduct(productId)} />
    : page === "cart" ? <Cart changeQty={changeQty} lines={cart} remove={removeLine} setPage={go} />
    : page === "checkout" ? <Checkout complete={(amount) => { setOrderTotal(amount); setCart([]); window.scrollTo({ top: 0 }); }} lines={cart} />
    : page === "account" ? <InfoPage page={page} setPage={go}><AccountForms notify={notify} /></InfoPage>
    : page === "track" ? <InfoPage page={page} setPage={go}><TrackOrder /></InfoPage>
    : page === "wishlist" ? <InfoPage page={page} setPage={go}><Wishlist addAll={addAllToCart} setPage={go} {...cardActions} /></InfoPage>
    : <InfoPage page={page} setPage={go} />}

    {compare.length > 0 && !showCompare && <CompareBar clear={() => setCompare([])} items={compareItems} open={() => { setToast(null); setCompareOpen(true); }} remove={toggleCompare} />}
    {showCompare && <CompareModal addCart={(p) => addCart(p)} close={closeCompare} items={compareItems} openProduct={openProduct} remove={toggleCompare} />}

    {toast && <ToastMessage key={toast.key} onClose={() => setToast(null)} toast={toast} />}

    <section className="newsletter"><div><span>STAY IN THE KNOW</span><h2>Care, offers and a little something extra.</h2><p>Exclusive deals and offers—register for promotions and coupons.</p></div><form onSubmit={(e) => e.preventDefault()}><input aria-label="Email address" placeholder="Enter your email address" type="email" /><button>Sign me up <Icon name="arrow" /></button></form></section>
    <footer>
      <div className="footer-main"><div className="footer-brand"><Logo onClick={() => go("home")} /><p>Personal care essentials delivered across Mauritius with comfort, discretion and respect.</p><div className="socials"><button aria-label="Facebook"><Icon name="facebook" /></button><button aria-label="Instagram"><Icon name="instagram" /></button></div></div>
        <div className="footer-links"><div><strong>Customer Service</strong><button onClick={() => go("contact")}>Contact Us</button><button onClick={() => go("faq")}>FAQ</button><button onClick={() => go("track")}>Track Order</button><button onClick={() => go("account")}>My Account</button></div><div><strong>Useful Links</strong><button onClick={() => go("terms")}>Terms & Conditions</button><button onClick={() => go("privacy")}>Privacy Policy</button><button onClick={() => go("returns")}>Refund & Returns</button><button onClick={() => go("vendor")}>Become a Vendor</button></div><div><strong>Shop</strong><button onClick={() => openShop("Feminine Care")}>Feminine Care</button><button onClick={() => openShop("For Adults")}>For Adults</button><button onClick={() => openShop("Wipes")}>Wipes</button><button onClick={() => openShop()}>Special Offers</button></div></div>
        <div className="distributor"><span>Sunkiss is exclusively<br />distributed by</span><div>DISTRIBUTOR<br /><small>LOGO</small></div></div>
      </div><div className="footer-bottom"><span>© 2025 Sunkiss Mauritius. All rights reserved.</span><span>Made with care in Mauritius</span></div>
    </footer>
    <nav className="bottom-nav"><button className={page === "home" ? "active" : ""} onClick={() => go("home")}><Icon name="home" /><span>Home</span></button><button className={page === "shop" ? "active" : ""} onClick={() => openShop()}><Icon name="shop" /><span>Shop</span></button><button className={page === "cart" ? "active" : ""} onClick={() => go("cart")}><span><Icon name="bag" /><i>{cartCount}</i></span><b>Cart</b></button><button className={page === "account" ? "active" : ""} onClick={() => go("account")}><Icon name="account" /><span>Account</span></button></nav>
  </div>;
}

export default App;
