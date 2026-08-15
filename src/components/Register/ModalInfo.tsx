import React from "react";
import { Phone, User, Megaphone, X, Info } from "lucide-react";
import type { Kontak } from "../../types";

interface ModalInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalInfo: React.FC<ModalInfoProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const KontakLomba: Kontak[] = [
  {
    nomor: "+6281378280892",
    whatsapp: "6281378280892",
    nama: "Fawwaz",
    lomba: "Web Design",
  },
  {
    nomor: "+6281802607879",
    whatsapp: "6281802607879",
    nama: "Devika",
    lomba: "Web Design",
  },
  {
    nomor: "+62895370748811",
    whatsapp: "62895370748811",
    nama: "Fajri",
    lomba: "Network Simulation",
  },
  {
    nomor: "+6282363673590",
    whatsapp: "6282363673590",
    nama: "Afif",
    lomba: "Network Simulation",
  },
  {
    nomor: "+6282169025018",
    whatsapp: "6282169025018",
    nama: "Maulana",
    lomba: "Linux System Administrator",
  },
  {
    nomor: "+6282384837291",
    whatsapp: "6282384837291",
    nama: "Nabila",
    lomba: "Linux System Administrator",
  },
  {
    nomor: "+628992582006",
    whatsapp: "628992582006",
    nama: "Adhyca",
    lomba: "Mascot Design",
  },
  {
    nomor: "+6281275005677",
    whatsapp: "6281275005677",
    nama: "Aysel",
    lomba: "Mascot Design",
  },
];
  function urlKontak(
    nomornya: string,
    namanya: string,
    lombanya: string
  ): string {
    const pesan: string = `Hallo kak ${namanya}, saya ingin bertanya tentang lomba ${lombanya}nya`;
    const encodedPesan: string = encodeURIComponent(pesan);
    return `https://wa.me/${nomornya}?text=${encodedPesan}`;
    
  }
  const groupedKontak = KontakLomba.reduce((acc, kontak) => {
  if (!acc[kontak.lomba]) {
    acc[kontak.lomba] = [];
  }
  acc[kontak.lomba].push(kontak);
  return acc;
}, {} as Record<string, Kontak[]>);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div
        style={{
          animation: "fadeInZoom 0.3s ease-out",
          transformOrigin: "center",
        }}
        className="bg-neutral-black border border-orange-primary/15 rounded-2xl shadow-2xl w-full max-w-md p-6 relative max-h-[90vh] flex flex-col"
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>
 
        {/* Judul */}
        <div className="border-b border-zinc-800/80 pb-4 mb-4">
          <h3 className="text-xl font-bold text-center text-white flex items-center justify-center gap-2">
            <Megaphone size={24} className="text-orange-primary" /> Kontak PIC Lomba
          </h3>
        </div>
 
        {/* Info WhatsApp */}
        <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-xl p-3 flex items-center space-x-2 mb-4 shrink-0">
          <Info size={16} className="text-yellow-400" />
          <p className="text-yellow-400 text-xs">Kontak Hanya Melalui Via Whatsapp</p>
        </div>
 
        {/* Daftar Kontak */}
        <div className="space-y-3 overflow-y-auto pr-1 pb-2 custom-scrollbar">
     {Object.entries(groupedKontak).map(([lomba, kontakList], idx) => (
  <div
    key={idx}
    className="bg-[#1C1A1A] border border-zinc-800/80 rounded-xl p-4 shadow-sm hover:border-orange-primary/40 transition-all"
  >
    {/* Judul lomba */}
    <p className="font-bold text-white flex items-center gap-2 text-sm mb-3">
      <Megaphone size={16} className="text-orange-primary" />
      {lomba}
    </p>

    {/* Semua PIC dalam satu kotak */}
    <div className="space-y-3">
      {kontakList.map((kontak, i) => (
        <div
          key={i}
          className="pl-2 border-l border-zinc-700/60 space-y-1"
        >
          <p className="text-gray-300 flex items-center gap-2 text-xs">
            <User size={14} className="text-zinc-500" />
            {kontak.nama}
          </p>

          <p className="text-gray-300 flex items-center gap-2 text-xs">
            <Phone size={14} className="text-zinc-500" />
            <a
              href={urlKontak(kontak.whatsapp, kontak.nama, kontak.lomba)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-primary hover:text-orange-dark transition-colors font-mono font-medium"
            >
              {kontak.nomor}
            </a>
          </p>
        </div>
      ))}
    </div>
  </div>
))}
        </div>
      </div>
    </div>
  );
};

export default ModalInfo;

