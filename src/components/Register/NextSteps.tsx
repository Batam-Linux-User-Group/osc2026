import { Copy, ExternalLink, Phone, MessageSquare } from "lucide-react";
import type { Competition } from "../../types";
 
interface NextStepsProps {
  selectedCompetition: Competition;
  copyToClipboard: (text: string) => Promise<void>;
}
 
export default function NextSteps({
  selectedCompetition,
  copyToClipboard,
}: NextStepsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Langkah Selanjutnya</h3>
 
      {/* Step 1: Contact PIC */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center text-white p-1 rounded-sm w-[26px] h-[26px]">
              <Phone size={16} className="text-[#E55A2B]" />
            </div>
            <span className="text-white text-sm font-semibold">1. Hubungi PIC Lomba</span>
          </div>
          <button
            onClick={() => copyToClipboard(selectedCompetition.contactNumber)}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
          >
            <Copy size={16} />
          </button>
        </div>
        <div className="flex items-center justify-between bg-[#1C1A1A] border border-zinc-800/80 rounded-xl p-3">
          <span className="text-white font-mono font-semibold text-sm">
            {selectedCompetition.contactNumber}
          </span>
          <a
            href={`tel:${selectedCompetition.contactNumber}`}
            className="bg-[#E55A2B] text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-[#d34e20] transition-all"
          >
            Kontak
          </a>
        </div>
      </div>
 
      {/* Step 2: WA Group */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center text-white p-1 rounded-sm w-[26px] h-[26px]">
              <MessageSquare size={16} className="text-green-500" />
            </div>
            <span className="text-white text-sm font-semibold">2. Gabung Grup WhatsApp</span>
          </div>
          <button
            onClick={() => copyToClipboard(selectedCompetition.whatsapp)}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
          >
            <Copy size={16} />
          </button>
        </div>
        <a
          href={selectedCompetition.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-bold transition-all"
        >
          Gabung Grup WA
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
