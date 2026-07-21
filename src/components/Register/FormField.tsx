import type React from "react";
import type { LucideIcon } from "lucide-react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  icon: LucideIcon;
  description?: string;
}

export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon: Icon,
  description,
}: FormFieldProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center text-white p-1 rounded-sm w-[26px] h-[26px]">
          <Icon size={16} />
        </div>
        <span className="text-white text-sm font-semibold">{label}</span>
      </div>
      {description && (
        <div className="text-gray-400 text-sm mb-3 space-y-3 leading-relaxed">
          <p>{description}</p>
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-[#1C1A1A] border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-zinc-800 focus:ring-orange-primary focus:border-orange-primary"
        }`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
