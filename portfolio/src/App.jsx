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
