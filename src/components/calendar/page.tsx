"use client";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventSummaryPopover from "@/components/event-summary-popover";
import { colorsBarCalendar, Event } from "@/types/dashboar-tipe";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { getAllTraining } from "@/service/training";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function MyCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showPopover, setShowPopover] = useState(false);
  const [view, setView] = useState<View>(Views.MONTH);
  
  const fetchAllEvent = async () => {
    try {
      const response = await getAllTraining();
      const events = response.map((event: any, index: number) => ({
        id: event.id,
        title: event.judul,
        start: new Date(event.tgl_mulai),
        end: new Date(event.tgl_selesai),
        description: event.rkap_type,
        color: colorsBarCalendar[index % colorsBarCalendar.length],
      }));
      setEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowPopover(true);
  };

  useEffect(() => {
    fetchAllEvent();
  }, []);

  return (
    <ProtectedRoute>
      <div className="relative h-screen bg-gray-100 p-5">
        <div className="mb-5 rounded-lg border border-gray-200 bg-white p-5 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentDate(new Date())}
                className="rounded-md bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentDate(moment(currentDate).subtract(1, view === Views.MONTH ? 'months' : 'weeks').toDate())}
                className="rounded-md bg-green-500 px-3 py-2 text-white transition duration-300 hover:bg-green-600"
              >
                &lt;
              </button>
              <button
                onClick={() => setCurrentDate(moment(currentDate).add(1, view === Views.MONTH ? 'months' : 'weeks').toDate())}
                className="rounded-md bg-green-500 px-3 py-2 text-white transition duration-300 hover:bg-green-600"
              >
                &gt;
              </button>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Schedule Pelatihan</h2>
            <select
              value={view}
              onChange={(e) => setView(e.target.value as View)}
              className="cursor-pointer rounded-md border bg-gray-50 px-3 py-2 shadow-sm transition duration-300 hover:shadow-md"
            >
              <option value={Views.MONTH}>Month</option>
              <option value={Views.WEEK}>Week</option>
              <option value={Views.DAY}>Day</option>
              <option value={Views.AGENDA}>Agenda</option>
            </select>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-5 shadow-md">
          <Calendar
            localizer={localizer}
            events={events}
            view={view}
            onView={(newView) => setView(newView)}
            selectable
            onSelectEvent={handleSelectEvent}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "auto", minHeight: "70vh", border: "none", fontSize: "14px" }}
            date={currentDate}
            onNavigate={setCurrentDate}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: event.color || "#87CEEB",
                color: "white",
                borderRadius: "5px",
                height: "20px",
                fontSize: "12px",
                padding: "2px",
              },
            })}
          />
        </div>

        {showPopover && selectedEvent && (
          <EventSummaryPopover event={selectedEvent} onClose={() => setShowPopover(false)} />
        )}
      </div>
    </ProtectedRoute>
  );
}