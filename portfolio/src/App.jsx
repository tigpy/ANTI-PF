import React, { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Certifications from "./components/Certifications/Certifications";
import TryHackMe from "./components/TryHackMe/TryHackMe";
import Projects from "./components/Projects/Projects";
import GitHubStats from "./components/GitHubStats/GitHubStats";
import LearningJourney from "./components/LearningJourney/LearningJourney";
import Achievements from "./components/Achievements/Achievements";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

const App = () => {
  useEffect(() => {
    // Seed CTF cookie (2nd half of the flag)
    document.cookie = "sec_flag=R00T_BYP455}; path=/; max-age=86400; SameSite=Lax";

    // Print developer console greetings
    console.log(
      "%c[SYS] RETRO CYBER SCHEMATIC MATRIX ACTIVE.\n" +
      "-------------------------------------------\n" +
      "LOCATE PARTIAL ACCESS SHARDS TO BYPASS SYSTEM CORE:\n" +
      "  - Shard 1: Embedded source inspection comment markers\n" +
      "  - Shard 2: Network session cookies ('sec_flag')\n\n" +
      "Combine them and submit inside the site SHELL terminal: flag FLAG{...}",
      "color: #1E6F44; font-family: monospace; font-size: 11px; font-weight: bold; background: #F6F5F0; padding: 10px; border: 1px solid #181A1B;"
    );
  }, []);

  return (
    <MainLayout>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Certifications />
      <TryHackMe />
      <Projects />
      <GitHubStats />
      <LearningJourney />
      <Achievements />
      <Contact />
      <Footer />
    </MainLayout>
  );
};

export default App;
