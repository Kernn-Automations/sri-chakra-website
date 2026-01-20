import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { useLanguage } from "../../context/LanguageContext";
import RoofSheet3D from "../../drawings/RoofSheet3D";
import WBeamVisual from "../../drawings/WBeamVisual";

const COLORS = [
  { name: "Ocean Blue", hex: "#1e3a8a" },
  { name: "Brick Red", hex: "#7f1d1d" },
  { name: "Forest Green", hex: "#14532d" },
  { name: "Charcoal Grey", hex: "#1f2933" },
  { name: "Galvanized Silver", hex: "#9ca3af" },
];

const ProductDetailsPopup = ({ open, onClose, productKey }) => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const product = t(`products.details.${productKey}`);

  const [activeColor, setActiveColor] = useState(COLORS[0]);

  useEffect(() => {
    setActiveColor(COLORS[0]);
  }, [productKey]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !product) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.containerWrapper} onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button onClick={onClose} style={styles.closeBtn}>
          <X size={18} />
        </button>

        <div
          className="product-popup-scroll"
          style={{
            ...styles.container,
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          }}
        >
          {/* LEFT — VISUAL */}
          <div style={styles.visualArea}>
            {/* Roofing Sheet */}
            {productKey === "roofing" && (
              <>
                <RoofSheet3D color={activeColor.hex} />
                <div style={styles.colorRow}>
                  {COLORS.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setActiveColor(c)}
                      style={{
                        ...styles.colorSwatch,
                        background: c.hex,
                        outline:
                          activeColor.name === c.name
                            ? "3px solid #FFD700"
                            : "none",
                      }}
                      title={c.name}
                    />
                  ))}
                </div>

                <span style={styles.colorLabel}>
                  {t("products.details.color")}: {activeColor.name}
                </span>
              </>
            )}

            {/* W-BEAM */}
            {productKey === "wbeam" && <WBeamVisual />}
          </div>

          {/* RIGHT — DETAILS */}
          <div style={styles.details}>
            <span style={styles.eyebrow}>{product.category}</span>

            <h2 style={styles.title}>{product.title}</h2>

            <p style={styles.desc}>{product.description}</p>

            {/* Specs */}
            <div style={styles.specBlock}>
              <h4 style={styles.specTitle}>
                {t("products.details.specsTitle")}
              </h4>

              <ul style={styles.specList}>
                {product.specs.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            {/* Source 
            <div style={styles.sourceBlock}>
              <h4 style={styles.specTitle}>
                {t("products.details.sourceTitle")}
              </h4>
              <p>{product.source}</p>
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPopup;

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(10,26,47,0.92)",
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px", // ⬅️ reduce from 40px
  },

  closeBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    zIndex: 10,
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "50%",
    width: 34,
    height: 34,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#FFD700",
    cursor: "pointer",
    backdropFilter: "blur(8px)",
  },

  containerWrapper: {
    position: "relative",
    top: "5%",
    width: "100%",
    maxWidth: 1240,
    height: "86vh", // FIXED height, not maxHeight
    background: "#0a1a2f",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 60px 120px rgba(0,0,0,0.65)",
    borderRadius: 14,
    overflow: "hidden", // stays hidden
  },

  container: {
    display: "grid",
    gap: 56,
    padding: "44px 48px 40px",
    color: "#fff",
    height: "100%", // ⬅️ fill wrapper
    //overflowY: "auto", // ⬅️ ONLY scroll here
  },

  /* VISUAL */
  visualArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 32,
  },

  sheet3D: {
    width: "100%",
    maxWidth: 440,
    height: 260,
    transform: "perspective(900px) rotateX(14deg) rotateZ(-1deg)",
    background: `
    linear-gradient(
      135deg,
      rgba(255,255,255,0.25),
      rgba(0,0,0,0.35)
    )
  `,
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    boxShadow: `
    inset 0 8px 16px rgba(255,255,255,0.35),
    inset 0 -12px 24px rgba(0,0,0,0.45),
    0 50px 90px rgba(0,0,0,0.75)
  `,
    borderRadius: 6,
    overflow: "hidden",
  },

  groove: {
    background: `
    linear-gradient(
      to right,
      rgba(255,255,255,0.45),
      rgba(255,255,255,0.08) 30%,
      rgba(0,0,0,0.25) 60%,
      rgba(0,0,0,0.45)
    )
  `,
    boxShadow: `
    inset 2px 0 6px rgba(255,255,255,0.35),
    inset -2px 0 8px rgba(0,0,0,0.4)
  `,
  },

  colorRow: {
    display: "flex",
    gap: 12,
  },

  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
  },

  colorLabel: {
    fontFamily: "monospace",
    fontSize: 12,
    letterSpacing: "0.2em",
    color: "#FFD700",
  },

  /* DETAILS */
  details: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    alignSelf: "flex-start", // ⬅️ prevents vertical stretching
  },

  eyebrow: {
    fontFamily: "monospace",
    fontSize: 11,
    letterSpacing: "0.3em",
    color: "#FFD700",
  },

  title: {
    fontFamily: "Georgia, serif",
    fontSize: "clamp(32px,4vw,48px)",
    lineHeight: 1.1,
  },

  desc: {
    fontSize: 16,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.8)",
  },

  specBlock: {
    borderLeft: "3px solid #FFD700",
    paddingLeft: 20,
  },

  specTitle: {
    fontSize: 14,
    letterSpacing: "0.15em",
    marginBottom: 12,
  },

  specList: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  sourceBlock: {
    marginTop: 16,
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
};
