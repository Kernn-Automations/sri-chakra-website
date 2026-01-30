import { useLanguage } from "../../context/LanguageContext";
import { useMediaQuery } from "react-responsive";

const PillarCard = ({ title, subtitle, description, index, images }) => (
  <div style={styles.card} className="pillar-card">
    {/* Image Gallery */}
    <div style={styles.imageGallery}>
      {images &&
        images.map((img, idx) => (
          <div key={idx} style={styles.imageWrapper} className="image-wrapper">
            <img src={img} alt={`${title} ${idx + 1}`} style={styles.image} />
            <div style={styles.imageOverlay}></div>
          </div>
        ))}
    </div>

    <div style={styles.cardBody}>
      <div style={styles.cardHeader}>
        <div style={styles.indexBadge}>
          {String(index + 1).padStart(2, "0")}
        </div>
        <div style={styles.cardDivider}></div>
      </div>

      <span style={styles.pillSubtitle}>{subtitle}</span>
      <h3 style={styles.pillTitle}>{title}</h3>
      <p style={styles.pillDescription}>{description}</p>

      <div style={styles.cardFooter}></div>
    </div>
  </div>
);

const AboutPillars = () => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  const pillars = [
    {
      key: "crashBarriers",
      ...t("about.pillars.crashBarriers"),
      images: ["/media/images/highway1.png", "/media/images/highway2.png"],
    },
    {
      key: "railway",
      ...t("about.pillars.railway"),
      images: ["/media/images/railway1.png", "/media/images/railway2.png"],
    },
    {
      key: "roofing",
      ...t("about.pillars.roofing"),
      images: ["/media/images/roofing1.jpeg", "/media/images/roofing2.jpeg"],
    },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <section style={styles.wrapper} id="about-pillars">
        {/* Background Elements */}
        <div style={styles.backgroundPattern}></div>

        <div style={styles.container}>
          {/* Section Header */}
          <div style={styles.sectionHeader}>
            <div style={styles.labelContainer}>
              <div style={styles.labelLine}></div>
              <span style={styles.label}>OUR CORE EXPERTISE</span>
              <div style={styles.labelLine}></div>
            </div>
            <h2 style={styles.sectionTitle}>THREE PILLARS OF EXCELLENCE</h2>
            <p style={styles.sectionSubtitle}>
              Industry-leading solutions in highway safety, railway
              infrastructure, and premium roofing systems
            </p>
          </div>

          <div
            style={{
              ...styles.grid,
              gridTemplateColumns: isMobile
                ? "1fr"
                : isTablet
                  ? "1fr 1fr"
                  : "1fr 1fr 1fr",
            }}
          >
            {pillars.map((pillar, idx) => (
              <PillarCard key={pillar.key} {...pillar} index={idx} />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .pillar-card {
            animation: slideUp 0.6s ease forwards;
            animation-delay: calc(var(--index) * 0.1s);
          }

          .pillar-card:nth-child(1) { --index: 0; }
          .pillar-card:nth-child(2) { --index: 1; }
          .pillar-card:nth-child(3) { --index: 2; }

          .pillar-card:hover {
            transform: translateY(-12px);
            border-color: rgba(194,65,12,0.3);
            box-shadow: 0 24px 60px rgba(194,65,12,0.15), 0 12px 24px rgba(0,33,71,0.1);
          }

          .pillar-card:hover .image-wrapper img {
            transform: scale(1.1);
            filter: grayscale(0%) saturate(100%);
          }

          .pillar-card:hover .arrow-icon {
            transform: translateX(6px);
          }

          .image-wrapper {
            position: relative;
            overflow: hidden;
          }

          @media (max-width: 768px) {
            .pillar-card:hover {
              transform: translateY(-6px);
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default AboutPillars;

const styles = {
  wrapper: {
    padding: "100px 20px 120px",
    position: "relative",
    background:
      "linear-gradient(180deg, #ffffff 0%, #fafbfc 50%, #ffffff 100%)",
    overflow: "hidden",
  },

  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      linear-gradient(90deg, rgba(194,65,12,0.02) 1px, transparent 1px),
      linear-gradient(rgba(194,65,12,0.02) 1px, transparent 1px)
    `,
    backgroundSize: "60px 60px",
    opacity: 0.4,
    pointerEvents: "none",
  },

  container: {
    maxWidth: 1400,
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },

  sectionHeader: {
    textAlign: "center",
    marginBottom: 80,
  },

  labelContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginBottom: 20,
  },

  labelLine: {
    width: 50,
    height: 2,
    background:
      "linear-gradient(90deg, transparent, rgba(194,65,12,0.5), transparent)",
  },

  label: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    letterSpacing: "0.25em",
    fontWeight: 700,
    color: "#c2410c",
    textTransform: "uppercase",
  },

  sectionTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(40px, 5.5vw, 64px)",
    letterSpacing: "0.04em",
    fontWeight: 700,
    background: "linear-gradient(135deg, #001a33 0%, #c2410c 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    margin: "0 0 16px 0",
    lineHeight: 1,
  },

  sectionSubtitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "clamp(14px, 1.5vw, 17px)",
    color: "rgba(0,26,51,0.7)",
    fontWeight: 500,
    maxWidth: 700,
    margin: "0 auto",
    lineHeight: 1.6,
  },

  grid: {
    display: "grid",
    gap: 40,
  },

  card: {
    border: "2px solid rgba(0,33,71,0.08)",
    borderRadius: 16,
    padding: 0,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 8px 24px rgba(0,33,71,0.06)",
    overflow: "hidden",
    cursor: "pointer",
  },

  imageGallery: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 0,
    height: 240,
    borderBottom: "2px solid rgba(0,33,71,0.08)",
  },

  imageWrapper: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "grayscale(10%) saturate(90%)",
    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(180deg, rgba(0,26,51,0.1) 0%, rgba(194,65,12,0.05) 100%)",
    pointerEvents: "none",
  },

  cardBody: {
    padding: "36px 32px 32px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },

  indexBadge: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 24,
    fontWeight: 700,
    color: "#c2410c",
    background: "rgba(194,65,12,0.08)",
    padding: "8px 16px",
    borderRadius: 6,
    lineHeight: 1,
    minWidth: 50,
    textAlign: "center",
  },

  cardDivider: {
    flex: 1,
    height: 2,
    background:
      "linear-gradient(90deg, rgba(194,65,12,0.3) 0%, transparent 100%)",
  },

  pillSubtitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    letterSpacing: "0.2em",
    color: "rgba(0,33,71,0.5)",
    textTransform: "uppercase",
    fontWeight: 600,
    display: "block",
    marginBottom: 12,
  },

  pillTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(28px, 3vw, 36px)",
    color: "#001a33",
    margin: "0 0 16px",
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: "0.02em",
  },

  pillDescription: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    lineHeight: 1.75,
    color: "rgba(0,26,51,0.75)",
    margin: "0 0 24px",
    flex: 1,
  },

  cardFooter: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginTop: "auto",
    paddingTop: 20,
    borderTop: "1px solid rgba(0,33,71,0.08)",
  },

  footerAccent: {
    width: 4,
    height: 24,
    background: "linear-gradient(180deg, #c2410c 0%, #ea580c 100%)",
    borderRadius: 2,
  },

  footerText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    letterSpacing: "0.15em",
    fontWeight: 700,
    color: "#c2410c",
    textTransform: "uppercase",
    flex: 1,
  },

  arrowIcon: {
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
};
