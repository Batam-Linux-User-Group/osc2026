import {
  Brush,
  ShieldCheck,
  Network,
  MonitorSmartphone,
} from "lucide-react";
import mascot from "../assets/maskot.png";

const competitions = [
  {
    title: "Mascot Design",
    description:
      "Tantang kreativitasmu dalam mendesain maskot ikonik yang merepresentasikan semangat Open Source Competition 2026.",
    icon: Brush,
    panduanUrl: "https://polibatam.id/GuideBookMascotDesignOSC2026",
  },
  {
    title: "Linux System Admin",
    description:
      "Uji kemampuan teknismu dalam mengelola, mengkonfigurasi, dan memecahkan masalah pada sistem operasi berbasis Linux.",
    icon: ShieldCheck,
    panduanUrl: "https://polibatam.id/GuideBookSysAdminOSC2026",
  },
  {
    title: "Network Simulation",
    description:
      "Tunjukkan keahlianmu dalam merancang, mensimulasikan, dan menganalisis arsitektur jaringan komputer modern.",
    icon: Network,
    panduanUrl: "https://polibatam.id/GuideBookNetSimOSC2026",
  },
  {
    title: "Web Design",
    description:
      "Buat karya desain antarmuka web yang tidak hanya indah secara visual, tetapi juga responsif dan ramah pengguna.",
    icon: MonitorSmartphone,
    panduanUrl: "https://polibatam.id/GuideBookWebDesignOSC2026",
  },
];
export default function CompetitionSection() {
  return (
    <section className="relative overflow-hidden bg-[#191a1f] py-16 px-6">
      {/* Top Orange Line */}
      <div className="absolute left-0 top-0 h-4 w-full bg-[#e86d2f]" />

      {/* Left Character */}
      <img
        src={mascot}
        alt="Mascot"
        className="absolute button-0px left-0 hidden w-100 lg:block"
      />

      <div className="mx-auto max-w-6xl">
        {/* Title */}
        <div className="mb-14 flex justify-center">
          <div className="relative">
            <h2 className="text-3xl font-bold uppercase tracking-widest text-white">
              Daftar Lomba
            </h2>
            <div className="absolute left-1/2 mt-2 h-[3px] w-40 -translate-x-1/2 rounded-full bg-[#e86d2f]" />
          </div>
        </div>
        <div className="mb-10 flex justify-center">
          <p className="max-w-xl text-center text-sm text-gray-300">
            Pilih lomba yang sesuai dengan minat dan keahlianmu, dan tunjukkan bakat terbaikmu di Open Source Competition 2026!
          </p>
        </div>
        {/* Cards */}
        <div className="grid gap-7 md:grid-cols-2">
          {competitions.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded
                  border
                  border-[#f18c43]
                  bg-[#22242b]
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_0_20px_rgba(241,140,67,0.35)]
                "
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-r from-orange-500/5 to-transparent" />

                <div className="relative flex gap-5">
                  {/* Icon */}
                  <div
                    className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded
                    border
                    border-[#363841]
                    bg-[#2b2d35]
                  "
                  >
                    <Icon
                      size={30}
                      className="text-[#ef7d39]"
                      strokeWidth={2}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="mb-3 text-xl font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-6 text-gray-400">
                      {item.description}
                    </p>

                    {/* link panduan lomba */}
                    <a
                                           href={item.panduanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm font-semibold text-[#ef7d39] hover:underline"
                    >
                      Lihat Panduan
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}