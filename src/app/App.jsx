import { LanguageProvider } from "../context/LanguageContext";
import { useState } from "react";
import AppProviders from "./AppProviders";
import SystemMenu from "../layout/SystemMenu";
import Footer from "../layout/Footer";
import AppRoutes from "../routes/AppRoutes";
import BlueprintGrid from "../ui/BlueprintGrid";
import Crosshair from "../ui/Crosshair";
import PageTransition from "../ui/PageTransition";
import Header from "../layout/Header";
import WhatsAppFloat from "../layout/WhatsAppFloat";
import ScrollBarrier from "../ui/ScrollBarrier";

const App = () => {
  const [isSystemMenuOpen, setIsSystemMenuOpen] = useState(false);
  const [triggerTransition, setTriggerTransition] = useState(false);

  return (
    <LanguageProvider>
      <AppProviders>
        {/* Background layer */}
        <BlueprintGrid />
        <Crosshair />
        <ScrollBarrier />
        <Header
          menuOpen={isSystemMenuOpen}
          onMenuToggle={() => {
            setTriggerTransition(true);

            setTimeout(() => {
              setIsSystemMenuOpen(true);
            }, 450);
          }}
        />

        <SystemMenu
          open={isSystemMenuOpen}
          onClose={() => setIsSystemMenuOpen(false)}
        />
        <AppRoutes />
        <Footer />
        <WhatsAppFloat />
      </AppProviders>
    </LanguageProvider>
  );
};

export default App;
