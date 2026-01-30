import { useLanguage } from "../../context/LanguageContext";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutVisionMission = () => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const glowLeftRef = useRef(null);
  const glowRightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slide panels in
      gsap.from(leftRef.current, {
        x: -120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(rightRef.current, {
        x: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Moving light streaks
      gsap.to(glowLeftRef.current, {
        x: "40%",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(glowRightRef.current, {
        x: "-40%",
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section style={styles.wrapper} id="about-vision-mission" ref={sectionRef}>
      <div
        style={{
          ...styles.grid,
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        }}
      >
        {/* Vision */}
        <div
          ref={leftRef}
          style={{ ...styles.block, backgroundColor: "#002147", color: "#fff" }}
          className="vm-block"
        >
          <div style={styles.glow} ref={glowLeftRef} />
          <div style={styles.blockInner}>
            <span style={{ ...styles.eyebrow, color: "#c2410c" }}>
              {t("about.visionMission.vision.title")}
            </span>
            <h3 style={styles.text}>{t("about.visionMission.vision.text")}</h3>
          </div>
        </div>

        {/* Mission */}
        <div
          ref={rightRef}
          style={{
            ...styles.block,
            backgroundColor: "rgba(0,33,71,0.03)",
            color: "#002147",
          }}
          className="vm-block"
        >
          <div style={styles.glowLight} ref={glowRightRef} />
          <div style={styles.blockInner}>
            <span style={{ ...styles.eyebrow, color: "rgba(0,33,71,0.5)" }}>
              {t("about.visionMission.mission.title")}
            </span>
            <h3 style={styles.text}>{t("about.visionMission.mission.text")}</h3>
          </div>
        </div>
      </div>

      <style>{`
        .vm-block {
          position: relative;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .vm-block:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 60px rgba(0,33,71,0.2);
        }
      `}</style>
    </section>
  );
};

export default AboutVisionMission;

const styles = {
  wrapper: {
    width: "100%",
    position: "relative",
    zIndex: 1,
    padding: "40px 0",
  },

  grid: {
    display: "grid",
    width: "100%",
    gap: "32px",
  },

  block: {
    padding: "80px 48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "320px",
  },

  blockInner: {
    maxWidth: "600px",
    position: "relative",
    zIndex: 2,
  },

  eyebrow: {
    fontFamily: "monospace",
    fontSize: "14px",
    letterSpacing: "0.2em",
    display: "block",
    marginBottom: "32px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  text: {
    fontSize: "26px",
    fontFamily: "Georgia, serif",
    lineHeight: 1.4,
    margin: 0,
    fontWeight: "600",
  },

  glow: {
    position: "absolute",
    top: 0,
    left: "-20%",
    width: "60%",
    height: "100%",
    background:
      "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)",
    transform: "skewX(-20deg)",
  },

  glowLight: {
    position: "absolute",
    top: 0,
    right: "-20%",
    width: "60%",
    height: "100%",
    background:
      "linear-gradient(120deg, rgba(194,65,12,0) 0%, rgba(194,65,12,0.15) 50%, rgba(194,65,12,0) 100%)",
    transform: "skewX(-20deg)",
  },
};
