import { useLanguage } from "../../context/LanguageContext";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutRelated = () => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const bgFlowRef = useRef(null);

  const items = [0, 1, 2].map((i) => ({
    label: t(`about.related.items.${i}.label`),
    value: t(`about.related.items.${i}.value`),
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header line animation
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

      // Cards stagger reveal (FIXED)
      gsap.from(".gsap-related", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Background flowing animation
      gsap.to(bgFlowRef.current, {
        backgroundPosition: "300px 0px",
        duration: 18,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section style={styles.wrapper} id="about-related" ref={sectionRef}>
      {/* Subtle flowing background */}
      <div style={styles.bgFlow} ref={bgFlowRef} />

      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.line} ref={lineRef} />
          <h2 style={styles.title}>{t("about.related.title")}</h2>
        </div>

        <div
          style={{
            ...styles.grid,
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              style={styles.item}
              className="related-card gsap-related"
            >
              <span style={styles.label}>{item.label}</span>
              <p style={styles.value}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .related-card {
          position: relative;
          padding: 24px 24px 28px;
          border-radius: 14px;
          background: #ffffff;
          border: 1px solid rgba(0,33,71,0.08);
          transition: all 0.35s ease;
        }
        .related-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0,33,71,0.12);
          border-color: rgba(194,65,12,0.4);
        }
      `}</style>
    </section>
  );
};

export default AboutRelated;

const styles = {
  wrapper: {
    padding: "60px 48px 80px",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "rgba(0, 33, 71, 0.02)",
  },

  bgFlow: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(90deg, rgba(0,33,71,0.03) 0%, transparent 40%, rgba(194,65,12,0.04) 60%, transparent 100%)",
    backgroundSize: "300px 100%",
    zIndex: 0,
  },

  container: {
    maxWidth: 1400,
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
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

  grid: {
    display: "grid",
    gap: "32px",
  },

  item: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    opacity: 1, // safety fallback
  },

  label: {
    fontFamily: "monospace",
    fontSize: "12px",
    color: "#c2410c",
    fontWeight: "bold",
    letterSpacing: "0.1em",
  },

  value: {
    fontSize: "16px",
    lineHeight: 1.7,
    color: "rgba(0,33,71,0.75)",
    margin: 0,
    fontFamily: "Georgia, serif",
  },
};
