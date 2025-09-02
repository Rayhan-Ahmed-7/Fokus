import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckSquare, Cpu, Layers, Target, Gamepad2 } from "lucide-react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation("home");
  const heroRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const blobsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Hero text animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }

    if (cardsRef.current.length) {
      gsap.fromTo(
        cardsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.5,
        }
      );
    }

    // Floating blobs animation
    blobsRef.current.forEach((blob, i) => {
      if (!blob) return;
      gsap.to(blob, {
        x: "random(-30,30)",
        y: "random(-30,30)",
        duration: 6 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  const features = [
    { key: "todos", icon: CheckSquare },
    { key: "algorithms", icon: Cpu },
    { key: "dsa", icon: Layers },
    { key: "patterns", icon: Target },
    { key: "games", icon: Gamepad2 },
  ];

  const marqueeItems = t("marquee", { returnObjects: true }) as string[];

  return (
    <div className="relative min-h-screen overflow-hidden p-8 ">
      {/* Background: gradient + soft blobs + grid */}
      <div className="absolute inset-0 -z-10">
        <div
          ref={(el: HTMLDivElement | null) => {
            if (el) blobsRef.current[0] = el;
          }}
          className="absolute top-10 left-20 w-72 h-72 rounded-full bg-purple-300 opacity-30 blur-3xl"
        />
        <div
          ref={(el: HTMLDivElement | null) => {
            if (el) blobsRef.current[1] = el;
          }}
          className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-indigo-300 opacity-30 blur-3xl"
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        {/* Radial fade for edges */}
        <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="text-center relative z-10 space-y-6 py-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          {t("heroTitle")}
        </h1>
        <p className="text-foreground max-w-2xl mx-auto text-lg">
          {t("heroDescription")}
        </p>
        <Button size="lg" className="rounded-lg shadow-lg text-foreground">
          {t("getStarted")}
        </Button>
      </section>

      {/* Feature Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12 relative z-10">
        {features.map((f, i) => (
          <Card
            key={f.key}
            ref={(el: HTMLDivElement | null) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="hover:shadow-xl transition-all rounded-2xl cursor-pointer group bg-background backdrop-blur"
          >
            <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
              <f.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg">
                {t(`features.${f.key}.label`)}
              </h3>
              <p className="text-sm text-foreground text-center">
                {t(`features.${f.key}.desc`)}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Showcase Marquee (infinite loop) */}
      <section className="mt-16 relative z-10">
        <div className="marquee">
          <div className="marquee__inner" aria-hidden="true">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map(
              (text, idx) => (
                <span
                  key={idx}
                  className="mx-6 text-foreground text-lg font-medium opacity-80 hover:opacity-100 transition-opacity"
                >
                  {text}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <style>{`
        /* Grid background */
        .bg-grid {
          background-image:
            linear-gradient(to right, rgba(100,116,139,0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(100,116,139,0.12) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* Marquee */
        .marquee { overflow: hidden; position: relative; }
        .marquee__inner {
          display: inline-flex;
          align-items: center;
          gap: 3rem;
          width: max-content;
          animation: marquee 20s linear infinite;
          will-change: transform;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee__inner { animation-duration: 0.01ms; animation-iteration-count: 1; }
        }
      `}</style>
    </div>
  );
}

export default HomePage;
