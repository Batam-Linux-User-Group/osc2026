import {logoGold} from '../../assets';
import BLUG from '../../assets/blug.svg';
import { HashLink } from 'react-router-hash-link';
import { Phone, Instagram, Mail } from 'lucide-react';
const Footer = () => {
  const menuItems = [
    { key: 'beranda', label: 'Beranda' },
    { key: 'tentang-lomba', label: 'Tentang' },
    { key: 'kategori', label: 'Kategori' },
    { key: 'timeline', label: 'Timeline' },
    { key: 'sejarah', label: 'Sejarah' },
  ];
  return (
    <div
      id="kontak"
      className="bg-neutral-black text-white px-6 py-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="flex space-x-6 mb-4">
            <img src={logoGold} alt="Logo 1" className="h-10" />
            <img src={BLUG} alt="Logo 2" className="h-10" />
          </div>
          <p className="text-sm text-gray-300 text-center md:text-left">
            Batam Linux User Group
          </p>
          <p className="text-sm text-gray-300 text-center md:text-left">
            Jl. Ahmad Yani, Tlk. Tering, Kec. Batam Kota, Kota Batam,
            <br />
            Kepulauan Riau 29461, Indonesia
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
                <span>088742634948 - Atina Azahra</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">
                  <Mail size={15} />
                </span>
                <span>intiblug@gmail.com</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">
                  <Instagram size={15} />
                </span>
                <span>@batamlinux</span>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {menuItems.map((item) => (
                <li key={item.key}>
                  <HashLink
                    to={`/#${item.key}`}
                    className="hover:text-gray-300 transition-colors"
                  >
                    {item.label}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
