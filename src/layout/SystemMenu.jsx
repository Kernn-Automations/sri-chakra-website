import { X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

const SystemMenu = ({ open, onClose }) => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [visible, setVisible] = useState(false);

  // Handle ENTER animation only
  useEffect(() => {
    if (open) setVisible(true);
  }, [open]);

  if (!open) return null;

  const MENU_ITEMS = [
    { key: "home", path: "/" },
    //{ key: "products", path: "/products" },
    { key: "about", path: "/about" },
    //{ key: "projects", path: "/projects" },
    //{ key: "contact", path: "/contact" },
  ];

  return (
    <div
      style={{
        ...styles.overlay,
        opacity: open ? 1 : 0,
      }}
      data-theme="dark"
    >
      {/* Close Button - Only show on desktop */}
      {!isMobile && (
        <button
          onClick={onClose}
          type="button"
          style={{
            ...styles.closeBtn,
            top: "calc(16px + env(safe-area-inset-top))",
            right: "calc(16px + env(safe-area-inset-right))",
          }}
        >
          <X size={36} />
        </button>
      )}

      {/* Menu Container */}
      <div
        style={{
          ...styles.menuWrap,
          transform: open ? "translateY(0)" : "translateY(24px)",
          opacity: open ? 1 : 0,
        }}
      >
        {MENU_ITEMS.map((item) => (
          <a
            key={item.key}
            href={item.path}
            onClick={onClose}
            style={{
              ...styles.menuItem,
              fontSize: isMobile
                ? "clamp(22px, 7vw, 34px)"
                : "clamp(28px, 6vw, 64px)",
            }}
            onMouseEnter={(e) => {
              if (isMobile) return;
              e.currentTarget.style.textShadow =
                "0 2px 0 #000, 0 6px 0 #FFD700";
            }}
            onMouseLeave={(e) => {
              if (isMobile) return;
              e.currentTarget.style.textShadow = "none";
            }}
          >
            {t(`systemmenu.${item.key}`)}
          </a>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          ...styles.footerNote,
          bottom: "calc(16px + env(safe-area-inset-bottom))",
        }}
      >
        {t("systemmenu.footer")}
      </div>
    </div>
  );
};

export default SystemMenu;

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "#002147",
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.3s ease",
    overflow: "hidden",
  },

  closeBtn: {
    position: "absolute",
    background: "transparent",
    border: "none",
    color: "#FFD700",
    padding: 8,
    cursor: "pointer",
    zIndex: 101,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  menuWrap: {
    width: "100%",
    maxWidth: 480,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "28px",
    textAlign: "center",
    transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
    padding: "40px 24px",
    boxSizing: "border-box",
  },

  menuItem: {
    fontFamily: "serif",
    color: "#ffffff",
    textDecoration: "none",
    letterSpacing: "0.14em",
    cursor: "pointer",
    transition: "text-shadow 0.25s ease",
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  footerNote: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    fontFamily: "monospace",
    fontSize: 10,
    letterSpacing: "0.3em",
    color: "rgba(255,255,255,0.45)",
    padding: "0 16px",
    boxSizing: "border-box",
  },
};
