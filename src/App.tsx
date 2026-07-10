import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Nav from "./components/Nav";
import AmbientBackground from "./components/AmbientBackground";
import TerminalIntro from "./components/TerminalIntro";
import Hero from "./components/Hero";
import Education from "./components/Education";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="relative min-h-screen">
      <AmbientBackground />

      <AnimatePresence>
        {!booted && <TerminalIntro onDone={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
        <>
          <Nav />
          <main>
            <Hero />
            <Education />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
