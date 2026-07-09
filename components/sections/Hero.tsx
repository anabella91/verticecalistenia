import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

const WHATSAPP_NUMBER = "5491141761329";
const WHATSAPP_MESSAGE = "Hola, quiero reservar una clase de prueba gratis";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export default function Hero() {
  return (
    <section className="hero">
      <Image
        src="/images/hero-calistenia.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero__background"
        aria-hidden="true"
      />

      <div className="hero__overlay" />

      <div className="hero__container">
        <p className="hero__eyebrow">Clases de calistenia</p>
        <div className="hero__content">
          <h1 className="hero__title">Ganá fuerza, movilidad y control</h1>

          <h2 className="hero__subtitle">
            Empezá calistenia desde cero con un entrenamiento pensado para vos
          </h2>

          <div className="hero__actions">
            <Button href={WHATSAPP_URL} className="hero__button">
              Reservar clase de prueba gratis
              <ArrowRight className="hero__button-icon" aria-hidden="true" />
            </Button>
          </div>

          <p className="hero__details">
            Sin experiencia previa • Todos los niveles • Grupos reducidos
          </p>
        </div>
      </div>
    </section>
  );
}
