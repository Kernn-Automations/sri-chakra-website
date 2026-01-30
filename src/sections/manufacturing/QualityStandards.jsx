import { useLanguage } from "../../context/LanguageContext";

const QualityStandards = () => {
  const { t } = useLanguage();

  const standards = t("manufacturing.quality.standards");
  const checks = t("manufacturing.quality.checks");

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.eyebrow}>
            {t("manufacturing.quality.eyebrow")}
          </span>
          <h2 style={styles.title}>{t("manufacturing.quality.title")}</h2>
          <p style={styles.desc}>{t("manufacturing.quality.description")}</p>
        </div>

        <div style={styles.grid}>
          {/* Standards */}
          <div style={styles.block}>
            <h4 style={styles.blockTitle}>
              {t("manufacturing.quality.standardsTitle")}
            </h4>

            <ul style={styles.list}>
              {standards.map((item, i) => (
                <li key={i} style={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Quality Checks */}
          <div style={styles.block}>
            <h4 style={styles.blockTitle}>
              {t("manufacturing.quality.checksTitle")}
            </h4>

            <ul style={styles.list}>
              {checks.map((item, i) => (
                <li key={i} style={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityStandards;

/* ================= STYLES ================= */

const styles = {
  section: {
    padding: "140px 0 160px",
    background: "#ffffff",
    color: "#002147",
  },

  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
  },

  header: {
    maxWidth: 640,
    marginBottom: 80,
  },

  eyebrow: {
    fontFamily: "monospace",
    fontSize: 11,
    letterSpacing: "0.3em",
    color: "#c2410c",
    marginBottom: 16,
    display: "inline-block",
  },

  title: {
    fontFamily: "Georgia, serif",
    fontSize: "clamp(36px,5vw,52px)",
    lineHeight: 1.1,
    marginBottom: 20,
  },

  desc: {
    fontSize: 16,
    lineHeight: 1.8,
    color: "rgba(0,33,71,0.75)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 64,
  },

  block: {
    borderLeft: "4px solid #c2410c",
    paddingLeft: 24,
  },

  blockTitle: {
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: "0.1em",
    marginBottom: 24,
  },

  list: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },

  listItem: {
    fontSize: 15,
    lineHeight: 1.6,
  },
};
