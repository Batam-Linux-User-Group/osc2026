import { useState } from 'react';

interface Photo {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  className?: string;
}

export default function GalleryPhotos({
  photos,
  className = '',
}: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Ensure we only show 5-7 photos
  const displayPhotos = photos.slice(0, 7);

  return (
    <>
      <div className={`w-full max-w-6xl mx-auto p-4 ${className}`}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {displayPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className={`
                relative overflow-hidden rounded-2xl bg-gray-100 cursor-pointer
                transition-all duration-300 hover:scale-105 hover:shadow-xl
                ${
                  index === 0 && displayPhotos.length >= 5
                    ? 'col-span-2 row-span-2'
                    : ''
                }
                ${
                  index === 1 && displayPhotos.length === 6
                    ? 'md:col-span-2'
                    : ''
                }
                ${
                  index === 2 && displayPhotos.length === 7
                    ? 'lg:col-span-2'
                    : ''
                }
              `}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.src || '/placeholder.svg'}
                alt={photo.alt}
                width={400}
                height={400}
                className={`
                  object-cover w-full h-full
                  ${
                    index === 0 && displayPhotos.length >= 5
                      ? 'aspect-square'
                      : 'aspect-square'
                  }
                `}
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for full-size view */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl font-bold z-10"
            >
              ✕
            </button>
            <img
              src={selectedPhoto.src || '/placeholder.svg'}
              alt={selectedPhoto.alt}
              width={800}
              height={600}
              className="object-contain max-h-[80vh] rounded-lg"
            />
            {selectedPhoto.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                <p className="text-white text-lg font-medium">
                  {selectedPhoto.title}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
