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
      nomor: "085763542044",
      whatsapp: "6285763542044",
      nama: "Mifta",
      lomba: "Mascot Design",
    },
    {
      nomor: "081362363862",
      whatsapp: "6281362363862",
      nama: "Tomi",
      lomba: "Web Design",
    },
    {
      nomor: "08127003162",
      whatsapp: "628127003162",
      nama: "Syahdan",
      lomba: "Network Simulation",
    },
    {
      nomor: "0895370677717",
      whatsapp: "628127003162",
      nama: "Numa",
      lomba: "Linux System Administrator",
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
          {KontakLomba.map((kontak, idx) => (
            <div
              key={idx}
              className="bg-[#1C1A1A] border border-zinc-800/80 rounded-xl p-4 shadow-sm hover:border-orange-primary/40 transition-all space-y-2"
            >
              <p className="font-bold text-white flex items-center gap-2 text-sm">
                <Megaphone size={16} className="text-orange-primary" /> {kontak.lomba}
              </p>
              <div className="flex flex-col gap-1.5 pl-6">
                <p className="text-gray-300 flex items-center gap-2 text-xs">
                  <User size={14} className="text-zinc-500" /> {kontak.nama}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalInfo;
