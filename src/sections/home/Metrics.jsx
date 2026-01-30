import React from "react";
import { useMediaQuery } from "react-responsive";
import { useLanguage } from "../../context/LanguageContext";

const Metrics = () => {
  const { t } = useLanguage();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const metrics = [
    {
      value: "25+",
      label: t("home.metrics.years"),
      sub: t("home.metrics.yearsSub"),
    },
    {
      value: "1.2M+",
      label: t("home.metrics.tonnage"),
      sub: t("home.metrics.tonnageSub"),
    },
    {
      value: "300+",
      label: t("home.metrics.projects"),
      sub: t("home.metrics.projectsSub"),
    },
    {
      value: "ISO",
      label: t("home.metrics.certified"),
      sub: t("home.metrics.certifiedSub"),
    },
  ];

  return (
    <section style={styles.section} id="metrics">
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.eyebrowContainer}>
            <div style={styles.eyebrowLine} />
            <span style={styles.eyebrow}>{t("home.metrics.eyebrow")}</span>
          </div>

          <h2 style={styles.title}>{t("home.metrics.title")}</h2>

          <p style={styles.description}>{t("home.metrics.description")}</p>
        </div>

        {/* Metrics Grid */}
        <div
          style={{
            ...styles.grid,
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
          }}
        >
          {metrics.map((item, idx) => (
            <div key={idx} style={styles.card}>
              <div style={styles.cardInner}>
                <span style={styles.metricValue}>{item.value}</span>
                <span style={styles.metricLabel}>{item.label}</span>
                <span style={styles.metricSub}>{item.sub}</span>
              </div>

              {/* Decorative corners */}
              <span style={{ ...styles.corner, top: 0, left: 0 }} />
              <span style={{ ...styles.corner, top: 0, right: 0 }} />
              <span style={{ ...styles.corner, bottom: 0, left: 0 }} />
              <span style={{ ...styles.corner, bottom: 0, right: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;

/* ================= STYLES ================= */

const styles = {
  section: {
    padding: "140px 0",
    //background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
    position: "relative",
  },

  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 32px",
    display: "flex",
    flexDirection: "column",
    gap: 80,
  },

  /* ===== Header ===== */

  header: {
    maxWidth: 680,
  },

  eyebrowContainer: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },

  eyebrowLine: {
    width: 48,
    height: 2,
    background: "linear-gradient(90deg, #c2410c, transparent)",
  },

  eyebrow: {
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.25em",
    color: "#c2410c",
    textTransform: "uppercase",
  },

  title: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "clamp(36px, 4.5vw, 52px)",
    color: "#002147",
    lineHeight: 1.15,
    fontWeight: 700,
    marginBottom: 24,
  },

  description: {
    fontSize: 17,
    lineHeight: 1.8,
    color: "#4b5563",
    maxWidth: 560,
  },

  /* ===== Grid ===== */

  grid: {
    display: "grid",
    gap: 32,
  },

  card: {
    position: "relative",
    background: "#ffffff",
    border: "1px solid rgba(0,33,71,0.15)",
    padding: "48px 32px",
    boxShadow: "0 20px 60px rgba(0,33,71,0.08), 0 0 1px rgba(0,33,71,0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },

  cardInner: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  metricValue: {
    fontFamily: "'Courier New', monospace",
    fontSize: "clamp(42px, 5vw, 56px)",
    fontWeight: 700,
    color: "#002147",
    letterSpacing: "-0.02em",
  },

  metricLabel: {
    fontSize: 16,
    fontWeight: 700,
    color: "#002147",
  },

  metricSub: {
    fontSize: 13,
    color: "#6b7280",
    maxWidth: 220,
    lineHeight: 1.6,
  },

  /* ===== Corners ===== */

  corner: {
    position: "absolute",
    width: 14,
    height: 14,
    borderColor: "#c2410c",
  },
};
