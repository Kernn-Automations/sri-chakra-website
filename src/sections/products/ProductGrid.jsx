import { useLanguage } from "../../context/LanguageContext";
import { useMediaQuery } from "react-responsive";

const ProductsGrid = ({ onSelectProduct }) => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const products = t("products.grid.items");

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div
          style={{
            ...styles.grid,
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(360px, 1fr))",
          }}
        >
          {products.map((item, i) => (
            <div
              key={item.key}
              style={styles.card}
              onClick={() => onSelectProduct(item.key)}
            >
              {/* Image */}
              <div style={styles.imageWrap}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  draggable={false}
                  style={styles.image}
                />
              </div>

              {/* Index */}
              <div style={styles.cardIndex}>
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Content */}
              <h3 style={styles.cardTitle}>{item.title}</h3>

              <p style={styles.cardDesc}>{item.description}</p>

              {/* Specs */}
              <ul style={styles.specs}>
                {item.specs.map((spec, idx) => (
                  <li key={idx} style={styles.specItem}>
                    {spec}
                  </li>
                ))}
              </ul>

              <span style={styles.cardCta}>{t("products.grid.cta")} →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;

/* ================= STYLES ================= */

const styles = {
  section: {
    padding: "120px 0 160px",
  },

  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
  },

  grid: {
    display: "grid",
    gap: 48,
  },

  card: {
    position: "relative",
    padding: "0 0 40px",
    border: "1px solid rgba(0,33,71,0.15)",
    background: "#fff",
    transition: "all 0.35s ease",
  },

  imageWrap: {
    width: "100%",
    height: 220,
    overflow: "hidden",
    background: "#e5e7eb",
    borderBottom: "1px solid rgba(0,33,71,0.12)",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  cardIndex: {
    fontFamily: "monospace",
    fontSize: 12,
    letterSpacing: "0.2em",
    color: "#FFD700",
    margin: "24px 32px 12px",
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#002147",
    margin: "0 32px 12px",
  },

  cardDesc: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "#4b5563",
    margin: "0 32px 20px",
  },

  specs: {
    listStyle: "none",
    padding: 0,
    margin: "0 32px 28px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  specItem: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#002147",
    letterSpacing: "0.05em",
  },

  cardCta: {
    marginLeft: 32,
    fontFamily: "monospace",
    fontSize: 12,
    letterSpacing: "0.2em",
    color: "#002147",
    cursor: "pointer",
  },
};
