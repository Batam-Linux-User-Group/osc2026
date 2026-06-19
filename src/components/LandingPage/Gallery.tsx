import GalleryPhotos from './GalleryPhotos';
import { satu, dua, tiga, empat, lima } from '../../assets/LandingPage/gallery';

const datas = [
  {
    id: '1',
    src: satu,
    alt: 'Pembagian Hadiah Pemenang Lomba',
    title: 'Pengumuman Lomba',
  },
  {
    id: '2',
    src: dua,
    alt: 'Pelaksanaan lomba Network Simulation',
    title: 'Pelaksanaan lomba Network Simulation',
  },
  {
    id: '3',
    src: tiga,
    alt: 'Pelaksanaan lomba Web Design',
    title: 'Pelaksanaan lomba Web Design',
  },
  {
    id: '4',
    src: empat,
    alt: 'Pelaksanaan lomba System Administration',
    title: 'Pelaksanaan lomba System Administration',
  },
  {
    id: '5',
    src: lima,
    alt: 'Pelaksanaan lomba System Administration',
    title: 'Pelaksanaan lomba System Administration',
  },
];

const Gallery = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Galeri OSC 2024
          </h1>
          <p className="text-gray-600">
            Keseruan Lomba Open Source pada tahun 2024
          </p>
        </div>

        <GalleryPhotos photos={datas} />

        {/* Example with fewer photos */}
        {/* <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Gallery with 5 Photos
          </h2>
          <PhotoGallery photos={samplePhotos.slice(0, 5)} />
        </div> */}
      </div>
    </div>
  );
};

export default Gallery;
