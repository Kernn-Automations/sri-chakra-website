import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SafetyEquation = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".eq-part", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section style={styles.section} ref={sectionRef} className="snap-section">
      <div style={styles.container}>
        <p style={styles.eyebrow}>ENGINEERED SAFETY</p>

        <h2 style={styles.title}>
          The Formula Behind{" "}
          <span style={styles.highlight}>Structural Reliability</span>
        </h2>

        <div style={styles.equationBox}>
          <div className="eq-part" style={styles.term}>
            Quality Steel
          </div>
          <div className="eq-part" style={styles.symbol}>
            +
          </div>
          <div className="eq-part" style={styles.term}>
            Precision Forming
          </div>
          <div className="eq-part" style={styles.symbol}>
            +
          </div>
          <div className="eq-part" style={styles.term}>
            Strict Quality Checks
          </div>
          <div className="eq-part" style={styles.symbol}>
            =
          </div>
          <div className="eq-part" style={styles.result}>
            Long-Term Structural Safety
          </div>
        </div>

        <p style={styles.caption}>
          Every sheet we supply is engineered with consistency, strength, and
          performance in mind — because safety isn’t optional in structural
          applications.
        </p>
      </div>
    </section>
  );
};

export default SafetyEquation;

const styles = {
  section: {
    padding: "120px 0",
    background: "#ffffff",
    textAlign: "center",
  },

  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 32px",
  },

  eyebrow: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    letterSpacing: "0.2em",
    color: "#C2410C",
    fontWeight: 700,
    marginBottom: 16,
  },

  title: {
    fontFamily: "Georgia, serif",
    fontSize: "clamp(30px, 4vw, 46px)",
    color: "#002147",
    marginBottom: 60,
    lineHeight: 1.2,
  },

  highlight: {
    color: "#C2410C",
  },

  equationBox: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "18px",
    padding: "40px 20px",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #f9fafc 0%, #ffffff 100%)",
  },

  term: {
    padding: "14px 22px",
    background: "#002147",
    color: "#ffffff",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: 600,
    letterSpacing: "0.05em",
  },

  symbol: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#002147",
  },

  result: {
    padding: "16px 26px",
    background: "#C2410C",
    color: "#ffffff",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: 700,
    letterSpacing: "0.05em",
  },

  caption: {
    marginTop: 40,
    maxWidth: 700,
    marginInline: "auto",
    fontSize: 16,
    lineHeight: 1.7,
    color: "#4b5563",
  },
};
