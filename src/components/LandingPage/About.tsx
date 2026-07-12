const About = () => {
  return (
    <section id="tentang-lomba" className="relative my-20 px-6 py-12 text-center max-w-4xl mx-auto bg-white">
      {/* Judul */}
      <div className="relative flex justify-center items-center mb-6">
        <h3 
          className="font-bold z-10"
          style={{
            fontFamily: 'Days One',
            fontWeight: 400,
            fontSize: '64px',
            lineHeight: '100%',
            letterSpacing: '0%',
            textAlign: 'center',
            color: '#094285'
          }}
        >
          Apa Itu <span 
            className="text-orange-primary"
            style={{
              fontFamily: 'Days One',
              fontWeight: 400,
              fontSize: '64px',
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
      <p 
        className="text-lg leading-relaxed"
        style={{ color: '#094285' }}
      >
        <span className="text-orange-primary">Open Source Competition</span> atau <span className="text-orange-primary">OSC</span> adalah ajang lomba untuk menguji keahlian dan kreativitas peserta dalam problem solving menggunakan open source software.
      </p>
    </section>
  );
};

export default About;