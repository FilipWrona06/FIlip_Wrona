"use client";

import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Portfolio", target: "portfolio" },
  { label: "Doświadczenie", target: "doswiadczenie" },
  { label: "O mnie", target: "o-mnie" },
  { label: "Kontakt", target: "kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [indicatorVisible, setIndicatorVisible] = useState(false);

  const svgRectRef = useRef<SVGRectElement>(null);
  const navLinksRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const navPillInnerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  /* ---------- scroll calculation ---------- */

  useEffect(() => {
    function computeScroll() {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress.current =
        max > 0 ? Math.min(Math.max(scrollTop / max, 0), 1) : 0;
      setScrolled(scrollTop > 40);
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          computeScroll();
          ticking = false;
        });
        ticking = true;
      }
    }

    computeScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", computeScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", computeScroll);
    };
  }, []);

  /* ---------- RAF loop for SVG stroke offset ---------- */

  useEffect(() => {
    let raf: number;
    function animate() {
      currentProgress.current +=
        (targetProgress.current - currentProgress.current) * 0.12;

      if (Math.abs(targetProgress.current - currentProgress.current) < 0.0001) {
        currentProgress.current = targetProgress.current;
      }

      if (svgRectRef.current) {
        const offset = (100 * (1 - currentProgress.current)).toFixed(2);
        svgRectRef.current.style.strokeDashoffset = offset;
      }

      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ---------- sliding underline ---------- */

  function moveIndicatorTo(el: HTMLAnchorElement | null | undefined) {
    if (!el || !navLinksRef.current || !indicatorRef.current) return;
    const linkRect = el.getBoundingClientRect();
    const parentRect = navLinksRef.current.getBoundingClientRect();
    indicatorRef.current.style.left = `${linkRect.left - parentRect.left}px`;
    indicatorRef.current.style.width = `${linkRect.width}px`;
    setIndicatorVisible(true);
  }

  function handleMouseLeaveLinks() {
    const active = activeSection ? linkRefs.current[activeSection] : null;
    if (active) {
      moveIndicatorTo(active);
    } else {
      setIndicatorVisible(false);
    }
  }

  /* ---------- active section tracking ---------- */

  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.getElementById(l.target),
    ).filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!navLinksRef.current?.matches(":hover")) {
      moveIndicatorTo(activeSection ? linkRefs.current[activeSection] : null);
    }
  }, [activeSection]);

  /* ---------- magnetic CTA ---------- */

  function handlePillMouseMove(e: React.MouseEvent) {
    const btn = ctaRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const radius = Math.max(rect.width, rect.height) / 2 + 60;

    btn.style.transform =
      dist < radius
        ? `translate(${dx * 0.35}px, ${dy * 0.35 - 3}px)`
        : "translate(0px, 0px)";
  }

  function handlePillMouseLeave() {
    if (ctaRef.current) ctaRef.current.style.transform = "translate(0px, 0px)";
  }

  return (
    <div className="pointer-events-none fixed top-0 left-0 z-1000 flex w-full justify-center">
      <div
        className={`pointer-events-auto relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "mt-4 w-[92%] max-w-220"
            : "mt-0 w-full max-w-5xl px-6 sm:px-8"
        }`}
        onMouseMove={handlePillMouseMove}
        onMouseLeave={handlePillMouseLeave}
      >
        {/* Główny kontener navbaru */}
        <div
          ref={navPillInnerRef}
          className={`relative z-1 flex items-center justify-between gap-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? "rounded-full bg-[#100f16]/85 px-6 py-3 backdrop-blur-xl backdrop-saturate-150 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
              : "rounded-full bg-transparent px-2 py-7 shadow-none backdrop-blur-none"
          }`}
        >
          {/* ---- logo z efektem unoszenia i aury świetlnej ---- */}
          <a
            href="#hero"
            className="group relative flex flex-none flex-col whitespace-nowrap font-display text-[16px] font-semibold leading-[1.1] tracking-tight text-white transition-transform duration-300 ease-out hover:-translate-y-1"
          >
            {/* Tło podświetlenia (Ambient Aura) rozwijające się przy hoverze */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-4 -inset-y-3 z-0 rounded-full bg-violet-500/0 blur-xl transition-all duration-500 ease-out group-hover:bg-violet-500/35 group-hover:blur-2xl group-hover:scale-125"
            />

            <span className="relative z-1 transition-[text-shadow,color,filter] duration-300 group-hover:text-white group-hover:[text-shadow:0_0_20px_rgba(155,107,255,0.8),0_0_40px_rgba(155,107,255,0.4)] group-hover:drop-shadow-[0_4px_12px_rgba(155,107,255,0.6)]">
              Filip
            </span>
            <span className="relative z-1 text-neutral-400 transition-colors duration-300 group-hover:text-violet-200">
              Wrona
            </span>
          </a>

          {/* ---- center links ---- */}
          <ul
            ref={navLinksRef}
            onMouseLeave={handleMouseLeaveLinks}
            className="relative flex list-none gap-2"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.target}
                ref={(el) => {
                  linkRefs.current[link.target] = el;
                }}
                href={`#${link.target}`}
                onMouseEnter={(e) => moveIndicatorTo(e.currentTarget)}
                className={`relative z-2 inline-block whitespace-nowrap rounded-full px-4.5 py-2 font-display text-[14.5px] font-medium transition-colors duration-300 ${
                  activeSection === link.target
                    ? "text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <span
              ref={indicatorRef}
              className={`absolute top-0 z-1 h-full rounded-full bg-linear-to-b from-violet-400/35 to-violet-400/15 shadow-[0_0_20px_rgba(155,107,255,0.35),inset_0_0_0_1px_rgba(255,255,255,0.08)] transition-[left,width,opacity] duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                indicatorVisible ? "opacity-100" : "opacity-0"
              }`}
            />
          </ul>

          {/* ---- CTA ---- */}
          <a
            ref={ctaRef}
            href="#kontakt"
            className="relative inline-block flex-none whitespace-nowrap rounded-full bg-linear-to-br from-violet-300 to-violet-500 px-6 py-2.75 font-display text-[14.5px] font-semibold text-neutral-950 no-underline shadow-[0_4px_14px_rgba(155,107,255,0.25)] transition-[box-shadow,filter] duration-300 ease-out hover:shadow-[0_8px_28px_rgba(155,107,255,0.55),0_0_40px_rgba(155,107,255,0.3)] hover:brightness-[1.08] active:brightness-95"
            style={{
              transition:
                "box-shadow .35s ease, filter .3s ease, transform .25s cubic-bezier(.2,.9,.3,1.2)",
            }}
          >
            Skontaktuj się
          </a>
        </div>

        {/* Warstwa obramówki SVG Path (dla pigułki po scrollu) */}
        <svg
          className={`pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible transition-opacity duration-500 ${
            scrolled
              ? "opacity-100 delay-300"
              : "opacity-0 delay-0 pointer-events-none"
          }`}
        >
          <defs>
            <linearGradient
              id="pill-stroke-grad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#9b6bff" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>

          {/* Szary tor pod spodem (2px) */}
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="24"
            fill="none"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="2"
          />

          {/* Fioletowy pasek postępu */}
          <rect
            ref={svgRectRef}
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="24"
            pathLength="100"
            fill="none"
            stroke="url(#pill-stroke-grad)"
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset="100"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
