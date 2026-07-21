"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { trackMetaEvent } from "@/lib/metaPixel";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "next/image";

const WHATSAPP_NUMBER = "5491141761329";

const WHATSAPP_MESSAGE =
  "Hola, quiero reservar una clase de prueba para entrenar calistenia";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export default function Header() {
  const handleWhatsAppClick = () => {
    sendGAEvent("event", "click_whatsapp", {
      button_location: "header",
      button_text: "Clase de prueba",
      destination: "whatsapp",
    });

    trackMetaEvent("Contact", {
      content_name: "Clase de prueba",
      content_category: "whatsapp",
      button_location: "header",
    });
  };
  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__logo" aria-label="Ir al inicio">
          <Image
            src="/images/logo-header.webp"
            alt="Vértice Calistenia"
            width={640}
            height={340}
            priority
            className="header__logo"
          />
        </Link>
        <Button
          href={WHATSAPP_URL}
          className="header__button"
          target="_blank"
          onClick={handleWhatsAppClick}
        >
          Agendar clase de prueba
        </Button>
      </div>
    </header>
  );
}
