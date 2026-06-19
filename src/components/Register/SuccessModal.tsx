import { CheckCircle, X } from "lucide-react"
import type { FormData, Competition } from "../../types"
import RegistrationSummary from "./RegistrationSummary"
import NextSteps from "./NextSteps"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  formData: FormData
  selectedCompetition: Competition
  copyToClipboard: (text: string) => Promise<void>
}

export default function SuccessModal({
  isOpen,
  onClose,
  formData,
  selectedCompetition,
  copyToClipboard,
}: SuccessModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#121111] rounded-2xl max-w-md w-full border border-[#E55A2B]/15 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="relative p-5 pb-4 text-center border-b border-zinc-800/80">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer">
            <X size={20} />
          </button>
 
           <div className="inline-flex items-center justify-center w-14 h-14 bg-green-500/10 border border-green-500/30 text-green-500 rounded-full mb-3">
            <CheckCircle size={28} />
          </div>
 
           <h2 className="text-xl font-bold text-white mb-1.5">Pendaftaran Berhasil! 🎉</h2>
          <p className="text-gray-300 text-xs leading-relaxed">
            Selamat <span className="font-semibold text-[#E55A2B]">{formData.nama}</span>, Anda telah terdaftar untuk
            lomba <span className="font-semibold text-blue-400">{selectedCompetition.name}</span>
          </p>
        </div>
 
         {/* Modal Content */}
        <div className="p-5 space-y-4">
          {/* Registration Summary */}
          <RegistrationSummary formData={formData} selectedCompetition={selectedCompetition} />
 
           {/* Next Steps */}
          <NextSteps selectedCompetition={selectedCompetition} copyToClipboard={copyToClipboard} />
 
           {/* Important Note */}
          <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-xl p-3.5">
            <p className="text-yellow-400 text-[11px] leading-relaxed">
              <strong>Catatan Penting:</strong> Pastikan untuk menghubungi PIC lomba dan bergabung ke grup WhatsApp
              untuk mendapatkan informasi terbaru tentang kompetisi!
            </p>
          </div>
 
           {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-zinc-800 text-white py-3 px-6 rounded-xl font-bold hover:bg-zinc-700 transition-all cursor-pointer text-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}
