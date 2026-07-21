"use client";

import { useEffect, useMemo, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import Button from "../ui/Button";

type ScheduleItem = {
  day: string;
  time: string;
};

type Location = {
  id: string;
  name: string;
  area: string;
  mapUrl: string;
  schedule: ScheduleItem[];
};

type UpcomingClass = {
  locationId: string;
  locationName: string;
  area: string;
  mapUrl: string;
  day: string;
  time: string;
  startsAt: Date;
};

type MapButtonLocation = "next_class_card" | "location_card";

const locations: Location[] = [
  {
    id: "recoleta",
    name: "Recoleta",
    area: "CABA",
    mapUrl: "https://maps.app.goo.gl/DXEcZV9RE3mtUmKe7",
    schedule: [
      {
        day: "Lunes",
        time: "A convenir por la tarde",
      },
      {
        day: "Martes",
        time: "8:00 - 11:00",
      },
      {
        day: "Miércoles",
        time: "A convenir por la tarde",
      },
      {
        day: "Viernes",
        time: "A convenir por la tarde",
      },
      {
        day: "Sábado",
        time: "10:00 - 12:00",
      },
    ],
  },
  {
    id: "chacarita",
    name: "Chacarita",
    area: "CABA",
    mapUrl: "https://maps.app.goo.gl/YFif746urg8FEgaL7",
    schedule: [
      {
        day: "Martes",
        time: "14:00 - 16:00",
      },
      {
        day: "Jueves",
        time: "8:00 - 11:00",
      },
      {
        day: "Sábado",
        time: "13:00 - 15:00",
      },
    ],
  },
];

const dayToIndex: Record<string, number> = {
  Domingo: 0,
  Lunes: 1,
  Martes: 2,
  Miércoles: 3,
  Jueves: 4,
  Viernes: 5,
  Sábado: 6,
};

function trackMapClick({
  locationId,
  locationName,
  buttonLocation,
  buttonText,
}: {
  locationId: string;
  locationName: string;
  buttonLocation: MapButtonLocation;
  buttonText: string;
}) {
  sendGAEvent("event", "click_map", {
    location_id: locationId,
    location_name: locationName,
    button_location: buttonLocation,
    button_text: buttonText,
    destination: "google_maps",
  });
}

function getStartTime(time: string) {
  const [startTime] = time.split(" - ");
  const [hours, minutes] = startTime.split(":").map(Number);

  return {
    hours,
    minutes,
  };
}

function getNextClassDate(day: string, time: string, now: Date) {
  const targetDayIndex = dayToIndex[day];
  const currentDayIndex = now.getDay();

  const { hours, minutes } = getStartTime(time);

  let daysUntilClass = targetDayIndex - currentDayIndex;

  if (daysUntilClass < 0) {
    daysUntilClass += 7;
  }

  const classDate = new Date(now);

  classDate.setDate(now.getDate() + daysUntilClass);
  classDate.setHours(hours, minutes, 0, 0);

  if (classDate <= now) {
    classDate.setDate(classDate.getDate() + 7);
  }

  return classDate;
}

function getUpcomingClass(locationsList: Location[], now: Date) {
  const upcomingClasses: UpcomingClass[] = locationsList.flatMap((location) =>
    location.schedule.map((item) => ({
      locationId: location.id,
      locationName: location.name,
      area: location.area,
      mapUrl: location.mapUrl,
      day: item.day,
      time: item.time,
      startsAt: getNextClassDate(item.day, item.time, now),
    })),
  );

  return upcomingClasses.sort(
    (a, b) => a.startsAt.getTime() - b.startsAt.getTime(),
  )[0];
}

function formatTimeUntil(date: Date, now: Date) {
  const diffInMinutes = Math.ceil((date.getTime() - now.getTime()) / 1000 / 60);

  if (diffInMinutes <= 0) {
    return "Ahora";
  }

  if (diffInMinutes < 60) {
    return `En ${diffInMinutes} min`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `En ${diffInHours} hs`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays === 1) {
    return "Mañana";
  }

  return `En ${diffInDays} días`;
}

function NextClassCard() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => window.clearInterval(interval);
  }, []);

  const nextClass = useMemo(() => {
    return getUpcomingClass(locations, now);
  }, [now]);

  const timeUntil = formatTimeUntil(nextClass.startsAt, now);

  const handleMapClick = () => {
    trackMapClick({
      locationId: nextClass.locationId,
      locationName: nextClass.locationName,
      buttonLocation: "next_class_card",
      buttonText: "Ir a la clase",
    });
  };

  return (
    <article className="schedule-section__next-card">
      <div className="schedule-section__next-header">
        <div className="schedule-section__next-icon-wrapper">
          <Clock3 className="schedule-section__next-icon" aria-hidden="true" />
        </div>

        <p className="schedule-section__next-label">Próxima clase</p>
      </div>

      <div className="schedule-section__next-content">
        <p className="schedule-section__next-time">{timeUntil}</p>

        <div className="schedule-section__next-location">
          <MapPin
            className="schedule-section__next-location-icon"
            aria-hidden="true"
          />

          <p>
            {nextClass.locationName}, {nextClass.area}
          </p>
        </div>

        <p className="schedule-section__next-schedule">
          {nextClass.day} · {nextClass.time}
        </p>
      </div>

      <Button
        className="schedule-section__next-button"
        href={nextClass.mapUrl}
        ariaLabel={`Cómo llegar a la sede ${nextClass.locationName}`}
        target="_blank"
        onClick={handleMapClick}
      >
        Ir a la clase
        <ArrowRight
          className="schedule-section__button-icon"
          aria-hidden="true"
        />
      </Button>
    </article>
  );
}

export default function ScheduleSection() {
  return (
    <section className="schedule-section" id="horarios">
      <div className="schedule-section__container">
        <div className="schedule-section__header">
          <p className="schedule-section__eyebrow">
            Cada clase tiene una duración de 2 horas
          </p>

          <h2 className="schedule-section__title">Ubicación y horarios</h2>
        </div>

        <NextClassCard />

        <div className="schedule-section__grid">
          {locations.map((location) => {
            const handleMapClick = () => {
              trackMapClick({
                locationId: location.id,
                locationName: location.name,
                buttonLocation: "location_card",
                buttonText: "Cómo llegar",
              });
            };

            return (
              <article className="schedule-section__card" key={location.id}>
                <div className="schedule-section__card-header">
                  <div>
                    <p className="schedule-section__location-label">Sede</p>

                    <h3 className="schedule-section__location-name">
                      {location.name}
                    </h3>

                    <p className="schedule-section__location-area">
                      {location.area}
                    </p>
                  </div>

                  <div className="schedule-section__location-icon-wrapper">
                    <MapPin
                      className="schedule-section__location-icon"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="schedule-section__list">
                  {location.schedule.map((item) => (
                    <div
                      className="schedule-section__row"
                      key={`${location.id}-${item.day}`}
                    >
                      <p className="schedule-section__day">{item.day}</p>

                      <p className="schedule-section__time">{item.time}</p>
                    </div>
                  ))}
                </div>

                <Button
                  className="schedule-section__button"
                  href={location.mapUrl}
                  ariaLabel={`Cómo llegar a la sede ${location.name}`}
                  target="_blank"
                  onClick={handleMapClick}
                >
                  Cómo llegar
                  <ArrowRight
                    className="schedule-section__button-icon"
                    aria-hidden="true"
                  />
                </Button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
