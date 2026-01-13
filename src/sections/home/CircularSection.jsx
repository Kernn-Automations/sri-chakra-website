import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLanguage } from "../../context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEP_IMAGES = [
  "https://i.ibb.co/nqLLt93s/steel-rolls.jpg",
  "https://i.ibb.co/1G2fwddJ/forging-steel.jpg",
  "https://i.ibb.co/2mvHyKx/crash-barrier.jpg",
  "https://i.ibb.co/Ndw2DQFH/steel-recycle.png",
];

const CircularSection = () => {
  const { t } = useLanguage();
  const steps = t("home.circular.steps");

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const systemRef = useRef(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const systemAnimRef = useRef(null);
  const detailRef = useRef(null);

  const [radius, setRadius] = useState(0);
  const [active, setActive] = useState(0);

  /* 🔧 Calculate radius dynamically (THIS fixes alignment forever) */
  useEffect(() => {
    if (!systemRef.current) return;

    const updateRadius = () => {
      const size = systemRef.current.offsetWidth;
      setRadius(size * 0.38); // proportional radius
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        systemAnimRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        detailRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section style={styles.section} ref={sectionRef}>
      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header} ref={headerRef}>
          <div style={styles.eyebrowRow}>
            <div style={styles.eyebrowLine} />
            <span style={styles.eyebrow}>{t("home.circular.eyebrow")}</span>
          </div>

          <h2 style={styles.title}>{t("home.circular.title")}</h2>
          <p style={styles.desc}>{t("home.circular.description")}</p>
        </div>

        {/* MAIN LAYOUT */}
        <div
          style={{
            ...styles.layout,
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          }}
        >
          {/* CIRCULAR SYSTEM */}
          <div style={styles.systemWrap} ref={systemAnimRef}>
            <div ref={systemRef} style={styles.system}>
              <div style={styles.outerRing} />
              <div style={styles.middleRing} />
              <div style={styles.innerRing} />

              <div style={styles.core}>
                <span style={styles.coreLabel}>SCI</span>
                <span style={styles.coreSub}>
                  ENGINEERED
                  <br />
                  CYCLE
                </span>
              </div>

              {/* RADIAL POINTS */}
              {radius > 0 &&
                steps.map((_, i) => {
                  const angle = (360 / steps.length) * i - 90;
                  const rad = (angle * Math.PI) / 180;

                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;

                  return (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      style={{
                        ...styles.marker,
                        ...(active === i ? styles.markerActive : {}),
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </button>
                  );
                })}
            </div>
          </div>

          {/* DETAIL PANEL */}
          <div style={styles.detail} ref={detailRef}>
            <div style={styles.imageWrap}>
              <img
                src={STEP_IMAGES[active]}
                alt={steps[active].title}
                style={styles.image}
                draggable={false}
                loading="lazy"
              />
            </div>

            <span style={styles.stepIndex}>
              {String(active + 1).padStart(2, "0")}
            </span>

            <h3 style={styles.stepTitle}>{steps[active].title}</h3>
            <p style={styles.stepDesc}>{steps[active].sub}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CircularSection;

/* ================= STYLES ================= */

const styles = {
  section: {
    padding: "140px 0",
  },

  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
  },

  header: {
    maxWidth: 640,
    marginBottom: 80,
  },

  eyebrowRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },

  eyebrowLine: {
    width: 48,
    height: 2,
    background: "linear-gradient(90deg,#FFD700,transparent)",
  },

  eyebrow: {
    fontFamily: "monospace",
    fontSize: 11,
    letterSpacing: "0.25em",
    color: "#FFD700",
    fontWeight: 700,
  },

  title: {
    fontFamily: "Georgia, serif",
    fontSize: "clamp(36px,4.5vw,54px)",
    color: "#002147",
    marginBottom: 24,
  },

  desc: {
    fontSize: 17,
    lineHeight: 1.8,
    color: "#4b5563",
  },

  layout: {
    display: "grid",
    gap: 80,
    alignItems: "center",
  },

  /* SYSTEM */
  systemWrap: {
    display: "flex",
    justifyContent: "center",
  },

  system: {
    position: "relative",
    width: "100%",
    maxWidth: 420,
    aspectRatio: "1 / 1",
  },

  outerRing: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    border: "2px dashed rgba(0,33,71,0.25)",
  },

  middleRing: {
    position: "absolute",
    inset: "14%",
    borderRadius: "50%",
    border: "2px solid rgba(0,33,71,0.35)",
  },

  innerRing: {
    position: "absolute",
    inset: "28%",
    borderRadius: "50%",
    border: "3px solid #FFD700",
    boxShadow: "0 0 24px rgba(255,215,0,0.35)",
  },

  core: {
    position: "absolute",
    inset: "38%",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#002147,#003d82)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },

  coreLabel: {
    fontFamily: "monospace",
    letterSpacing: "0.2em",
    color: "#FFD700",
    fontWeight: 700,
  },

  coreSub: {
    fontSize: 10,
    textAlign: "center",
    letterSpacing: "0.15em",
  },

  marker: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 42,
    height: 42,
    borderRadius: "50%",
    border: "2px solid #FFD700",
    background: "#fff",
    fontFamily: "monospace",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.25s ease",
    transformOrigin: "center",
  },

  markerActive: {
    background: "#002147",
    color: "#FFD700",
    boxShadow: "0 0 16px rgba(255,215,0,0.6)",
  },

  /* DETAIL */
  detail: {
    maxWidth: 420,
  },

  imageWrap: {
    width: "100%",
    height: 220,
    background: "#e5e7eb",
    marginBottom: 24,
    boxShadow: "0 20px 40px rgba(0,33,71,0.1)",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  stepIndex: {
    fontFamily: "monospace",
    color: "#FFD700",
    letterSpacing: "0.2em",
    fontWeight: 700,
  },

  stepTitle: {
    fontSize: 22,
    margin: "12px 0",
    color: "#002147",
  },

  stepDesc: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "#4b5563",
  },
};
