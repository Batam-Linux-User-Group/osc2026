import {
  galleryOsc2024,
  galleryOsc2025,
  logoOsc2024,
  logoOsc2025,
  logoOsc2026,
} from '../../assets/LandingPage/gallery';

const galleryData = [
  {
    id: '2024',
    src: galleryOsc2024,
    alt: 'OSC 2024',
    year: '2024',
    isComingSoon: false,
    logo: logoOsc2024,
    ketupel: 'Bayu Maulana',
  },
  {
    id: '2025',
    src: galleryOsc2025,
    alt: 'OSC 2025',
    year: '2025',
    isComingSoon: false,
    logo: logoOsc2025,
    ketupel: 'Alif Fajriadi',
  },
  {
    id: '2026',
    src: '',
    alt: 'OSC 2026',
    year: '2026',
    isComingSoon: true,
    logo: logoOsc2026,
    ketupel: 'Afif Hamzah',
  },
];

const Gallery = () => {
  return (
    <section id="sejarah" className="bg-orange-primary py-12 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-10 text-center md:mb-14">
          <div className="mb-4 inline-block rounded-2xl bg-neutral-black px-10 py-4 md:px-16 md:py-5">
            <h2 className="text-3xl font-bold tracking-wide text-neutral-white md:text-4xl lg:text-5xl">
              GALERI OSC
            </h2>
          </div>

          <p className="text-sm font-medium text-neutral-white md:text-base">
            Keseruan OSC dari tahun ke tahun
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryData.map((item) => (
            <div
              key={item.id}
              className={`group overflow-hidden rounded-2xl bg-neutral-black shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer ${
                item.isComingSoon
                  ? 'sm:col-span-2 sm:mx-auto sm:w-1/2 lg:col-span-1 lg:mx-0 lg:w-full'
                  : ''
              }`}
            >
              {/* Image / Coming Soon */}
              {item.isComingSoon ? (
                <div className="relative flex aspect-[4/3] items-center justify-center bg-neutral-gray-light">
                  {/* Badge */}
                  <div className="absolute left-4 top-4 rounded-xl bg-neutral-white p-2.5 shadow-lg">
                    <span className="flex h-10 w-10 items-center justify-center text-2xl font-black text-neutral-black">
                      ?
                    </span>
                  </div>

                  <span className="text-8xl font-black text-neutral-black md:text-9xl">
                    ?
                  </span>
                </div>
              ) : (
                <div className="relative overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="aspect-[4/3] w-full object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
                  />

                  {/* Logo Badge */}
                  <div className="absolute left-4 top-4 rounded-xl bg-neutral-white p-2.5 shadow-lg">
                    <img
                      src={item.logo}
                      alt={`Logo OSC ${item.year}`}
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="bg-neutral-black px-4 py-4 transition-all duration-300 group-hover:bg-neutral-800 group-active:bg-neutral-700 md:px-5">
                <div className="flex flex-col gap-3">
                  {/* Title */}
                  <div className="flex items-center gap-3">
                    <span className="font-heading text-xl font-bold tracking-wide text-neutral-white transition-colors duration-300 group-hover:text-yellow-400 md:text-2xl">
                      OSC {item.year}
                    </span>

                    {/* Decorative line */}
                    <div className="flex items-center gap-1.5">
                      <span className="block h-6 w-0.5 rounded-full bg-yellow-400" />
                      <span className="block h-6 w-1 rounded-full bg-neutral-white transition-colors duration-300 group-hover:bg-yellow-400" />
                    </div>
                  </div>

                  {/* Ketua Pelaksana */}
                  <p className="text-sm font-medium text-neutral-200 transition-colors duration-300 group-hover:text-neutral-white md:text-base">
                    Ketua Pelaksana:{' '}
                    <span className="font-semibold text-yellow-400">
                      {item.ketupel}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;