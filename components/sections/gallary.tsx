"use client";
import { useEffect, useRef, useState } from "react";

const BASE = "https://v0-mono-six.vercel.app";
const img = (f) => `${BASE}/images/${f}`;
const VIDEO =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27eb7fb4-0105-4010-ac9e-0ac977a31b05_1-FZ89nvBAAsR3caRJbhYv7T2mjBofth.mp4";

const SKETCHES = [
  "4312e1bb-e030-4528-b6df-8a6ea69fe384",
  "b2401fa5-4eac-465f-b1f9-014aadc182ee",
  "dd1b32a8-3722-4ea2-8808-10d53532809d",
  "61af06cc-84d0-4031-a0ed-76fc43b1c1e1",
  "249083d2-c49c-4c06-a125-376284d90c42",
  "7638f650-8586-4403-8c13-141921a04f9d",
  "5b3bdb95-fac7-4d22-aa97-98b5d547b2db",
  "634f7bae-77a5-49d0-a0ab-5271a6194e66",
  "09ffa8fd-cdd1-453f-9aa2-d6c702a1f4b5",
  "040e36b1-d16f-474b-a712-a9979e6ab479",
].map((id) => img(id + ".png"));

const MODELS = [
  {
    name: "Compact Model",
    text: "120m² living space with optimal energy efficiency",
    price: "$285,000",
    src: img("hero-side-1.png"),
  },
  {
    name: "Standard Model",
    text: "180m² perfect balance of space and sustainability",
    price: "$395,000",
    src: img("hero-side-2.png"),
  },
  {
    name: "Premium Model",
    text: "250m² expansive design with maximum comfort",
    price: "$525,000",
    src: img("hero-side-4.png"),
  },
];

const STATS = [
  { label: "Surface Area", n: 180, suffix: "m²" },
  { label: "Energy Use", n: 15, suffix: " kWh/m²" },
  { label: "Solar Panels", n: 40, suffix: " m²" },
  { label: "Carbon Balance", n: -20, suffix: "%" },
];

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* Writes --p (0 → 1 while the element crosses the viewport) or calls cb */
function useScroll(ref, cb) {
  useEffect(() => {
    let raf = 0;
    const run = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (cb) return cb(el, r, vh);
      el.style.setProperty(
        "--p",
        clamp((vh - r.top) / (vh + r.height)).toFixed(4),
      );
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []); // eslint-disable-line
}

function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [on, set] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          set(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, on];
}

/* Masked line that flips up in 3D when it enters the viewport */
function Lines({ lines, className = "" }) {
  const [ref, on] = useInView(0.35);
  return (
    <div ref={ref} className={`lines ${on ? "in" : ""} ${className}`}>
      {lines.map((t, i) => (
        <div className="mask" key={t}>
          <h2 style={{ "--i": i }}>{t}</h2>
        </div>
      ))}
    </div>
  );
}

/* Paragraph whose words light up as you scroll through it */
function Scrub({ text }) {
  const ref = useRef(null);
  const words = text.split(" ");
  useScroll(ref, (el, r, vh) => {
    const p = clamp((vh * 0.85 - r.top) / (vh * 0.5 + r.height * 0.6));
    el.querySelectorAll("span").forEach((s, i) => {
      s.style.opacity = i / words.length < p ? 1 : 0.18;
    });
  });
  return (
    <p ref={ref} className="scrub">
      {words.map((w, i) => (
        <span key={i}>{w} </span>
      ))}
    </p>
  );
}

function CountUp({ n, suffix }) {
  const [ref, on] = useInView(0.6);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) return;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const k = clamp((t - t0) / 1600);
      setV(Math.round(n * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, n]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

export default function HomePage() {
  const hero = useRef(null);
  const interior = useRef(null);
  const sketches = useRef(null);
  const rust = useRef(null);
  const video = useRef(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => a + 1), 4500);
    return () => clearInterval(t);
  }, [paused]);

  useScroll(hero, (el, r) =>
    el.style.setProperty("--h", clamp(-r.top / r.height).toFixed(4)),
  );
  useScroll(interior);
  useScroll(sketches);
  useScroll(rust);
  useScroll(video);

  const tilt = (e) => {
    const el = hero.current;
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    el.style.setProperty("--ry", `${(-y * 10).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(x * 14).toFixed(2)}deg`);
  };

  return (
    <main className="mono">
      <style>{CSS}</style>

      <header className={`nav ${scrolled ? "solid" : ""}`}>
        <a href="#hero" className="logo">
          MONO
        </a>
        <nav>
          <a href="#technology">Design</a>
          <a href="#gallery">Gallery</a>
          <a href="#accessories">Models</a>
          <a href="#about">About</a>
        </nav>
        <a href="#reserve" className="pill">
          Contact
        </a>
      </header>

      {/* HERO */}
      <section
        id="hero"
        ref={hero}
        className={`hero ${ready ? "ready" : ""}`}
        onMouseMove={tilt}
      >
        <div className="stage">
          <div className="scene">
            <figure className="hs s1">
              <img
                src={img("hero-side-1.png")}
                alt="Modern architecture with corten steel"
              />
            </figure>
            <figure className="hs s2">
              <img
                src={img("hero-side-2.png")}
                alt="Aerial view of modern home"
              />
            </figure>
            <figure className="hs s3">
              <img
                src={img("hero-side-3.png")}
                alt="Interior view with landscape"
              />
            </figure>
            <figure className="hs s4">
              <img
                src={img("hero-side-4.png")}
                alt="Modern architecture at night"
              />
            </figure>
            <figure className="hs center">
              <img
                src={img("hero-mono.png")}
                alt="Modern architectural structure with reflection"
              />
            </figure>
            <h1 className="title" aria-label="MONO">
              {"MONO".split("").map((c, i) => (
                <span key={i} style={{ "--i": i }}>
                  {c}
                </span>
              ))}
            </h1>
          </div>
        </div>
        <p className="tagline">
          Lightweight, durable
          <br />
          and adventure-ready.
        </p>
        <div className="scroll-cue" aria-hidden="true" />
      </section>

      {/* INTRO */}
      <section id="products" className="intro">
        <Lines
          lines={[
            "Sustainable Architecture.",
            "Built for Tomorrow.",
            "Eco-Responsible.",
          ]}
        />
        <p className="lead">
          A design home that combines contemporary aesthetics and energy
          performance. Built with eco-friendly materials, it minimizes carbon
          footprint while offering optimal comfort.
        </p>
      </section>

      {/* SKETCH MARQUEE (3D tilted) */}
      <section ref={sketches} className="sketches">
        <div className="tilt">
          <div className="track">
            {[...SKETCHES, ...SKETCHES].map((s, i) => (
              <img
                key={i}
                src={s}
                alt={`Architecture sketch ${(i % 10) + 1}`}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* INTERIOR */}
      <section ref={interior} className="interior">
        <img
          src={img("interior-view.png")}
          alt="Interior view with landscape"
        />
      </section>

      {/* DESIGN / SUSTAINABILITY */}
      <section id="technology" ref={rust} className="rust">
        <img
          className="bg"
          src={img("rusted-metal.png")}
          alt="Rusted metal texture"
        />
        <div className="veil" />
        <div className="inner">
          <Lines
            className="big"
            lines={[
              "Design & Sustainability.",
              "Passive Energy.",
              "Bio-sourced Construction.",
            ]}
          />
          <Scrub text="Passive architecture reimagining modern living. Triple glazing, reinforced insulation and natural ventilation combine with solar panels to create an energy-autonomous home. Bio-sourced materials like solid wood and hemp wool ensure healthy indoor air and minimal ecological footprint." />
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="gallery">
        {[
          ["mono-1.png", "sunrise"],
          ["mono-2.png", "daylight"],
          ["mono-3.png", "dusk"],
          ["mono-4.png", "night"],
        ].map(([f, a]) => (
          <figure key={f} tabIndex={0}>
            <img
              src={img(f)}
              alt={`Modern architecture at ${a}`}
              loading="lazy"
            />
          </figure>
        ))}
      </section>

      {/* MODELS: 3D ring carousel */}
      <section
        id="accessories"
        className="models"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <h2 className="section-title">Surface Options</h2>
        <div className="ring-wrap">
          <div className="ring" style={{ "--a": active }}>
            {MODELS.map((m, i) => {
              const isOn = ((active % 3) + 3) % 3 === i;
              return (
                <article
                  key={m.name}
                  className={`model ${isOn ? "on" : ""}`}
                  style={{ "--i": i }}
                >
                  <img src={m.src} alt={m.name} loading="lazy" />
                  <div className="meta">
                    <h3>{m.name}</h3>
                    <p>{m.text}</p>
                    <strong>{m.price}</strong>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="ctrl">
          <button
            onClick={() => setActive((a) => a - 1)}
            aria-label="Previous model"
          >
            ‹
          </button>
          <div className="dots">
            {MODELS.map((_, i) => (
              <i key={i} className={((active % 3) + 3) % 3 === i ? "on" : ""} />
            ))}
          </div>
          <button
            onClick={() => setActive((a) => a + 1)}
            aria-label="Next model"
          >
            ›
          </button>
        </div>
      </section>

      {/* VIDEO + STATS */}
      <section ref={video} className="video">
        <div className="frame">
          <video src={VIDEO} autoPlay muted loop playsInline />
          <div className="stats">
            {STATS.map((s) => (
              <div key={s.label}>
                <b>
                  <CountUp n={s.n} suffix={s.suffix} />
                </b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section id="about" className="about">
        <img
          src={img("testimonial-house.png")}
          alt="Modern corten steel architecture in natural landscape"
        />
        <blockquote>
          A passive house that combines contemporary design with environmental
          respect — built for those who refuse to choose between modern comfort
          and ecological responsibility.
        </blockquote>
      </section>

      {/* FOOTER */}
      <footer id="reserve" className="footer">
        <div className="brand">
          <a href="#hero" className="logo">
            MONO
          </a>
          <p>
            Sustainable design homes combining contemporary aesthetics with
            energy efficiency and eco-friendly materials.
          </p>
        </div>
        {[
          [
            "Explore",
            [
              ["Products", "#products"],
              ["Technology", "#technology"],
              ["Gallery", "#gallery"],
              ["Accessories", "#accessories"],
            ],
          ],
          [
            "About",
            [
              ["Our Story", "#"],
              ["Team", "#"],
              ["Careers", "#"],
              ["Contact", "#"],
            ],
          ],
          [
            "Service",
            [
              ["FAQ", "#"],
              ["Shipping", "#"],
              ["Returns", "#"],
              ["Warranty", "#"],
            ],
          ],
        ].map(([h, links]) => (
          <div key={h} className="col">
            <h4>{h}</h4>
            {links.map(([t, href]) => (
              <a key={t} href={href}>
                {t}
              </a>
            ))}
          </div>
        ))}
        <div className="base">
          <span>© 2026 MONO. All rights reserved.</span>
          <span className="social">
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">YouTube</a>
          </span>
        </div>
      </footer>
    </main>
  );
}

const CSS = `
.mono{--bg:#0f0e0d;--ink:#eee8df;--mute:#8f877c;--rust:#b4532a;background:var(--bg);color:var(--ink);
font-family:"Helvetica Neue",Inter,Arial,sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased}
.mono *{box-sizing:border-box;margin:0}
.mono img{display:block;width:100%;height:100%;object-fit:cover}
.mono a{color:inherit;text-decoration:none}
html{scroll-behavior:smooth}

/* NAV */
.nav{position:fixed;inset:0 0 auto;z-index:50;display:flex;align-items:center;justify-content:space-between;
padding:20px clamp(20px,4vw,56px);transition:background .4s,backdrop-filter .4s;mix-blend-mode:normal}
.nav.solid{background:rgba(15,14,13,.72);backdrop-filter:blur(14px)}
.logo{font-weight:700;letter-spacing:.3em;font-size:15px}
.nav nav{display:flex;gap:clamp(16px,3vw,40px);font-size:14px;color:var(--mute)}
.nav nav a{transition:color .25s}.nav nav a:hover{color:var(--ink)}
.pill{border:1px solid var(--ink);border-radius:99px;padding:9px 22px;font-size:14px;transition:background .3s,color .3s}
.pill:hover{background:var(--ink);color:var(--bg)}

/* HERO */
.hero{position:relative;height:100vh;min-height:620px;overflow:hidden;--ry:0deg;--rx:0deg;--h:0}
.stage{position:absolute;inset:0;perspective:1400px}
.scene{position:absolute;inset:0;transform-style:preserve-3d;
transform:rotateX(var(--ry)) rotateY(var(--rx)) translateY(calc(var(--h)*-60px));transition:transform .25s ease-out}
.hs{position:absolute;overflow:hidden;border-radius:4px;clip-path:inset(100% 0 0 0);
transition:clip-path 1.4s cubic-bezier(.77,0,.18,1) calc(var(--d,0)*1s)}
.ready .hs{clip-path:inset(0)}
.hs img{transform:scale(1.25);transition:transform 2.2s cubic-bezier(.2,.7,.2,1) calc(var(--d,0)*1s)}
.ready .hs img{transform:scale(1)}
.hs{animation:bob 7s ease-in-out infinite}
.center{left:50%;top:50%;width:min(30vw,420px);aspect-ratio:3/4;margin:calc(min(30vw,420px)*-.667) 0 0 calc(min(30vw,420px)*-.5);--d:.1;animation:none}
.s1{left:6%;top:16%;width:18vw;aspect-ratio:4/5;--d:.35;transform:translateZ(-140px)}
.s2{right:6%;top:12%;width:16vw;aspect-ratio:1;--d:.5;transform:translateZ(-60px);animation-delay:-2s}
.s3{left:15%;bottom:9%;width:14vw;aspect-ratio:4/5;--d:.65;transform:translateZ(70px);animation-delay:-4s}
.s4{right:12%;bottom:8%;width:17vw;aspect-ratio:5/4;--d:.8;transform:translateZ(-100px);animation-delay:-1s}
@keyframes bob{50%{translate:0 -14px}}
.title{position:absolute;left:0;right:0;top:50%;display:flex;justify-content:center;
font-size:clamp(90px,26vw,420px);line-height:.8;font-weight:800;letter-spacing:-.04em;transform:translateZ(150px) translateY(-46%) scale(calc(1 + var(--h)*.5));
mix-blend-mode:difference;color:#fff;pointer-events:none;opacity:calc(1 - var(--h)*1.2)}
.title span{display:inline-block;transform:translateY(120%) rotateX(-80deg);opacity:0;
transition:transform 1.2s cubic-bezier(.2,.8,.2,1) calc(.5s + var(--i)*.09s),opacity .8s calc(.5s + var(--i)*.09s)}
.ready .title span{transform:none;opacity:1}
.tagline{position:absolute;left:clamp(20px,4vw,56px);bottom:clamp(24px,5vh,48px);z-index:5;font-size:clamp(14px,1.3vw,18px);line-height:1.5;color:var(--ink);
opacity:0;transform:translateY(20px);transition:opacity 1s 1.6s,transform 1s 1.6s}
.ready .tagline{opacity:1;transform:none}
.scroll-cue{position:absolute;right:clamp(20px,4vw,56px);bottom:clamp(24px,5vh,48px);width:1px;height:56px;background:linear-gradient(var(--ink),transparent);animation:cue 2s infinite;transform-origin:top}
@keyframes cue{0%{transform:scaleY(0)}60%{transform:scaleY(1)}100%{transform:scaleY(1);opacity:0}}

/* TEXT MOTION */
.lines .mask{overflow:hidden;perspective:800px;padding-bottom:.08em}
.lines h2{font-weight:600;font-size:clamp(32px,6.2vw,96px);line-height:1.02;letter-spacing:-.035em;transform-origin:50% 100%;
transform:translateY(105%) rotateX(-70deg);opacity:0;transition:transform 1.1s cubic-bezier(.2,.8,.2,1) calc(var(--i)*.14s),opacity .9s calc(var(--i)*.14s)}
.lines.in h2{transform:none;opacity:1}
.scrub{font-size:clamp(20px,2.6vw,38px);line-height:1.3;letter-spacing:-.015em;max-width:26ch;max-width:min(980px,100%)}
.scrub span{transition:opacity .35s}

/* SECTIONS */
.intro{padding:clamp(100px,18vh,220px) clamp(20px,4vw,56px) clamp(60px,10vh,120px);display:grid;gap:48px}
.lead{max-width:560px;margin-left:auto;font-size:clamp(16px,1.4vw,20px);line-height:1.6;color:var(--mute)}

.sketches{padding:6vh 0;perspective:1600px;overflow:hidden}
.tilt{transform:rotateY(-14deg) rotateX(calc(8deg - var(--p)*10deg)) scale(1.05);transform-style:preserve-3d}
.track{display:flex;gap:20px;width:max-content;animation:run 60s linear infinite}
.track img{width:clamp(180px,20vw,300px);aspect-ratio:3/4;border-radius:4px;filter:grayscale(.4) contrast(1.05);transition:filter .4s,transform .4s}
.track img:hover{filter:none;transform:translateZ(60px) scale(1.04)}
@keyframes run{to{transform:translateX(-50%)}}

.interior{height:100vh;overflow:hidden;position:relative}
.interior img{transform:scale(calc(1.3 - var(--p,0)*.3)) translateY(calc((var(--p,0) - .5)*-8%))}

.rust{position:relative;padding:clamp(100px,20vh,240px) clamp(20px,4vw,56px);overflow:hidden;min-height:100vh;display:flex;align-items:center}
.rust .bg{position:absolute;inset:-10% 0;height:120%;transform:translateY(calc((var(--p,0) - .5)*-12%))}
.rust .veil{position:absolute;inset:0;background:linear-gradient(90deg,rgba(15,14,13,.92),rgba(15,14,13,.55))}
.rust .inner{position:relative;display:grid;gap:clamp(40px,8vh,90px)}
.big h2{font-size:clamp(34px,7vw,110px)}

.gallery{display:flex;height:80vh;gap:6px;padding:0 6px}
.gallery figure{flex:1;overflow:hidden;border-radius:4px;transition:flex 1s cubic-bezier(.2,.8,.2,1);outline-offset:-3px}
.gallery figure:hover,.gallery figure:focus-visible{flex:3.2}
.gallery img{transition:transform 1.2s cubic-bezier(.2,.8,.2,1);transform:scale(1.15)}
.gallery figure:hover img{transform:scale(1)}

.models{padding:clamp(100px,16vh,200px) 0 clamp(80px,12vh,140px);overflow:hidden}
.section-title{font-size:clamp(32px,5vw,72px);letter-spacing:-.035em;font-weight:600;padding:0 clamp(20px,4vw,56px);margin-bottom:clamp(40px,8vh,90px)}
.ring-wrap{--R:clamp(240px,30vw,440px);perspective:1800px;height:clamp(420px,58vh,620px);display:flex;align-items:center;justify-content:center}
.ring{position:relative;width:clamp(230px,24vw,360px);height:100%;transform-style:preserve-3d;
transform:translateZ(calc(var(--R)*-1)) rotateY(calc(var(--a)*-120deg));transition:transform 1.3s cubic-bezier(.65,0,.2,1)}
.model{position:absolute;inset:0;display:flex;flex-direction:column;gap:16px;transform:rotateY(calc(var(--i)*120deg)) translateZ(var(--R));
opacity:.35;filter:blur(2px);transition:opacity .9s,filter .9s}
.model.on{opacity:1;filter:none}
.model img{flex:1;border-radius:6px;min-height:0}
.meta h3{font-size:22px;font-weight:600;letter-spacing:-.02em}
.meta p{color:var(--mute);font-size:14px;line-height:1.5;margin:6px 0 10px}
.meta strong{font-size:20px;font-weight:500;color:var(--rust)}
.ctrl{display:flex;align-items:center;justify-content:center;gap:24px;margin-top:32px}
.ctrl button{width:48px;height:48px;border-radius:50%;border:1px solid rgba(238,232,223,.35);background:none;color:var(--ink);font-size:22px;cursor:pointer;transition:background .3s,color .3s}
.ctrl button:hover{background:var(--ink);color:var(--bg)}
.dots{display:flex;gap:8px}.dots i{width:8px;height:8px;border-radius:50%;background:rgba(238,232,223,.25);transition:width .4s,background .4s}
.dots i.on{width:28px;border-radius:8px;background:var(--rust)}

.video{padding:6vh clamp(10px,3vw,40px);perspective:1400px}
.frame{position:relative;border-radius:10px;overflow:hidden;aspect-ratio:16/9;
transform:rotateX(calc((.55 - var(--p,0))*22deg)) scale(calc(.88 + var(--p,0)*.12));transform-origin:50% 100%}
.frame video{width:100%;height:100%;object-fit:cover}
.stats{position:absolute;inset:auto 0 0;display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:clamp(16px,3vw,40px);
background:linear-gradient(transparent,rgba(0,0,0,.75))}
.stats b{display:block;font-size:clamp(22px,4vw,56px);font-weight:600;letter-spacing:-.03em}
.stats span{font-size:clamp(11px,1vw,14px);color:#cfc7bb}

.about{position:relative;min-height:90vh;display:flex;align-items:flex-end;overflow:hidden}
.about img{position:absolute;inset:0}
.about::after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 30%,rgba(15,14,13,.9))}
.about blockquote{position:relative;z-index:2;max-width:880px;padding:clamp(24px,5vw,72px);font-size:clamp(20px,2.6vw,38px);line-height:1.3;letter-spacing:-.02em}

.footer{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;padding:clamp(60px,10vh,120px) clamp(20px,4vw,56px) 28px}
.brand p{margin-top:18px;max-width:34ch;color:var(--mute);line-height:1.6;font-size:14px}
.col{display:flex;flex-direction:column;gap:10px;font-size:14px}
.col h4{font-size:14px;font-weight:600;margin-bottom:8px}
.col a{color:var(--mute);transition:color .25s,transform .25s}.col a:hover{color:var(--ink);transform:translateX(4px)}
.base{grid-column:1/-1;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:40px;padding-top:24px;border-top:1px solid rgba(238,232,223,.12);font-size:13px;color:var(--mute)}
.social{display:flex;gap:20px}.social a:hover{color:var(--ink)}

@media (max-width:800px){
  .nav nav{display:none}
  .center{width:58vw;margin:calc(58vw*-.667) 0 0 -29vw}
  .s1{width:34vw;left:3%}.s2{width:30vw;right:3%}.s3,.s4{display:none}
  .gallery{flex-direction:column;height:auto}.gallery figure{height:34vh;flex:none}
  .stats{grid-template-columns:repeat(2,1fr)}
  .footer{grid-template-columns:1fr 1fr}.brand{grid-column:1/-1}
}
@media (prefers-reduced-motion:reduce){
  .mono *{animation:none!important;transition-duration:.01ms!important}
}
.mono a:focus-visible,.mono button:focus-visible,.gallery figure:focus-visible{outline:2px solid var(--rust);outline-offset:3px}
`;
