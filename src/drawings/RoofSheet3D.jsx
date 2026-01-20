const RoofSheet3D = ({ color }) => {
  return (
    <div style={styles.wrapper}>
      <div
        style={{
          ...styles.sheet,
          backgroundColor: color,
        }}
      >
        {/* Ribbed Texture */}
        <div style={styles.ribs} />

        {/* Metallic Sheen */}
        <div style={styles.sheen} />

        {/* Top Cut Edge */}
        <div style={styles.topEdge} />

        {/* Bottom Depth Shadow */}
        <div style={styles.bottomShadow} />
      </div>
    </div>
  );
};

export default RoofSheet3D;

const styles = {
  wrapper: {
    width: "100%",
    maxWidth: 420,
    height: "48vh", // ⬅️ reduced from 70vh
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    perspective: "1200px",
  },

  sheet: {
    width: "100%",
    height: "100%",
    clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0% 100%)",
    transform: "rotateX(14deg)",
    position: "relative",
    boxShadow: "0 60px 120px rgba(0,0,0,0.7)",
    transition: "background-color 0.5s ease",
    overflow: "hidden",
  },

  ribs: {
    position: "absolute",
    inset: 0,
    background: `
      repeating-linear-gradient(
        90deg,
        transparent 0%,
        transparent 6%,
        rgba(255,255,255,0.45) 6%,
        rgba(255,255,255,0.45) 8%,
        rgba(255,255,255,0.15) 8%,
        rgba(255,255,255,0.15) 14%,
        rgba(0,0,0,0.5) 14%,
        rgba(0,0,0,0.5) 16%,
        transparent 16%,
        transparent 24%
      )
    `,
  },

  sheen: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(0,0,0,0.25))",
    mixBlendMode: "overlay",
    pointerEvents: "none",
  },

  topEdge: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    background: "rgba(255,255,255,0.6)",
  },

  bottomShadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
  },
};
