"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

export type WhatsAppOption = {
  name: string;
  role: string;
  href: string;
};

export type WhatsAppLauncherProps = {
  options: readonly WhatsAppOption[];
};

export function WhatsAppLauncher({ options }: WhatsAppLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogId = useId();
  const dialogTitleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeLauncher = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() =>
      triggerRef.current?.focus({ preventScroll: true }),
      0,
    );
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      const firstOption = dialog?.querySelector<HTMLElement>(
        ".whatsapp-launcher__option",
      );
      const closeButton = dialog?.querySelector<HTMLElement>(
        ".whatsapp-launcher__close",
      );
      (firstOption ?? closeButton)?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLauncher();
        return;
      }

      if (event.key !== "Tab" || !dialog) {
        return;
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
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
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLauncher, isOpen]);

  return (
    <div className={`whatsapp-launcher${isOpen ? " is-open" : ""}`}>
      {isOpen ? (
        <div className="whatsapp-launcher__layer">
          <button
            className="whatsapp-launcher__backdrop"
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={closeLauncher}
          />
          <div
            ref={dialogRef}
            id={dialogId}
            className="whatsapp-launcher__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
          >
            <div className="whatsapp-launcher__header">
              <div>
                <span className="whatsapp-launcher__eyebrow">WhatsApp</span>
                <h2 id={dialogTitleId}>Com quem você quer conversar?</h2>
              </div>
              <button
                className="whatsapp-launcher__close"
                type="button"
                aria-label="Fechar opções de contato"
                onClick={closeLauncher}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="whatsapp-launcher__options">
              {options.map(({ name, role, href }) => (
                <a
                  key={`${name}-${href}`}
                  className="whatsapp-launcher__option"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeLauncher}
                >
                  <span>{role}</span>
                  <strong>{name}</strong>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <button
        ref={triggerRef}
        className="whatsapp-launcher__trigger"
        type="button"
        aria-label="Abrir opções de contato pelo WhatsApp"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
        disabled={options.length === 0}
        onClick={() => setIsOpen(true)}
      >
        <svg
          viewBox="0 0 32 32"
          width="28"
          height="28"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M16 3.2A12.8 12.8 0 0 0 5.1 22.7L3.5 28.5l6-1.6A12.8 12.8 0 1 0 16 3.2Zm0 2.3a10.5 10.5 0 1 1-5.4 19.5l-.4-.2-3.5.9.9-3.4-.3-.5A10.5 10.5 0 0 1 16 5.5Z"
          />
          <path
            fill="currentColor"
            d="M12.4 10.4c-.3-.7-.7-.7-1-.7h-.8c-.3 0-.8.1-1.2.6-.4.5-1.5 1.5-1.5 3.7s1.6 4.3 1.8 4.6c.2.3 3.1 4.8 7.6 6.5 3.7 1.5 4.5 1.2 5.3 1.1.8-.1 2.6-1.1 3-2.1.4-1 .4-1.9.3-2.1-.1-.2-.4-.3-.8-.5l-2.9-1.4c-.4-.2-.7-.3-1 .3-.3.4-1.1 1.4-1.4 1.7-.3.3-.5.3-1 .1-.4-.2-1.9-.7-3.6-2.3-1.3-1.2-2.2-2.7-2.5-3.1-.3-.4 0-.7.2-.9l.7-.8c.2-.3.3-.5.5-.8.2-.3.1-.6 0-.8l-1.3-3.1Z"
          />
        </svg>
      </button>
    </div>
  );
}
