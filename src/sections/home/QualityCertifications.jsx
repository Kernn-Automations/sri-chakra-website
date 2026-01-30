import React, { useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Award, Gauge, Layers, Ruler, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    icon: ShieldCheck,
    title: "ISI Certified Materials",
    desc: "Steel sourced and processed in compliance with Indian Standards for structural reliability.",
  },
  {
    icon: Award,
    title: "ISO Quality Standards",
    desc: "Quality control procedures aligned with internationally recognized ISO frameworks.",
  },
  {
    icon: Gauge,
    title: "Precision Roll Forming",
    desc: "Advanced bending and shaping ensuring uniform profiles and dimensional accuracy.",
  },
  {
    icon: Shield,
    title: "Corrosion Resistance Tested",
    desc: "Coated steel sheets tested to withstand extreme weather and environmental exposure.",
  },
  {
    icon: Layers,
    title: "Load Bearing Verified",
    desc: "Sheets engineered for structural strength and long-term performance under load.",
  },
  {
    icon: Ruler,
    title: "Consistent Thickness Control",
    desc: "Strict monitoring of gauge consistency for dependable structural application.",
  },
];

const QualityCertifications = () => {
  const sectionRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".qc-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
            once: false, // ensures replay on scroll back
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section style={styles.section} ref={sectionRef} className="snap-section">
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.line}></div>
          <span style={styles.eyebrow}>QUALITY ASSURANCE</span>
        </div>

        <h2 style={styles.title}>
          Certified Standards. <br /> Proven Reliability.
        </h2>

        <p style={styles.subtitle}>
          Every steel sheet we deliver undergoes strict quality checks, ensuring
          strength, durability, and long-term performance for demanding
          structural applications.
        </p>

        <div
          style={{
            ...styles.grid,
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          }}
        >
          {certifications.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={styles.card} className="qc-card">
                <div style={styles.iconWrap}>
                  <Icon size={28} strokeWidth={2.2} />
                </div>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardDesc}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .qc-card {
          transition: all 0.35s ease;
        }
        .qc-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 60px rgba(0,33,71,0.15);
          border-color: #FFD700;
        }
        .qc-card:hover svg {
          color: #FFD700;
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default QualityCertifications;

const styles = {
  section: {
    padding: "120px 0",
    background: "#f9fafc",
    zIndex: 2,
  },

  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 32px",
    textAlign: "center",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginBottom: 16,
  },

  line: {
    width: 50,
    height: 2,
    background: "linear-gradient(90deg, #c2410c 0%, transparent 100%)",
  },

  eyebrow: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.2em",
    color: "#c2410c",
  },

  title: {
    fontFamily: "Georgia, serif",
    fontSize: "clamp(32px, 4vw, 48px)",
    color: "#002147",
    marginBottom: 20,
  },

  subtitle: {
    maxWidth: 680,
    margin: "0 auto 70px",
    fontSize: 17,
    lineHeight: 1.7,
    color: "#4b5563",
  },

  grid: {
    display: "grid",
    gap: 32,
    //border: "2px solid red", // TEMP DEBUG
  },

  card: {
    background: "#ffffff",
    padding: "40px 30px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    textAlign: "left",
  },

  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "rgba(255,215,0,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    color: "#002147",
    transition: "all 0.3s ease",
  },

  cardTitle: {
    fontSize: 18,
    color: "#002147",
    marginBottom: 12,
    fontWeight: 700,
  },

  cardDesc: {
    fontSize: 15,
    lineHeight: 1.7,
    color: "#6b7280",
  },
};
