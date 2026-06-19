import { Calendar, Users, Trophy, Gift, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import {
  pendaftaran,
  juara,
  gift,
  technical_meeting,
  competition,
} from '../assets/LandingPage/TimelineSection';
import clsx from 'clsx';

const TimelineSection = () => {
  const timelineData = [
    {
      date: '28 Juli - 15 Agustus 2025',
      title: 'Pendaftaran',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-orange-500',
      image: pendaftaran,
    },
    {
      date: '13 Agustus 2025',
      title: 'Technical Meeting',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-orange-500',
      image: technical_meeting,
    },
    {
      date: '16 Agustus - 17 Agustus 2025',
      title: 'Pelaksanaan Lomba',
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-orange-500',
      image: competition,
    },
    {
      date: '21 Agustus 2025',
      title: 'Pengumuman Juara',
      icon: <Trophy className="w-6 h-6" />,
      color: 'bg-orange-500',
      image: juara,
    },
    {
      date: '21 Agustus 2025',
      title: 'Penyerahan Hadiah',
      icon: <Gift className="w-6 h-6" />,
      color: 'bg-orange-500',
      image: gift,
    },
  ];

  return (
    <div
      id="timeline"
      className="px-4 py-16 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <div className="h-1 w-32 bg-orange-500 rounded-full mx-auto mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              TIMELINE
            </h2>
            <p className="text-gray-600 text-sm">Jadwal Kegiatan Kompetisi</p>
          </div>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Main Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange-500 rounded-full"></div>

          <div className="space-y-16">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -100 : 100,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className={`w-5/12 ${
                    index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'
                  }`}
                >
                  <div className="bg-white relative overflow-hidden rounded-xl shadow-lg p-6 hover:shadow-xl group transition-all duration-300 transform hover:-translate-y-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={clsx(
                        'absolute top-1/2 -translate-y-1/2 opacity-70 h-[90%] group-hover:opacity-100 transition duration-300',
                        index % 2 === 0
                          ? 'left-0 -translate-x-1/4'
                          : 'right-0 translate-x-1/4'
                      )}
                    />
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-white mb-3 ${item.color}`}
                    >
                      {item.icon}
                      <span>Step {index + 1}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{item.date}</p>
                    <h3 className="text-2xl font-bold text-gray-800 relative z-20">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>

                {/* Center Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative z-10 flex items-center justify-center"
                >
                  <div
                    className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    {item.icon}
                  </div>
                </motion.div>

                {/* Empty space for alternating layout */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden overflow-x-hidden">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-orange-500"></div>

            <div className="space-y-8">
              {timelineData.map((item, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className={`relative z-10 w-16 h-16 rounded-full ${item.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="ml-6 flex-1">
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1 }}
                      viewport={{ once: true }}
                      className="bg-white relative overflow-hidden rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className={clsx(
                          'absolute top-1/2 -translate-y-1/2 opacity-70 h-[90%] right-0 md:-translate-x-1/4 translate-x-1/3'
                        )}
                      />
                      <div
                        className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium text-white mb-2 ${item.color}`}
                      >
                        <span>Step {index + 1}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1 relative z-20">
                        {item.date}
                      </p>
                      <h3 className="text-lg font-bold text-gray-800 relative z-20">
                        {item.title}
                      </h3>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="mt-16 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse delay-75"></div>
            <div className="w-3 h-3 bg-orange-600 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
        <p className="px-4 pt-5 text-sm animate-pulse">
          Khusus Lomba <b>Mascot Design</b> akan menyesuaikan, silahkan cek pada{' '}
          <a
            href="https://polibatam.id/panduan-lomba-osc-2025"
            className="text-orange-500 underline"
          >
            panduan
          </a>
        </p>
      </div>
    </div>
  );
};

export default TimelineSection;
