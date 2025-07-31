import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Palette, PenTool, User } from "lucide-react";
import HomeBanner from "@/public/BJORK.jpg";
import Link from "next/link";
import { Carousel } from "@/components/ui/carousel";
import { ArtworkCarousel } from "./_components/artwork-carousel";

export default function Hero() {
  return (
    <div>
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-black">
        <Image
          src={HomeBanner}
          alt="Artistic background"
          data-ai-hint="artistic background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute z-1 inset-0 bg-black/50" />
        <div className="absolute z-0 inset-0 bg-background/0 backdrop-blur-sm" />
        <div className="container relative z-10 mx-auto max-w-screen-lg text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-slate-200">
            Bebaskan Kreativitas Ilustrasimu
          </h1>
          <p className="mt-6 max-w-3xl mx-auto font-body text-lg text-foreground/80 sm:text-xl">
            Temukan rahasia ilustrasi digital melalui kursus online komprehensif ini. Mulai dari dasar-dasar hingga teknik menengah, kursus ini akan membimbingmu di setiap langkahmu.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            Mulai Perjalanan Imajinasimu
            <ArrowRight className="ml-2 h-5 w-5" />
            <Link href={"/search"}>
              <Button
                size="lg"
                variant="ghost"
                className="font-body bg-slate-900 text-white"
              >
                Temukan Kursusmu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-headline text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Dari coretan biasa hingga Karyamu yang Luar Biasa
            </h2>
            <p className="text-lg text-slate-600">
              Kursus ini dirancang untuk mengajarkan Anda teknik-teknik dasar hingga menengah. Pelajari cara menciptakan ilustrasi dan berkualitas melalui kurikulum langkah demi langkah yang disediakan.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 text-slate-800 mx-auto mb-5 shadow-sm">
                <Layers className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Dasar Komposisi</h3>
              <p className="text-slate-600">Kuasai seni menciptakan adegan visual yang mampu menarik perhatian dan menceritakan sebuah kisah.</p>
            </div>


            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 text-slate-800 mx-auto mb-5 shadow-sm">
                <Palette className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Warna Ekspresif</h3>
              <p className="text-slate-600">Pelajari teori warna dan aplikasinya untuk membangkitkan emosi dan menciptakan gaya khas.</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 text-slate-800 mx-auto mb-5 shadow-sm">
                <PenTool className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Alur Kerja Profesional</h3>
              <p className="text-slate-600">Dari ide awal dan sketsa hingga rendering akhir dan penyempurnaan, pelajari proses lengkapnya.</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 text-slate-800 mx-auto mb-5 shadow-sm">
                <User className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Karakter yang Berkesan</h3>
              <p className="text-slate-600">Kembangkan keterampilan untuk merancang karakter yang unik dan menarik secara visual.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-black text-white">
        <ArtworkCarousel/>
      </section>
    </div>
  );
}
