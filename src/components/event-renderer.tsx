import { CalendarEventType, useEventStore } from "@/lib/store";
import dayjs from "dayjs";
import React from "react";
import isBetween from "dayjs/plugin/isBetween";
import minMax from "dayjs/plugin/minMax";

dayjs.extend(minMax);
dayjs.extend(isBetween);

type EventRendererProps = {
  date: dayjs.Dayjs;
  view: "month" | "week" | "day";
  events: CalendarEventType[];
};

const eventColors = [
  "bg-blue-600", "bg-green-600", "bg-red-600", "bg-yellow-600", "bg-purple-600"
];

export function EventRenderer({ date, view, events }: EventRendererProps) {
  const { openEventSummary } = useEventStore();

  const filteredEvents = events.filter((event) => {
    if (view === "month") {
      return date.isBetween(event.dateStart, event.dateEnd, "day", "[]");
    }
    return false;
  });

  return (
    <div className="relative w-full h-full">
      {filteredEvents.map((event, index) => {
        const isStartOfEvent = date.isSame(event.dateStart, "day");
        const startOfWeek = date.startOf("week");
        const endOfWeek = date.endOf("week");
        const eventEndWithinWeek = dayjs.min(event.dateEnd, endOfWeek);
        const daysInEventWeek = eventEndWithinWeek.diff(date, "day") + 1;

        const widthPercentage = Math.min(daysInEventWeek, 7) * 100;
        const colorClass = eventColors[index % eventColors.length];

        return (
          <div
            key={event.id}
            onClick={(e) => {
              e.stopPropagation();
              openEventSummary(event);
            }}
            className={`absolute left-0 cursor-pointer rounded-md ${colorClass} text-white flex items-center`}
            style={{
              top: `${index * 30}px`, // Space out overlapping events vertically
              height: "24px",
              width: `calc(${widthPercentage}% - 2px)`, // Responsive width with slight margin
              padding: "0 8px",
              fontSize: "0.75rem",
              overflow: "hidden",
              whiteSpace: "nowrap",
              maxWidth: "100%",
              transition: "background-color 0.2s ease",
            }}
          >
            {isStartOfEvent && (
              <span className="truncate" style={{ whiteSpace: "nowrap" }}>
                {event.title}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
