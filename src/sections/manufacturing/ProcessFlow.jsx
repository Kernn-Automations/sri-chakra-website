import { useLanguage } from "../../context/LanguageContext";
import { useMediaQuery } from "react-responsive";

const ProcessFlow = () => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const steps = t("manufacturing.processFlow.steps");

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.eyebrow}>
            {t("manufacturing.processFlow.eyebrow")}
          </span>

          <h2 style={styles.title}>{t("manufacturing.processFlow.title")}</h2>

          <p style={styles.desc}>
            {t("manufacturing.processFlow.description")}
          </p>
        </div>

        {/* Flow */}
        <div
          style={{
            ...styles.flow,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {steps.map((step, i) => (
            <div key={step.key} style={styles.step}>
              {/* Index */}
              <div style={styles.index}>
                STEP {String(i + 1).padStart(2, "0")}
              </div>

              <h4 style={styles.stepTitle}>{step.title}</h4>
              <p style={styles.stepDesc}>{step.description}</p>

              {/* Connector */}
              {!isMobile && i !== steps.length - 1 && (
                <div style={styles.connectorWrap}>
                  <span style={styles.connectorDot} />
                  <span style={styles.connectorLine} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;

/* ================= STYLES ================= */

const styles = {
  section: {
    padding: "160px 0 140px",
    background: "linear-gradient(180deg,#08182a,#0a1a2f)",
    color: "#fff",
  },

  container: {
    maxWidth: 1320,
    margin: "0 auto",
    padding: "0 24px",
  },

  header: {
    maxWidth: 680,
    marginBottom: 96,
  },

  eyebrow: {
    fontFamily: "monospace",
    fontSize: 11,
    letterSpacing: "0.35em",
    color: "#FFD700",
    marginBottom: 18,
    display: "inline-block",
  },

  title: {
    fontFamily: "Georgia, serif",
    fontSize: "clamp(38px,5vw,58px)",
    lineHeight: 1.1,
    marginBottom: 22,
  },

  desc: {
    fontSize: 16,
    lineHeight: 1.9,
    color: "rgba(255,255,255,0.75)",
  },

  flow: {
    display: "flex",
    gap: 56,
    position: "relative",
  },

  step: {
    flex: 1,
    position: "relative",
    padding: "36px 32px 40px",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: `
      inset 0 1px 0 rgba(255,255,255,0.15),
      0 30px 60px rgba(0,0,0,0.35)
    `,
  },

  index: {
    fontFamily: "monospace",
    fontSize: 11,
    letterSpacing: "0.25em",
    color: "#FFD700",
    marginBottom: 18,
    opacity: 0.9,
  },

  stepTitle: {
    fontSize: 19,
    fontWeight: 700,
    marginBottom: 12,
    color: "#ffffff",
  },

  stepDesc: {
    fontSize: 14.5,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.7)",
  },

  connectorWrap: {
    position: "absolute",
    top: "50%",
    right: -56,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  connectorDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#FFD700",
  },

  connectorLine: {
    width: 42,
    height: 1,
    background: "linear-gradient(90deg,#FFD700,transparent)",
  },
};
