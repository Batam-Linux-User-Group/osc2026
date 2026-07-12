import React, { useState } from "react";
import { FileText, Users, Calendar, Award, Gift, Play } from "lucide-react";

type Variant = "filled" | "outline";

interface StepData {
  step: string;
  title: string;
  date: string;
  icon: React.ReactNode;
  variant: Variant;
}

const steps: StepData[] = [
  {
    step: "01",
    title: "PENDAFTARAN",
    date: "28 Juli - 15 Agustus 2025",
    icon: <FileText size={22} strokeWidth={2} />,
    variant: "filled",
  },
  {
    step: "02",
    title: "TECHNICAL MEETING",
    date: "28 Juli - 15 Agustus 2025",
    icon: <Users size={20} strokeWidth={2} />,
    variant: "outline",
  },
  {
    step: "03",
    title: "PELAKSANAAN LOMBA",
    date: "28 Juli - 15 Agustus 2025",
    icon: <Calendar size={22} strokeWidth={2} />,
    variant: "filled",
  },
  {
    step: "04",
    title: "PENGUMUMAN JUARA",
    date: "28 Juli - 15 Agustus 2025",
    icon: <Award size={20} strokeWidth={2} />,
    variant: "outline",
  },
  {
    step: "05",
    title: "PENYERAHAN HADIAH",
    date: "28 Juli - 15 Agustus 2025",
    icon: <Gift size={22} strokeWidth={2} />,
    variant: "filled",
  },
];

const ORANGE = "#E8632C";
const BG = "#141414";

/** White pill card dengan animasi klik (bersinar biasa) */
const Card: React.FC<{
  title: string;
  date: string;
  icon: React.ReactNode;
  variant: Variant;
  isActive: boolean;
  onClick: () => void;
}> = ({ title, date, icon, variant, isActive, onClick }) => {
  const isFilled = variant === "filled";

  return (
    <div
      onClick={onClick}
      className={`
        relative flex w-full max-w-[260px] cursor-pointer items-center gap-3 
        rounded-2xl bg-white px-4 py-3 shadow-lg
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-2xl
        ${isActive ? "scale-105 shadow-2xl" : "scale-100"}
      `}
      style={{
        boxShadow: isActive
          ? "0 8px 30px rgba(0,0,0,0.4)"
          : "0 8px 30px rgba(0,0,0,0.3)",
        transform: isActive ? "scale(1.05)" : "scale(1)",
      }}
    >
      {/* Icon di dalam card */}
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
          isFilled
            ? "bg-[#E8632C] text-white"
            : "border-2 border-[#E8632C] bg-[#1f1f1f] text-[#E8632C]"
        }`}
        style={{
          boxShadow: isFilled ? "0 0 20px rgba(232, 99, 44, 0.3)" : "none",
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-extrabold leading-tight tracking-wide text-[#1a1a1a]">
          {title}
        </p>
        <p className="mt-0.5 text-[11px] font-medium text-gray-500">{date}</p>
      </div>
    </div>
  );
};

/** STEP label */
const StepLabel: React.FC<{ step: string; align: "left" | "right" }> = ({ step, align }) => (
  <div
    className={`flex w-full max-w-[120px] flex-col ${
      align === "left" ? "items-end text-right" : "items-start text-left"
    }`}
  >
    <span className="text-xs font-bold tracking-widest text-white/60">STEP</span>
    <span className="text-3xl font-extrabold leading-none" style={{ color: ORANGE }}>
      {step}
    </span>
  </div>
);

/** Garis putus-putus vertikal dengan titik besar BERSINAR */
const VerticalLineWithDot: React.FC<{ hasDot?: boolean; height?: string }> = ({ 
  hasDot = true, 
  height = "h-20" 
}) => {
  return (
    <div className={`relative flex w-14 shrink-0 items-center justify-center ${height}`}>
      {/* Garis putus-putus vertikal */}
      <div className="absolute h-full w-[2.5px] border-l-2 border-dashed border-[#e0e0e0]" />
      
      {/* Garis glow (bayangan) */}
      <div className="absolute h-full w-[6px] bg-[#E8632C] opacity-10 blur-[4px]" />
      
      {/* ===== TITIK PUTIH BESAR BERSINAR ===== */}
      {hasDot && (
        <div
          className="relative z-10 h-5 w-5 rounded-full bg-white"
          style={{
            boxShadow: `
              0 0 20px rgba(232, 99, 44, 0.9),
              0 0 40px rgba(232, 99, 44, 0.5),
              0 0 60px rgba(232, 99, 44, 0.2)
            `
          }}
        />
      )}
    </div>
  );
};

const Timeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const handleCardClick = (step: string) => {
    setActiveStep(activeStep === step ? null : step);
  };

  const positions = steps.map((_, idx) => idx % 2 === 0);

  return (
    <div className="min-h-screen w-full font-sans" style={{ backgroundColor: BG }}>
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>

      <div className="mx-auto max-w-3xl px-4 py-14">
        {/* Title */}
        <div className="mb-10 flex flex-col items-center">
          <h1 className="text-2xl font-extrabold tracking-[0.2em] text-white">TIMELINE</h1>
          <div
            className="mt-2 h-[3px] w-40 rounded-full"
            style={{ backgroundColor: ORANGE, boxShadow: `0 0 20px ${ORANGE}` }}
          />
          <Play
            size={16}
            className="mt-3"
            style={{ fill: ORANGE, color: ORANGE, filter: "drop-shadow(0 0 10px rgba(232,99,44,0.5))" }}
          />
        </div>

        {/* ===== TIMELINE ===== */}
        <div className="flex flex-col items-center">
          {steps.map((item, idx) => {
            const cardOnLeft = positions[idx];
            const isActive = activeStep === item.step;

            return (
              <React.Fragment key={item.step}>
                {/* Baris: Card | Titik Bersinar | STEP Label */}
                <div className="flex w-full items-center justify-center gap-4">
                  {cardOnLeft ? (
                    <>
                      <div className="flex flex-1 justify-end">
                        <Card
                          title={item.title}
                          date={item.date}
                          icon={item.icon}
                          variant={item.variant}
                          isActive={isActive}
                          onClick={() => handleCardClick(item.step)}
                        />
                      </div>
                      <VerticalLineWithDot hasDot={true} height="h-24" />
                      <div className="flex flex-1 justify-start">
                        <StepLabel step={item.step} align="left" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-1 justify-end">
                        <StepLabel step={item.step} align="left" />
                      </div>
                      <VerticalLineWithDot hasDot={true} height="h-24" />
                      <div className="flex flex-1 justify-start">
                        <Card
                          title={item.title}
                          date={item.date}
                          icon={item.icon}
                          variant={item.variant}
                          isActive={isActive}
                          onClick={() => handleCardClick(item.step)}
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* ===== GARIS SAMBUNG KE STEP BERIKUTNYA (TANPA TITIK) ===== */}
                {idx < steps.length - 1 && (
                  <div className="flex w-full items-center justify-center gap-4">
                    <div className="flex flex-1 justify-end">
                      <div className="w-full max-w-[260px]" />
                    </div>
                    <VerticalLineWithDot hasDot={false} height="h-16" />
                    <div className="flex flex-1 justify-start">
                      <div className="w-full max-w-[120px]" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
