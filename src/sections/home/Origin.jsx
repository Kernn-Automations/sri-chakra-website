import React from "react";
import { useMediaQuery } from "react-responsive";
import { useLanguage } from "../../context/LanguageContext";

const Origin = () => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <section style={styles.section} id="origin">
        {/* Background Elements */}
        <div style={styles.backgroundPattern}></div>
        <div style={styles.accentGradient}></div>

        <div
          style={{
            ...styles.container,
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 40 : 80,
            padding: isMobile ? "0 20px" : "0 40px",
          }}
        >
          {/* LEFT — INDUSTRIAL STORY */}
          <div style={styles.content}>
            <div style={styles.labelContainer}>
              <div style={styles.labelLine}></div>
              <span style={styles.label}>{t("home.origin.eyebrow")}</span>
              <div style={styles.labelLine}></div>
            </div>

            <h2
              style={{
                ...styles.title,
                fontSize: isMobile
                  ? "clamp(36px, 9vw, 48px)"
                  : "clamp(48px, 5.5vw, 68px)",
              }}
            >
              {t("home.origin.title")}
            </h2>

            <div style={styles.titleAccent}></div>

            <p
              style={{
                ...styles.description,
                fontSize: isMobile ? 15 : 17,
                marginTop: isMobile ? 20 : 28,
              }}
            >
              {t("home.origin.description")}
            </p>

            {/* Stats Grid */}
            <div
              style={{
                ...styles.statsGrid,
                gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)",
                marginTop: isMobile ? 32 : 40,
              }}
            >
              <div style={styles.statCard}>
                <div style={styles.statNumber}>45+</div>
                <div style={styles.statLabel}>Years Experience</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>ISI</div>
                <div style={styles.statLabel}>Certified Quality</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>100K+</div>
                <div style={styles.statLabel}>Units Delivered</div>
              </div>
            </div>

            {/* Core Principles */}
            <div
              style={{
                ...styles.principles,
                marginTop: isMobile ? 32 : 48,
              }}
            >
              {t("home.origin.principles").map((item, i) => (
                <div key={i} style={styles.principleCard}>
                  <div style={styles.principleIcon}>
                    <div style={styles.principleIconInner}></div>
                  </div>
                  <div style={styles.principleContent}>
                    <div style={styles.principleNumber}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div style={styles.principleText}>{item}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — INDUSTRIAL VISUAL */}
          <div style={styles.visual}>
            <div
              style={{
                ...styles.industrialCard,
                padding: isMobile ? "32px 24px" : "48px 40px",
              }}
              className="industrial-card"
            >
              {/* Header Badge */}
              <div style={styles.cardHeader}>
                <div style={styles.badge}>
                  <span style={styles.badgeDot}></span>
                  <span style={styles.badgeText}>SINCE 1978</span>
                </div>
                <div style={styles.certBadge}>ISI 2001</div>
              </div>

              {/* Main Visual - Steel Structure */}
              <div style={styles.steelStructure}>
                {/* Horizontal Beams */}
                <div style={{ ...styles.beam, top: "20%", left: "10%" }}></div>
                <div
                  style={{
                    ...styles.beam,
                    top: "50%",
                    left: "10%",
                    width: "80%",
                  }}
                ></div>
                <div style={{ ...styles.beam, top: "80%", left: "10%" }}></div>

                {/* Vertical Supports */}
                <div
                  style={{
                    ...styles.support,
                    left: "20%",
                    top: "15%",
                    height: "70%",
                  }}
                ></div>
                <div
                  style={{
                    ...styles.support,
                    left: "50%",
                    top: "15%",
                    height: "70%",
                  }}
                ></div>
                <div
                  style={{
                    ...styles.support,
                    left: "80%",
                    top: "15%",
                    height: "70%",
                  }}
                ></div>

                {/* Center Core */}
                <div style={styles.centerCore}>
                  <div style={styles.coreIcon}>
                    <div style={styles.coreIconLine1}></div>
                    <div style={styles.coreIconLine2}></div>
                    <div style={styles.coreIconLine3}></div>
                  </div>
                  <div
                    style={{
                      ...styles.coreTitle,
                      fontSize: isMobile ? 20 : 24,
                    }}
                  >
                    SCI
                  </div>
                  <div
                    style={{
                      ...styles.coreSubtitle,
                      fontSize: isMobile ? 9 : 10,
                    }}
                  >
                    STRUCTURAL
                    <br />
                    CRASH INTEGRITY
                  </div>
                </div>

                {/* Corner Markers */}
                <div
                  style={{ ...styles.cornerMarker, top: 10, left: 10 }}
                ></div>
                <div
                  style={{ ...styles.cornerMarker, top: 10, right: 10 }}
                ></div>
                <div
                  style={{ ...styles.cornerMarker, bottom: 10, left: 10 }}
                ></div>
                <div
                  style={{ ...styles.cornerMarker, bottom: 10, right: 10 }}
                ></div>
              </div>

              {/* Footer Info */}
              <div style={styles.cardFooter}>
                <div style={styles.footerLine}></div>
                <div style={styles.footerText}>{t("home.origin.footer")}</div>
                <div style={styles.footerSpec}>
                  SPEC: HIGHWAY-GRADE | RUST-RESISTANT
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.6;
            }
          }

          .industrial-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .industrial-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 40px 100px rgba(0,33,71,0.25), 0 16px 40px rgba(0,33,71,0.15);
          }

          @media (max-width: 1024px) {
            .industrial-card:hover {
              transform: none;
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default Origin;

/* ================= STYLES ================= */

const styles = {
  section: {
    padding: "100px 0",
    position: "relative",
    overflow: "hidden",
    //background:"linear-gradient(180deg, #fafbfc 0%, #ffffff 50%, #f8f9fb 100%)",
  },

  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      linear-gradient(90deg, rgba(0,33,71,0.02) 1px, transparent 1px),
      linear-gradient(rgba(0,33,71,0.02) 1px, transparent 1px)
    `,
    backgroundSize: "50px 50px",
    opacity: 0.5,
    pointerEvents: "none",
  },

  accentGradient: {
    position: "absolute",
    top: "20%",
    right: "-10%",
    width: "500px",
    height: "500px",
    background:
      "radial-gradient(circle, rgba(0,51,102,0.08) 0%, transparent 70%)",
    pointerEvents: "none",
  },

  container: {
    maxWidth: 1300,
    margin: "0 auto",
    display: "grid",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },

  content: {
    display: "flex",
    flexDirection: "column",
  },

  labelContainer: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },

  labelLine: {
    width: 30,
    height: 2,
    background: "linear-gradient(90deg, #c2410c, transparent)",
  },

  label: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    letterSpacing: "0.25em",
    fontWeight: 700,
    color: "#c2410c",
    textTransform: "uppercase",
  },

  title: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontWeight: 700,
    background: "linear-gradient(135deg, #001a33 0%, #003d7a 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    lineHeight: 1,
    letterSpacing: "0.02em",
  },

  titleAccent: {
    width: 80,
    height: 4,
    background: "linear-gradient(90deg, #003366 0%, transparent 100%)",
    marginTop: 16,
    borderRadius: 2,
  },

  description: {
    fontFamily: "'Inter', sans-serif",
    lineHeight: 1.8,
    color: "rgba(0,26,51,0.75)",
    fontWeight: 400,
    maxWidth: 580,
  },

  statsGrid: {
    display: "grid",
    gap: 20,
  },

  statCard: {
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fb 100%)",
    border: "1px solid rgba(0,33,71,0.08)",
    borderRadius: 12,
    padding: "20px 16px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,33,71,0.06)",
  },

  statNumber: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 32,
    fontWeight: 700,
    background: "linear-gradient(135deg, #001a33 0%, #003d7a 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    lineHeight: 1,
    marginBottom: 8,
  },

  statLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    letterSpacing: "0.1em",
    color: "rgba(0,26,51,0.6)",
    textTransform: "uppercase",
    fontWeight: 600,
  },

  principles: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  principleCard: {
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
    background: "#ffffff",
    border: "1px solid rgba(0,33,71,0.08)",
    borderRadius: 10,
    padding: "16px 20px",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(0,33,71,0.04)",
  },

  principleIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    background: "linear-gradient(135deg, #003366 0%, #004d99 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  principleIconInner: {
    width: 16,
    height: 16,
    border: "2px solid #ffffff",
    borderRadius: 3,
    transform: "rotate(45deg)",
  },

  principleContent: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    flex: 1,
  },

  principleNumber: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 20,
    fontWeight: 700,
    color: "#0a4d8f",
    minWidth: 30,
  },

  principleText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    color: "#001a33",
    fontWeight: 500,
    lineHeight: 1.5,
  },

  /* ===== RIGHT INDUSTRIAL VISUAL ===== */

  visual: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  industrialCard: {
    width: "100%",
    maxWidth: 500,
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fb 100%)",
    border: "2px solid rgba(0,33,71,0.1)",
    borderRadius: 16,
    boxShadow: "0 30px 80px rgba(0,33,71,0.12), 0 10px 30px rgba(0,33,71,0.08)",
    position: "relative",
    overflow: "hidden",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },

  badge: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(0,33,71,0.05)",
    padding: "8px 16px",
    borderRadius: 100,
    border: "1px solid rgba(0,33,71,0.1)",
  },

  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#0a4d8f",
    animation: "pulse 2s ease-in-out infinite",
  },

  badgeText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    letterSpacing: "0.15em",
    fontWeight: 700,
    color: "#001a33",
    textTransform: "uppercase",
  },

  certBadge: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 18,
    fontWeight: 700,
    color: "#0a4d8f",
    background: "rgba(10,77,143,0.1)",
    padding: "6px 14px",
    borderRadius: 6,
    border: "1px solid rgba(10,77,143,0.2)",
  },

  steelStructure: {
    position: "relative",
    width: "100%",
    aspectRatio: "1 / 1",
    background: "linear-gradient(135deg, #f0f4f8 0%, #e5eaf0 100%)",
    border: "1px solid rgba(0,33,71,0.15)",
    borderRadius: 8,
    overflow: "hidden",
  },

  beam: {
    position: "absolute",
    width: "80%",
    height: 3,
    background: "linear-gradient(90deg, #003366 0%, #004d99 50%, #003366 100%)",
    boxShadow: "0 2px 6px rgba(0,33,71,0.3)",
  },

  support: {
    position: "absolute",
    width: 3,
    background:
      "linear-gradient(180deg, #003366 0%, #004d99 50%, #003366 100%)",
    boxShadow: "2px 0 6px rgba(0,33,71,0.3)",
  },

  centerCore: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 140,
    height: 140,
    background: "linear-gradient(135deg, #001a33 0%, #003d7a 100%)",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    boxShadow:
      "0 12px 32px rgba(0,33,71,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
    border: "2px solid rgba(255,255,255,0.1)",
  },

  coreIcon: {
    position: "relative",
    width: 32,
    height: 32,
    marginBottom: 4,
  },

  coreIconLine1: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 2,
    background: "#0a4d8f",
  },

  coreIconLine2: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "50%",
    width: 2,
    background: "#0a4d8f",
  },

  coreIconLine3: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 16,
    height: 16,
    border: "2px solid #0a4d8f",
    transform: "translate(-50%, -50%) rotate(45deg)",
  },

  coreTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontWeight: 700,
    color: "#0a4d8f",
    letterSpacing: "0.15em",
    lineHeight: 1,
  },

  coreSubtitle: {
    fontFamily: "'Inter', sans-serif",
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    letterSpacing: "0.15em",
    lineHeight: 1.4,
    fontWeight: 600,
    textTransform: "uppercase",
  },

  cornerMarker: {
    position: "absolute",
    width: 20,
    height: 20,
    border: "2px solid rgba(0,33,71,0.3)",
  },

  cardFooter: {
    marginTop: 28,
    paddingTop: 20,
    borderTop: "1px solid rgba(0,33,71,0.1)",
  },

  footerLine: {
    width: 60,
    height: 2,
    background: "linear-gradient(90deg, #003366 0%, transparent 100%)",
    marginBottom: 12,
  },

  footerText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    color: "rgba(0,26,51,0.7)",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    fontWeight: 600,
    marginBottom: 6,
  },

  footerSpec: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 10,
    color: "rgba(0,26,51,0.5)",
    letterSpacing: "0.1em",
    fontWeight: 500,
  },
};
