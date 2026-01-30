import { useLanguage } from "../../context/LanguageContext";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ParticleMesh from "../../drawings/ParticleMesh";

const AboutHero = () => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.1,
      })
        .from(
          descRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 1,
          },
          "-=0.6",
        )
        .from(
          barRef.current,
          {
            height: 0,
            duration: 1,
          },
          "-=0.8",
        );

      // Accent bar pulse loop
      gsap.to(barRef.current, {
        boxShadow: "0 0 18px rgba(194,65,12,0.6)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Title shimmer loop
      gsap.to(titleRef.current, {
        textShadow: "0 0 18px rgba(0,33,71,0.25)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section style={styles.wrapper} id="about-hero" ref={sectionRef}>
      {/* Particle mesh background */}
      <ParticleMesh />

      <div style={styles.container}>
        <div style={styles.content}>
          <span style={styles.eyebrow}>{t("about.hero.eyebrow")}</span>

          <h1
            ref={titleRef}
            style={{
              ...styles.title,
              fontSize: isMobile
                ? "clamp(42px, 12vw, 60px)"
                : "clamp(60px, 6vw, 90px)",
            }}
          >
            {t("about.hero.title")}
          </h1>

          <div style={styles.descWrap} ref={descRef}>
            <span style={styles.accentBar} ref={barRef} />
            <p style={styles.description}>{t("about.hero.description")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;

const styles = {
  wrapper: {
    padding: "180px 48px 100px",
    position: "relative",
    overflow: "hidden",
    background: "transparent", // IMPORTANT — shows global blueprint grid
  },

  container: {
    maxWidth: 1400,
    margin: "0 auto",
    position: "relative",
    zIndex: 2, // Above particles
  },

  content: {
    maxWidth: 900,
  },

  eyebrow: {
    fontFamily: "monospace",
    fontSize: "14px",
    letterSpacing: "0.2em",
    color: "#c2410c",
    display: "block",
    marginBottom: "24px",
    fontWeight: "bold",
  },

  title: {
    fontFamily: "Georgia, serif",
    color: "#002147",
    margin: "0 0 48px",
    lineHeight: 1.05,
    fontWeight: 700,
  },

  descWrap: {
    display: "flex",
    gap: "24px",
    maxWidth: 680,
  },

  accentBar: {
    width: 4,
    background: "linear-gradient(180deg, #c2410c, #002147)",
    flexShrink: 0,
    borderRadius: 2,
  },

  description: {
    fontSize: "19px",
    lineHeight: 1.7,
    color: "rgba(0,33,71,0.85)",
    margin: 0,
  },
};
