import React, { useRef, useEffect, useState } from "react";

const words = [
  "ISI 2001 CERTIFIED",
  "PREMIUM GRADE STEEL",
  "HIGH TENSILE STRENGTH",
  "CORROSION RESISTANT",
  "WEATHER RESISTANT COATING",
  "PRECISION ENGINEERED",
  "INDUSTRIAL DURABILITY",
  "LOAD TESTED QUALITY",
  "ADVANCED METALLURGY",
  "STRUCTURAL INTEGRITY",
  "LONG LIFE PERFORMANCE",
  "HEAT TREATED STEEL",
  "RUST PROTECTION",
  "QUALITY ASSURED",
  "ENGINEERED FOR STRENGTH",
];

const IndustryTicker = () => {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    let animationFrame;
    let position = 0;
    const speed = 0.6;

    const animate = () => {
      if (!paused) {
        position -= speed;
        if (Math.abs(position) >= track.scrollWidth / 2) {
          position = 0;
        }
        track.style.transform = `translateX(${position}px)`;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [paused]);

  return (
    <>
      {/* Font import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Condensed:wght@700;800;900&display=swap"
        rel="stylesheet"
      />

      <section style={styles.wrapper}>
        {/* Edge fade gradients */}
        <div style={styles.fadeLeft}></div>
        <div style={styles.fadeRight}></div>

        {/* Top accent line */}
        <div style={styles.accentLineTop}></div>

        <div
          style={styles.marquee}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div style={styles.track} ref={trackRef}>
            {[...words, ...words, ...words].map((word, i) => (
              <div key={i} style={styles.itemContainer} className="ticker-item">
                <span style={styles.word} className="ticker-word">
                  {word}
                </span>
                <div
                  style={styles.separator}
                  className="ticker-separator"
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div style={styles.accentLineBottom}></div>

        <style>{`
          .ticker-word {
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
            position: relative;
            background: linear-gradient(180deg, #001a33 0%, #003366 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .ticker-item:hover .ticker-word {
            background: linear-gradient(180deg, #0a4d8f 0%, #065a9e 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            transform: scale(1.05);
            filter: drop-shadow(0 4px 12px rgba(0,51,102,0.15));
          }

          .ticker-separator {
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          }

          .ticker-item:hover .ticker-separator {
            background: linear-gradient(90deg, 
              transparent 0%, 
              rgba(10,77,143,0.3) 20%,
              rgba(10,77,143,0.6) 50%,
              rgba(10,77,143,0.3) 80%,
              transparent 100%
            );
            transform: scaleX(1.2);
          }

          @media (max-width: 768px) {
            .ticker-word {
              background: #001a33;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default IndustryTicker;

const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    padding: "48px 0",
    background:
      "linear-gradient(180deg, #fafbfc 0%, #ffffff 50%, #fafbfc 100%)",
    borderTop: "2px solid rgba(0,33,71,0.08)",
    borderBottom: "2px solid rgba(0,33,71,0.08)",
  },

  accentLineTop: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "60%",
    height: "2px",
    background:
      "linear-gradient(90deg, transparent 0%, rgba(0,51,102,0.2) 50%, transparent 100%)",
  },

  accentLineBottom: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "60%",
    height: "2px",
    background:
      "linear-gradient(90deg, transparent 0%, rgba(0,51,102,0.2) 50%, transparent 100%)",
  },

  fadeLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "150px",
    background:
      "linear-gradient(90deg, #fafbfc 0%, rgba(250,251,252,0.9) 30%, transparent 100%)",
    zIndex: 2,
    pointerEvents: "none",
  },

  fadeRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "150px",
    background:
      "linear-gradient(270deg, #fafbfc 0%, rgba(250,251,252,0.9) 30%, transparent 100%)",
    zIndex: 2,
    pointerEvents: "none",
  },

  marquee: {
    width: "100%",
    overflow: "hidden",
    cursor: "default",
  },

  track: {
    display: "flex",
    alignItems: "center",
    gap: "0",
    whiteSpace: "nowrap",
    width: "max-content",
  },

  itemContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0",
  },

  word: {
    fontFamily:
      "'Bebas Neue', 'Roboto Condensed', 'Impact', 'Arial Black', sans-serif",
    fontSize: "clamp(32px, 4.5vw, 64px)",
    letterSpacing: "0.08em",
    fontWeight: 700,
    textTransform: "uppercase",
    userSelect: "none",
    lineHeight: 1,
    padding: "0 8px",
  },

  separator: {
    width: "3px",
    height: "clamp(32px, 4vw, 48px)",
    background:
      "linear-gradient(90deg, transparent 0%, rgba(0,33,71,0.15) 50%, transparent 100%)",
    margin: "0 clamp(32px, 5vw, 80px)",
    flexShrink: 0,
  },
};
