import { useState, useEffect } from 'react';
import { logo } from '../../assets';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHasScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-500 ease-in-out ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      } ${
        hasScrolled
          ? 'bg-black/50 backdrop-blur-md shadow-2xl border-b border-slate-500/20'
          : 'bg-transparent'
      } text-slate-50`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold tracking-tight relative group">
          <a
            href="/"
            className="hover:text-slate-300 transition-all duration-300 relative z-10 text-slate-50 hover:drop-shadow-lg"
          >
            <img src={logo} alt="logo" className="w-auto h-12" />
            <span className="absolute inset-0 bg-slate-400/20 blur-lg group-hover:blur-xl group-hover:bg-slate-300/30 transition-all duration-300 -z-10"></span>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-sm font-semibold hover:text-slate-300 transition-all duration-300 relative group px-3 py-2 rounded-lg hover:bg-slate-700/30"
          >
            Home
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-slate-400 group-hover:w-full transition-all duration-300 rounded-full"></span>
            <span className="absolute inset-0 bg-slate-400/0 group-hover:bg-slate-400/10 rounded-lg transition-all duration-300"></span>
          </Link>
          <Link
            to="/leaderboard"
            className="text-sm font-semibold hover:text-slate-300 transition-all duration-300 relative group px-3 py-2 rounded-lg hover:bg-slate-700/30"
          >
            Leaderboard
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-slate-400 group-hover:w-full transition-all duration-300 rounded-full"></span>
            <span className="absolute inset-0 bg-slate-400/0 group-hover:bg-slate-400/10 rounded-lg transition-all duration-300"></span>
          </Link>
          <a
            href="https://polibatam.id/panduan-lomba-osc-2025"
            className="text-sm font-semibold hover:text-slate-300 transition-all duration-300 relative group px-3 py-2 rounded-lg hover:bg-slate-700/30"
          >
            Panduan Lomba
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-slate-400 group-hover:w-full transition-all duration-300 rounded-full"></span>
            <span className="absolute inset-0 bg-slate-400/0 group-hover:bg-slate-400/10 rounded-lg transition-all duration-300"></span>
          </a>
          <Link
            to="/daftar"
            className="text-sm font-semibold text-orange-50 bg-orange-500 px-4 py-2 rounded-lg shadow-md hover:bg-orange-400 transition-all duration-300"
          >
            Daftar
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-slate-50 hover:text-slate-300 focus:outline-none p-2 rounded-lg hover:bg-slate-700/30 transition-all duration-300 relative group"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
                }
                className="transition-all duration-300"
              />
            </svg>
            <span className="absolute inset-0 bg-slate-400/0 group-hover:bg-slate-400/10 rounded-lg transition-all duration-300"></span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-gradient-to-b from-slate-900/50 to-slate-950/50 px-6 pb-6 pt-2 space-y-2 border-t border-slate-500/20 backdrop-blur-sm">
          <Link
            to="/"
            onClick={closeMenu}
            className="block w-full text-left text-sm font-semibold hover:text-slate-300 transition-all duration-300 px-4 py-3 rounded-lg hover:bg-slate-700/30 relative group transform hover:translate-x-1"
          >
            <span className="relative z-10">Home</span>
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-slate-400 group-hover:h-6 transition-all duration-300 rounded-full"></span>
            <span className="absolute inset-0 bg-slate-400/0 group-hover:bg-slate-400/10 rounded-lg transition-all duration-300"></span>
          </Link>
          <Link
            to="/leaderboard"
            onClick={closeMenu}
            className="block w-full text-left text-sm font-semibold hover:text-slate-300 transition-all duration-300 px-4 py-3 rounded-lg hover:bg-slate-700/30 relative group transform hover:translate-x-1"
          >
            <span className="relative z-10">Leaderboard</span>
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-slate-400 group-hover:h-6 transition-all duration-300 rounded-full"></span>
            <span className="absolute inset-0 bg-slate-400/0 group-hover:bg-slate-400/10 rounded-lg transition-all duration-300"></span>
          </Link>
          <a
            href="https://polibatam.id/panduan-lomba-osc-2025"
            className="block w-full text-left text-sm font-semibold hover:text-slate-300 transition-all duration-300 px-4 py-3 rounded-lg hover:bg-slate-700/30 relative group transform hover:translate-x-1"
          >
            <span className="relative z-10">Panduan Lomba</span>
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-slate-400 group-hover:h-6 transition-all duration-300 rounded-full"></span>
            <span className="absolute inset-0 bg-slate-400/0 group-hover:bg-slate-400/10 rounded-lg transition-all duration-300"></span>
          </a>
          <Link
            to="/daftar"
            onClick={closeMenu}
            className="block w-full text-left text-sm font-semibold hover:text-slate-300 transition-all duration-300 px-4 py-3 rounded-lg hover:bg-slate-700/30 relative group transform hover:translate-x-1"
          >
            <span className="relative z-10">Daftar</span>
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-slate-400 group-hover:h-6 transition-all duration-300 rounded-full"></span>
            <span className="absolute inset-0 bg-slate-400/0 group-hover:bg-slate-400/10 rounded-lg transition-all duration-300"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
