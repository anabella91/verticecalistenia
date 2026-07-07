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
      "Cada movimiento se ajusta a tu nivel para que puedas avanzar con seguridad sin frustrarte",
  },
  {
    icon: BadgeCheck,
    title: "Corrección técnica",
    description:
      "Aprendés a moverte mejor construyendo una base sólida de fuerza y control mejorando tu rendimiento",
  },
  {
    icon: TrendingUp,
    title: "Progresiones personalizadas",
    description:
      "Trabajás con objetivos claros y un plan de entrenamiento que se adapta a vos y a tu evolución",
  },
];

export default function TrainingSection() {
  return (
    <section className="training-section">
      <div className="training-section__container">
        <div className="training-section__header">
          <h2 className="training-section__title">
            Entrená con un método que se adapta a vos
          </h2>
        </div>

        <div className="training-section__grid">
          {sectionCards.map((card) => {
            const Icon = card.icon;

            return (
              <article className="training-section__card" key={card.title}>
                <div className="training-section__card-header">
                  <div className="training-section__icon-wrapper">
                    <Icon
                      className="training-section__icon"
                      aria-hidden="true"
                    />
                  </div>

                  <h4 className="training-section__card-title">{card.title}</h4>
                </div>

                <p className="training-section__card-description">
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
