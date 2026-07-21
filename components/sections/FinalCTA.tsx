"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { trackMetaEvent } from "@/lib/metaPixel";

const INSTAGRAM_USERNAME = "verticecalistenia";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;

const WHATSAPP_NUMBER = "5491141761329";
const WHATSAPP_MESSAGE =
  "Hola, quiero reservar una clase de prueba para entrenar calistenia";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />

      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export default function FinalCTA() {
  const handleWhatsAppClick = () => {
    // Google Analytics
    sendGAEvent("event", "click_whatsapp", {
      button_location: "final_cta",
      button_text: "Reservá clase de prueba",
      destination: "whatsapp",
    });

    // Meta Pixel
    trackMetaEvent("Contact", {
      content_name: "Reserva de clase de prueba",
      content_category: "whatsapp",
      button_location: "final_cta",
    });
  };

  return (
    <section className="final-cta" id="contacto">
      <div className="final-cta__container">
        <div className="final-cta__content">
          <h1 className="final-cta__title">Tu progreso empieza hoy</h1>

          <p className="final-cta__subtitle">Compartí el camino</p>

          <div className="final-cta__actions">
            <Button
              href={WHATSAPP_URL}
              target="_blank"
              onClick={handleWhatsAppClick}
              className="final-cta__button"
              ariaLabel="Reservar una clase de prueba gratis por WhatsApp"
            >
              Agendar clase de prueba
              <ArrowRight
                className="final-cta__button-icon"
                aria-hidden="true"
              />
            </Button>
            <div className="footer_actions">
              <a
                className="final-cta__instagram"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver Instagram de ${INSTAGRAM_USERNAME}`}
              >
                <InstagramIcon className="final-cta__instagram-icon" />

                <span>@{INSTAGRAM_USERNAME}</span>
              </a>
              <span className="signature">Sitio creado por AnabellaDR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
