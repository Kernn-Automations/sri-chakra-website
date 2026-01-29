import { useEffect, useState } from "react";

const SteelTopScrollBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(scrolled * 100);
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* Main steel rail */}
      <div style={styles.rail}>
        {/* Corrugated texture lines */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.corrugation,
              left: `${i * 2.5}%`,
            }}
          />
        ))}

        {/* Progress indicator (lighter section) */}
        <div
          style={{
            ...styles.progress,
            width: `${progress}%`,
          }}
        />

        {/* Horizontal grooves for depth */}
        <div style={styles.topGroove} />
        <div style={styles.bottomGroove} />
      </div>

      {/* Rivets/Bolts */}
      {[8, 20, 35, 50, 65, 80, 92].map((pos) => (
        <div key={pos} style={{ ...styles.rivet, left: `${pos}%` }}>
          <div style={styles.rivetHead} />
          <div style={styles.rivetCross} />
          <div style={styles.rivetCrossV} />
        </div>
      ))}

      {/* Support posts shadows */}
      {[15, 42.5, 70].map((pos) => (
        <div key={pos} style={{ ...styles.postShadow, left: `${pos}%` }} />
      ))}
    </div>
  );
};

export default SteelTopScrollBar;

/* ================= STYLES ================= */

const styles = {
  wrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "24px",
    zIndex: 2000,
    pointerEvents: "none",
    background: "linear-gradient(to bottom, #4a5568, #2d3748)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    overflow: "hidden",
  },

  rail: {
    position: "absolute",
    top: "6px",
    left: 0,
    height: "12px",
    width: "100%",
    background: `
      linear-gradient(to bottom,
        #9ca3af 0%,
        #d1d5db 15%,
        #e5e7eb 25%,
        #f3f4f6 40%,
        #e5e7eb 55%,
        #d1d5db 70%,
        #9ca3af 85%,
        #6b7280 100%
      )
    `,
    boxShadow: `
      inset 0 3px 6px rgba(255,255,255,0.8),
      inset 0 -3px 6px rgba(0,0,0,0.6),
      0 2px 4px rgba(0,0,0,0.3)
    `,
    borderTop: "1px solid rgba(255,255,255,0.4)",
    borderBottom: "1px solid rgba(0,0,0,0.4)",
    overflow: "hidden",
  },

  corrugation: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "1px",
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.15), transparent 50%, rgba(255,255,255,0.15))",
    opacity: 0.6,
  },

  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    background: `
      linear-gradient(to bottom,
        #cbd5e1 0%,
        #f1f5f9 20%,
        #ffffff 40%,
        #f8fafc 60%,
        #e2e8f0 80%,
        #cbd5e1 100%
      )
    `,
    boxShadow: `
      inset 0 2px 4px rgba(255,255,255,0.9),
      inset 0 -2px 4px rgba(0,0,0,0.2),
      0 0 15px rgba(255,255,255,0.6)
    `,
    transition: "width 0.2s ease-out",
    borderRight: "2px solid rgba(255,255,255,0.8)",
  },

  topGroove: {
    position: "absolute",
    top: "2px",
    left: 0,
    width: "100%",
    height: "1px",
    background: "rgba(255,255,255,0.5)",
    boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
  },

  bottomGroove: {
    position: "absolute",
    bottom: "2px",
    left: 0,
    width: "100%",
    height: "1px",
    background: "rgba(0,0,0,0.3)",
    boxShadow: "0 -1px 2px rgba(255,255,255,0.2)",
  },

  rivet: {
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "10px",
    height: "10px",
  },

  rivetHead: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: `
      radial-gradient(circle at 30% 30%,
        #f3f4f6 0%,
        #d1d5db 30%,
        #9ca3af 60%,
        #6b7280 100%
      )
    `,
    boxShadow: `
      inset 0 2px 3px rgba(255,255,255,0.8),
      inset 0 -2px 3px rgba(0,0,0,0.6),
      0 2px 4px rgba(0,0,0,0.4)
    `,
    border: "0.5px solid rgba(0,0,0,0.3)",
  },

  rivetCross: {
    position: "absolute",
    top: "50%",
    left: "20%",
    width: "60%",
    height: "1px",
    background: "rgba(0,0,0,0.5)",
    transform: "translateY(-50%)",
    boxShadow: "0 0 1px rgba(0,0,0,0.8)",
  },

  rivetCrossV: {
    position: "absolute",
    left: "50%",
    top: "20%",
    height: "60%",
    width: "1px",
    background: "rgba(0,0,0,0.5)",
    transform: "translateX(-50%)",
    boxShadow: "0 0 1px rgba(0,0,0,0.8)",
  },

  postShadow: {
    position: "absolute",
    top: 0,
    width: "8px",
    height: "100%",
    background: "linear-gradient(to right, rgba(0,0,0,0.2), transparent)",
    transform: "translateX(-50%)",
  },
};
