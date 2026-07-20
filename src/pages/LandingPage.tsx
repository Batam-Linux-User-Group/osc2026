import { useEffect } from 'react';
import CompetitionSection from '../components/CompetitionSection';
import About from '../components/LandingPage/About';
import Home from '../components/LandingPage/Home';
import Navbar from '../components/LandingPage/Navbar';
import TimelineSection from '../components/TimelineSection';
import Footer from '../components/LandingPage/Footer';
import { Link } from 'react-router-dom';
import { File } from 'lucide-react';
import Gallery from '../components/LandingPage/Gallery';
import ChampionSection from '../components/LandingPage/ChampionSection';

const LandingPage = () => {
  useEffect(() => {
    document.title = "Open Source Competition 2026 | Beranda";
  }, []);

  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <CompetitionSection />
      <TimelineSection />
      <Gallery />
      <ChampionSection />
      <Footer />
    <Link
  to={'/daftar'}
  className="group fixed bottom-10 right-5 z-30 flex items-center gap-2 rounded-full bg-orange-primary p-3 text-neutral-white shadow-lg transition-colors hover:bg-orange-dark cursor-pointer"
>
  <span className="pointer-events-none absolute -top-10 right-0 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black shadow-md animate-bounce">
    Klik di sini!
    <span className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 bg-white" />
  </span>

  <File size={30} />
  <p className="hidden transition-all duration-300 group-hover:block">
    Daftar Sekarang !!
  </p>
</Link>
    </div>
  );
};

// #423E40 => abu abu

export default LandingPage;
