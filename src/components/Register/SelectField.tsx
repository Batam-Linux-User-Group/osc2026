import type React from "react"
import { Trophy } from "lucide-react"
import type { Competition } from "../../types"

interface SelectFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: Competition[]
  error?: string
}

export default function SelectField({ label, name, value, onChange, options, error }: SelectFieldProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center text-white p-1 rounded-sm w-[26px] h-[26px]">
          <Trophy size={16} />
        </div>
        <span className="text-white text-sm font-semibold">{label}</span>
      </div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-[#1C1A1A] border rounded-xl text-white focus:outline-none focus:ring-2 transition-all ${
          error ? "border-red-500 focus:ring-red-500" : "border-zinc-800 focus:ring-orange-500 focus:border-orange-500"
        }`}
      >
        <option value="" className="bg-gray-800">
          Pilih lomba yang akan diikuti
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id} className="bg-[#1C1A1A]">
            {option.name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  )
}
