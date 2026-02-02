import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { useLanguage } from "../../context/LanguageContext";
import gsap from "gsap";
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
  const panelRef = useRef(null);

  const product = t(`products.details.${productKey}`);
  const [activeColor, setActiveColor] = useState(COLORS[0]);

  useEffect(() => setActiveColor(COLORS[0]), [productKey]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    gsap.fromTo(
      panelRef.current,
      isMobile ? { y: "100%" } : { scale: 0.9, opacity: 0 },
      isMobile
        ? { y: 0, duration: 0.6, ease: "power4.out" }
        : { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" },
    );

    return () => (document.body.style.overflow = "");
  }, [open, isMobile]);

  if (!open || !product) return null;

  return createPortal(
    <div style={styles.overlay} onClick={onClose}>
      <div
        ref={panelRef}
        style={{
          ...styles.panel,
          ...(isMobile ? styles.mobilePanel : styles.desktopPanel),
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {isMobile && <div style={styles.dragHandle} />}
        <button style={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        {/* MOBILE HEADER FIRST */}
        {isMobile && (
          <div style={styles.mobileHeader}>
            <span style={styles.category}>{product.category}</span>
            <h2 style={styles.title}>{product.title}</h2>
          </div>
        )}

        {/* VISUAL SECTION */}
        <div style={styles.visualSection}>
          {productKey === "roofing" && (
            <>
              <div
                style={{
                  ...styles.visualWrap,
                  ...(isMobile && styles.mobileVisualWrap),
                }}
              >
                <RoofSheet3D color={activeColor.hex} />
              </div>

              <div style={styles.colorRow}>
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setActiveColor(c)}
                    style={{
                      ...styles.colorSwatch,
                      background: c.hex,
                      boxShadow:
                        activeColor.name === c.name
                          ? "0 0 0 2px #fff, 0 0 10px rgba(194,65,12,0.9)"
                          : "none",
                    }}
                  />
                ))}
              </div>

              <span style={styles.colorLabel}>
                {t("products.details.color")}: {activeColor.name}
              </span>
            </>
          )}

          {productKey === "wbeam" && (
            <div style={isMobile ? { transform: "scale(0.85)" } : null}>
              <WBeamVisual />
            </div>
          )}
        </div>

        {/* INFO SECTION */}
        <div style={styles.infoSection}>
          {!isMobile && (
            <>
              <span style={styles.category}>{product.category}</span>
              <h2 style={styles.title}>{product.title}</h2>
            </>
          )}

          <p style={styles.desc}>{product.description}</p>

          <div style={styles.specBlock}>
            <h4 style={styles.specTitle}>{t("products.details.specsTitle")}</h4>
            <ul style={styles.specList}>
              {product.specs.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root"),
  );
};

export default ProductDetailsPopup;

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(5,15,30,0.88)",
    backdropFilter: "blur(10px)",
    zIndex: 999999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  panel: {
    background: "#0a1a2f",
    color: "#fff",
    width: "100%",
    maxWidth: 1100,
    maxHeight: "90vh",
    borderRadius: 18,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
  },

  desktopPanel: {
    flexDirection: "row",
  },

  mobilePanel: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "88vh",
  },

  dragHandle: {
    width: 50,
    height: 5,
    background: "rgba(255,255,255,0.3)",
    borderRadius: 999,
    margin: "10px auto 6px",
  },

  closeBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "50%",
    width: 38,
    height: 38,
    color: "#fff",
    cursor: "pointer",
    zIndex: 5,
  },

  visualSection: {
    flex: 1,
    padding: 30,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },

  visualWrap: {
    width: "100%",
    maxWidth: 420,
  },

  mobileVisualWrap: {
    maxWidth: 260,
  },

  infoSection: {
    flex: 1,
    padding: 30,
    overflowY: "auto",
  },

  mobileHeader: {
    padding: "10px 20px 0",
  },

  category: {
    fontSize: 12,
    letterSpacing: "0.25em",
    color: "#C2410C",
  },

  title: {
    fontSize: "clamp(24px,4vw,34px)",
    margin: "8px 0 14px",
  },

  desc: {
    color: "rgba(255,255,255,0.8)",
    lineHeight: 1.7,
  },

  specBlock: {
    marginTop: 20,
    borderLeft: "3px solid #C2410C",
    paddingLeft: 14,
  },

  specTitle: {
    fontSize: 13,
    letterSpacing: "0.15em",
    marginBottom: 10,
    color: "#C2410C",
  },

  specList: {
    paddingLeft: 16,
    lineHeight: 1.6,
  },

  colorRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },

  colorSwatch: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
  },

  colorLabel: {
    fontSize: 11,
    letterSpacing: "0.18em",
    color: "#C2410C",
  },
};
