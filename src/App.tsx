import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Nav from "./components/Nav";
import CtosIntro from "./components/CtosIntro";
import Hero from "./components/Hero";
import StatWall from "./components/StatWall";
import Story from "./components/Story";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [booted, setBooted] = useState(false);

  // The document stays black behind the splash; release it on hand-off.
  useEffect(() => {
    if (booted) document.documentElement.classList.remove("booting");
  }, [booted]);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {!booted && <CtosIntro onDone={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
        <>
          <a
            href="#experience"
            className="btn-pill fixed left-4 top-4 z-[60] -translate-y-24 pr-5 focus-visible:translate-y-0"
          >
            Skip to content
          </a>
          <Nav />
          <main>
            <Hero />
            <StatWall />
            <Story />
            <Projects />
            {/* The page closes on a dark section that rises like a horizon. */}
            <div className="deep-horizon" aria-hidden />
            <div className="deep">
              <Skills />
              <Contact />
              <Footer />
            </div>
          </main>
        </>
      )}
    </div>
  );
}
