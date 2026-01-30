import React, { useEffect, useState } from "react";

const images = [
  "https://i.ibb.co/8nFJw9km/steel2.jpg",
  "https://i.ibb.co/5g16DYsN/Whats-App-Image-2026-01-13-at-12-20-28-PM.jpg",
  "https://i.ibb.co/4wVC95z1/Whats-App-Image-2026-01-13-at-12-20-22-PM.jpg",
  "https://i.ibb.co/KjhT7Q2q/Whats-App-Image-2026-01-13-at-12-24-46-PM.jpg",
  "https://i.ibb.co/PGCc3TXq/railways1.jpg",
  "https://i.ibb.co/Ndvg2BnZ/crash1.png",
];

const slideDescriptions = [
  "Premium Steel Production",
  "Quality Manufacturing",
  "Industrial Excellence",
  "Advanced Facilities",
  "Railway Infrastructure",
  "Crash Testing Standards",
];

const SteelShowcaseSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState("next");
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const length = images.length;

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setDirection("next");
      setCurrent((prev) => (prev + 1) % length);
    }, 6000);

    return () => clearInterval(interval);
  }, [length, isHovered]);

  const nextSlide = () => {
    setDirection("next");
    setCurrent((prev) => (prev + 1) % length);
  };

  const prevSlide = () => {
    setDirection("prev");
    setCurrent((prev) => (prev - 1 + length) % length);
  };

  const goToSlide = (index) => {
    setDirection(index > current ? "next" : "prev");
    setCurrent(index);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <section style={styles.wrapper}>
        <div style={styles.container}>
          {/* Section Header */}
          <div style={styles.header}>
            <div style={styles.labelContainer}>
              <div style={styles.labelLine}></div>
              <span style={styles.label}>INDUSTRIAL EXCELLENCE</span>
              <div style={styles.labelLine}></div>
            </div>
            <h2 style={styles.title}>MANUFACTURING SHOWCASE</h2>
            <p style={styles.subtitle}>
              Witness the precision and power of modern steel manufacturing
            </p>
          </div>

          {/* Slider */}
          <div
            style={styles.sliderWrapper}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div style={styles.slider} className="main-slider">
              {images.map((img, index) => {
                const isActive = index === current;
                const isPrev = index === (current - 1 + length) % length;
                const isNext = index === (current + 1) % length;

                return (
                  <div
                    key={index}
                    style={{
                      ...styles.slide,
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? "scale(1) translateX(0)"
                        : direction === "next"
                          ? isNext
                            ? "scale(1.08) translateX(5%)"
                            : "scale(1.08) translateX(-5%)"
                          : isPrev
                            ? "scale(1.08) translateX(-5%)"
                            : "scale(1.08) translateX(5%)",
                      zIndex: isActive ? 1 : 0,
                    }}
                    className="slide-item"
                  >
                    <div style={styles.imageOverlay}></div>
                    <img
                      src={img}
                      alt={slideDescriptions[index]}
                      style={styles.image}
                      loading="lazy"
                    />

                    {/* Slide Content Overlay */}
                    {isActive && (
                      <div
                        style={styles.slideContent}
                        className="slide-content"
                      >
                        <div style={styles.contentBadge}>
                          <span style={styles.badgeText}>CERTIFIED</span>
                        </div>
                        <h3 style={styles.slideTitle} className="slide-title">
                          {slideDescriptions[index]}
                        </h3>
                        <div style={styles.slideAccent}></div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                style={{ ...styles.arrow, left: "20px" }}
                className="slider-arrow slider-arrow-left"
                aria-label="Previous slide"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                onClick={nextSlide}
                style={{ ...styles.arrow, right: "20px" }}
                className="slider-arrow slider-arrow-right"
                aria-label="Next slide"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>

              {/* Thumbnail Navigation */}
              <div style={styles.thumbnailContainer} className="thumbnail-nav">
                {images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => goToSlide(i)}
                    style={{
                      ...styles.thumbnail,
                      opacity: i === current ? 1 : 0.5,
                      transform: i === current ? "scale(1)" : "scale(0.85)",
                      border:
                        i === current
                          ? "2px solid #ffffff"
                          : "2px solid transparent",
                    }}
                    className="thumbnail-item"
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      style={styles.thumbnailImage}
                    />
                    <div
                      style={{
                        ...styles.thumbnailOverlay,
                        opacity: i === current ? 0 : 0.5,
                      }}
                    ></div>
                  </div>
                ))}
              </div>

              {/* Progress Indicator */}
              <div style={styles.progressWrapper} className="progress-wrapper">
                <div
                  style={styles.progressContainer}
                  className="progress-container"
                >
                  {images.map((_, i) => (
                    <div
                      key={i}
                      onClick={() => goToSlide(i)}
                      style={styles.progressBarWrapper}
                      className="progress-bar-wrapper"
                    >
                      <div
                        style={{
                          ...styles.progressBar,
                          width: i === current ? "100%" : "0%",
                          opacity: i === current ? 1 : 0.5,
                        }}
                        className="progress-bar-fill"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Counter */}
              <div style={styles.counter} className="slide-counter">
                <div style={styles.counterContent}>
                  <span style={styles.counterCurrent}>
                    {String(current + 1).padStart(2, "0")}
                  </span>
                  <span style={styles.counterDivider}>/</span>
                  <span style={styles.counterTotal}>
                    {String(length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .slide-content {
            animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .slider-arrow {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .slider-arrow:hover {
            background: rgba(0,33,71,0.95);
            transform: translateY(-50%) scale(1.15);
            box-shadow: 0 12px 32px rgba(0,33,71,0.4);
          }

          .slider-arrow:active {
            transform: translateY(-50%) scale(0.95);
          }

          .progress-bar-fill {
            transition: width 6s linear;
          }

          .progress-bar-wrapper {
            transition: all 0.3s ease;
          }

          .progress-bar-wrapper:hover {
            transform: scaleY(1.8);
          }

          .thumbnail-item {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .thumbnail-item:hover {
            transform: scale(0.95) !important;
            opacity: 1 !important;
          }

          @media (max-width: 1024px) {
            .thumbnail-nav {
              gap: 8px !important;
            }
            
            .slide-counter {
              top: 15px !important;
              right: 15px !important;
            }
              .slide-counter .counterContent {
    padding: 6px 12px !important;
    gap: 3px !important;
  }

  .counterCurrent {
    font-size: 20px !important;
  }

  .counterDivider,
  .counterTotal {
    font-size: 14px !important;
  }


            .progress-wrapper {
              top: 15px !important;
            }

            .progress-container {
              padding: 8px 16px !important;
            }
          }

          @media (max-width: 480px) {
  .counterCurrent {
    font-size: 18px !important;
  }

  .counterDivider,
  .counterTotal {
    font-size: 12px !important;
  }

  .slide-counter .counterContent {
    padding: 5px 10px !important;
  }
}

          @media (max-width: 768px) {
            .slider-arrow {
              width: 44px !important;
              height: 44px !important;
              opacity: 0.9;
            }

            .slider-arrow-left {
              left: 12px !important;
            }

            .slider-arrow-right {
              right: 12px !important;
            }

            .thumbnail-nav {
              display: none !important;
            }

            .slide-counter .counterContent {
              padding: 8px 14px !important;
            }

            .slide-counter {
              top: 12px !important;
              right: 12px !important;
            }

            .counterCurrent {
              font-size: 24px !important;
            }

            .counterDivider,
            .counterTotal {
              font-size: 16px !important;
            }

            .progress-wrapper {
              top: 12px !important;
              left: 12px !important;
              transform: none !important;
              width: auto !important;
            }

            .progress-container {
              padding: 6px 10px !important;
              gap: 6px !important;
            }

            .progress-bar-wrapper {
              width: 28px !important;
              height: 2.5px !important;
            }

            .slide-content {
              bottom: 70px !important;
              left: 20px !important;
              right: 20px !important;
              max-width: none !important;
            }

            .slide-title {
              font-size: 24px !important;
              line-height: 1.1 !important;
            }

            .contentBadge {
              padding: 6px 14px !important;
              margin-bottom: 10px !important;
            }

            .main-slider {
              height: 400px !important;
              border-radius: 12px !important;
            }
          }

          @media (max-width: 480px) {
            .main-slider {
              height: 350px !important;
            }

            .slide-title {
              font-size: 20px !important;
            }

            .slide-content {
              bottom: 60px !important;
              left: 16px !important;
              right: 16px !important;
            }

            .progress-bar-wrapper {
              width: 24px !important;
            }

            .slider-arrow {
              width: 40px !important;
              height: 40px !important;
            }

            .slider-arrow-left {
              left: 10px !important;
            }

            .slider-arrow-right {
              right: 10px !important;
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default SteelShowcaseSlider;

const styles = {
  wrapper: {
    width: "100%",
    padding: "80px 20px",
    background:
      "linear-gradient(180deg, #f8f9fb 0%, #ffffff 50%, #f8f9fb 100%)",
  },

  container: {
    maxWidth: "1400px",
    margin: "0 auto",
  },

  header: {
    textAlign: "center",
    marginBottom: "60px",
  },

  labelContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    marginBottom: "16px",
  },

  labelLine: {
    width: "50px",
    height: "2px",
    background:
      "linear-gradient(90deg, transparent, rgba(0,33,71,0.4), transparent)",
  },

  label: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "11px",
    letterSpacing: "0.25em",
    fontWeight: 700,
    color: "#0a4d8f",
    textTransform: "uppercase",
  },

  title: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(40px, 6vw, 72px)",
    letterSpacing: "0.05em",
    fontWeight: 700,
    background: "linear-gradient(135deg, #001a33 0%, #003d7a 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    margin: "0 0 12px 0",
    lineHeight: 1,
  },

  subtitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "clamp(14px, 1.5vw, 17px)",
    color: "rgba(0,26,51,0.7)",
    fontWeight: 500,
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: 1.6,
  },

  sliderWrapper: {
    position: "relative",
  },

  slider: {
    position: "relative",
    width: "100%",
    height: "650px",
    maxHeight: "75vh",
    margin: "0 auto",
    overflow: "hidden",
    borderRadius: "20px",
    boxShadow: "0 30px 90px rgba(0,33,71,0.18), 0 10px 30px rgba(0,33,71,0.12)",
    border: "1px solid rgba(0,33,71,0.06)",
  },

  slide: {
    position: "absolute",
    width: "100%",
    height: "100%",
    transition: "all 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(180deg, rgba(0,26,51,0.25) 0%, rgba(0,26,51,0.5) 100%)",
    zIndex: 1,
    pointerEvents: "none",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  slideContent: {
    position: "absolute",
    bottom: "90px",
    left: "40px",
    zIndex: 2,
    maxWidth: "600px",
  },

  contentBadge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(12px)",
    padding: "8px 20px",
    borderRadius: "100px",
    border: "1px solid rgba(255,255,255,0.3)",
    marginBottom: "16px",
  },

  badgeText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "11px",
    letterSpacing: "0.2em",
    fontWeight: 700,
    color: "#ffffff",
    textTransform: "uppercase",
  },

  slideTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(32px, 4vw, 56px)",
    letterSpacing: "0.04em",
    fontWeight: 700,
    color: "#ffffff",
    margin: "0 0 12px 0",
    textShadow: "0 4px 16px rgba(0,0,0,0.3)",
    lineHeight: 1,
  },

  slideAccent: {
    width: "80px",
    height: "3px",
    background: "linear-gradient(90deg, #ffffff 0%, transparent 100%)",
    borderRadius: "100px",
  },

  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,33,71,0.8)",
    backdropFilter: "blur(10px)",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.15)",
    fontSize: "20px",
    width: "56px",
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: "10px",
    zIndex: 3,
    outline: "none",
  },

  thumbnailContainer: {
    position: "absolute",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "12px",
    zIndex: 2,
  },

  thumbnail: {
    width: "80px",
    height: "50px",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    position: "relative",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },

  thumbnailImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  thumbnailOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,26,51,0.6)",
    transition: "opacity 0.3s ease",
  },

  progressWrapper: {
    position: "absolute",
    top: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,
  },

  progressContainer: {
    display: "flex",
    gap: "10px",
    background: "rgba(0,33,71,0.7)",
    backdropFilter: "blur(12px)",
    padding: "10px 20px",
    borderRadius: "100px",
    border: "1px solid rgba(255,255,255,0.15)",
  },

  progressBarWrapper: {
    width: "45px",
    height: "3px",
    background: "rgba(255,255,255,0.3)",
    borderRadius: "100px",
    overflow: "hidden",
    cursor: "pointer",
  },

  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg, #ffffff 0%, #e8eeff 100%)",
    borderRadius: "100px",
  },

  counter: {
    position: "absolute",
    top: "20px",
    right: "20px",
    zIndex: 2,
  },

  counterContent: {
    display: "flex",
    alignItems: "baseline",
    gap: "4px",
    background: "rgba(0,33,71,0.85)",
    backdropFilter: "blur(12px)",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.15)",
  },

  counterCurrent: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "28px",
    fontWeight: 700,
    color: "#ffffff",
    lineHeight: 1,
  },

  counterDivider: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "18px",
    color: "rgba(255,255,255,0.5)",
    fontWeight: 400,
  },

  counterTotal: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "18px",
    color: "rgba(255,255,255,0.75)",
    fontWeight: 600,
  },
};
