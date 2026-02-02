import { useLanguage } from "../../context/LanguageContext";
import { useMediaQuery } from "react-responsive";

/*
  RAILWAY OVERVIEW
  ----------------
  This section explains Sri Chakra Industries’ involvement
  in Indian Railway & Metro infrastructure projects.

  Focus:
  - Compliance-driven manufacturing
  - Load-bearing steel components
  - Long-term durability & safety
*/

const RailwayOverview = () => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const images = {
    hero: "/media/images/railway-hro.jpg",
    fabrication: "/media/images/steel-fabrication.jpg",
  };

  return (
    <section style={styles.section} data-dark="true">
      <div style={styles.container}>
        {/* ================= HEADER ================= */}
        <div style={styles.header}>
          <span style={styles.eyebrow}>{t("railway.overview.eyebrow")}</span>

          <h1 style={styles.title}>{t("railway.overview.title")}</h1>

          <p style={styles.subtitle}>{t("railway.overview.subtitle")}</p>
        </div>

        {/* ================= HERO IMAGE ================= */}
        <div style={styles.heroImageWrap}>
          <img
            src={images.hero}
            alt="Railway infrastructure steel components"
            style={styles.heroImage}
            loading="lazy"
            draggable={false}
          />
        </div>

        {/* ================= INTRO ================= */}
        <div style={styles.intro}>
          <p style={styles.paragraph}>{t("railway.overview.intro")}</p>
        </div>

        {/* ================= CAPABILITIES GRID ================= */}
        <div
          style={{
            ...styles.capabilitiesGrid,
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          }}
        >
          {t("railway.overview.capabilities").map((item, i) => (
            <div key={i} style={styles.capabilityCard}>
              <div style={styles.capabilityIndex}>
                {String(i + 1).padStart(2, "0")}
              </div>

              <h3 style={styles.capabilityTitle}>{item.title}</h3>

              <p style={styles.capabilityDesc}>{item.description}</p>
            </div>
          ))}
        </div>

        {/* ================= IMAGE + TEXT SPLIT ================= */}
        <div
          style={{
            ...styles.split,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <div style={styles.splitImageWrap}>
            <img
              src={images.fabrication}
              alt="Railway steel fabrication"
              style={styles.splitImage}
              loading="lazy"
            />
          </div>

          <div style={styles.splitContent}>
            <h2 style={styles.sectionTitle}>
              {t("railway.overview.fabricationTitle")}
            </h2>

            <p style={styles.paragraph}>
              {t("railway.overview.fabricationDesc")}
            </p>

            <ul style={styles.list}>
              {t("railway.overview.fabricationPoints").map((p, i) => (
                <li key={i} style={styles.listItem}>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ================= APPLICATIONS ================= */}
        <div style={styles.applications}>
          <h2 style={styles.sectionTitle}>
            {t("railway.overview.applicationsTitle")}
          </h2>

          <div
            style={{
              ...styles.appGrid,
              gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
            }}
          >
            {t("railway.overview.applications").map((app, i) => (
              <div key={i} style={styles.appCard}>
                <span style={styles.appIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={styles.appText}>{app}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= STANDARDS STRIP ================= */}
        <div style={styles.standardsStrip}>
          {t("railway.overview.standards").map((s, i) => (
            <div key={i} style={styles.standardBadge}>
              {s}
            </div>
          ))}
        </div>

        {/* ================= FOOTNOTE ================= */}
        <div style={styles.footnote}>{t("railway.overview.footnote")}</div>
      </div>
    </section>
  );
};

export default RailwayOverview;

/* ================= STYLES ================= */

const styles = {
  section: {
    padding: "160px 0 180px",
    background: "linear-gradient(180deg, #08182a 0%, #0a1a2f 100%)",
    color: "#ffffff",
  },

  container: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "0 24px",
  },

  header: {
    maxWidth: 820,
    marginBottom: 80,
  },

  eyebrow: {
    fontFamily: "monospace",
    fontSize: 11,
    letterSpacing: "0.35em",
    color: "#FFD700",
    marginBottom: 20,
    display: "inline-block",
  },

  title: {
    fontFamily: "Georgia, serif",
    fontSize: "clamp(42px,5vw,68px)",
    lineHeight: 1.05,
    marginBottom: 24,
  },

  subtitle: {
    fontSize: 18,
    lineHeight: 1.8,
    color: "rgba(255,255,255,0.75)",
  },

  heroImageWrap: {
    marginBottom: 96,
  },

  heroImage: {
    width: "100%",
    borderRadius: 6,
    border: "1px solid rgba(255,255,255,0.12)",
  },

  intro: {
    maxWidth: 820,
    marginBottom: 100,
  },

  paragraph: {
    fontSize: 16,
    lineHeight: 1.9,
    color: "rgba(255,255,255,0.8)",
  },

  capabilitiesGrid: {
    display: "grid",
    gap: 48,
    marginBottom: 120,
  },

  capabilityCard: {
    padding: "36px 32px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 30px 60px rgba(0,0,0,0.35)",
  },

  capabilityIndex: {
    fontFamily: "monospace",
    fontSize: 12,
    letterSpacing: "0.2em",
    color: "#FFD700",
    marginBottom: 14,
  },

  capabilityTitle: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 12,
  },

  capabilityDesc: {
    fontSize: 14.5,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.7)",
  },

  split: {
    display: "flex",
    gap: 64,
    alignItems: "center",
    marginBottom: 140,
  },

  splitImageWrap: {
    flex: 1,
  },

  splitImage: {
    width: "100%",
    borderRadius: 6,
    border: "1px solid rgba(255,255,255,0.12)",
  },

  splitContent: {
    flex: 1,
  },

  sectionTitle: {
    fontFamily: "Georgia, serif",
    fontSize: "clamp(28px,4vw,42px)",
    marginBottom: 24,
  },

  list: {
    marginTop: 20,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  listItem: {
    fontSize: 14.5,
    color: "rgba(255,255,255,0.75)",
    lineHeight: 1.6,
  },

  applications: {
    marginBottom: 120,
  },

  appGrid: {
    display: "grid",
    gap: 32,
    marginTop: 40,
  },

  appCard: {
    padding: "24px 20px",
    border: "1px dashed rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.02)",
  },

  appIndex: {
    fontFamily: "monospace",
    fontSize: 11,
    letterSpacing: "0.2em",
    color: "#FFD700",
    display: "block",
    marginBottom: 8,
  },

  appText: {
    fontSize: 14.5,
    color: "rgba(255,255,255,0.8)",
  },

  standardsStrip: {
    display: "flex",
    flexWrap: "wrap",
    gap: 24,
    marginBottom: 80,
  },

  standardBadge: {
    padding: "10px 18px",
    border: "1px solid rgba(255,215,0,0.6)",
    color: "#FFD700",
    fontFamily: "monospace",
    fontSize: 11,
    letterSpacing: "0.15em",
  },

  footnote: {
    maxWidth: 820,
    fontSize: 13,
    color: "rgba(255,255,255,0.55)",
    borderTop: "1px solid rgba(255,255,255,0.12)",
    paddingTop: 32,
  },
};
