import type { FormData, Competition } from "../../types";

interface RegistrationSummaryProps {
  formData: FormData;
  selectedCompetition: Competition;
}

export default function RegistrationSummary({
  formData,
  selectedCompetition,
}: RegistrationSummaryProps) {
  return (
    <div className="bg-[#1C1A1A] rounded-xl border border-zinc-800/50 p-5 space-y-3">
      <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Detail Pendaftaran</h3>
      <div className="text-sm space-y-2">
        <p className="text-gray-300">
          <span className="text-orange-primary font-medium mr-1.5">Nama:</span> {formData.nama}
        </p>
        <p className="text-gray-300">
          <span className="text-orange-primary font-medium mr-1.5">Sekolah:</span> {formData.sekolah}
        </p>
        <p className="text-gray-300">
          <span className="text-orange-primary font-medium mr-1.5">Lomba:</span>{" "}
          {selectedCompetition.name}
        </p>
      </div>
    </div>
  );
}
