import { useMediaQuery } from "react-responsive";
import { Award, Building2, Briefcase, Phone, Mail } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

const AboutOwner = () => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const valuesRef = useRef([]);
  const sigLineRef = useRef(null);
  const bgLightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background soft spotlight movement
      gsap.to(bgLightRef.current, {
        x: "15%",
        y: "10%",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Image pop fade
      gsap.from(imageRef.current, {
        scale: 0.85,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      // Title reveal
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      // Description reveal
      gsap.from(descRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      // Value cards pop in
      gsap.from(valuesRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      // Signature line draw
      gsap.fromTo(
        sigLineRef.current,
        { width: 0 },
        {
          width: 80,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section style={styles.section} ref={sectionRef}>
      {/* Soft spotlight background */}
      <div style={styles.bgLight} ref={bgLightRef} />

      <div style={{ ...styles.container, gap: isMobile ? "40px" : "64px" }}>
        {/* LEFT — IMAGE */}
        <div
          style={{
            ...styles.imageWrap,
            alignItems: isMobile ? "center" : "flex-start",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <div style={styles.imageRing}>
            <img
              ref={imageRef}
              src="./media/images/owner.jpeg"
              alt="Owner"
              style={styles.image}
              draggable={false}
            />
          </div>
          <div style={styles.ownerInfo}>
            <p style={styles.ownerName}>{t("about.owner.signature")}</p>

            <div
              style={styles.contactItem}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(0,61,122,0.06)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <Phone size={28} strokeWidth={2.5} style={styles.contactIcon} />
              <a href="tel:+917997111975" style={styles.contactLink}>
                +91 79971 11975
              </a>
            </div>

            <div
              style={styles.contactItem}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(0,61,122,0.06)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <Phone size={28} strokeWidth={2.5} style={styles.contactIcon} />
              <a href="tel:+919542111985" style={styles.contactLink}>
                +91 95421 11985
              </a>
            </div>

            <div
              style={styles.contactItem}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(0,61,122,0.06)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <Mail size={28} strokeWidth={2.5} style={styles.contactIcon} />

              <a
                href="mailto:socials.srichakra@gmail.com"
                style={styles.contactLink}
              >
                socials.srichakra@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT — CONTENT */}
        <div style={styles.content}>
          <p style={styles.kicker}>{t("about.owner.kicker")}</p>

          <h2 style={styles.title} ref={titleRef}>
            {t("about.owner.title")}{" "}
            <span style={styles.highlight}>Sri Chakra Industries</span>
          </h2>

          <p style={styles.description} ref={descRef}>
            {t("about.owner.description")}
          </p>

          <div style={styles.valuesGrid}>
            {[
              {
                icon: <Briefcase size={20} />,
                title: t("about.owner.venturesTitle"),
                text: t("about.owner.venturesText"),
              },
              {
                icon: <Building2 size={20} />,
                title: t("about.owner.leadershipTitle"),
                text: t("about.owner.leadershipText"),
              },
              {
                icon: <Award size={20} />,
                title: t("about.owner.visionTitle"),
                text: t("about.owner.visionText"),
              },
            ].map((item, i) => (
              <ValueItem
                key={i}
                {...item}
                ref={(el) => (valuesRef.current[i] = el)}
              />
            ))}
          </div>

          <div style={styles.signatureWrap}>
            <div style={styles.signatureLine} ref={sigLineRef} />
            <p style={styles.signatureName}>{t("about.owner.signature")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ValueItem = React.forwardRef(({ icon, title, text }, ref) => (
  <div style={styles.valueCard} ref={ref}>
    <div style={styles.valueIcon}>{icon}</div>
    <div>
      <h4 style={styles.valueTitle}>{title}</h4>
      <p style={styles.valueText}>{text}</p>
    </div>
  </div>
));

export default AboutOwner;

const styles = {
  section: {
    padding: "100px 20px",
    background: "linear-gradient(to bottom, #ffffff, #f8fafc)",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    alignItems: "center",
  },

  ownerInfo: {
    marginTop: 26,
    padding: "22px",
    borderRadius: 18,
    background: "#ffffff",
    boxShadow: "0 15px 40px rgba(2, 6, 23, 0.12)",
    border: "1px solid rgba(0, 61, 122, 0.12)",
    width: "100%",
    maxWidth: 340,
  },

  ownerName: {
    fontSize: 22,
    fontWeight: 800,
    marginBottom: 16,
    color: "#0f172a",
  },

  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    fontSize: 16,
    padding: "12px 14px",
    borderRadius: 12,
    background: "rgba(0, 61, 122, 0.04)",
    marginBottom: 10,
    transition: "all 0.2s ease",
  },

  contactItemHover: {
    background: "rgba(0, 61, 122, 0.06)",
  },

  contactIcon: {
    color: "#003d7a",
    background: "rgba(0,61,122,0.12)",
    padding: 8,
    borderRadius: 10,
    minWidth: 36,
    minHeight: 36,
  },

  contactLink: {
    color: "#0f172a",
    textDecoration: "none",
    fontWeight: 700,
    letterSpacing: "0.3px",
  },

  imageWrap: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },

  imageGlow: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: "50%",
    //background:
    //  "radial-gradient(circle, rgba(255,215,0,0.35), rgba(212,175,55,0.18), transparent 70%)",
    zIndex: 0,
    animation: "goldGlowPulse 3.5s ease-in-out infinite",
  },

  imageRing: {
    padding: 6,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #d4af37, #ffd700, #b8860b)",
    boxShadow: "0 0 25px rgba(212,175,55,0.6)",
    animation: "goldPulse 2.8s ease-in-out infinite",
    display: "inline-block",
  },

  image: {
    width: 308,
    height: 308,
    objectFit: "cover",
    borderRadius: "50%",
    display: "block",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  kicker: {
    fontSize: 12,
    letterSpacing: "2px",
    textTransform: "uppercase",
    fontWeight: 600,
    color: "#64748b",
    margin: 0,
  },
  title: {
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 800,
    margin: 0,
    color: "#0f172a",
    lineHeight: 1.2,
  },
  highlight: {
    background: "linear-gradient(135deg, #002147, #003d7a)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  description: {
    fontSize: 16,
    lineHeight: 1.7,
    color: "#475569",
    maxWidth: 560,
  },

  valuesGrid: {
    display: "grid",
    gap: "16px",
    marginTop: 12,
  },
  valueCard: {
    display: "flex",
    gap: "14px",
    alignItems: "flex-start",
    padding: "14px 16px",
    borderRadius: 14,
    background: "rgba(0,33,71,0.03)",
  },
  valueIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #002147, #003d7a)",
    color: "#fff",
    flexShrink: 0,
  },
  valueTitle: {
    fontSize: 15,
    fontWeight: 700,
    margin: "0 0 4px",
    color: "#0f172a",
  },
  valueText: {
    fontSize: 14,
    margin: 0,
    color: "#64748b",
    lineHeight: 1.5,
  },

  signatureWrap: { marginTop: 28 },
  signatureLine: {
    width: 80,
    height: 2,
    background: "#002147",
    marginBottom: 8,
  },
  signatureName: {
    fontSize: 14,
    fontWeight: 600,
    color: "#0f172a",
    margin: 0,
  },
};
