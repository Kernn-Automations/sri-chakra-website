import { useLanguage } from "../../context/LanguageContext";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import TouchRipple from "../../drawings/TouchRipple";

const ProductIntro = () => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const statsRef = useRef([]);
  const interactionLayerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animations
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(descRef.current, {
        y: 40,
        opacity: 0,
        delay: 0.3,
        duration: 1,
      });

      gsap.from(statsRef.current, {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        delay: 0.6,
      });

      // Title shimmer effect
      gsap.to(titleRef.current, {
        textShadow: "0 0 20px rgba(194,65,12,0.2)",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Forward touch events from interaction layer to canvas
  useEffect(() => {
    const interactionLayer = interactionLayerRef.current;
    const canvas = sectionRef.current?.querySelector("canvas");

    if (!canvas || !interactionLayer) return;

    const forwardEvent = (e) => {
      // Create a new event with the same properties
      const newEvent = new e.constructor(e.type, e);
      canvas.dispatchEvent(newEvent);
    };

    interactionLayer.addEventListener("touchstart", forwardEvent);
    interactionLayer.addEventListener("touchmove", forwardEvent);
    interactionLayer.addEventListener("touchend", forwardEvent);
    interactionLayer.addEventListener("mousedown", forwardEvent);
    interactionLayer.addEventListener("mousemove", forwardEvent);
    interactionLayer.addEventListener("mouseup", forwardEvent);

    return () => {
      interactionLayer.removeEventListener("touchstart", forwardEvent);
      interactionLayer.removeEventListener("touchmove", forwardEvent);
      interactionLayer.removeEventListener("touchend", forwardEvent);
      interactionLayer.removeEventListener("mousedown", forwardEvent);
      interactionLayer.removeEventListener("mousemove", forwardEvent);
      interactionLayer.removeEventListener("mouseup", forwardEvent);
    };
  }, []);

  return (
    <section style={styles.section} ref={sectionRef}>
      {/* Touch Ripple Background */}
      <TouchRipple />

      <div style={styles.container}>
        <div style={styles.eyebrowRow}>
          <span style={styles.eyebrow}>{t("products.intro.eyebrow")}</span>
          <span style={styles.eyebrowLine} />
        </div>

        <h1
          ref={titleRef}
          style={{
            ...styles.title,
            fontSize: isMobile
              ? "clamp(36px, 10vw, 56px)"
              : "clamp(64px, 6vw, 96px)",
          }}
        >
          {t("products.intro.title")}
        </h1>

        <p style={styles.description} ref={descRef}>
          {t("products.intro.description")}
        </p>

        <div style={styles.stats}>
          {t("products.intro.stats").map((item, i) => (
            <div
              key={i}
              style={styles.stat}
              ref={(el) => (statsRef.current[i] = el)}
            >
              <span style={styles.statValue}>{item.value}</span>
              <span style={styles.statLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interaction layer on top - captures touch events and forwards to canvas */}
      <div ref={interactionLayerRef} style={styles.interactionLayer} />
    </section>
  );
};

export default ProductIntro;

const styles = {
  section: {
    padding: "160px 0 120px",
    position: "relative",
    overflow: "hidden",
    background: "transparent",
  },

  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
    position: "relative",
    zIndex: 2,
    pointerEvents: "none", // Allow touches to pass through container
  },

  eyebrowRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
    pointerEvents: "auto", // Re-enable for text selection
  },

  eyebrow: {
    fontFamily: "monospace",
    fontSize: 11,
    letterSpacing: "0.3em",
    color: "#C2410C",
    fontWeight: 700,
  },

  eyebrowLine: {
    flex: 1,
    height: 1,
    background: "linear-gradient(90deg,#C2410C,transparent)",
  },

  title: {
    fontFamily: "Georgia, serif",
    color: "#002147",
    fontWeight: 700,
    lineHeight: 1.05,
    marginBottom: 32,
    pointerEvents: "auto", // Re-enable for text selection
  },

  description: {
    maxWidth: 640,
    fontSize: 18,
    lineHeight: 1.8,
    color: "rgba(0,33,71,0.75)",
    marginBottom: 64,
    pointerEvents: "auto", // Re-enable for text selection
  },

  stats: {
    display: "flex",
    gap: 48,
    flexWrap: "wrap",
    pointerEvents: "auto", // Re-enable for text selection
  },

  stat: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },

  statValue: {
    fontFamily: "monospace",
    fontSize: 22,
    fontWeight: 700,
    color: "#002147",
  },

  statLabel: {
    fontSize: 12,
    letterSpacing: "0.15em",
    color: "#6b7280",
    textTransform: "uppercase",
  },

  interactionLayer: {
    position: "absolute",
    inset: 0,
    zIndex: 3, // On top of everything
    pointerEvents: "auto",
  },
};
