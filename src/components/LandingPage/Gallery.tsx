import { galleryOsc2024, galleryOsc2025, logoOsc2024, logoOsc2025 } from '../../assets/LandingPage/gallery';

const galleryData = [
  {
    id: '2024',
    src: galleryOsc2024,
    alt: 'OSC 2024',
    year: '2024',
    isComingSoon: false,
    logo: logoOsc2024,
  },
  {
    id: '2025',
    src: galleryOsc2025,
    alt: 'OSC 2025',
    year: '2025',
    isComingSoon: false,
    logo: logoOsc2025,
  },
  {
    id: '2026',
    src: '',
    alt: 'OSC 2026',
    year: '2026',
    isComingSoon: true,
    logo: logoOsc2025, // placeholder, will show "?" style
  },
];

const Gallery = () => {
  return (
    <section 
      id="sejarah" 
      className="bg-orange-primary py-12 md:py-20"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-block bg-neutral-black rounded-2xl px-10 md:px-16 py-4 md:py-5 mb-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-white tracking-wide">
              GALERI OSC
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-white font-medium">
            Keseruan OSC dari tahun ke tahun
          </p>
        </div>

        {/* Gallery Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {galleryData.map((item) => (
            <div
              key={item.id}
              className={`group rounded-xl overflow-hidden bg-neutral-black cursor-pointer shadow-lg ${
                item.isComingSoon
                  ? 'sm:col-span-2 sm:w-1/2 sm:mx-auto lg:col-span-1 lg:w-full lg:mx-0'
                  : ''
              }`}
            >
              {item.isComingSoon ? (
                // Coming Soon Card
                <div className="relative w-full aspect-[4/3] flex items-center justify-center bg-neutral-gray-light">
                  {/* Question Mark Badge */}
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-neutral-white rounded-xl p-2 md:p-2.5 shadow-lg">
                    <span className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-neutral-black text-xl md:text-2xl font-black">
                      ?
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-8xl md:text-9xl text-neutral-black font-black">
                      ?
                    </span>
                  </div>
                </div>
              ) : (
                // Photo — occupies top portion
                <div className="relative overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Logo Badge */}
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-neutral-white rounded-xl p-2 md:p-2.5 shadow-lg">
                    <img
                      src={item.logo}
                      alt={`Logo OSC ${item.year}`}
                      className="w-8 h-8 md:w-10 md:h-10 object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Year Label — black bar at bottom */}
              <div className="bg-neutral-black px-4 py-3 md:px-5 md:py-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl md:text-2xl font-bold text-neutral-white tracking-wide font-heading">
                    OSC {item.year}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="block w-0.5 h-5 md:h-6 bg-yellow-400" />
                    <span className="block w-1 h-5 md:h-6 bg-neutral-white" />
                  </div>
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
