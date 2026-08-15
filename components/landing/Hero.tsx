"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center px-[8vw] pt-28 pb-16"
    >
      {/* Główny układ 2-kolumnowy */}
      <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center justify-between gap-12 lg:flex-row lg:gap-16">
        {/* ================= LEWA KOLUMNA: TREŚĆ & CTAs ================= */}
        <div className="flex flex-1 flex-col items-start text-left">
          {/* Status Badge */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-display text-xs font-semibold tracking-wide text-emerald-300 uppercase">
              Dostępny do projektów
            </span>
          </div>

          {/* Nagłówek Imię & Nazwisko */}
          <h1 className="font-display text-[clamp(40px,5.5vw,76px)] font-bold leading-[1.02] tracking-tight text-white">
            Filip Wrona
          </h1>

          {/* Rola */}
          <p className="mt-2 font-display text-2xl font-bold sm:text-3xl">
            <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Fullstack Developer
            </span>
          </p>

          {/* Bio / Opis */}
          <p className="mt-5 max-w-[540px] text-base leading-relaxed text-neutral-300 sm:text-lg">
            Zamieniam złożone problemy w proste, szybkie i zachwycające
            wizualnie aplikacje webowe. Łączę inżynieryjne wykształcenie jako{" "}
            <strong className="text-white font-semibold">
              Technik Programista
            </strong>{" "}
            z ciągłym rozwojem na studiach na uczelni{" "}
            <strong className="text-violet-300 font-semibold">
              PJATK w Warszawie
            </strong>
            .
          </p>

          {/* Tagi Technologiczne / Tytuły */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-neutral-200 backdrop-blur-md transition-colors hover:border-violet-400/40">
              🎓 Student PJATK
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-neutral-200 backdrop-blur-md transition-colors hover:border-violet-400/40">
              💻 Technik Programista
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-neutral-200 backdrop-blur-md transition-colors hover:border-violet-400/40">
              ⚡ Next.js / React / Node
            </span>
          </div>

          {/* Przyciski CTA */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#kontakt"
              className="group relative inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-violet-300 via-violet-400 to-violet-500 px-7 py-3.5 font-display text-sm font-semibold text-neutral-950 no-underline shadow-[0_4px_20px_rgba(155,107,255,0.35)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(155,107,255,0.6)] hover:brightness-110 active:scale-95"
            >
              <span>Porozmawiajmy</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>

            <a
              href="/CV_Filip_Wrona.pdf"
              download="CV_Filip_Wrona.pdf"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-display text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-violet-400/40 hover:bg-white/10 hover:text-violet-200 active:scale-95"
            >
              <svg
                className="h-4 w-4 text-violet-300 transition-transform duration-300 group-hover:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              <span>Pobierz CV</span>
            </a>
          </div>
        </div>

        {/* ================= PRAWA KOLUMNA: KARTA ZDJĘCIA ================= */}
        <div className="relative flex flex-none items-center justify-center my-6 lg:my-0">
          {/* Subtelna poświata karty */}
          <div
            aria-hidden="true"
            className="absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-tr from-violet-600/20 via-purple-500/10 to-indigo-500/20 blur-2xl transition-all duration-700"
          />

          {/* Zewnętrzna Szklana Karta */}
          <div className="group relative h-[390px] w-[300px] sm:h-[450px] sm:w-[350px] rounded-[2.5rem] border border-white/15 bg-[#12111a]/60 p-3 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-violet-400/40 hover:shadow-[0_25px_60px_-10px_rgba(155,107,255,0.3)]">
            {/* Ramka ze Zdjęciem */}
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] ring-1 ring-white/10 bg-neutral-900">
              <img
                src="/filip.jpg"
                alt="Filip Wrona"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Subtelny gradient na dole zdjęcia */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c14]/90 via-transparent to-transparent opacity-60" />
            </div>

            {/* Pływająca Pigułka 1 — Górny Lewy Róg */}
            <div className="absolute -top-3 -left-3 z-30 rounded-2xl border border-white/20 bg-[#12111a]/90 px-4 py-2 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm">🎓</span>
                <span className="font-display text-xs font-bold text-white">
                  Student PJATK
                </span>
              </div>
            </div>

            {/* Pływająca Pigułka 2 — Górny Prawy Róg */}
            <div className="absolute top-10 -right-4 z-30 rounded-2xl border border-white/20 bg-[#12111a]/90 px-4 py-2 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:translate-x-1">
              <div className="flex items-center gap-2">
                <span className="text-sm">⚡</span>
                <span className="font-display text-xs font-bold text-violet-300">
                  Technik Programista
                </span>
              </div>
            </div>

            {/* Pływająca Pigułka 3 — Dół Środek */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap rounded-2xl border border-white/20 bg-[#12111a]/95 px-5 py-2.5 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:translate-y-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400"></span>
                </span>
                <span className="font-display text-xs font-bold tracking-wide text-white">
                  Fullstack Developer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
