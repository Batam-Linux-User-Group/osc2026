const About = () => {
  return (
    <section id="tentang-lomba" className="relative my-20 px-6 py-12 text-center max-w-4xl mx-auto bg-white">
      {/* Judul */}
      <div className="relative flex justify-center items-center mb-6">
        <h3 
          className="font-bold z-10 text-4xl sm:text-5xl md:text-6xl text-[#094285]"
          style={{
            fontFamily: 'Days One',
            fontWeight: 400,
            lineHeight: '100%',
            letterSpacing: '0%',
            textAlign: 'center',
          }}
        >
          Apa Itu <span 
            className="text-orange-primary"
            style={{
              fontFamily: 'Days One',
              fontWeight: 400,
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center'
            }}
          >
            OSC?
          </span>
        </h3>
      </div>

      {/* Deskripsi */}
      <div className="space-y-4">
        <p 
          className="text-lg leading-relaxed"
          style={{ color: '#094285' }}
        >
          <span className="text-orange-primary font-bold">Open Source Competition</span> atau <span className="text-orange-primary font-bold">OSC</span> adalah ajang lomba untuk menguji keahlian dan kreativitas peserta dalam problem solving menggunakan open source software.
        </p>

        <p 
          className="text-lg leading-relaxed"
          style={{ color: '#094285' }}
        >
          OSC 2026 hadir dengan tema <span className="font-bold italic text-orange-primary">"Clash of Code: Open Source Edition"</span> dan 4 cabang lomba menarik yang bisa kamu ikuti!
        </p>
      </div>
    </section>
  );
};

export default About;