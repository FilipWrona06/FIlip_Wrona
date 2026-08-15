"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Hero from "@/components/landing/Hero";
import Navbar from "@/components/layout/Navbar";
import AmbientBackground from "@/components/layout/AmbientBackground";

export default function Home() {
  useEffect(() => {
    // Płynny scroll Lenis połączony bezpośrednio z GSAP Ticker
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen text-white selection:bg-violet-500/30 selection:text-violet-200">
      {/* Dynamiczne tło reagujące wyłącznie na scroll */}
      <AmbientBackground />

      <Navbar />

      <Hero />

      <DemoSection id="portfolio" tag="01 — Portfolio" title="Wybrane projekty">
        Miejsce na case studies, zrzuty ekranu i linki do wdrożonych realizacji.
      </DemoSection>

      <DemoSection
        id="doswiadczenie"
        tag="02 — Doświadczenie"
        title="Ścieżka zawodowa"
      >
        Chronologiczny przegląd stanowisk, firm i kluczowych odpowiedzialności.
      </DemoSection>

      <DemoSection id="o-mnie" tag="03 — O mnie" title="Kim jestem">
        Kilka zdań o podejściu do pracy, wartościach i tym, co napędza Cię
        każdego dnia.
      </DemoSection>

      <DemoSection id="kontakt" tag="04 — Kontakt" title="Porozmawiajmy">
        Formularz kontaktowy, adres e-mail i linki do social mediów mogą
        wylądować właśnie tutaj.
      </DemoSection>

      <footer className="border-t border-white/10 px-[8vw] py-16 text-sm text-neutral-400 backdrop-blur-sm">
        © 2026 Filip Wrona. Wszelkie prawa zastrzeżone.
      </footer>
    </main>
  );
}

function DemoSection({
  id,
  tag,
  title,
  children,
}: {
  id: string;
  tag: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative flex min-h-screen flex-col items-start justify-center px-[8vw]"
    >
      <span className="absolute right-[8vw] top-16 font-display text-[13px] tracking-[0.08em] text-neutral-400">
        {tag}
      </span>
      <h2 className="mb-5 font-display text-[clamp(32px,5vw,56px)] font-semibold tracking-tight text-white">
        {title}
      </h2>
      <p className="max-w-[560px] text-lg leading-relaxed text-neutral-300">
        {children}
      </p>
    </section>
  );
}
