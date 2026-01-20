import React, { useEffect, useState, useRef } from "react";

const THICKNESS_MAP = {
  2.7: 2,
  3.0: 2.6,
  3.2: 3.2,
};

const WBeamVisual = () => {
  const [thickness, setThickness] = useState(3.2);
  const profileRef = useRef(null);
  const impactRef = useRef(null);

  useEffect(() => {
    const path = profileRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    // Draw animation
    requestAnimationFrame(() => {
      path.style.transition = "stroke-dashoffset 2.2s ease-out";
      path.style.strokeDashoffset = "0";
    });

    // Impact arrow animation
    setTimeout(() => {
      if (impactRef.current) {
        impactRef.current.style.opacity = 1;
        impactRef.current.style.transform = "translateX(0)";
      }
    }, 2300);
  }, [thickness]);

  return (
    <div style={styles.wrapper}>
      <svg width="640" height="300" viewBox="0 0 640 300" style={styles.svg}>
        {/* GRID */}
        <defs>
          <pattern
            id="grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="640" height="300" fill="url(#grid)" />

        {/* TITLE */}
        <text x="20" y="26" style={styles.title}>
          W-BEAM CRASH BARRIER — SECTION VIEW
        </text>

        {/* CONSTRUCTION LINE */}
        <path
          d="
            M120 200
            L180 200
            C210 200 220 160 260 150
            C300 140 340 140 380 150
            C420 160 430 200 460 200
            L520 200
          "
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          strokeDasharray="6 6"
        />

        {/* FINAL PROFILE */}
        <path
          ref={profileRef}
          d="
            M120 200
            L180 200
            C210 200 220 160 260 150
            C300 140 340 140 380 150
            C420 160 430 200 460 200
            L520 200
            L520 120
            L460 120
            C430 120 420 160 380 170
            C340 180 300 180 260 170
            C220 160 210 120 180 120
            L120 120
            Z
          "
          fill="none"
          stroke="#FFD700"
          strokeWidth={THICKNESS_MAP[thickness]}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* DIMENSIONS */}
        <text x="320" y="240" style={styles.dim}>
          WIDTH ≈ 350 mm
        </text>

        <text
          x="560"
          y="170"
          transform="rotate(-90 560 170)"
          style={styles.dim}
        >
          HEIGHT ≈ 85 mm
        </text>

        {/* IMPACT */}
        <g
          ref={impactRef}
          style={{
            opacity: 0,
            transform: "translateX(-20px)",
            transition: "all 0.6s ease",
          }}
        >
          <line
            x1="50"
            y1="160"
            x2="110"
            y2="160"
            stroke="#ef4444"
            strokeWidth="4"
            markerEnd="url(#arrow)"
          />
          <text x="50" y="138" style={styles.impact}>
            VEHICLE IMPACT
          </text>
        </g>

        {/* ARROW */}
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
          </marker>
        </defs>

        {/* THICKNESS */}
        <text x="20" y="270" style={styles.thickness}>
          MATERIAL THICKNESS: {thickness} mm
        </text>
      </svg>

      {/* THICKNESS CONTROL */}
      <div style={styles.controls}>
        {[2.7, 3.0, 3.2].map((t) => (
          <button
            key={t}
            onClick={() => setThickness(t)}
            style={{
              ...styles.btn,
              ...(t === thickness ? styles.activeBtn : {}),
            }}
          >
            {t} mm
          </button>
        ))}
      </div>
    </div>
  );
};

export default WBeamVisual;

/* ================= STYLES ================= */

const styles = {
  wrapper: {
    background: "#020617",
    padding: 20,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
  },

  svg: {
    background: "#00142a",
    border: "1px solid rgba(255,255,255,0.15)",
  },

  title: {
    fill: "#FFD700",
    fontSize: 12,
    fontFamily: "monospace",
    letterSpacing: "0.15em",
  },

  dim: {
    fill: "#FFD700",
    fontSize: 10,
    fontFamily: "monospace",
  },

  thickness: {
    fill: "#FFD700",
    fontSize: 11,
    fontFamily: "monospace",
  },

  impact: {
    fill: "#ef4444",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "bold",
  },

  controls: {
    display: "flex",
    justifyContent: "center",
    gap: 14,
    marginTop: 12,
  },

  btn: {
    padding: "6px 14px",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.4)",
    color: "#fff",
    fontFamily: "monospace",
    cursor: "pointer",
  },

  activeBtn: {
    borderColor: "#FFD700",
    color: "#FFD700",
  },
};
