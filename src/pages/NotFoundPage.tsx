import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Navbar from '../components/LandingPage/Navbar';
import Footer from '../components/LandingPage/Footer';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#131313]">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-9xl font-heading font-black text-[#ff8a3d] mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-6">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <Link 
          to="/" 
          className="flex items-center gap-2 px-6 py-3 bg-[#e86d2f] hover:bg-[#d85c1e] text-white rounded-xl font-bold transition-all"
        >
          <Home size={20} />
          Kembali ke Beranda
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default NotFoundPage