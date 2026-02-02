import { useLanguage } from "../../context/LanguageContext";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProductsGrid = ({ onSelectProduct }) => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const gridRef = useRef(null);

  const isTouch = typeof window !== "undefined" && "ontouchstart" in window;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".product-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 12;
    const rotateX = (y / rect.height - 0.5) * -12;

    gsap.to(card, {
      rotateY,
      rotateX,
      transformPerspective: 900,
      duration: 0.4,
      ease: "power2.out",
    });

    const img = card.querySelector("img");
    gsap.to(img, {
      x: rotateY * 2,
      y: rotateX * 2,
      scale: 1.08,
      duration: 0.4,
    });
  };

  const resetTilt = (card) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    const img = card.querySelector("img");
    gsap.to(img, { x: 0, y: 0, scale: 1, duration: 0.6 });
  };

  const products = t("products.grid.items");

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div
          ref={gridRef}
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
              className="product-card"
              style={styles.card}
              onClick={() => onSelectProduct(item.key)}
              onMouseMove={
                !isTouch
                  ? (e) => handleMouseMove(e, e.currentTarget)
                  : undefined
              }
              onMouseLeave={
                !isTouch ? (e) => resetTilt(e.currentTarget) : undefined
              }
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

      {/* Premium hover effects */}
      <style>{`
        .product-card {
          transition: box-shadow 0.4s ease, border-color 0.4s ease;
          transform-style: preserve-3d;
        }

        .product-card:hover {
          box-shadow: 0 40px 80px rgba(0,33,71,0.18);
          border-color: rgba(194,65,12,0.5);
        }

        .product-card img {
          transition: transform 0.4s ease;
        }
      `}</style>
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
    cursor: "pointer",
    borderRadius: 8,
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
    color: "#C2410C",
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
  },
};
