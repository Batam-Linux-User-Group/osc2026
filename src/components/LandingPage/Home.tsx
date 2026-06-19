import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { arrowbottom, linekanan, linekiri, Maskot } from '../../assets';
import { motion } from 'motion/react';

interface HomePage {
  title: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// const CornerDecoration = ({ isTopLeft }: { isTopLeft: boolean }) => (
//   <svg
//     className="w-80 h-20"
//     viewBox="0 0 320 80"
//     fill="none"
//     aria-hidden="true"
//   >
//     {isTopLeft ? (
//       <>
//         <path
//           d="M0 0H200L220 20H320"
//           stroke="white"
//           strokeWidth="2"
//           fill="none"
//         />
//         <path d="M0 0V60L20 80" stroke="white" strokeWidth="2" fill="none" />
//         {[240, 250, 260, 270].map((x) => (
//           <rect key={x} x={x} y="15" width="4" height="4" fill="white" />
//         ))}
//       </>
//     ) : (
//       <>
//         <path
//           d="M320 80H120L100 60H0"
//           stroke="white"
//           strokeWidth="2"
//           fill="none"
//         />
//         <path d="M320 80V20L300 0" stroke="white" strokeWidth="2" fill="none" />
//         {[40, 52, 64].map((x) => (
//           <rect key={x} x={x} y="61" width="6" height="6" fill="white" />
//         ))}
//       </>
//     )}
//   </svg>
// );

const calculateTimeLeft = (deadline: Date): TimeLeft => {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
};

const Home = ({ title }: HomePage) => {
  // DEADLINE
  const deadline = new Date('2025-08-16T00:00:00');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(deadline)
  );
  const [isTimerFinished, setIsTimerFinished] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft(deadline);
      setTimeLeft(updatedTimeLeft);

      if (
        updatedTimeLeft.days === 0 &&
        updatedTimeLeft.hours === 0 &&
        updatedTimeLeft.minutes === 0 &&
        updatedTimeLeft.seconds === 0
      ) {
        setIsTimerFinished(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div
      id="beranda"
      className="min-h-screen bg-gradient-to-br from-[#423E40] via-gray-800 to-slate-900 text-white px-5 py-14 md:py-24 relative overflow-hidden"
      // className="min-h-screen bg-gradient-to-br from-[#423E40] via-[#5b5557] to-[#A89EA3] text-white px-5 py-14 md:py-24 relative overflow-hidden"
    >
      {/* Tech Corner Decorations */}
      <div className="absolute hidden md:block top-12 left-0 p-6">
        <img src={linekiri} alt="" />
      </div>
      <div className="absolute hidden md:block bottom-0 right-0 p-6">
        <img src={linekanan} alt="" />
      </div>

      {/* Orange/Blue Corner Accents */}
      <div className="absolute top-14 hidden md:block right-6 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded"></div>
      <div className="absolute top-16 hidden md:block right-8 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded"></div>
      <div className="absolute bottom-6 left-6 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded"></div>
      <div className="absolute bottom-8 left-8 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10 xl:pt-24">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
          className="lg:w-1/2 space-y-2 flex flex-col justify-center pt-10 md:ps-10"
        >
          <div className="space-y-2 md:space-y-6">
            <h1 className="text-3xl lg:text-3xl xl:text-4xl font-bold leading-tight">
              {title} <span className="text-orange-500">Open Source!</span>
            </h1>
            <p className="text-sm lg:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Mulailah persiapanmu dari sekarang. Tantangan open source
              menantimu!
            </p>
          </div>

          {/* Countdown */}
          {isTimerFinished ? (
            <p className="text-xl text-orange-500">Event has started!</p>
          ) : (
            <div className="flex gap-4 text-center font-mono">
              {[
                {
                  value: timeLeft.days.toString().padStart(2, '0'),
                  label: 'days',
                },
                {
                  value: timeLeft.hours.toString().padStart(2, '0'),
                  label: 'hours',
                },
                {
                  value: timeLeft.minutes.toString().padStart(2, '0'),
                  label: 'minutes',
                },
                {
                  value: timeLeft.seconds.toString().padStart(2, '0'),
                  label: 'seconds',
                },
              ].map((item, index) => (
                <div key={item.label} className="flex flex-col">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-1">
                    {item.value}
                  </div>
                  <div className="text-sm lg:text-base text-slate-400 uppercase tracking-wide">
                    {item.label}
                  </div>
                  <p className="hidden">{index}</p>
                </div>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <div className="pt-4">
            <Link
              to="/daftar"
              className="bg-transparent border-2 border-blue-500 text-white px-8 py-1 rounded-full text-lg font-semibold hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              aria-label="Register for the open source challenge"
            >
              Daftar
            </Link>
          </div>
        </motion.div>

        {/* Right Content - Robot Mascot */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
          className="lg:w-1/2 flex justify-center relative"
        >
          <img
            src={Maskot}
            alt="maskot"
            className="max-w-full h-auto"
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Bottom Arrow Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <img
          src={arrowbottom}
          alt="segitiga"
          className="animate-bounce w-8 h-auto cursor-pointer"
          onClick={() => {
            const section = document.getElementById('tentang-lomba');
            section?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </div>
    </div>
  );
};

export default Home;
