import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useState, useEffect } from 'react';
import { logo } from '../../assets';
import { ChevronDown } from "lucide-react";


const Navbar = () => {
  const [homeMenuOpen, setHomeMenuOpen] = useState(false);
  const [guideMenuOpen, setGuideMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
const [mobileGuideOpen, setMobileGuideOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const [mobileGuideOpen, setMobileGuideOpen] = useState(false);
  
  const toggleMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };
  const closeMenu = () => {
  setHomeMenuOpen(false);
  setGuideMenuOpen(false);
  setMobileMenuOpen(false);
  };
  const menuItems = [
    { key: 'beranda', label: 'Beranda' },
    { key: 'tentang-lomba', label: 'Tentang' },
    { key: 'kategori', label: 'Kategori' },
    { key: 'timeline', label: 'Timeline' },
    { key: 'sejarah', label: 'Sejarah' },
  ];

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
      <div className="hidden md:flex items-center space-x-6">

        {/* Beranda Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setHomeMenuOpen(true)}
          onMouseLeave={() => setHomeMenuOpen(false)}
        >
         <button
            className="relative group flex items-center gap-1 text-sm font-semibold hover:text-[#E9672D] transition-all duration-300 px-3 py-2 rounded-lg hover:bg-slate-700/30"
          >
            <span className="relative z-10">Beranda</span>

            <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                    homeMenuOpen ? "rotate-180" : ""
                }`}
            />
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-slate-400 group-hover:w-full transition-all duration-300 rounded-full"></span>
            <span className="absolute inset-0 bg-slate-400/0 group-hover:bg-slate-400/10 rounded-lg transition-all duration-300"></span>
         </button>

          {homeMenuOpen && (
            <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 z-50">
              {/* Card */}
              <div className="relative w-56 bg-black/90 rounded-md shadow-xl overflow-visible">
                {/* Arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-[6px] w-3 h-3 bg-black/90 rotate-45 "></div>

                <ul className="py-2">
                  {menuItems.map((item) => (
                    <li key={item.key}>
                      <HashLink
                        smooth
                        to={`/#${item.key}`}
                        onClick={closeMenu}
                        className="block px-5 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-gray-100 hover:text-[#E9672D]"
                      >
                        {item.label}
                      </HashLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <Link
          to="/leaderboard"
          className="text-sm font-semibold hover:text-[#E9672D] transition-all duration-300 relative group px-3 py-2 rounded-lg hover:bg-slate-700/30"
        >
          Peringkat
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-slate-400 group-hover:w-full transition-all duration-300 rounded-full"></span>
          <span className="absolute inset-0 bg-slate-400/0 group-hover:bg-slate-400/10 rounded-lg transition-all duration-300"></span>
        </Link>

        {/* Panduan Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setGuideMenuOpen(true)}
            onMouseLeave={() => setGuideMenuOpen(false)}
          >
            <a
              className="relative group flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 hover:bg-slate-700/30 hover:text-[#E9672D]"
            >
              <span className="relative z-10">Panduan Lomba</span>
              <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                      guideMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-slate-400 transition-all duration-300 group-hover:w-full"></span>
              <span className="absolute inset-0 rounded-lg bg-slate-400/0 transition-all duration-300 group-hover:bg-slate-400/10"></span>
            </a>

            {guideMenuOpen && (
            <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 z-50">
              {/* Card */}
              <div className="relative w-56 bg-black/90 rounded-md shadow-xl overflow-visible">
                {/* Arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-[6px] w-3 h-3 bg-black/90 rotate-45 "></div>

                  <ul className="py-2">
                    <li>
                      <a
                        href="https://polibatam.id/GuideBookWebDesignOSC2026"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-5 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-gray-100 hover:text-[#E9672D]"
                      >
                        Web Design
                     </a>
                    </li>
                    <li>
                      <a
                        href="https://polibatam.id/GuideBookSysAdminOSC2026"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-5 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-gray-100 hover:text-[#E9672D]"
                      >
                        Linux System Admin
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://polibatam.id/GuideBookNetSimOSC2026"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-5 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-gray-100 hover:text-[#E9672D]"
                      >
                        Network Simulation
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://polibatam.id/GuideBookMascotDesignOSC2026"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-5 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-gray-100 hover:text-[#E9672D]"
                      >
                        Mascot Design
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

      {/* Mobile Toggle */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="relative group rounded-lg p-2 text-slate-50 transition-all duration-300 hover:bg-slate-700/30 hover:text-slate-300 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                mobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>

          <span className="absolute inset-0 rounded-lg bg-slate-400/0 transition-all duration-300 group-hover:bg-slate-400/10"></span>
        </button>
      </div>
    </div>

    {/* Mobile Dropdown */}
    <div
      className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen
          ? "max-h-96 opacity-100"
          : "max-h-0 opacity-0"
      }`}
    >
      <div className="space-y-2 border-t border-slate-500/20 bg-gradient-to-b from-slate-900/80 to-slate-950/90 px-6 pb-6 pt-3 backdrop-blur-sm">

        <Link
          to="/"
          onClick={closeMenu}
          className="relative block rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 hover:bg-slate-700/30 hover:text-[#E9672D]"
        >
          Beranda
        </Link>

        <Link
          to="/leaderboard"
          onClick={closeMenu}
          className="relative block rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 hover:bg-slate-700/30 hover:text-[#E9672D]"
        >
          Peringkat
        </Link>

       <div className="rounded-lg border border-slate-700/40 bg-slate-900/40">
  <button
    type="button"
    onClick={() => setMobileGuideOpen((prev) => !prev)}
    className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-700/30 hover:text-[#E9672D]"
  >
    <span>Panduan Lomba</span>
    <ChevronDown
      size={16}
      className={`transition-transform duration-300 ${
        mobileGuideOpen ? "rotate-180" : ""
      }`}
    />
  </button>

  <div
    className={`overflow-hidden transition-all duration-300 ${
      mobileGuideOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
    }`}
  >
    <div className="space-y-1 px-2 pb-3">
      <a
        href="https://polibatam.id/GuideBookWebDesignOSC2026"
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-md px-3 py-2 text-sm text-slate-200 transition-colors hover:bg-slate-700/40 hover:text-[#E9672D]"
      >
        Web Design
      </a>

      <a
        href="https://polibatam.id/GuideBookSysAdminOSC2026"
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-md px-3 py-2 text-sm text-slate-200 transition-colors hover:bg-slate-700/40 hover:text-[#E9672D]"
      >
        Linux System Admin
      </a>

      <a
        href="https://polibatam.id/GuideBookNetSimOSC2026"
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-md px-3 py-2 text-sm text-slate-200 transition-colors hover:bg-slate-700/40 hover:text-[#E9672D]"
      >
        Network Simulation
      </a>

      <a
        href="https://polibatam.id/GuideBookMascotDesignOSC2026"
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-md px-3 py-2 text-sm text-slate-200 transition-colors hover:bg-slate-700/40 hover:text-[#E9672D]"
      >
        Mascot Design
      </a>
    </div>
  </div>
</div>

        <Link
          to="/daftar"
          onClick={closeMenu}
          className="relative block rounded-lg bg-orange-primary px-4 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-400"
        >
          Daftar
        </Link>

      </div>
    </div>
    </nav>
  );
};

export default Navbar;
