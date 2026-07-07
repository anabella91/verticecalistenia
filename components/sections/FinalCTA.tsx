import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

const INSTAGRAM_USERNAME = "verticecalistenia";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;

const WHATSAPP_NUMBER = "5491141761329";
const WHATSAPP_MESSAGE = "Hola, quiero reservar una clase de prueba gratis";

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
  return (
    <section className="final-cta" id="contacto">
      <div className="final-cta__container">
        <div className="final-cta__content">
          <h1 className="final-cta__title">Tu progreso empieza hoy</h1>

          <p className="final-cta__subtitle">Compartí el camino</p>

          <div className="final-cta__actions">
            <Button href={WHATSAPP_URL} className="final-cta__button">
              Reservá clase de prueba gratis
              <ArrowRight
                className="final-cta__button-icon"
                aria-hidden="true"
              />
            </Button>

            <a
              className="final-cta__instagram"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={`Ver Instagram de ${INSTAGRAM_USERNAME}`}
            >
              <InstagramIcon className="final-cta__instagram-icon" />@
              {INSTAGRAM_USERNAME}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
