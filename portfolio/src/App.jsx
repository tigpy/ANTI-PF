import React, { useEffect, lazy, Suspense } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import MainLayout from "./layouts/MainLayout";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import { SectionSkeleton } from "./components/common";

const Skills = lazy(() => import("./components/Skills/Skills"));
const Certifications = lazy(() => import("./components/Certifications/Certifications"));
const TryHackMe = lazy(() => import("./components/TryHackMe/TryHackMe"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const GitHubStats = lazy(() => import("./components/GitHubStats/GitHubStats"));
const LearningJourney = lazy(() => import("./components/LearningJourney/LearningJourney"));
const Achievements = lazy(() => import("./components/Achievements/Achievements"));
const Contact = lazy(() => import("./components/Contact/Contact"));

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
    <LazyMotion features={domAnimation}>
      <MainLayout>
        <Navbar />
        <Hero />
        <About />
        <Suspense fallback={<SectionSkeleton />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Certifications />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <TryHackMe />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <GitHubStats />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <LearningJourney />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Achievements />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
        <Footer />
      </MainLayout>
    </LazyMotion>
  );
};

export default App;
