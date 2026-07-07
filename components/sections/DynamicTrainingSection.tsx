import {
  Flame,
  Dumbbell,
  Move,
  Target,
  Sparkles,
  HeartPulse,
} from "lucide-react";

const dynamicItems = [
  {
    icon: Flame,
    title: "Preparamos el cuerpo",
    description:
      "Iniciamos con una entrada en calor progresiva para activar articulaciones, músculos, respiración y control corporal",
  },
  {
    icon: Move,
    title: "Activamos el foco del día",
    description:
      "Trabajamos movilidad y activación específica según el grupo muscular o patrón principal de la clase",
  },
  {
    icon: Target,
    title: "Bloque técnico",
    description:
      "Revisamos postura, alineación y control del movimiento para entrenar con mayor seguridad y precisión",
  },
  {
    icon: Dumbbell,
    title: "Construimos fuerza",
    description:
      "Aplicamos progresiones adaptadas al nivel de cada persona para mejorar fuerza, estabilidad y control",
  },
  {
    icon: Sparkles,
    title: "Desarrollamos habilidades",
    description:
      "Integramos desafíos técnicos para que el progreso sea visible, motivador y medible clase a clase.",
  },
  {
    icon: HeartPulse,
    title: "Recuperamos y registramos",
    description:
      "Cerramos con movilidad suave y registro de sensaciones para acompañar la recuperación",
  },
];

export default function DynamicTrainingSection() {
  return (
    <section className="dynamic-section">
      <div className="dynamic-section__container">
        <div className="dynamic-section__header">
          <h2 className="dynamic-section__title">
            Así entrenamos: técnica, fuerza y progresión en cada clase
          </h2>
        </div>

        <div className="dynamic-section__grid">
          {dynamicItems.map((item) => {
            const Icon = item.icon;

            return (
              <article className="dynamic-section__item" key={item.title}>
                <div className="dynamic-section__item-header">
                  <div className="dynamic-section__icon-wrapper">
                    <Icon
                      className="dynamic-section__icon"
                      aria-hidden="true"
                    />
                  </div>

                  <h4 className="dynamic-section__item-title">{item.title}</h4>
                </div>

                <p className="dynamic-section__item-description">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
