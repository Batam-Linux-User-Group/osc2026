import { useState } from 'react';
import {
  mascotRightBottom,
  shapeLeftBottom,
  shapeLeftTop,
  shapeRightTop,
  cardMascotDesign,
  cardWebDesign,
  cardNetsim,
  cardSysadmin,
} from '../assets/LandingPage/CompetitionSection';
import { motion } from 'motion/react';

type ModalKey = 'mascot' | 'web' | 'netsim' | 'sysadmin' | null;

interface ModalContent {
  [key: string]: {
    title: string;
    description: string;
  };
}

const modalContent: ModalContent = {
  mascot: {
    title: 'Mascot Design',
    description:
      'Kompetisi perancangan karakter maskot yang mencerminkan tema OSC 2025. Penilaian didasarkan pada kreativitas, orisinalitas, dan relevansi desain. Karya pemenang akan dijadikan ikon resmi maskot OSC. Pembuatan maskot dilakukan secara online, dengan batas akhir pengumpulan karya pada tanggal 15 Agustus. Presentasi hasil karya akan dilakukan pada tanggal 17 Agustus.',
  },
  web: {
    title: 'Web Design',
    description:
      'Kompetisi perancangan antarmuka web dengan penilaian berdasarkan ketepatan penggunaan CSS dan kesesuaian dengan tema. Peserta diminta menyesuaikan desain dengan arahan CSS yang diberikan. Lomba ini akan dilaksanakan secara offline pada tanggal 16 Agustus, di lokasi yang akan diinformasikan kemudian.',
  },
  netsim: {
    title: 'Network Simulation',
    description:
      'Kompetisi simulasi jaringan di mana peserta diminta menyelesaikan tantangan jaringan menggunakan perangkat lunak seperti Cisco Packet Tracer. Lomba akan dilaksanakan secara offline pada tanggal 16 Agustus.',
  },
  sysadmin: {
    title: 'System Administration',
    description:
      'Kompetisi administrasi sistem yang menantang peserta untuk mengelola dan mengamankan sistem berbasis Linux dalam skenario dunia nyata. Lomba ini akan diadakan pada tanggal 16 Agustus secara offline.',
  },
};

const CompetitionSection = () => {
  const [openModal, setOpenModal] = useState<ModalKey>(null);

  const closeModal = () => setOpenModal(null);

  return (
    <div
      id="kategori"
      className="flex flex-col items-center justify-center relative bg-gradient-to-br from-[#423E40] via-gray-800 to-slate-900 py-10 overflow-hidden"
    >
      <motion.img
        initial={{ x: 100 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 1 }}
        src={mascotRightBottom}
        alt="mascotRightBottom"
        className="absolute bottom-0 right-0 hidden sm:block sm:-right-44 lg:-bottom-40 lg:-right-14"
      />
      <motion.img
        src={mascotRightBottom}
        initial={{ x: 100 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 1 }}
        alt="mascotRightBottom"
        className="absolute bottom-0 left-0 hidden sm:block sm:-left-44 scale-x-[-1] lg:hidden"
      />
      <img
        src={shapeLeftBottom}
        alt="shapeLeftBottom"
        className="absolute bottom-10 left-10 hidden lg:block "
      />
      <img
        src={shapeRightTop}
        alt="shapeRightTop"
        className="absolute top-10 right-10 hidden lg:block "
      />
      <img
        src={shapeLeftTop}
        alt="shapeLeftTop"
        className="absolute top-10 left-10 hidden lg:block "
      />
      <div className="mb-10 text-center">
        <h2 className="text-gray-100 text-2xl font-semibold">
          Daftar Lomba OSC 2025
        </h2>
        <p className="text-gray-100 ">
          Berikut adalah lomba yang akan diadakan pada OSC 2025!
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-10 md:gap-16">
        <motion.img
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          src={cardMascotDesign}
          alt="cardMascotDesign"
          draggable={false}
          onClick={() => setOpenModal('mascot')}
          className="w-52 cursor-pointer hover:-translate-y-5 transition duration-100"
        />
        <motion.img
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          src={cardWebDesign}
          alt="cardWebDesign"
          draggable={false}
          onClick={() => setOpenModal('web')}
          className="w-52 cursor-pointer hover:-translate-y-5 transition duration-100"
        />
        <motion.img
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          src={cardNetsim}
          alt="cardNetsim"
          draggable={false}
          onClick={() => setOpenModal('netsim')}
          className="w-52 cursor-pointer hover:-translate-y-5 transition duration-100"
        />
        <motion.img
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          src={cardSysadmin}
          alt="cardSysadmin"
          draggable={false}
          onClick={() => setOpenModal('sysadmin')}
          className="w-52 cursor-pointer hover:-translate-y-5 transition duration-100"
        />
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className="bg-white max-w-md w-full p-6 rounded-lg shadow-xl text-gray-800 relative"
            style={{
              animation: 'fadeInZoom 0.3s ease-out',
              transformOrigin: 'center',
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {modalContent[openModal].title}
            </h3>
            <p>{modalContent[openModal].description}</p>
            <p className="mt-5 font-semibold">
              Panduan Lomba : <br />
              <a
                href="https://polibatam.id/panduan-lomba-osc-2025"
                className="text-blue-500 font-normal hover:underline active:underline"
              >
                polibatam.id/panduan-lomba-osc-2025
              </a>
            </p>
          </div>
        </div>
      )}
      <style>
        {`
@keyframes fadeInZoom {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
`}
      </style>
    </div>
  );
};

export default CompetitionSection;
