import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <section
        id="hero"
        className="relative flex min-h-screen flex-col items-start justify-center px-[8vw]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 20%, rgba(155,107,255,0.16), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(155,107,255,0.08), transparent 60%)",
        }}
      >
        <p className="mb-4 font-display text-[13px] uppercase tracking-[0.15em] text-violet-300">
          Frontend Developer
        </p>
        <h1 className="max-w-225 font-display text-[clamp(40px,7vw,84px)] font-bold leading-[1.02] tracking-tight">
          Buduję interfejsy,
          <br />
          <span className="bg-linear-to-br from-white to-violet-300 bg-clip-text text-transparent">
            które chce się dotykać.
          </span>
        </h1>
        <p className="mt-6 max-w-140 text-lg leading-relaxed text-neutral-400">
          Przewiń stronę, żeby zobaczyć jak navbar wypełnia się kolorem wraz z
          postępem scrolla.
        </p>
      </section>

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
