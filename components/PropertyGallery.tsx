"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
  name: string;
}

export default function PropertyGallery({ images, name }: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show up to 5 images in the grid
  const displayImages = images.length > 0 ? images : ["/img/placeholder.jpg"];
  const heroImage = displayImages[0];
  const gridImages = displayImages.slice(1, 5);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const prev = () =>
    setCurrentIndex((i) => (i - 1 + displayImages.length) % displayImages.length);
  const next = () =>
    setCurrentIndex((i) => (i + 1) % displayImages.length);

  return (
    <>
      {/* Gallery grid */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
          {/* Hero image — spans 2 columns, 2 rows */}
          <button
            className="col-span-4 md:col-span-2 row-span-2 relative overflow-hidden group focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-inset"
            onClick={() => openLightbox(0)}
            aria-label={`View photo 1 of ${displayImages.length} — ${name}`}
          >
            <Image
              src={heroImage}
              alt={`${name} — main photo`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/10 transition-colors flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
            </div>
          </button>

          {/* Grid images */}
          {[0, 1, 2, 3].map((gridIdx) => {
            const imgIndex = gridIdx + 1;
            const img = gridImages[gridIdx] ?? "/img/placeholder.jpg";
            const isLast = gridIdx === 3 && displayImages.length > 5;

            return (
              <button
                key={gridIdx}
                className="hidden md:block relative overflow-hidden group focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-inset"
                onClick={() => openLightbox(imgIndex)}
                aria-label={`View photo ${imgIndex + 1} of ${displayImages.length}`}
              >
                <Image
                  src={img}
                  alt={`${name} — photo ${imgIndex + 1}`}
                  fill
                  sizes="25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {isLast && (
                  <div className="absolute inset-0 bg-ink-900/50 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      +{displayImages.length - 5} more
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/10 transition-colors" />
              </button>
            );
          })}
        </div>

        {/* Mobile — show all photos button */}
        <button
          onClick={() => openLightbox(0)}
          className="md:hidden mt-3 flex items-center gap-2 text-sm font-semibold text-ink-600 hover:text-ink-900 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
        >
          <ZoomIn className="w-4 h-4" />
          Show all {displayImages.length} photos
        </button>
      </div>

      {/* Lightbox */}
      <Dialog.Root open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink-900/95 backdrop-blur-sm" />
          <Dialog.Content
            className="fixed inset-0 z-50 flex items-center justify-center"
            aria-describedby="gallery-description"
          >
            <VisuallyHidden.Root>
              <Dialog.Title>Photo gallery — {name}</Dialog.Title>
              <Dialog.Description id="gallery-description">
                Photo {currentIndex + 1} of {displayImages.length} for {name}
              </Dialog.Description>
            </VisuallyHidden.Root>

            {/* Close */}
            <Dialog.Close className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-white">
              <X className="w-6 h-6" />
              <span className="sr-only">Close gallery</span>
            </Dialog.Close>

            {/* Counter */}
            <div className="absolute top-4 left-4 text-white text-sm font-medium">
              {currentIndex + 1} / {displayImages.length}
            </div>

            {/* Image */}
            <div className="relative w-full max-w-5xl max-h-[85vh] mx-4 aspect-[16/9]">
              <Image
                src={displayImages[currentIndex] ?? "/img/placeholder.jpg"}
                alt={`${name} — photo ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Navigation */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous photo"
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next photo"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
              {displayImages.slice(0, 8).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`View photo ${i + 1}`}
                  aria-current={i === currentIndex ? "true" : undefined}
                  className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0 focus-visible:ring-2 focus-visible:ring-white ${
                    i === currentIndex ? "border-white" : "border-white/30"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </button>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
