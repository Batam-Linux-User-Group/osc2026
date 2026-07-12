import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Maskot, Gedung } from '../../assets';
import dotPanelBg from '../../assets/LandingPage/dot-panel-bg.png';
import dotPattern from '../../assets/LandingPage/dot-pattern.png';
import decorTopLeft from '../../assets/LandingPage/decor-topleft.png';
import decorGlow from '../../assets/LandingPage/decor-glow.png';

const Home = () => {
  return (
    <section
      id="beranda"
      className="relative min-h-screen overflow-hidden bg-neutral-black px-5 pb-32 pt-14 text-white md:py-24"
    >
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-16 lg:flex-row xl:pt-16">
        {/* ---------- Left content ---------- */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full lg:w-1/2"
        >
          <img
            src={decorTopLeft}
            alt=""
            aria-hidden="true"
            className="absolute -left-6 -top-9 hidden h-[75px] w-[170px] rounded-2xl object-cover opacity-60 sm:block"
          />

          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/0 px-7 py-9 shadow-2xl shadow-black/40 sm:px-10 sm:py-10">
            <h1 className="border-l-4 border-blue-primary pl-5 text-4xl font-extrabold leading-[1.05] lg:text-5xl xl:text-6xl">
              <span className="block text-white">OPEN SOURCE</span>
              <span className="block pb-1 text-orange-primary">
                COMPE
                <span style={{ filter: 'blur(1px)' }}>TITION</span>
              </span>
            </h1>

            <p className="mt-4 max-w-md pl-6 text-sm leading-relaxed text-slate-300 lg:text-base">
              <strong className="font-semibold text-white">
                Wujudkan Potensimu Lewat Open Source!
              </strong>
              <br />
              Mulai dari sekarang untuk menghadapi tantangan dunia modern.
            </p>

            <div className="mt-7 pl-6">
              <Link
                to="/daftar"
                className="inline-block rounded-full bg-gradient-to-br from-orange-primary to-orange-dark px-8 py-3 text-sm font-bold text-neutral-black shadow-lg shadow-orange-primary/30 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-primary/40"
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
          className="flex w-full justify-center pb-10 pl-10 lg:w-1/2 lg:justify-end"
        >
          <div className="relative w-[72%] max-w-sm">
            <img
              src={decorGlow}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-1 z-30 h-48 w-56 rounded-[24px] object-cover opacity-90"
            />

            <div className="absolute bottom-10 right-full z-20 mr-36 hidden h-20 w-48 overflow-hidden rounded-2xl shadow-md sm:block">
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

            <div className="relative z-10 aspect-[588/861] w-full overflow-hidden rounded-[28px] shadow-2xl shadow-orange-primary/40 ring-2 ring-orange-primary/40">
              <img
                src={Gedung}
                alt="Gedung kampus penyelenggara OSC"
                className="h-full w-full object-cover brightness-90 saturate-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-black/70 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-black/50 via-transparent to-transparent" />
              <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-orange-primary/30" />
            </div>

            <img
              src={Maskot}
              alt="Maskot OSC"
              loading="lazy"
              className="pointer-events-none absolute -bottom-3 -left-42 z-20 w-[85%] drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)] sm:w-[95%]"
            />
          </div>
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-20 bg-neutral-white"
      >
        <div className="absolute left-1/2 top-[-32px] h-16 w-3/4 -translate-x-1/2 rounded-full bg-black/25 blur-2xl" />
      </div>
    </section>
  );
};

export default Home;