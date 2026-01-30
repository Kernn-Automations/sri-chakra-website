import React, { useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useLanguage } from "../../context/LanguageContext";
// Mock translation context for demo
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Engineering = () => {
  const { t } = useLanguage();

  // Responsive breakpoints
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const diagramRef = useRef(null);

  const getStyles = () => {
    if (isMobile) {
      return {
        ...styles,
        section: {
          ...styles.section,
          padding: "60px 0",
        },
        container: {
          ...styles.container,
          padding: "0 20px",
          gridTemplateColumns: "1fr",
          gap: 60,
        },
        title: {
          ...styles.title,
          fontSize: "clamp(28px, 8vw, 36px)",
        },
        description: {
          ...styles.description,
          fontSize: 16,
        },
        diagram: {
          ...styles.diagram,
          maxWidth: 360,
          padding: "24px",
        },
        precisionContainer: {
          ...styles.precisionContainer,
          margin: "16px 0",
        },
        statValue: {
          ...styles.statValue,
          fontSize: 16,
        },
        cornerBracket: {
          ...styles.cornerBracket,
          width: 20,
          height: 20,
        },
      };
    }

    if (isTablet) {
      return {
        ...styles,
        section: {
          ...styles.section,
          padding: "80px 0",
        },
        container: {
          ...styles.container,
          padding: "0 28px",
          gridTemplateColumns: "1fr",
          gap: 70,
        },
        title: {
          ...styles.title,
          fontSize: "clamp(32px, 6vw, 44px)",
        },
        diagram: {
          ...styles.diagram,
          maxWidth: 420,
        },
      };
    }

    return styles;
  };
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      /* Content reveal */
      tl.from(contentRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
      });

      /* Diagram reveal */
      tl.from(
        diagramRef.current,
        {
          scale: 0.94,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const responsiveStyles = getStyles();

  return (
    <section
      style={responsiveStyles.section}
      id="engineering"
      className="snap-section"
      ref={sectionRef}
    >
      <div style={responsiveStyles.container}>
        {/* Left: Content */}
        <div style={responsiveStyles.content} ref={contentRef}>
          <div style={responsiveStyles.eyebrowContainer}>
            <div style={responsiveStyles.eyebrowLine}></div>
            <span style={responsiveStyles.eyebrow}>
              {t("home.engineering.eyebrow")}
            </span>
          </div>

          <h2 style={responsiveStyles.title}>{t("home.engineering.title")}</h2>

          <p style={responsiveStyles.description}>
            {t("home.engineering.description")}
          </p>

          {/* Technical capabilities */}
          <div style={responsiveStyles.techList}>
            {t("home.engineering.points").map((item, idx) => (
              <div key={idx} style={responsiveStyles.techItem}>
                <div style={responsiveStyles.techNumber}>
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div style={responsiveStyles.techContent}>
                  <span style={responsiveStyles.techText}>{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Precision Engineering Diagram */}
        <div style={responsiveStyles.visual}>
          <div style={responsiveStyles.diagram} ref={diagramRef}>
            {/* Header with technical notation */}
            <div style={responsiveStyles.diagramHeader}>
              <span style={responsiveStyles.diagramCode}>SYS_ENG_v4.2</span>
              <span style={responsiveStyles.diagramSubtext}>
                Structural Integrity Matrix
              </span>
            </div>

            {/* Central precision measurement visual */}
            <div style={responsiveStyles.precisionContainer}>
              {/* Crosshair/target design representing precision */}
              <div style={responsiveStyles.outerRing}>
                <div style={responsiveStyles.middleRing}>
                  <div style={responsiveStyles.innerRing}>
                    <div style={responsiveStyles.centerPoint}>
                      <span style={responsiveStyles.micronLabel}>μm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Measurement lines */}
              <div style={responsiveStyles.measurementLineH}></div>
              <div style={responsiveStyles.measurementLineV}></div>

              {/* Corner brackets for precision framing */}
              <div
                style={{
                  ...responsiveStyles.cornerBracket,
                  top: 0,
                  left: 0,
                  borderTop: "3px solid #002147",
                  borderLeft: "3px solid #002147",
                }}
              ></div>
              <div
                style={{
                  ...responsiveStyles.cornerBracket,
                  top: 0,
                  right: 0,
                  borderTop: "3px solid #002147",
                  borderRight: "3px solid #002147",
                }}
              ></div>
              <div
                style={{
                  ...responsiveStyles.cornerBracket,
                  bottom: 0,
                  left: 0,
                  borderBottom: "3px solid #002147",
                  borderLeft: "3px solid #002147",
                }}
              ></div>
              <div
                style={{
                  ...responsiveStyles.cornerBracket,
                  bottom: 0,
                  right: 0,
                  borderBottom: "3px solid #002147",
                  borderRight: "3px solid #002147",
                }}
              ></div>

              {/* Tolerance indicators */}
              <div
                style={{
                  ...responsiveStyles.toleranceIndicator,
                  top: "15%",
                  left: "10%",
                }}
              >
                <div style={responsiveStyles.toleranceDot}></div>
                <span style={responsiveStyles.toleranceText}>±0.01</span>
              </div>
              <div
                style={{
                  ...responsiveStyles.toleranceIndicator,
                  top: "15%",
                  right: "10%",
                }}
              >
                <div style={responsiveStyles.toleranceDot}></div>
                <span style={responsiveStyles.toleranceText}>±0.01</span>
              </div>
              <div
                style={{
                  ...responsiveStyles.toleranceIndicator,
                  bottom: "15%",
                  left: "10%",
                }}
              >
                <div style={responsiveStyles.toleranceDot}></div>
                <span style={responsiveStyles.toleranceText}>±0.01</span>
              </div>
              <div
                style={{
                  ...responsiveStyles.toleranceIndicator,
                  bottom: "15%",
                  right: "10%",
                }}
              >
                <div style={responsiveStyles.toleranceDot}></div>
                <span style={responsiveStyles.toleranceText}>±0.01</span>
              </div>
            </div>

            {/* Footer with precision stats */}
            <div style={responsiveStyles.diagramFooter}>
              <div style={responsiveStyles.statItem}>
                <span style={responsiveStyles.statValue}>99.97%</span>
                <span style={responsiveStyles.statLabel}>Accuracy</span>
              </div>
              <div style={responsiveStyles.statDivider}></div>
              <div style={responsiveStyles.statItem}>
                <span style={responsiveStyles.statValue}>ISO 9001</span>
                <span style={responsiveStyles.statLabel}>Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Engineering;

const styles = {
  section: {
    padding: "100px 0",
    position: "relative",
    //background: "#fafbfc",
  },

  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 32px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 100,
    alignItems: "center",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },

  eyebrowContainer: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },

  eyebrowLine: {
    width: 40,
    height: 2,
    background: "linear-gradient(90deg, #c2410c 0%, transparent 100%)",
  },

  eyebrow: {
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.2em",
    color: "#c2410c",
    textTransform: "uppercase",
  },

  title: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "clamp(36px, 4.5vw, 52px)",
    color: "#002147",
    lineHeight: 1.15,
    fontWeight: 700,
    letterSpacing: "-0.02em",
  },

  description: {
    fontSize: 17,
    lineHeight: 1.75,
    color: "#4b5563",
    maxWidth: 540,
    fontWeight: 400,
  },

  techList: {
    marginTop: 16,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  techItem: {
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
    padding: "16px 0",
    borderLeft: "2px solid transparent",
    transition: "all 0.3s ease",
  },

  techNumber: {
    fontFamily: "'Courier New', monospace",
    fontSize: 20,
    fontWeight: 700,
    color: "#c2410c",
    minWidth: 36,
    textAlign: "right",
  },

  techContent: {
    flex: 1,
  },

  techText: {
    fontSize: 16,
    color: "#002147",
    lineHeight: 1.6,
    fontWeight: 500,
  },

  visual: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  diagram: {
    width: "100%",
    maxWidth: 480,
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: "32px",
    boxShadow: "0 20px 60px rgba(0,33,71,0.08), 0 0 1px rgba(0,33,71,0.1)",
  },

  diagramHeader: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    marginBottom: 32,
    paddingBottom: 16,
    borderBottom: "1px solid #e5e7eb",
  },

  diagramCode: {
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    fontWeight: 700,
    color: "#002147",
    letterSpacing: "0.15em",
  },

  diagramSubtext: {
    fontSize: 13,
    color: "#6b7280",
    fontWeight: 500,
  },

  precisionContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: "1 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px 0",
  },

  outerRing: {
    width: "80%",
    height: "80%",
    borderRadius: "50%",
    border: "2px solid rgba(0,33,71,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "radial-gradient(circle, rgba(255,215,0,0.03) 0%, transparent 70%)",
  },

  middleRing: {
    width: "70%",
    height: "70%",
    borderRadius: "50%",
    border: "2px solid rgba(0,33,71,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  innerRing: {
    width: "50%",
    height: "50%",
    borderRadius: "50%",
    border: "3px solid #c2410c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 20px rgba(255,215,0,0.3)",
  },

  centerPoint: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #002147 0%, #003d82 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 16px rgba(0,33,71,0.4)",
  },

  micronLabel: {
    fontFamily: "'Courier New', monospace",
    fontSize: 16,
    fontWeight: 700,
    color: "#c2410c",
  },

  measurementLineH: {
    position: "absolute",
    top: "50%",
    left: "10%",
    right: "10%",
    height: 1,
    background: "rgba(0,33,71,0.2)",
    transform: "translateY(-50%)",
  },

  measurementLineV: {
    position: "absolute",
    left: "50%",
    top: "10%",
    bottom: "10%",
    width: 1,
    background: "rgba(0,33,71,0.2)",
    transform: "translateX(-50%)",
  },

  cornerBracket: {
    position: "absolute",
    width: 24,
    height: 24,
  },

  toleranceIndicator: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },

  toleranceDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#c2410c",
    boxShadow: "0 0 8px rgba(255,215,0,0.5)",
  },

  toleranceText: {
    fontFamily: "'Courier New', monospace",
    fontSize: 10,
    color: "#002147",
    fontWeight: 700,
  },

  diagramFooter: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 32,
    paddingTop: 20,
    borderTop: "1px solid #e5e7eb",
  },

  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },

  statValue: {
    fontFamily: "'Courier New', monospace",
    fontSize: 18,
    fontWeight: 700,
    color: "#002147",
  },

  statLabel: {
    fontSize: 11,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontWeight: 600,
  },

  statDivider: {
    width: 1,
    height: 40,
    background: "#e5e7eb",
  },
};
