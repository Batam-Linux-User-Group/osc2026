import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Maskot } from '../../assets';
import dotPanelBg from '../../assets/LandingPage/dot-panel-bg.png';
import dotPattern from '../../assets/LandingPage/dot-pattern.png';
import decorTopLeft from '../../assets/LandingPage/decor-topleft.png';
import backgroundBuilding from '../../assets/LandingPage/background-building.png';

const Home = () => {
  return (
    <section
      id="beranda"
      className="relative min-h-screen overflow-hidden bg-neutral-black px-5 pb-32 pt-14 text-white md:py-24"
    >
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-16 overflow-visible lg:flex-row xl:pt-16">
        {/* ---------- Left content ---------- */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full order-2 lg:order-1 lg:w-[55%]"
        >
          <img
            src={decorTopLeft}
            alt=""
            aria-hidden="true"
            className="absolute -left-8 -top-10 z-0 hidden h-[90px] w-[200px] object-cover opacity-80 sm:block"
            style={{ borderRadius: '0 24px 0 24px' }}
          />

          <div className="relative border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/0 px-5 pt-6 pb-10 shadow-2xl shadow-black/40 sm:px-10 sm:pt-10 sm:pb-14" style={{ borderRadius: '0 57px 0 57px' }}>
            <h1 className="border-l-4 border-blue-primary pl-4 text-[1.75rem] font-bold leading-[1.05] tracking-wide sm:pl-6 sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="block text-white">OPEN SOURCE</span>
              <span className="block pb-1 text-orange-primary">
                COMPE
                <span className="opacity-70">TITION</span>
              </span>
            </h1>

            <p className="mt-3 max-w-lg pl-4 text-xs leading-relaxed text-slate-300 sm:mt-4 sm:pl-6 sm:text-sm lg:text-base">
              <strong className="font-semibold text-white">
                Wujudkan Potensimu Lewat Open Source!
              </strong>
              <br />
              Mulai dari sekarang untuk menghadapi tantangan dunia modern.
            </p>

            <div className="mt-5 pl-4 sm:mt-7 sm:pl-6">
              <Link
                to="/daftar"
                className="inline-block bg-orange-primary px-6 py-2.5 text-sm font-bold text-neutral-black shadow-lg  outline-offset-1 outline-orange-primary transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-primary/40"
                style={{ borderRadius: '38px 12px 38px 12px' }}
                aria-label="Daftar Open Source Competition"
              >
                Daftar Sekarang!
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ---------- Right illustration ---------- */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex w-full order-1 lg:order-2 justify-center pb-10 pt-4 lg:pl-10 lg:w-1/2 lg:justify-end"
        >
          <div className="relative w-[80%] max-w-sm sm:w-[72%]">
            <div className="absolute bottom-10 right-full z-20 mr-36 hidden h-20 w-48 overflow-hidden shadow-md sm:block" style={{ borderRadius: '0 24px 0 24px' }}>
              <img
                src={dotPanelBg}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
              <img
                src={dotPattern}
                alt=""
                aria-hidden="true"
                className="absolute right-3 top-1/2 h-[60%] w-[55%] -translate-y-1/2 object-contain"
              />
            </div>

            {/* Background building asset */}
            <img
              src={backgroundBuilding}
              alt="Gedung kampus penyelenggara OSC"
              className="relative z-10 w-full object-contain"
            />

            <img
              src={Maskot}
              alt="Maskot OSC"
              loading="lazy"
              className="pointer-events-none absolute -bottom-2 -left-10 z-20 w-[85%] drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)] sm:-left-30 sm:w-[100%] lg:-left-38 lg:w-[110%]"
            />
          </div>
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 sm:h-28"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(26,26,26,0.15) 10%, rgba(26,26,26,0.4) 20%, #1A1A1A 35%, #222222 45%, #3a3a3a 55%, #555555 65%, #777777 72%, #999999 80%, #bbbbbb 88%, #dddddd 94%, #ffffff 100%)',
        }}
      />
    </section>
  );
};

export default Home;