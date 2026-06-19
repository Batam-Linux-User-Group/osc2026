import { Link } from 'react-router-dom';
import { logo } from '../../assets';
import BLUG from '../../assets/blug.svg';
import { HashLink } from 'react-router-hash-link';
import { Phone, MapPin, Instagram, Mail } from 'lucide-react';
const Footer = () => {
  const menuItems = [
    { key: 'beranda', label: 'Beranda' },
    { key: 'tentang-lomba', label: 'Tentang Lomba' },
    { key: 'kategori', label: 'Kategori' },
    { key: 'timeline', label: 'Timeline' },
    { key: 'kontak', label: 'Kontak' },
  ];
  return (
    <div
      id="kontak"
      className="bg-gradient-to-br from-[#423E40] via-gray-800 to-slate-900 text-white px-6 py-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="flex space-x-6 mb-4">
            <img src={logo} alt="Logo 1" className="h-10" />
            <img src={BLUG} alt="Logo 2" className="h-10" />
          </div>
          <p className="text-sm text-gray-300 text-center md:text-left">
            Organized by Batam Linux User Group.
          </p>
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center lg:items-start">
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="mr-2">
                  <Phone size={15} />
                </span>
                <span>082388304818 - Aurel</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">
                  <Phone size={15} />
                </span>
                <span>087851618604 - Kayla</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">
                  <Instagram size={15} />
                </span>
                <span>@batamlinux</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">
                  <Mail size={15} />
                </span>
                <span>intiblug@gmail.com</span>
              </li>
              <li className="flex">
                <span className="mr-2">
                  <MapPin size={15} />
                </span>
                <span>
                  Jl Ahmad Yani Politeknik Negeri Batam, Batam, Riau, Indonesia
                  29431
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {menuItems.map((item) => (
                <li>
                  <HashLink
                    to={`/#${item.key}`}
                    className="hover:text-gray-300 transition-colors"
                  >
                    {item.label}
                  </HashLink>
                </li>
              ))}
              <li>
                <Link
                  to={'/daftar'}
                  className="hover:text-gray-300 transition-colors"
                >
                  Daftar Lomba
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 pt-8 border-t border-gray-600 text-center text-sm text-gray-300">
        Open Source Competition 2025. Batam Linux User Group.
      </div>
    </div>
  );
};

export default Footer;
