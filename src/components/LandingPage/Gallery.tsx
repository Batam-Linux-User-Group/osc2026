import { satu, dua } from '../../assets/LandingPage/gallery';

const galleryData = [
  {
    id: '2024',
    src: satu,
    alt: 'OSC 2024',
    year: '2024',
    isComingSoon: false,
  },
  {
    id: '2025',
    src: dua,
    alt: 'OSC 2025',
    year: '2025',
    isComingSoon: false,
  },
  {
    id: '2026',
    src: '',
    alt: 'OSC 2026',
    year: '2026',
    isComingSoon: true,
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
              className="relative group overflow-hidden rounded-xl aspect-[4/3] bg-neutral-black cursor-pointer"
            >
              {item.isComingSoon ? (
                // Coming Soon Card
                <div className="w-full h-full flex items-center justify-center bg-neutral-black">
                  <div className="text-center">
                    <span className="text-5xl md:text-6xl text-neutral-white/80 font-bold">
                      ?
                    </span>
                  </div>
                </div>
              ) : (
                // Photo Card
                <>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </>
              )}

              {/* Year Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl md:text-3xl font-bold text-neutral-white tracking-wide">
                    OSC {item.year}
                  </span>
                  <span className="text-yellow-400 text-2xl md:text-3xl font-bold">
                    |
                  </span>
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
