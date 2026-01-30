import { useLanguage } from "../../context/LanguageContext";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutBackground = () => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const textRef = useRef(null);
  const bgGlowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header line grow
      gsap.fromTo(
        lineRef.current,
        { width: 0 },
        {
          width: 60,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      // Paragraph reveal
      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Moving background glow
      gsap.to(bgGlowRef.current, {
        x: "20%",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section style={styles.wrapper} id="about-background" ref={sectionRef}>
      {/* Subtle animated gradient glow */}
      <div style={styles.bgGlow} ref={bgGlowRef} />

      {/* Engineering guide lines */}
      <div style={styles.guideLineLeft} />
      <div style={styles.guideLineRight} />

      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.line} ref={lineRef} />
          <h2 style={styles.title}>{t("about.background.title")}</h2>
        </div>

        <div style={styles.content}>
          <p style={styles.description} ref={textRef}>
            {t("about.background.description")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutBackground;

const styles = {
  wrapper: {
    padding: "100px 48px",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },

  container: {
    maxWidth: 1400,
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    marginBottom: "32px",
  },

  line: {
    width: "60px",
    height: "2px",
    backgroundColor: "#c2410c",
  },

  title: {
    fontFamily: "monospace",
    fontSize: "18px",
    color: "#002147",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    margin: 0,
    fontWeight: "bold",
  },

  content: {
    maxWidth: "900px",
    position: "relative",
  },

  description: {
    fontSize: "20px",
    lineHeight: 1.7,
    color: "rgba(0,33,71,0.8)",
    margin: 0,
    fontFamily: "Georgia, serif",
    fontWeight: "400",
  },

  /* Subtle moving glow */
  bgGlow: {
    position: "absolute",
    top: "20%",
    left: "-10%",
    width: "50%",
    height: "60%",
    background:
      "radial-gradient(circle at center, rgba(194,65,12,0.08), transparent 70%)",
    zIndex: 1,
  },

  /* Engineering guide lines */
  guideLineLeft: {
    position: "absolute",
    left: "40px",
    top: 0,
    bottom: 0,
    width: "1px",
    background:
      "linear-gradient(to bottom, transparent, rgba(0,33,71,0.15), transparent)",
    zIndex: 1,
  },

  guideLineRight: {
    position: "absolute",
    right: "40px",
    top: 0,
    bottom: 0,
    width: "1px",
    background:
      "linear-gradient(to bottom, transparent, rgba(0,33,71,0.15), transparent)",
    zIndex: 1,
  },
};
