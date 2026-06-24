import Nav from "./components/Nav";
import AmbientBackground from "./components/AmbientBackground";
import Hero from "./components/Hero";
import Education from "./components/Education";
import About from "./components/About";
import ExperienceSection from "./components/ExperienceSection";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <Nav />
      <main>
        <Hero />
        <Education />
        <About />
        <ExperienceSection />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
