import { useMediaQuery } from "react-responsive";
import { Award, Building2, Briefcase } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const AboutOwner = () => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* LEFT — IMAGE */}
        <div style={styles.imageWrap}>
          <div style={styles.imageGlow} />
          <img
            src="./media/images/owner.jpeg" // replace with real image
            alt="C. Suresh Naidu"
            style={styles.image}
            draggable={false}
          />
        </div>

        {/* RIGHT — CONTENT */}
        <div style={styles.content}>
          <p style={styles.kicker}>{t("about.owner.kicker")}</p>

          <h2 style={styles.title}>
            {t("about.owner.title")}{" "}
            <span style={styles.highlight}>Sri Chakra Industries</span>
          </h2>

          <p style={styles.description}>{t("about.owner.description")}</p>

          <div style={styles.valuesGrid}>
            <ValueItem
              icon={<Briefcase size={20} />}
              title={t("about.owner.venturesTitle")}
              text={t("about.owner.venturesText")}
            />
            <ValueItem
              icon={<Building2 size={20} />}
              title={t("about.owner.leadershipTitle")}
              text={t("about.owner.leadershipText")}
            />
            <ValueItem
              icon={<Award size={20} />}
              title={t("about.owner.visionTitle")}
              text={t("about.owner.visionText")}
            />
          </div>

          <div style={styles.signatureWrap}>
            <div style={styles.signatureLine} />
            <p style={styles.signatureName}>{t("about.owner.signature")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ValueItem = ({ icon, title, text }) => (
  <div style={styles.valueCard}>
    <div style={styles.valueIcon}>{icon}</div>
    <div>
      <h4 style={styles.valueTitle}>{title}</h4>
      <p style={styles.valueText}>{text}</p>
    </div>
  </div>
);

export default AboutOwner;

const styles = {
  section: {
    padding: "100px 20px",
    background: "linear-gradient(to bottom, #ffffff, #f8fafc)",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "64px",
    alignItems: "center",
  },

  imageWrap: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  imageGlow: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,33,71,0.15), transparent 70%)",
    zIndex: 0,
  },
  image: {
    width: 320,
    height: 320,
    objectFit: "cover",
    borderRadius: "24px",
    position: "relative",
    zIndex: 1,
    boxShadow: "0 20px 60px rgba(0,33,71,0.15)",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  kicker: {
    fontSize: 12,
    letterSpacing: "2px",
    textTransform: "uppercase",
    fontWeight: 600,
    color: "#64748b",
    margin: 0,
  },
  title: {
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 800,
    margin: 0,
    color: "#0f172a",
    lineHeight: 1.2,
  },
  highlight: {
    background: "linear-gradient(135deg, #002147, #003d7a)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  description: {
    fontSize: 16,
    lineHeight: 1.7,
    color: "#475569",
    maxWidth: 560,
  },

  valuesGrid: {
    display: "grid",
    gap: "16px",
    marginTop: 12,
  },
  valueCard: {
    display: "flex",
    gap: "14px",
    alignItems: "flex-start",
    padding: "14px 16px",
    borderRadius: 14,
    background: "rgba(0,33,71,0.03)",
  },
  valueIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #002147, #003d7a)",
    color: "#fff",
    flexShrink: 0,
  },
  valueTitle: {
    fontSize: 15,
    fontWeight: 700,
    margin: "0 0 4px",
    color: "#0f172a",
  },
  valueText: {
    fontSize: 14,
    margin: 0,
    color: "#64748b",
    lineHeight: 1.5,
  },

  signatureWrap: { marginTop: 28 },
  signatureLine: {
    width: 80,
    height: 2,
    background: "#002147",
    marginBottom: 8,
  },
  signatureName: {
    fontSize: 14,
    fontWeight: 600,
    color: "#0f172a",
    margin: 0,
  },
};
