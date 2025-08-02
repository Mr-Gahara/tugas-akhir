import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import image1 from "@/public/image1.png";
import image2 from "@/public/image2.png";
import image3 from "@/public/image3.png";
import image5 from "@/public/image5.jpg";
import image6 from "@/public/image6.jpg";
import image7 from "@/public/BJORK.jpg";
import image8 from "@/public/image9.png";
import image10 from "@/public/image10.png";

const artworks = [
  { src: image1, alt: "Artwork 1", hint: "artwork 1" },
  { src: image2, alt: "Artwork 2", hint: "artwork 2" },
  { src: image3, alt: "Artwork 3", hint: "artwork 3" },
  { src: image5, alt: "Artwork 5", hint: "artwork 5" },
  { src: image6, alt: "Artwork 6", hint: "artwork 6" },
  { src: image7, alt: "Artwork 7", hint: "artwork 7" },
  { src: image8, alt: "Artwork 8", hint: "artwork 8" },
  { src: image10, alt: "Artwork 10", hint: "artwork 10" },
];

export function ArtworkCarousel() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Featured Artwork</h2>
          <p className="mx-auto max-w-[700px] text-red-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body">
            Dapatkan inspirasi dari karya pengajar.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'center',
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto mt-12"
        >
          <CarouselContent>
            {artworks.map((artwork, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl border-none">
                    <CardContent className="flex aspect-[3/4] items-center justify-center p-0">
                       <Image
                        src={artwork.src}
                        alt={artwork.alt}
                        data-ai-hint={artwork.hint}
                        width={600}
                        height={800}
                        className="object-cover w-full h-full"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
