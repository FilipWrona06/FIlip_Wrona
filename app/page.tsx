import Hero from "@/components/landing/Hero";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>

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

      <footer className="border-t border-white/10 px-[8vw] py-16 text-sm text-neutral-400">
        © 2026 Filip Wrona. Wszelkie prawa zastrzeżone.
      </footer>
    </>
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
      <span className="absolute right-[8vw] top-12 font-display text-[13px] tracking-[0.08em] text-neutral-400">
        {tag}
      </span>
      <h2 className="mb-5 font-display text-[clamp(32px,5vw,56px)] font-semibold tracking-tight">
        {title}
      </h2>
      <p className="max-w-140 text-lg leading-relaxed text-neutral-400">
        {children}
      </p>
    </section>
  );
}
