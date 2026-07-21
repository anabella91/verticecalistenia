import { UsersRound, Route, BadgeCheck, TrendingUp } from "lucide-react";

const sectionCards = [
  {
    icon: UsersRound,
    title: "Grupos reducidos",
    description:
      "Entrenás al aire libre con atención personalizada y seguimiento durante la clase",
  },
  {
    icon: Route,
    title: "Ejercicios adaptados",
    description:
      "Cada movimiento se ajusta a tu nivel para que puedas avanzar con seguridad",
  },
  {
    icon: BadgeCheck,
    title: "Corrección técnica",
    description:
      "Aprendés a moverte mejor construyendo una base sólida de fuerza, técnica y control",
  },
  {
    icon: TrendingUp,
    title: "Progresiones personalizadas",
    description:
      "Trabajás con objetivos claros y un entrenamiento adaptado a tu progreso",
  },
];

export default function TrainingSection() {
  return (
    <section className="training-section">
      <div className="training-section__header">
        <h2 className="training-section__title">
          Entrená con un método que se adapta a vos
        </h2>
      </div>

      <video
        className="training-section__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/training-video-poster.png"
      >
        <source src="/video/training-section.mp4" type="video/mp4" />
        Tu navegador no puede reproducir este video.
      </video>

      <div className="training-section__overlay" aria-hidden="true" />

      <div className="training-section__grid">
        {sectionCards.map((card) => {
          const Icon = card.icon;

          return (
            <article className="training-section__card" key={card.title}>
              <div className="training-section__card-header">
                <div className="training-section__icon-wrapper">
                  <Icon className="training-section__icon" aria-hidden="true" />
                </div>

                <h3 className="training-section__card-title">{card.title}</h3>
              </div>

              <p className="training-section__card-description">
                {card.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
