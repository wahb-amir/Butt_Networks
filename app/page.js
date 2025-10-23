import Navbar from './components/Navbar';
import Home_ from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Ceo from './components/Ceo';
import Offer from './components/Offer';
import Footer from './components/Footer';
import Services from './components/Services';
import DigitalX from './components/DigitalX';
import Birthday from './components/BirthDay'

export default function Home() {
  return (
    <>
      <Birthday />
      <Navbar />
      <Home_ />
      <About />
      <Skills />
      <Services />
      <Projects />
      <DigitalX />
      <Ceo />
      <Offer />
      <Footer />
    </>
  );
}
