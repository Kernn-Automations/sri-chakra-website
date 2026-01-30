import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import {
  Building2,
  ChevronDown,
  Menu,
  X,
  Globe,
  Home,
  ArrowRight,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

const HeaderPremium = ({ onMenuToggle, menuOpen }) => {
  const { lang, setLang } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onDarkBg, setOnDarkBg] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isDesktop = useMediaQuery({ minWidth: 769 });

  const LANGS = [
    { code: "en", label: "English", native: "English", symbol: "EN" },
    { code: "te", label: "తెలుగు", native: "Telugu", symbol: "తెల" },
    { code: "hi", label: "हिंदी", native: "Hindi", symbol: "हि" },
  ];

  const currentLang = LANGS.find((l) => l.code === lang);

  /* ---------- INITIALIZATION & HYDRATION ---------- */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------- SCROLL LOGIC ---------- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------- DARK BACKGROUND DETECTION (Intersection Observer) ---------- */
  useEffect(() => {
    const updateDarkState = () => {
      const darkSections = document.querySelectorAll("[data-dark]");

      let isDark = false;

      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        // Header occupies roughly top 100px of viewport
        const headerZoneTop = 0;
        const headerZoneBottom = 120;

        const overlapsHeader =
          rect.top < headerZoneBottom && rect.bottom > headerZoneTop;

        if (overlapsHeader) {
          isDark = true;
        }
      });

      setOnDarkBg(isDark);
    };

    updateDarkState();

    window.addEventListener("scroll", updateDarkState, { passive: true });
    window.addEventListener("resize", updateDarkState);

    return () => {
      window.removeEventListener("scroll", updateDarkState);
      window.removeEventListener("resize", updateDarkState);
    };
  }, []);

  /* ---------- CLICK OUTSIDE HANDLER ---------- */
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!mounted) return null;

  const isDarkMode = menuOpen || onDarkBg;

  // Theme configuration based on background contrast
  const headerTheme = isDarkMode
    ? {
        text: "#ffffff",
        border: "rgba(255,255,255,0.25)",
        bg: "rgba(0,33,71,0.25)",
        dropdownBg: "#001a38",
      }
    : {
        text: "#002147",
        border: "rgba(0,33,71,0.15)",
        bg: "rgba(255,255,255,0.15)",
        dropdownBg: "#ffffff",
      };
  return (
    <motion.header
      animate={{
        top: scrolled ? "4%" : "3%",
        backgroundColor: headerTheme.bg,
        backdropFilter: "blur(12px)",
      }}
      transition={{ duration: 0.25 }}
      style={{
        ...styles.header,
        borderColor: headerTheme.border,
      }}
    >
      <div style={isMobile ? styles.mobileContainer : styles.desktopContainer}>
        {/* ================= LEFT: BRANDING ================= */}
        <a href="/" style={styles.brandSection}>
          <div style={isMobile ? styles.mobileLogoBox : styles.desktopLogoBox}>
            <img
              src="./media/images/logos/logo_no_bg.png"
              alt="Sri Chakra Logo"
              style={styles.logoImage}
              draggable={false}
            />
          </div>

          <div style={styles.brandTextWrapper}>
            <h1
              style={{
                ...styles.brandTitle,
                color: headerTheme.text,
                fontSize: isMobile ? "12px" : "16px",
              }}
            >
              SRI CHAKRA INDUSTRIES
            </h1>
            <p
              style={{
                ...styles.brandSubtitle,
                color: onDarkBg ? "#94a3b8" : "#64748b",
              }}
            >
              Private Limited • Est. 2024
            </p>
          </div>
        </a>

        {/* ================= RIGHT: CONTROLS ================= */}
        <div style={styles.controlsSection}>
          {/* DESKTOP LANGUAGE SELECTOR */}
          {isDesktop && (
            <div style={styles.relative} ref={dropdownRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  ...styles.langBtn,
                  color: headerTheme.text,
                  borderColor: headerTheme.border,
                }}
              >
                <Globe size={16} />
                <span>{currentLang?.native}</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: langOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    style={{
                      ...styles.dropdownMenu,
                      background: headerTheme.dropdownBg,
                    }}
                  >
                    {LANGS.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setLangOpen(false);
                        }}
                        style={{
                          ...styles.dropdownItem,
                          color: headerTheme.text,
                          background:
                            lang === l.code
                              ? "rgba(0,33,71,0.08)"
                              : "transparent",
                        }}
                      >
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* MENU TOGGLE (Hamburger Icon) */}
          <button
            onClick={onMenuToggle}
            style={{
              ...styles.menuIconButton,
              background: isDarkMode ? "rgba(255,255,255,0.2)" : "#002147",

              color: "#fff",
            }}
          >
            <Menu size={isMobile ? 22 : 24} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* ================= MOBILE LANGUAGE BAR (PILLS) ================= */}
      {isMobile && (
        <div style={styles.mobileLangBar}>
          {LANGS.map((l) => (
            <LangPill
              key={l.code}
              code={l.code}
              label={l.symbol}
              onDarkBg={isDarkMode}
              isActive={lang === l.code}
              onClick={() => setLang(l.code)}
            />
          ))}
        </div>
      )}
    </motion.header>
  );
};

/* ===== SUB-COMPONENT: MOBILE LANGUAGE PILLS ===== */
const LangPill = ({ label, onDarkBg, isActive, onClick }) => {
  const pillStyle = {
    padding: "6px 16px",
    fontSize: 12,
    fontWeight: 700,
    borderRadius: 999,
    cursor: "pointer",
    transition: "all 0.25s ease",
    border: isActive
      ? "none"
      : `2px solid ${onDarkBg ? "rgba(255,255,255,0.5)" : "rgba(0,33,71,0.3)"}`,
    background: isActive
      ? "linear-gradient(135deg, #002147, #003d7a)"
      : "transparent",
    color: isActive ? "#fff" : onDarkBg ? "#fff" : "#002147",
    boxShadow: isActive ? "0 4px 12px rgba(0,33,71,0.3)" : "none",
  };

  return (
    <button onClick={onClick} style={pillStyle}>
      {label}
    </button>
  );
};

/* ================= COMPONENT STYLES ================= */
const styles = {
  header: {
    position: "fixed",
    left: 16,
    right: 16,
    zIndex: 1000,
    borderRadius: 22,
    border: "1px solid",
    overflow: "visible",
    boxSizing: "border-box",
    top: "15%",
  },
  desktopContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 32px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  mobileContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
    width: "100%",
    boxSizing: "border-box",
  },
  brandSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
    minWidth: 0,
    flexShrink: 1,
  },
  mobileLogoBox: {
    width: 52,
    height: 52,
    background: "transparent",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  desktopLogoBox: {
    width: 68,
    height: 68,
    background: "transparent",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  logoImage: {
    width: "100%",
    height: "100%",
    filter: "brightness(1) invert(0)",
  },
  brandTextWrapper: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  brandTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: "800",
    margin: 0,
    letterSpacing: "0.5px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  brandSubtitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "9px",
    margin: 0,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.3px",
  },
  controlsSection: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    flexShrink: 0,
  },
  relative: { position: "relative" },
  langBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 14px",
    background: "transparent",
    border: "1px solid",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  },
  dropdownMenu: {
    position: "absolute",
    top: "calc(100% + 10px)",
    right: 0,
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    padding: "8px",
    minWidth: "140px",
    border: "1px solid rgba(0,33,71,0.1)",
    zIndex: 1001,
  },
  dropdownItem: {
    width: "100%",
    padding: "10px 14px",
    textAlign: "left",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "block",
  },
  menuIconButton: {
    border: "none",
    padding: "8px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s ease, opacity 0.2s ease",
    boxShadow: "0 4px 12px rgba(0,33,71,0.2)",
  },
  mobileLangBar: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    padding: "2px 0 14px",
  },
};

export default HeaderPremium;
