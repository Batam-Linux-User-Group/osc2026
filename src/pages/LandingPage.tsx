import CompetitionSection from '../components/CompetitionSection';
import About from '../components/LandingPage/About';
import Home from '../components/LandingPage/Home';
import Navbar from '../components/LandingPage/Navbar';
import TimelineSection from '../components/TimelineSection';
import Footer from '../components/LandingPage/Footer';
import { Link } from 'react-router-dom';
import { File } from 'lucide-react';
import Gallery from '../components/LandingPage/Gallery';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Home title="Bangun Masa Depan Bersama, Mulai dari " />
      <About tema="Open Source Arena: Battle of Brilliant Minds" />

      <CompetitionSection />
      <TimelineSection />
      <Gallery />
      <Footer />
      <Link
        to={'/daftar'}
        className="group fixed bottom-10 right-5 z-30 bg-orange-500 text-white rounded-full p-3 shadow-lg hover:bg-orange-600 transition-colors cursor-pointer flex items-center gap-2"
      >
        <File size={30} />
        <p className="hidden group-hover:block transition-all duration-300">
          Daftar Sekarang !!
        </p>
      </Link>
    </div>
  );
};

// #423E40 => abu abu

export default LandingPage;
