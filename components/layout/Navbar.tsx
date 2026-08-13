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

  const pillRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const navPillInnerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  /* ---------- scroll: pill state + eased progress-fill border ---------- */

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
        requestAnimationFrame(computeScroll);
        ticking = true;
      }
    }

    computeScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let raf: number;
    function animate() {
      currentProgress.current +=
        (targetProgress.current - currentProgress.current) * 0.12;
      if (Math.abs(targetProgress.current - currentProgress.current) < 0.0005) {
        currentProgress.current = targetProgress.current;
      }
      pillRef.current?.style.setProperty(
        "--progress",
        currentProgress.current.toFixed(4),
      );
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

  // keep indicator glued to the active link whenever it changes (and we're not hovering)
  useEffect(() => {
    if (!navLinksRef.current?.matches(":hover")) {
      moveIndicatorTo(activeSection ? linkRefs.current[activeSection] : null);
    }
  }, [activeSection]);

  /* ---------- magnetic CTA, resets the instant the cursor leaves the pill ---------- */

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
    <div className="pointer-events-none fixed top-0 left-0 z-[1000] flex w-full justify-center">
      <div
        className={`pointer-events-auto relative transition-[width,margin-top] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? "mt-4 w-[92%] max-w-[880px]" : "mt-0 w-full"
        }`}
        onMouseMove={handlePillMouseMove}
        onMouseLeave={handlePillMouseLeave}
      >
        {/* ring layer — separate absolutely-positioned element, peeks out around the glass card via negative inset */}
        <div
          ref={pillRef}
          aria-hidden="true"
          className={`pointer-events-none absolute z-0 transition-[inset,opacity,border-radius] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? "-inset-[1.5px] rounded-full opacity-100"
              : "inset-0 rounded-none opacity-0"
          }`}
          style={{
            background: `conic-gradient(from -90deg, #9b6bff calc(var(--progress, 0) * 360deg), rgba(255,255,255,0.28) calc(var(--progress, 0) * 360deg))`,
          }}
        />

        <div
          ref={navPillInnerRef}
          className={`relative z-[1] flex items-center justify-between gap-6 transition-[background,backdrop-filter,padding,border-radius,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? "rounded-full bg-[#100f16]/55 px-6 py-3 backdrop-blur-xl backdrop-saturate-150 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
              : "rounded-none bg-transparent px-7 py-3.5 shadow-none"
          }`}
        >
          {/* ---- logo ---- */}
          <a
            href="#hero"
            className="group flex flex-none flex-col whitespace-nowrap font-display text-[15px] font-semibold leading-[1.05] tracking-tight text-white transition-transform duration-300 hover:-translate-y-px"
          >
            <span className="transition-[text-shadow,color] duration-300 group-hover:text-white group-hover:[text-shadow:0_0_18px_rgba(155,107,255,0.55),0_0_40px_rgba(155,107,255,0.25)]">
              Filip
            </span>
            <span className="text-neutral-400 transition-colors duration-300 group-hover:text-violet-300">
              Wrona
            </span>
          </a>

          {/* ---- center links ---- */}
          <ul
            ref={navLinksRef}
            onMouseLeave={handleMouseLeaveLinks}
            className="relative flex list-none gap-1.5"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.target}
                ref={(el) => {
                  linkRefs.current[link.target] = el;
                }}
                href={`#${link.target}`}
                onMouseEnter={(e) => moveIndicatorTo(e.currentTarget)}
                className={`relative z-[2] inline-block whitespace-nowrap rounded-full px-4 py-2 font-display text-sm font-medium transition-colors duration-300 ${
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
              className={`absolute top-0 z-[1] h-full rounded-full bg-gradient-to-b from-violet-400/35 to-violet-400/15 shadow-[0_0_20px_rgba(155,107,255,0.35),inset_0_0_0_1px_rgba(255,255,255,0.08)] transition-[left,width,opacity] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                indicatorVisible ? "opacity-100" : "opacity-0"
              }`}
            />
          </ul>

          {/* ---- CTA ---- */}
          <a
            ref={ctaRef}
            href="#kontakt"
            className="relative inline-block flex-none whitespace-nowrap rounded-full bg-gradient-to-br from-violet-300 to-violet-500 px-[22px] py-[11px] font-display text-sm font-semibold text-neutral-950 no-underline shadow-[0_4px_14px_rgba(155,107,255,0.25)] transition-[box-shadow,filter] duration-300 ease-out hover:shadow-[0_8px_28px_rgba(155,107,255,0.55),0_0_40px_rgba(155,107,255,0.3)] hover:brightness-[1.08] active:brightness-95"
            style={{
              transition:
                "box-shadow .35s ease, filter .3s ease, transform .25s cubic-bezier(.2,.9,.3,1.2)",
            }}
          >
            Skontaktuj się
          </a>
        </div>
      </div>
    </div>
  );
}
