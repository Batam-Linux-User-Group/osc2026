import { vektorKanan, vektorKiri } from "../../assets";

interface AboutProps {
  tema: string
}
const About = ({tema}: AboutProps) => {
  return (
    <section id="tentang-lomba" className="relative my-20 px-6 text-center max-w-4xl mx-auto">
      {/* Vektor Kiri dan Kanan di tengah atas */}
      <div className="relative flex justify-center items-center mb-6">
        <img
          src={vektorKiri}
          alt="vektor kiri"
          className="w-24 h-auto absolute left-1/3 -translate-x-full top-1/2 -translate-y-1/2 opacity-50"
        />
        <h3 className="text-3xl font-bold text-slate-800 z-10">
          Apa itu <span className="text-orange-500">OSC?</span>
        </h3>
        <img
          src={vektorKanan}
          alt="vektor kanan"
          className="w-24 h-auto absolute right-1/3 translate-x-full top-1/2 -translate-y-1/2 opacity-50"
        />
      </div>

      {/* Deskripsi */}
      <p className="text-lg leading-relaxed text-slate-700">
        <strong>Open Source Competition</strong> atau <strong>OSC</strong> adalah ajang lomba untuk menguji keahlian dan kreativitas peserta dalam <em>problem solving</em> menggunakan <strong>open source software</strong>.
        <br />
        OSC 2025 hadir dengan tema <span className="italic text-orange-500">"{tema}"</span> dan 4 cabang lomba menarik yang bisa kamu ikuti!
      </p>
    </section>
  );
};

export default About;
