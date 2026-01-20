import { useLanguage } from "../../context/LanguageContext";
import { useMediaQuery } from "react-responsive";

const Compliance = () => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const standards = t("railway.compliance.standards");
  const practices = t("railway.compliance.practices");

  return (
    <section style={styles.section} data-theme="dark">
      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <span style={styles.eyebrow}>{t("railway.compliance.eyebrow")}</span>

          <h2 style={styles.title}>{t("railway.compliance.title")}</h2>

          <p style={styles.desc}>{t("railway.compliance.description")}</p>
        </div>

        {/* STANDARDS GRID */}
        <div
          style={{
            ...styles.grid,
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {standards.map((std, i) => (
            <div key={i} style={styles.card}>
              <span style={styles.cardIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>

              <h4 style={styles.cardTitle}>{std.code}</h4>

              <p style={styles.cardDesc}>{std.description}</p>
            </div>
          ))}
        </div>

        {/* PRACTICES */}
        <div style={styles.practiceBlock}>
          <h3 style={styles.practiceTitle}>
            {t("railway.compliance.practiceTitle")}
          </h3>

          <ul style={styles.practiceList}>
            {practices.map((item, i) => (
              <li key={i} style={styles.practiceItem}>
                <span style={styles.practiceBullet}>▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* FOOTNOTE */}
        <div style={styles.footnote}>{t("railway.compliance.footnote")}</div>
      </div>
    </section>
  );
};

export default Compliance;

/* ================= STYLES ================= */

const styles = {
  section: {
    padding: "160px 0",
    background: "#0a1a2f",
    color: "#fff",
  },

  container: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    flexDirection: "column",
    gap: 96,
  },

  header: {
    maxWidth: 680,
  },

  eyebrow: {
    fontFamily: "monospace",
    fontSize: 11,
    letterSpacing: "0.35em",
    color: "#FFD700",
    marginBottom: 16,
    display: "inline-block",
  },

  title: {
    fontFamily: "Georgia, serif",
    fontSize: "clamp(36px, 5vw, 56px)",
    lineHeight: 1.1,
    marginBottom: 24,
  },

  desc: {
    fontSize: 16,
    lineHeight: 1.8,
    color: "rgba(255,255,255,0.75)",
  },

  grid: {
    display: "grid",
    gap: 40,
  },

  card: {
    border: "1px solid rgba(255,255,255,0.15)",
    padding: "32px 28px",
    background: "rgba(255,255,255,0.04)",
  },

  cardIndex: {
    fontFamily: "monospace",
    fontSize: 11,
    letterSpacing: "0.2em",
    color: "#FFD700",
    marginBottom: 14,
    display: "block",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 10,
  },

  cardDesc: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.75)",
  },

  practiceBlock: {
    borderLeft: "3px solid #FFD700",
    paddingLeft: 32,
    maxWidth: 720,
  },

  practiceTitle: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 24,
  },

  practiceList: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },

  practiceItem: {
    display: "flex",
    gap: 12,
    fontSize: 15,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.8)",
  },

  practiceBullet: {
    color: "#FFD700",
  },

  footnote: {
    fontSize: 13,
    color: "rgba(255,255,255,0.55)",
    maxWidth: 820,
  },
};
