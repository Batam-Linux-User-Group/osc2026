import lineBackground from '../../assets/LandingPage/ChampionSection/line-background.png';
import trophy from '../../assets/LandingPage/ChampionSection/trophy.png';

const champions = [
  {
    id: 1,
    competition: 'Web Design',
    winner: 'Rajiv Tajusa David',
    school: 'SMKN 1 Batam',
  },
  {
    id: 2,
    competition: 'Linux System Admin',
    winner: 'Septian Ramadhani',
    school: 'SMKN 1 Batam',
  },
  {
    id: 3,
    competition: 'Network Simulation',
    winner: 'Efraim Tobias Santoso',
    school: 'SMKN 7 Batam',
  },
  {
    id: 4,
    competition: 'Mascot Design',
    winner: 'Septian Ramadhani',
    school: 'SMKN 1 Batam',
  },
];

const ChampionSection = () => {
  return (
    <section className="bg-neutral-black py-16 md:py-24 relative overflow-hidden">
      {/* Line Background Image */}
      <div 
        className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url(${lineBackground})` }}
      />

      <div className="flex flex-col items-center mx-auto px-6 sm:px-10 md:px-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-start gap-3 mb-4">
            <img src={trophy} alt="Trophy" className="w-8 h-8 md:w-10 md:h-10 object-contain mt-1" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-white tracking-wide relative pb-3">
              CHAMPION OSC 2025
              <span className="absolute left-0 right-0 bottom-0 h-[4px] bg-orange-primary rounded-full"></span>
            </h2>
            <img src={trophy} alt="Trophy" className="w-8 h-8 md:w-10 md:h-10 object-contain mt-1" />
          </div>
          <p className="text-sm md:text-base text-neutral-white font-medium">
            Mengapresiasi peserta terbaik yang berhasil menunjukkan kemampuan dan dedikasi luar biasa.
          </p>
        </div>

        {/* Champion Cards */}
        <div className="flex flex-col items-center gap-14 w-full max-w-[700px]">
          {champions.map((champion) => (
            <div key={champion.id} className="relative flex flex-col items-center w-full group">
              {/* Winner Card - Overlapping Panels */}
              <div className="relative w-full h-[72px] sm:h-[84px] md:h-[92px] shadow-xl shadow-black/50 z-10">
                {/* Blue Panel (Underneath, left side) */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[58%] bg-blue-primary z-0 flex items-center justify-start pl-4 sm:pl-8 md:pl-10"
                  style={{ borderRadius: '0px 0px 0px 24px' }}
                >
                  <h3 className="text-[16px] sm:text-[20px] md:text-[23px] font-heading font-extrabold text-neutral-white leading-none">
                    {champion.competition}
                  </h3>
                </div>
                {/* Orange Panel (On top, right side) */}
                <div
                  className="absolute right-0 top-0 bottom-0 w-[50%] bg-orange-primary z-10 flex items-center justify-center px-4"
                  style={{ borderRadius: '0px 24px 0px 32px' }}
                >
                  <h3 className="text-[16px] sm:text-[20px] md:text-[23px] font-heading font-extrabold text-neutral-white text-center leading-none">
                    {champion.winner}
                  </h3>
                </div>
              </div>

              {/* School Name Container - Behind main card */}
              <div
                className="relative z-0 mt-[-2px] w-[60%] md:w-[48%] border-l-2 border-b-2 border-r-2 border-orange-primary rounded-bl-[18px] py-3 px-6 flex items-center justify-center bg-neutral-black shadow-lg"
              >
                <h3 className="text-[16px] sm:text-[20px] md:text-[23px] font-heading font-extrabold text-neutral-white text-center leading-none">
                  {champion.school}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChampionSection;
