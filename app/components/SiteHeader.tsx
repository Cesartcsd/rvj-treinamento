"use client";

import Image from "next/image";
import {
  type MouseEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export type NavItem = {
  id: string;
  label: string;
};

export type SiteHeaderProps = {
  navItems: readonly NavItem[];
  commercialCta: {
    label: string;
    href: string;
  };
};

const HEADER_SCROLL_THRESHOLD = 48;

export function SiteHeader({ navItems, commercialCta }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(
    () => navItems[0]?.id ?? "",
  );
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    window.requestAnimationFrame(() =>
      menuButtonRef.current?.focus({ preventScroll: true }),
    );
  }, []);

  const navigateFromMenu = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      event.preventDefault();
      setIsMenuOpen(false);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      setIsMenuOpen(false);

      window.setTimeout(() => {
        const section = document.getElementById(sectionId);
        const headingId = section?.getAttribute("aria-labelledby");

        window.history.pushState(null, "", `#${sectionId}`);
        if (headingId) {
          document.getElementById(headingId)?.focus({ preventScroll: true });
        }
        section?.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }, 0);
    },
    [],
  );

  useEffect(() => {
    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > HEADER_SCROLL_THRESHOLD);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [navItems]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const panel = menuPanelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.requestAnimationFrame(() => {
      panel?.querySelector<HTMLElement>("a[href], button:not([disabled])")?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !panel) {
        return;
      }

      const focusableElements = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, isMenuOpen]);

  const renderNavLinks = (className: string, ariaLabel: string) => (
    <nav className={className} aria-label={ariaLabel}>
      {navItems.map(({ id, label }) => (
        <a
          key={id}
          className={activeSection === id ? "is-active" : undefined}
          href={`#${id}`}
          aria-current={activeSection === id ? "location" : undefined}
          onClick={
            isMenuOpen
              ? (event) => navigateFromMenu(event, id)
              : undefined
          }
        >
          {label}
        </a>
      ))}
    </nav>
  );

  return (
    <header
      className={`site-header${isScrolled ? " is-scrolled" : ""}${
        isMenuOpen ? " is-menu-open" : ""
      }`}
    >
      <div className="site-header__inner">
        <a className="brand" href="#inicio" aria-label="RVJ — início">
          <Image
            src="/assets/rvj-logo.png"
            alt="RVJ Treinamentos e Consultoria"
            width={552}
            height={150}
            priority
            unoptimized
          />
        </a>

        {renderNavLinks("desktop-nav", "Navegação principal")}

        <a
          className="header-cta"
          href={commercialCta.href}
          target="_blank"
          rel="noreferrer"
        >
          {commercialCta.label}
        </a>

        <button
          ref={menuButtonRef}
          className="mobile-menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          onClick={() => (isMenuOpen ? closeMenu() : setIsMenuOpen(true))}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {isMenuOpen ? (
        <div className="mobile-menu-layer">
          <button
            className="mobile-menu-backdrop"
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={closeMenu}
          />
          <div
            ref={menuPanelRef}
            id={menuId}
            className="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
          >
            <button
              className="mobile-menu-close"
              type="button"
              aria-label="Fechar menu"
              onClick={closeMenu}
            >
              <span aria-hidden="true">×</span>
            </button>
            {renderNavLinks("mobile-nav", "Navegação móvel")}
            <a
              className="mobile-menu-cta"
              href={commercialCta.href}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              {commercialCta.label}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
