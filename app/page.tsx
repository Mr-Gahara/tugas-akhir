import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Palette, PenTool, User } from "lucide-react";
import HomeBanner from "@/public/BJORK.jpg";
import Link from "next/link";
import { ArtworkCarousel } from "./_components/artwork-carousel";

export default function Hero() {
  return (
    <div>
      {/* HERO BANNER */}
      <section className="relative w-full py-16 sm:py-20 md:py-32 lg:py-40 bg-black">
        <Image
          src={HomeBanner}
          alt="Artistic background"
          data-ai-hint="artistic background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute z-1 inset-0 bg-black/70" />
        <div className="absolute z-0 inset-0 bg-background/0 backdrop-blur-sm" />
        <div className="container relative z-10 flex flex-col gap-8 px-4 sm:px-10">
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-[9rem] leading-tight font-bold tracking-tight text-lime-500">
              TERBANG
            </h1>
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl lg:text-[4rem] text-lime-500">
              BERSAMA
            </h2>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-[9rem] leading-tight font-bold tracking-tight text-lime-500">
              KREATIVITASMU
            </h1>
          </div>
          <p className="max-w-xl text-sm sm:text-base md:text-lg text-red-50 font-body">
            Temukan teknik ilustrasi digital melalui kursus online komprehensif ini. Mulai dari dasar-dasar hingga teknik menengah, kursus ini akan membimbingmu di setiap langkahmu.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 text-red-50 font-medium">
              <span>Mulai Perjalanan Imajinasimu</span>
            </div>
            <div className="flex items-center gap-5 text-red-50 align-middle">
              <ArrowRight className="h-5 w-5" />
              <Link href="/search">
                <Button
                  size="lg"
                  variant="ghost"
                  className="mt-0 font-body bg-lime-800 text-slate-100 font-bold"
                >
                  Temukan Kursusmu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-16 sm:py-20 md:py-32 lg:py-40 bg-red-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Dari coretan biasa hingga Karyamu yang Luar Biasa
            </h2>
            <p className="text-base sm:text-lg text-lime-900">
              Kursus ini dirancang untuk mengajarkan Anda teknik-teknik dasar hingga menengah dengan style anime dan manga. Pelajari cara menciptakan ilustrasi dan berkualitas melalui kurikulum langkah demi langkah yang disediakan.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-lime-900 text-red-50 mx-auto mb-5 shadow-sm">
                <Layers className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Dasar Komposisi</h3>
              <p className="text-slate-600">
                Kuasai seni menciptakan adegan visual yang mampu menarik perhatian dan menceritakan sebuah kisah.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-lime-900 text-red-50 mx-auto mb-5 shadow-sm">
                <Palette className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Warna Ekspresif</h3>
              <p className="text-slate-600">
                Pelajari teori warna dan aplikasinya untuk membangkitkan emosi dan menciptakan gaya khas.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-lime-900 text-red-50 mx-auto mb-5 shadow-sm">
                <PenTool className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Alur Kerja Profesional</h3>
              <p className="text-slate-600">
                Dari ide awal dan sketsa hingga rendering akhir dan penyempurnaan, pelajari proses lengkapnya.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-lime-900 text-red-50 mx-auto mb-5 shadow-sm">
                <User className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Karakter yang Berkesan</h3>
              <p className="text-slate-600">
                Kembangkan keterampilan untuk merancang karakter yang unik dan menarik secara visual.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-16 sm:py-20 md:py-32 lg:py-40 bg-lime-900 text-red-50">
        <ArtworkCarousel />
      </section>
    </div>
  );
}
