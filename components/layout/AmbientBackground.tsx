"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const blob3 = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Główna oś czasu zsynchronizowana ze scrollem całej strony
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2, // Płynne opóźnienie reakcji na ruch kółka
        },
      });

      // 1. HERO -> PORTFOLIO (Przejście w styl z filmu 00:07 - neony, fuksja, turkus)
      tl.to(
        blob1.current,
        {
          x: "35vw",
          y: "25vh",
          scale: 1.5,
          backgroundColor: "#d946ef", // Fuksja / Magenta
          duration: 2,
        },
        0,
      )
        .to(
          blob2.current,
          {
            x: "-30vw",
            y: "20vh",
            scale: 1.6,
            backgroundColor: "#06b6d4", // Cyan / Turkus
            duration: 2,
          },
          0,
        )
        .to(
          blob3.current,
          {
            x: "15vw",
            y: "-30vh",
            scale: 1.3,
            backgroundColor: "#8b5cf6", // Fiolet
            duration: 2,
          },
          0,
        );

      // 2. PORTFOLIO -> DOŚWIADCZENIE (Szmaragd & Głęboki błękit)
      tl.to(
        blob1.current,
        {
          x: "-25vw",
          y: "60vh",
          scale: 1.2,
          backgroundColor: "#10b981", // Szmaragdowy
          duration: 2,
        },
        2,
      )
        .to(
          blob2.current,
          {
            x: "30vw",
            y: "45vh",
            scale: 1.4,
            backgroundColor: "#3b82f6", // Czysty błękit
            duration: 2,
          },
          2,
        )
        .to(
          blob3.current,
          {
            x: "-10vw",
            y: "30vh",
            scale: 1.6,
            backgroundColor: "#6366f1", // Indygo
            duration: 2,
          },
          2,
        );

      // 3. DOŚWIADCZENIE -> O MNIE (Ciepły bursztyn & Róża)
      tl.to(
        blob1.current,
        {
          x: "20vw",
          y: "90vh",
          scale: 1.6,
          backgroundColor: "#f59e0b", // Amber / Złoto
          duration: 2,
        },
        4,
      )
        .to(
          blob2.current,
          {
            x: "-20vw",
            y: "80vh",
            scale: 1.3,
            backgroundColor: "#f43f5e", // Rose
            duration: 2,
          },
          4,
        )
        .to(
          blob3.current,
          {
            x: "0vw",
            y: "70vh",
            scale: 1.5,
            backgroundColor: "#7c3aed", // Głęboki fiolet
            duration: 2,
          },
          4,
        );

      // 4. O MNIE -> KONTAKT (Elektryczny fiolet & neonowy cyan)
      tl.to(
        blob1.current,
        {
          x: "0vw",
          y: "110vh",
          scale: 1.8,
          backgroundColor: "#8b5cf6",
          duration: 2,
        },
        6,
      )
        .to(
          blob2.current,
          {
            x: "-15vw",
            y: "105vh",
            scale: 1.4,
            backgroundColor: "#06b6d4",
            duration: 2,
          },
          6,
        )
        .to(
          blob3.current,
          {
            x: "20vw",
            y: "115vh",
            scale: 1.2,
            backgroundColor: "#4f46e5",
            duration: 2,
          },
          6,
        );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden bg-[#07090e] pointer-events-none"
    >
      {/* 1. PLAMY ŚWIATŁA (BLOBS) */}
      <div className="absolute inset-0 filter blur-[110px] md:blur-[150px] opacity-70">
        {/* Plama 1 - Główna (początkowo ciemny fiolet / granat) */}
        <div
          ref={blob1}
          className="absolute top-[12%] right-[18%] w-[480px] h-[480px] rounded-full bg-[#1e1b4b] mix-blend-screen will-change-transform"
        />

        {/* Plama 2 - Akcentowa lewa (początkowo błękit indygo) */}
        <div
          ref={blob2}
          className="absolute top-[30%] left-[15%] w-[420px] h-[420px] rounded-full bg-[#312e81] mix-blend-screen will-change-transform"
        />

        {/* Plama 3 - Wypełnienie dolne */}
        <div
          ref={blob3}
          className="absolute bottom-[15%] right-[30%] w-[520px] h-[520px] rounded-full bg-[#0f172a] mix-blend-screen will-change-transform"
        />
      </div>

      {/* 2. WARSTWA ZIARNA (FILM NOISE / GRAIN) */}
      <svg
        className="fixed inset-0 w-full h-full opacity-35 mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="ambientNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#ambientNoise)" />
      </svg>
    </div>
  );
}
