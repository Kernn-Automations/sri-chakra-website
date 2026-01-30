import Hero from "../sections/home/Hero";
import Engineering from "../sections/home/Engineering";
import CircularSection from "../sections/home/CircularSection";
import Metrics from "../sections/home/Metrics";
import Origin from "../sections/home/Origin";
import IndustryTicker from "../sections/home/IndustryTicker";
import SteelShowcaseSlider from "../sections/home/SteelShowCaseSlider";
import QualityCertifications from "../sections/home/QualityCertifications";
import SafetyEquation from "../sections/home/SafetyEquation";

const Home = () => {
  return (
    <>
      <Hero />
      <IndustryTicker />
      <SteelShowcaseSlider />
      <Engineering />
      <QualityCertifications />
      <CircularSection />
      <SafetyEquation />
      <Metrics />
      <Origin />
      {/* Next sections */}
    </>
  );
};

export default Home;
