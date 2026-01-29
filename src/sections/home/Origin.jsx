import React from "react";
import { useMediaQuery } from "react-responsive";
import { useLanguage } from "../../context/LanguageContext";

const Origin = () => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery({ maxWidth: 1024 }); // Using 1024 to catch tablets and phones

  return (
    <section style={styles.section} id="origin">
      <div
        style={{
          ...styles.container,
          gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
          gap: isMobile ? 60 : 120,
          padding: isMobile ? "0 24px" : "0 32px",
        }}
      >
        {/* LEFT — STORY */}
        <div style={styles.content}>
          <div style={styles.eyebrowContainer}>
            <div style={styles.eyebrowLine} />
            <span style={styles.eyebrow}>{t("home.origin.eyebrow")}</span>
          </div>

          <h2
            style={{
              ...styles.title,
              fontSize: isMobile
                ? "clamp(32px, 8vw, 40px)"
                : "clamp(40px, 5vw, 58px)",
            }}
          >
            {t("home.origin.title")}
          </h2>

          <p
            style={{
              ...styles.description,
              fontSize: isMobile ? 16 : 18,
            }}
          >
            {t("home.origin.description")}
          </p>

          <div style={styles.principles}>
            {t("home.origin.principles").map((item, i) => (
              <div key={i} style={styles.principle}>
                <span style={styles.principleIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={styles.principleText}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — BLUEPRINT PANEL */}
        <div style={styles.visual}>
          <div
            style={{
              ...styles.blueprintCard,
              padding: isMobile ? 20 : 32,
              maxWidth: isMobile ? "100%" : 420,
            }}
          >
            <span style={styles.blueprintCode}>ORIGIN_SYS_1978</span>

            <div style={styles.blueprintGrid}>
              <div style={styles.blueprintLineH} />
              <div style={styles.blueprintLineV} />

              <div
                style={{
                  ...styles.blueprintCore,
                  inset: isMobile ? "20%" : 80, // Dynamic inset for mobile
                }}
              >
                <span style={styles.coreTitle}>SCI</span>
                <span style={styles.coreSub}>
                  STRUCTURAL
                  <br />
                  INTEGRITY
                </span>
              </div>
            </div>

            <div style={styles.blueprintFooter}>
              <span>{t("home.origin.footer")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Origin;

/* ================= STYLES ================= */

const styles = {
  section: {
    padding: "100px 0", // Reduced from 160px for better mobile flow
    position: "relative",
    overflow: "hidden", // Ensures no stray elements cause side-scrolling
  },

  container: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    alignItems: "center",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },

  eyebrowContainer: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },

  eyebrowLine: {
    width: 48,
    height: 2,
    background: "linear-gradient(90deg, #FFD700, transparent)",
  },

  eyebrow: {
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    letterSpacing: "0.3em",
    fontWeight: 700,
    color: "#FFD700",
  },

  title: {
    fontFamily: "Georgia, serif",
    fontWeight: 700,
    color: "#002147",
    lineHeight: 1.1,
  },

  description: {
    lineHeight: 1.85,
    color: "#4b5563",
    maxWidth: 560,
  },

  principles: {
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  principle: {
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
  },

  principleIndex: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    fontWeight: 700,
    color: "#FFD700",
    minWidth: 36,
  },

  principleText: {
    fontSize: 16,
    color: "#002147",
    fontWeight: 500,
    lineHeight: 1.6,
  },

  /* ===== RIGHT PANEL ===== */

  visual: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },

  blueprintCard: {
    width: "100%",
    boxSizing: "border-box", // Prevents padding from adding to width
    border: "1px solid rgba(0,33,71,0.15)",
    background:
      "radial-gradient(circle at top, rgba(255,215,0,0.04), transparent 70%)",
    boxShadow: "0 30px 80px rgba(0,33,71,0.08)",
  },

  blueprintCode: {
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    letterSpacing: "0.2em",
    color: "#002147",
    display: "block",
    marginBottom: 24,
  },

  blueprintGrid: {
    position: "relative",
    width: "100%",
    aspectRatio: "1 / 1",
    border: "1px dashed rgba(0,33,71,0.25)",
  },

  blueprintLineH: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 1,
    background: "rgba(0,33,71,0.25)",
  },

  blueprintLineV: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    width: 1,
    background: "rgba(0,33,71,0.25)",
  },

  blueprintCore: {
    position: "absolute",
    background: "linear-gradient(135deg, #002147, #003d82)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 16px 40px rgba(0,33,71,0.5)",
  },

  coreTitle: {
    fontFamily: "'Courier New', monospace",
    fontSize: 18,
    fontWeight: 700,
    color: "#FFD700",
    letterSpacing: "0.2em",
  },

  coreSub: {
    marginTop: 8,
    fontSize: 10,
    color: "#fff",
    textAlign: "center",
    letterSpacing: "0.15em",
    lineHeight: 1.4,
  },

  blueprintFooter: {
    marginTop: 20,
    fontSize: 11,
    color: "#6b7280",
    letterSpacing: "0.1px",
    textTransform: "uppercase",
  },
};
