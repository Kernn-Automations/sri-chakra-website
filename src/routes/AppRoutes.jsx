import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import CrashBarriers from "../pages/CrashBarriers";
import RoofingSolutions from "../pages/RoofingSolutions";
import RailwayProjects from "../pages/RailwayProjects";
import ManufacturingQuality from "../pages/ManufacturingQuality";
import Contact from "../pages/Contact";
import PageTransition from "../ui/PageTransition";

const AppRoutes = () => {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/projects" element={<RailwayProjects />} />
        <Route
          path="/manufacturing-quality"
          element={<ManufacturingQuality />}
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </PageTransition>
  );
};

export default AppRoutes;
