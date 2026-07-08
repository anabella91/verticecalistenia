import Link from "next/link";
import Button from "@/components/ui/Button";

const WHATSAPP_NUMBER = "5491141761329";
const WHATSAPP_MESSAGE =
  "Hola, quiero reservar una clase de prueba gratis para entrenar calistenia";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__logo" aria-label="Ir al inicio">
          Vértice Calistenia
        </Link>
        <Button href={WHATSAPP_URL} className="header__button">
          Clase de prueba gratis
        </Button>
      </div>
    </header>
  );
}
