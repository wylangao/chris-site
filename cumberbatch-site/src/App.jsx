import { useState, useEffect, useMemo } from "react";

const BLUE = "#1a1a8a";
const BLUE_DARK = "#0e0e5c";
const ORANGE = "#f5a623";
const ORANGE_LIGHT = "#ffbe45";
const WHITE = "#fffdf5";
const CREAM = "#fef5dc";

const tickerItems = [
  "JUSTICE", "MIDWEST GRIT", "LEADERSHIP", "DEBATE",
  "HAWKEYE", "COURAGE", "SERVICE",
  "EQUITY", "HONOR", "COMMUNITY", "ADVOCATE",
];

/* ── wavy SVG divider ─────────────────────────── */
function WaveDivider({ topColor, bottomColor, flip }) {
  return (
    <div style={{ marginTop: -2, marginBottom: -2, lineHeight: 0, overflow: "hidden", transform: flip ? "scaleY(-1)" : "none" }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: 30, display: "block" }}>
        <path
          d="M0,30 C120,55 240,5 360,30 C480,55 600,5 720,30 C840,55 960,5 1080,30 C1200,55 1320,5 1440,30 L1440,60 L0,60 Z"
          fill={bottomColor}
        />
        <rect x="0" y="0" width="1440" height="30" fill={topColor} />
        <path
          d="M0,30 C120,55 240,5 360,30 C480,55 600,5 720,30 C840,55 960,5 1080,30 C1200,55 1320,5 1440,30 L1440,60 L0,60 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}

/* ── subtle background stars ──────────────────── */
function Stars() {
  const stars = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 1.5,
      delay: Math.random() * 6,
      duration: 3 + Math.random() * 5,
      opacity: 0.08 + Math.random() * 0.15,
    })), []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      {stars.map((s) => (
        <div key={s.id} style={{
          position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size, borderRadius: "50%",
          background: "#fff", opacity: s.opacity,
          animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
        }} />
      ))}
    </div>
  );
}

/* ── scrolling ticker ─────────────────────────── */
function Ticker() {
  const tripled = [...tickerItems, ...tickerItems, ...tickerItems];
  return (
    <div style={{
      background: BLUE_DARK, overflow: "hidden", whiteSpace: "nowrap",
      padding: "12px 0", position: "relative", zIndex: 10,
      borderTop: `3px solid ${ORANGE}`, borderBottom: `3px solid ${ORANGE}`,
    }}>
      <div style={{ display: "inline-block", animation: "tickerScroll 25s linear infinite" }}>
        {tripled.map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Anton', sans-serif", fontSize: "16px",
            color: ORANGE, letterSpacing: "4px", textTransform: "uppercase",
            marginRight: "36px",
          }}>
            {item} ·
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── navigation ───────────────────────────────── */
function Nav({ activeSection, onNav }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "About", "Experience", "Vision", "Media", "Contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: BLUE, borderBottom: `4px solid ${ORANGE}`,
    }}>
      <div style={{
        background: "rgba(0,0,0,0.3)", textAlign: "right",
        padding: "4px 24px",
        fontFamily: "'DM Sans', sans-serif", fontSize: 13,
        color: "rgba(255,255,255,0.5)", letterSpacing: 1,
      }}>
        Website by{" "}
        <a href="https://wylangao.me" target="_blank" rel="noopener noreferrer" style={{
          color: ORANGE, textDecoration: "none", fontWeight: 600,
        }}>
          wylan<span style={{ color: ORANGE }}>gao</span>.me
        </a>
      </div>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center", height: 90,
      }}>
        <div onClick={() => onNav("Home")} style={{
          fontFamily: "'Anton', sans-serif", fontSize: "30px",
          color: ORANGE, letterSpacing: "4px", cursor: "pointer",
        }}>
          CHRISTOPHER CUMBERBATCH
        </div>
        <div className="nav-desktop" style={{ display: "flex", gap: 36 }}>
          {links.map((l) => (
            <button key={l} onClick={() => { onNav(l); setMenuOpen(false); }} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Anton', sans-serif", fontSize: "18px",
              color: activeSection === l ? ORANGE : "rgba(255,255,255,0.7)",
              letterSpacing: "3px", textTransform: "uppercase",
              borderBottom: activeSection === l ? `3px solid ${ORANGE}` : "3px solid transparent",
              paddingBottom: 4, transition: "all 0.2s",
            }}>
              {l}
            </button>
          ))}
        </div>
        <button className="nav-mobile-btn" onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none",
          color: ORANGE, fontSize: 30, cursor: "pointer",
        }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {menuOpen && (
        <div className="nav-mobile-menu" style={{
          background: BLUE, padding: "16px 24px", display: "flex",
          flexDirection: "column", gap: 12,
        }}>
          {links.map((l) => (
            <button key={l} onClick={() => { onNav(l); setMenuOpen(false); }} style={{
              background: "none", border: "none", cursor: "pointer", textAlign: "left",
              fontFamily: "'Anton', sans-serif", fontSize: "22px", padding: "8px 0",
              color: activeSection === l ? ORANGE : "rgba(255,255,255,0.7)",
              letterSpacing: "3px", textTransform: "uppercase",
            }}>
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ── hero section ─────────────────────────────── */
function Hero() {
  const slides = [
    { src: "/profilepic.png", label: "Soldier" },
    { src: "/group.jpg",      label: "Black Law Student Association" },
    { src: "/chris.jpg",      label: "Christopher" },
    { src: "/aboutchris.png", label: "Public Servant" },
    { src: "/farmfriends.jpg",label: "Farm Friends" },
  ];
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setSlideIndex((i) => (i + 1) % slides.length), 10000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section id="Home" style={{
      background: BLUE, minHeight: "100vh", display: "flex",
      flexDirection: "column", justifyContent: "center", alignItems: "center",
      padding: "120px 24px 60px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        maxWidth: 1100, width: "100%", margin: "0 auto",
        display: "flex", alignItems: "center", gap: 60,
        flexWrap: "wrap", justifyContent: "center",
      }}>
        {/* text side */}
        <div style={{ flex: "1 1 400px", textAlign: "left", minWidth: 280 }}>
          <div style={{
            display: "inline-block", background: ORANGE, color: BLUE,
            fontFamily: "'Anton', sans-serif", fontSize: "16px",
            letterSpacing: "3px", textTransform: "uppercase",
            padding: "16px 36px", borderRadius: 2, marginBottom: 28,
            animation: "fadeInDown 0.8s ease-out",
          }}>
            ★ ADVOCATE ★
          </div>

          <h1 style={{
            fontFamily: "'Anton', sans-serif", fontSize: "clamp(50px, 9vw, 110px)",
            color: WHITE, lineHeight: 0.95, margin: 0,
            letterSpacing: "2px", textTransform: "uppercase",
            animation: "fadeInUp 0.8s ease-out 0.2s both",
          }}>
            CHRISTOPHER
          </h1>
          <h1 style={{
            fontFamily: "'Anton', sans-serif", fontSize: "clamp(50px, 9vw, 110px)",
            color: ORANGE, lineHeight: 0.95, margin: 0,
            letterSpacing: "2px", textTransform: "uppercase",
            animation: "fadeInUp 0.8s ease-out 0.4s both",
          }}>
            CUMBERBATCH
          </h1>

          <div style={{
            width: 80, height: 5, background: ORANGE,
            margin: "28px 0", animation: "fadeInUp 0.8s ease-out 0.6s both",
          }} />

          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
            fontSize: "clamp(22px, 3.5vw, 32px)",
            color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: "0 0 6px",
            animation: "fadeInUp 0.8s ease-out 0.7s both",
          }}>
            On The Side Of Justice, Fighting For You
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
            fontSize: "clamp(14px, 2vw, 18px)",
            color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: "0 0 36px",
            animation: "fadeInUp 0.8s ease-out 0.8s both",
          }}>
            Public Servant, Community Leader, Attorney
          </p>

          <div style={{
            display: "flex", gap: 16, flexWrap: "wrap",
            animation: "fadeInUp 0.8s ease-out 1s both",
          }}>
            <a href="#About" style={{
              fontFamily: "'Anton', sans-serif", fontSize: 16,
              letterSpacing: "3px", textTransform: "uppercase",
              background: ORANGE, color: BLUE, padding: "16px 36px",
              border: "none", textDecoration: "none", cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={(e) => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 8px 25px rgba(245,166,35,0.35)"; }}
              onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>
              MY VISION
            </a>
            <a href="#Contact" style={{
              fontFamily: "'Anton', sans-serif", fontSize: 16,
              letterSpacing: "3px", textTransform: "uppercase",
              background: "transparent", color: WHITE, padding: "16px 36px",
              border: `3px solid rgba(255,255,255,0.3)`,
              textDecoration: "none", cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { e.target.style.borderColor = WHITE; e.target.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.3)"; e.target.style.background = "transparent"; }}>
              CONTACT
            </a>
            <a href="/resume.pdf" download="Christopher_Cumberbatch_Resume.pdf" style={{
              fontFamily: "'Anton', sans-serif", fontSize: 16,
              letterSpacing: "3px", textTransform: "uppercase",
              background: "transparent", color: ORANGE, padding: "16px 36px",
              border: `3px solid ${ORANGE}`,
              textDecoration: "none", cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { e.target.style.background = ORANGE; e.target.style.color = BLUE; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = ORANGE; }}>
              RESUME
            </a>
          </div>
        </div>

        {/* photo side */}
        <div style={{ flex: "0 0 auto", animation: "fadeInUp 0.8s ease-out 0.5s both", cursor: "pointer" }}
          onClick={() => setSlideIndex((i) => (i + 1) % slides.length)}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { setSlideIndex(0); setPaused(false); }}>
          <div style={{
            position: "relative",
            width: "clamp(220px, 26vw, 320px)",
            height: "clamp(270px, 32vw, 400px)",
          }}>
            <div style={{
              position: "absolute", top: 10, left: 10, right: -10, bottom: -10,
              border: `5px solid ${ORANGE}`, zIndex: 0,
            }} />
            <img src={slides[slideIndex].src} alt={slides[slideIndex].label}
              style={{
                position: "relative", width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "top center", zIndex: 1,
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                transition: "opacity 0.5s ease",
              }} />
            <div style={{
              position: "absolute", bottom: -18, left: "50%", transform: "translateX(-50%)",
              background: ORANGE, color: BLUE,
              fontFamily: "'Anton', sans-serif", fontSize: 13,
              letterSpacing: 4, textTransform: "uppercase",
              padding: "10px 22px", whiteSpace: "nowrap", zIndex: 2,
            }}>
              {slides[slideIndex].label}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── about section ────────────────────────────── */
function About() {
  return (
    <section id="About" style={{ background: ORANGE, padding: "100px 24px", position: "relative" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{
          fontFamily: "'Anton', sans-serif", fontSize: 24, letterSpacing: 5,
          textTransform: "uppercase", color: BLUE, marginBottom: 12, opacity: 0.6,
        }}>
          WHO I AM
        </div>
        <h2 style={{
          fontFamily: "'Anton', sans-serif", fontSize: "clamp(28px, 4.5vw, 60px)",
          lineHeight: 1.05, margin: "0 0 40px", textTransform: "uppercase",
        }}>
          <span style={{ color: WHITE, textShadow: `2px 2px 0px ${BLUE}`, letterSpacing: "12px" }}>THE NEW KID</span>
        </h2>

        <div style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* photo */}
          <div style={{ flex: "0 0 auto" }}>
            <div style={{ position: "relative", width: "clamp(220px, 24vw, 320px)" }}>
              <div style={{
                position: "absolute", top: 10, left: 10, right: -10, bottom: -10,
                border: `5px solid ${BLUE}`, zIndex: 0,
              }} />
              <img src="/aboutchris.png" alt="Christopher Cumberbatch"
                style={{
                  position: "relative", width: "100%", display: "block",
                  objectFit: "cover", zIndex: 1,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
                }} />
            </div>
          </div>

          {/* text */}
          <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              "My parents immigrated from the Caribbean, and instilled in me a pride in being American, a strong sense of justice, and empathy for others. Growing up, I lived in 8 different states, ranging from Seattle Washington, to Virginia, all the way to Texas, before finding a home in Iowa. I've had to learn how to make friends and work with people from every walk of life.",
              "Moving so much has led me to place the highest emphasis on community. To help out and leave a lasting impact on where I live and the people around me. The best way of doing this, to me, is volunteering to help in community projects and protecting the people from those who would do them harm as a criminal lawyer.",
              "I enlisted at 19 in the army as a combat engineer to give back to the country that has given me so much. Today, I continue my service in the Iowa National Guard and lead soldiers as an officer. The army has given me the intense work ethic that has gotten me to where I am today, and is where I have found my greatest mentors. I look forward to continuing to serve this country and represent my community."
            ].map((text, i) => (
              <p key={i} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 16,
                lineHeight: 1.85, color: BLUE_DARK, margin: 0, opacity: 0.85,
              }}>
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* stats bar */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 0, marginTop: 60, background: BLUE, overflow: "hidden",
        }}>
          {[
            { num: "5+", label: "Years Legal Exp." },
            { num: "2LT", label: "National Guard" },
            { num: "500+", label: "Hrs Community Service" },
            { num: "1st", label: "Gen Graduate" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "32px 20px", textAlign: "center",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none",
            }}>
              <div style={{
                fontFamily: "'Anton', sans-serif", fontSize: 38, color: ORANGE,
              }}>
                {s.num}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 12,
                color: "rgba(255,255,255,0.5)", letterSpacing: 2,
                textTransform: "uppercase", marginTop: 4,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── experience section ───────────────────────── */
function Experience() {
  const jobs = [
    { year: "2025", title: "Summer Associate", org: "Schertler Onorato Mead & Sears, LLP", loc: "Washington, D.C.",
      desc: "White collar criminal defense trial preparation. Reviewed evidence, drafted subpoenas, prepared witnesses, and managed client correspondence at one of D.C.'s premier litigation firms." },
    { year: "2024–", title: "2nd Lieutenant", org: "Iowa Army National Guard", loc: "Boone, IA",
      desc: "Personnel officer responsible for soldiers' welfare, awards, promotions, mental health check-ins, medivac tracking, and combat readiness." },
    { year: "2024", title: "Judge Advocate General Legal Intern", org: "D.C. Army National Guard", loc: "Washington, D.C.",
      desc: "Judge Advocate internship: case analysis, UCMJ research, 15-6 investigations, legal newsletters, and Special Staff briefings for Generals Andonie and Blanchard." },
    { year: "2022–24", title: "Law Clerk & Legal Intern", org: "Hoefer Law Firm & Larew Law Office", loc: "Iowa City, IA",
      desc: "Drafted legal documents, managed client communications, prepared for depositions and mediations, and conducted case research." },
    { year: "2021–22", title: "Combat Engineer (12B)", org: "U.S. Army Reserve", loc: "Iowa City, IA",
      desc: "Led squads in simulated combat missions. Trained in demolition, soldier skills, and physical fitness. Built the discipline that drives everything." },
    { year: "2020–24", title: "Reserve Officers' Training Corps Cadet", org: "University of Iowa", loc: "Iowa City, IA",
      desc: "Four years of military officer training. Dean's List, Ranger Challenge Award, Gold & Platinum Athlete Awards, Volunteerism Award." },
  ];

  return (
    <section id="Experience" style={{ background: WHITE, padding: "100px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{
          fontFamily: "'Anton', sans-serif", fontSize: 14, letterSpacing: 5,
          textTransform: "uppercase", color: ORANGE, marginBottom: 12,
        }}>
          SERVICE & EXPERIENCE
        </div>
        <h2 style={{
          fontFamily: "'Anton', sans-serif", fontSize: "clamp(36px, 6vw, 60px)",
          color: BLUE, lineHeight: 1.05, margin: "0 0 8px", textTransform: "uppercase",
        }}>
          BUILT ON DUTY,
        </h2>
        <h2 style={{
          fontFamily: "'Anton', sans-serif", fontSize: "clamp(36px, 6vw, 60px)",
          color: BLUE, lineHeight: 1.05, margin: "0 0 50px", textTransform: "uppercase",
        }}>
          DRIVEN BY <span style={{ color: ORANGE }}>PURPOSE</span>
        </h2>

        {jobs.map((j, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "80px 1fr", gap: 24,
            padding: "26px 0", borderBottom: `2px solid rgba(26,26,138,0.08)`,
          }}>
            <div style={{
              fontFamily: "'Anton', sans-serif", fontSize: 20, color: ORANGE, paddingTop: 2,
            }}>
              {j.year}
            </div>
            <div>
              <h3 style={{
                fontFamily: "'Anton', sans-serif", fontSize: 22, color: BLUE,
                margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 1,
              }}>
                {j.title}
              </h3>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13,
                color: BLUE, opacity: 0.5, letterSpacing: 1,
                textTransform: "uppercase", marginBottom: 8,
              }}>
                {j.org} — {j.loc}
              </div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                lineHeight: 1.75, color: "#555", margin: 0,
              }}>
                {j.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── vision section ───────────────────────────── */
function Vision() {
  const pillars = [
    { icon: "⚖️", title: "Criminal Justice",
      text: "A strong passion for criminal justice as a way to protect people from harm." },
    { icon: "🎓", title: "Education & Access",
      text: "I know the difference opportunity makes. Every student deserves a path regardless of their zip code or family income." },
    { icon: "🎖️", title: "Veterans & Service",
      text: "I worked with Hoefer Law Firm to get Veterans their benefits after they had retired. Everyone who has served our country deserves to retire with dignity." },
    { icon: "🏘️", title: "Community Investment",
      text: "Not just volunteer hours. New infrastructure and public transportation breathe life and new opportunities into a city." },
  ];

  return (
    <section id="Vision" style={{
      background: BLUE, padding: "100px 24px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
        <div style={{
          fontFamily: "'Anton', sans-serif", fontSize: 14, letterSpacing: 5,
          textTransform: "uppercase", color: ORANGE, marginBottom: 12,
        }}>
          WHAT I STAND FOR
        </div>
        <h2 style={{
          fontFamily: "'Anton', sans-serif", fontSize: "clamp(36px, 6vw, 60px)",
          color: WHITE, lineHeight: 1.05, margin: "0 0 16px", textTransform: "uppercase",
        }}>
          A VISION FOR{" "}
          <span style={{ color: ORANGE }}>POSITIVE CHANGE</span>
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 17, lineHeight: 1.75,
          color: "rgba(255,255,255,0.55)", maxWidth: 600, margin: "0 0 60px",
        }}>
          Real change starts with people who've lived the struggle. I bring the discipline of military service, the rigor of legal training, and the heart of someone who has overcome significant barriers.
        </p>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20,
        }}>
          {pillars.map((p, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.04)",
              border: "2px solid rgba(255,255,255,0.08)",
              padding: "34px 26px", transition: "all 0.3s", cursor: "default",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ORANGE;
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{p.icon}</div>
              <h3 style={{
                fontFamily: "'Anton', sans-serif", fontSize: 18, color: ORANGE,
                textTransform: "uppercase", letterSpacing: 2, margin: "0 0 14px",
              }}>
                {p.title}
              </h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                lineHeight: 1.8, color: "rgba(255,255,255,0.5)", margin: 0,
              }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── quote ────────────────────────────────────── */
function Quote() {
  return (
    <section style={{ background: ORANGE, padding: "80px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", fontWeight: 400,
          fontSize: "clamp(22px, 4vw, 38px)", color: BLUE, lineHeight: 1.45, marginBottom: 24,
        }}>
          "At the end of the day, become all you can be."
        </div>
        <div style={{
          fontFamily: "'Anton', sans-serif", fontSize: 15, letterSpacing: 4,
          textTransform: "uppercase", color: BLUE_DARK, opacity: 0.6,
        }}>
          — CHRISTOPHER CUMBERBATCH
        </div>
      </div>
    </section>
  );
}

/* ── contact ──────────────────────────────────── */
function Contact() {
  return (
    <section id="Contact" style={{ background: CREAM, padding: "100px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        {/* Resume embed */}
        <div style={{ marginBottom: 48, textAlign: "left" }}>
          <div style={{
            fontFamily: "'Anton', sans-serif", fontSize: 14, letterSpacing: 5,
            textTransform: "uppercase", color: ORANGE, marginBottom: 16, textAlign: "center",
          }}>
            MY RESUME
          </div>
          <iframe
            src="/resume.pdf"
            style={{ width: "100%", height: 600, border: `2px solid ${BLUE}`, borderRadius: 4 }}
            title="Christopher Cumberbatch Resume"
          />
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <a href="/resume.pdf" download="Christopher_Cumberbatch_Resume.pdf" style={{
              fontFamily: "'Anton', sans-serif", fontSize: 14,
              letterSpacing: 3, textTransform: "uppercase",
              background: ORANGE, color: BLUE, padding: "12px 32px",
              textDecoration: "none", cursor: "pointer", display: "inline-block",
            }}>
              DOWNLOAD RESUME
            </a>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          <a href="mailto:chriscu555@gmail.com" style={{
            fontFamily: "'Anton', sans-serif", fontSize: 16,
            letterSpacing: 3, textTransform: "uppercase",
            background: BLUE, color: ORANGE, padding: "16px 48px",
            border: "none", textDecoration: "none", cursor: "pointer",
            transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.target.style.background = ORANGE; e.target.style.color = BLUE; }}
            onMouseLeave={(e) => { e.target.style.background = BLUE; e.target.style.color = ORANGE; }}>
            CONTACT ME
          </a>
          <a href="https://www.linkedin.com/in/christopher-cumberbatch-4bb566169/"
            target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14,
              letterSpacing: 2, color: BLUE, textDecoration: "none",
              borderBottom: `2px solid ${BLUE}`, paddingBottom: 2,
            }}>
            LinkedIn Profile →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── media section ────────────────────────────── */
function Media() {
  const [lightbox, setLightbox] = useState(null);
  const items = [
    { type: "image", src: "/group.jpg",          label: "Black Law Student Association", colSpan: 2, rowSpan: 2 },
    { type: "image", src: "/chris.jpg",          label: "Christopher",                  colSpan: 1, rowSpan: 1 },
    { type: "image", src: "/aboutchris.png",     label: "About Chris",                  colSpan: 1, rowSpan: 1 },
    { type: "video", src: "/snapfarm.mp4",       label: "Helping the Community",        colSpan: 2, rowSpan: 2 },
    { type: "image", src: "/farmfriends.jpg",    label: "Farm Friends",                 colSpan: 2, rowSpan: 1 },
    { type: "image", src: "/family.jpg",         label: "Family",                       colSpan: 1, rowSpan: 1 },
    { type: "image", src: "/jdmilitary.jpg",     label: "JD & Military",                colSpan: 1, rowSpan: 1 },
    { type: "image", src: "/legalinternship.jpg",label: "Legal Internship",             colSpan: 2, rowSpan: 1 },
    { type: "image", src: "/merrychristmas.jpg", label: "Merry Christmas",              colSpan: 1, rowSpan: 1 },
  ];

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="Media" style={{ background: WHITE, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          fontFamily: "'Anton', sans-serif", fontSize: 14, letterSpacing: 5,
          textTransform: "uppercase", color: ORANGE, marginBottom: 12,
        }}>
          PHOTOS & VIDEOS
        </div>
        <h2 style={{
          fontFamily: "'Anton', sans-serif", fontSize: "clamp(36px, 6vw, 60px)",
          color: BLUE, lineHeight: 1.05, margin: "0 0 50px", textTransform: "uppercase",
        }}>
          IN THE <span style={{ color: ORANGE }}>FIELD</span>
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "220px",
          gap: 12,
        }}>
          {items.map((item, i) => (
            <div key={i} style={{
              gridColumn: `span ${item.colSpan}`,
              gridRow: `span ${item.rowSpan}`,
              overflow: "hidden", background: BLUE_DARK,
              position: "relative", cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
              onClick={() => setLightbox(item)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = `0 12px 30px rgba(0,0,0,0.25)`;
                const overlay = e.currentTarget.querySelector(".media-overlay");
                if (overlay) overlay.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
                const overlay = e.currentTarget.querySelector(".media-overlay");
                if (overlay) overlay.style.opacity = "0";
              }}>
              {item.type === "image" ? (
                <img src={item.src} alt={item.label} style={{
                  width: "100%", height: "100%", objectFit: "cover", display: "block",
                }} />
              ) : (
                <video src={item.src} autoPlay loop playsInline muted style={{
                  width: "100%", height: "100%", objectFit: "cover", display: "block",
                }} />
              )}
              {item.label && (
                <div className="media-overlay" style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(transparent, rgba(14,14,92,0.85))",
                  padding: "24px 16px 14px",
                  opacity: 0, transition: "opacity 0.3s",
                }}>
                  <span style={{
                    fontFamily: "'Anton', sans-serif", fontSize: 14,
                    letterSpacing: 3, textTransform: "uppercase", color: ORANGE,
                  }}>
                    {item.label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.92)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24,
        }}>
          <button onClick={() => setLightbox(null)} style={{
            position: "absolute", top: 24, right: 32,
            background: "none", border: "none", color: ORANGE,
            fontSize: 44, cursor: "pointer", lineHeight: 1,
            fontFamily: "'Anton', sans-serif",
          }}>✕</button>
          <div onClick={(e) => e.stopPropagation()} style={{
            maxWidth: "90vw", maxHeight: "90vh",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {lightbox.type === "image" ? (
              <img src={lightbox.src} alt={lightbox.label} style={{
                maxWidth: "90vw", maxHeight: "90vh",
                objectFit: "contain", boxShadow: "0 0 60px rgba(0,0,0,0.8)",
              }} />
            ) : (
              <video src={lightbox.src} controls autoPlay loop playsInline style={{
                maxWidth: "90vw", maxHeight: "90vh",
                boxShadow: "0 0 60px rgba(0,0,0,0.8)",
              }} />
            )}
          </div>
          {lightbox.label && (
            <div style={{
              position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
              fontFamily: "'Anton', sans-serif", fontSize: 16,
              letterSpacing: 4, textTransform: "uppercase", color: ORANGE,
            }}>
              {lightbox.label}
            </div>
          )}
        </div>
      )}


    </section>
  );
}

/* ── footer ───────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      background: BLUE, padding: "40px 24px", textAlign: "center",
      borderTop: `5px solid ${ORANGE}`,
    }}>
      <div style={{
        fontFamily: "'Anton', sans-serif", fontSize: 28,
        color: ORANGE, letterSpacing: 4, marginBottom: 10,
      }}>
        CHRISTOPHER CUMBERBATCH
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 12,
        color: "rgba(255,255,255,0.35)",
      }}>
        JD Candidate · University of Iowa College of Law '27 · 2nd Lieutenant · Iowa Army National Guard
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 11,
        color: "rgba(255,255,255,0.15)", marginTop: 16,
      }}>
        © {new Date().getFullYear()} Christopher Cumberbatch. All rights reserved.
      </div>
    </footer>
  );
}

/* ── main app ─────────────────────────────────── */
export default function App() {
  const [activeSection, setActiveSection] = useState("Home");

  const handleNav = (section) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveSection(section);
  };

  useEffect(() => {
    const sections = ["Home", "About", "Experience", "Vision", "Media", "Contact"];
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); },
      { threshold: 0.3 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${WHITE}; }

        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes twinkle {
          0% { opacity: 0.05; transform: scale(0.8); }
          100% { opacity: 0.3; transform: scale(1.1); }
        }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }

        ::selection { background: ${ORANGE}; color: ${BLUE}; }
      `}</style>

      <Stars />
      <Nav activeSection={activeSection} onNav={handleNav} />
      <Hero />
      <WaveDivider topColor={BLUE} bottomColor={ORANGE} />
      <Ticker />
      <About />
      <WaveDivider topColor={ORANGE} bottomColor={WHITE} />
      <Experience />
      <WaveDivider topColor={WHITE} bottomColor={BLUE} flip />
      <Vision />
      <WaveDivider topColor={BLUE} bottomColor={ORANGE} />
      <Quote />
      <WaveDivider topColor={ORANGE} bottomColor={CREAM} />
      <Ticker />
      <Media />
      <WaveDivider topColor={WHITE} bottomColor={CREAM} />
      <Contact />
      <Footer />
    </div>
  );
}
