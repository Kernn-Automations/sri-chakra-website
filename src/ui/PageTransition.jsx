import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children, trigger }) => {
  const location = useLocation();
  const [active, setActive] = useState(false);

  // 🔹 Trigger on route change
  useEffect(() => {
    setActive(true);

    const t = setTimeout(() => {
      setActive(false);
    }, 900);

    return () => clearTimeout(t);
  }, [location.pathname]);

  // 🔹 Trigger manually (System Menu, etc.)
  useEffect(() => {
    if (!trigger) return;

    setActive(true);

    const t = setTimeout(() => {
      setActive(false);
    }, 900);

    return () => clearTimeout(t);
  }, [trigger]);

  return (
    <>
      {/* Transition Layer */}
      <div
        style={{
          ...styles.overlay,
          transform: active ? "translateY(0%)" : "translateY(100%)",
        }}
        data-dark="true"
      />

      {/* Page Content */}
      <div style={styles.page}>{children}</div>
    </>
  );
};

export default PageTransition;

const styles = {
  overlay: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#002147",
    zIndex: 90,
    transform: "translateY(100%)",
    transition: "transform 0.9s cubic-bezier(0.77, 0, 0.175, 1)",
    pointerEvents: "none",
  },

  page: {
    position: "relative",
    zIndex: 1,
  },
};
