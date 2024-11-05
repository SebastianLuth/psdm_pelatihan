"use client";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventSummaryPopover from "@/components/event-summary-popover";
import axios from "axios";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

interface Event {
  id?: number;
  start: Date;
  end: Date;
  title: string;
  description?: string;
}

const colors = [
  "bg-blue-400",
  "bg-green-400",
  "bg-red-400",
  "bg-yellow-400",
  "bg-purple-400",
];

export default function MyCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({});
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [IsUploaded, setIsUploaded] = useState<boolean>(false);

  const featchAllEvent = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/calendar");
      const eventsData = response.data.map((event: any) => ({
        id: event.id,
        start: new Date(event.date_start),
        end: new Date(event.date_end),
        title: event.title,
        description: event.description,
      }));
      setEvents(eventsData);
      console.log(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const postEvent = async (eventData: {
    title: string;
    description?: string;
    dateStart: string;
    dateEnd: string;
  }) => {
    try {
      await axios.post("http://localhost:5000/api/calendar", eventData, {
        withCredentials: true,
      });
    } catch (error) {
      setIsUploaded(false);
      console.error("Error posting event:", error);
    }
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowPopover(true);
  };

  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    setNewEvent({ start, end });
    setShowModal(true);
  };

  const handleSaveEvent = async () => {
    if (newEvent.title) {
      const formattedEvent = {
        title: newEvent.title,
        description: newEvent.description,
        dateStart: moment(newEvent.start).format("YYYY-MM-DD"),
        dateEnd: moment(newEvent.end).format("YYYY-MM-DD"),
      };

      // Send the event to the backend
      await postEvent(formattedEvent);
      setIsUploaded(true);

      // Update the events state with the new event
      setEvents((prevEvents) => [...prevEvents, newEvent as Event]);
      setNewEvent({});
    }
  };
  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      try {
        await axios.delete(`http://localhost:5000/api/calendar/${selectedEvent.id}`, {
          withCredentials: true,
        });
        
        // Setelah delete berhasil, fetch ulang data event
        featchAllEvent();
        setSelectedEvent(null);
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const dayPropGetter = (date: Date) => ({
    className: "border hover:bg-blue-100 transition duration-300 text-center",
    style: {
      backgroundColor: moment(date).isSame(new Date(), "day") ? "#D1FAE5" : "",
      borderRadius: "0.25rem",
      padding: "30px",
      minHeight: "100px",
    },
  });

  const getEventColor = (event: Event) => {
    const sameDayEvents = events.filter((e) =>
      moment(e.start).isSame(event.start, "day"),
    );
    const index = sameDayEvents.indexOf(event) % colors.length;
    return colors[index];
  };

  useEffect(() => {
    featchAllEvent();

  }, []);
  return (
    <div className="relative h-screen bg-gray-100 p-5">
      <div className="mb-5 rounded-lg border border-gray-200 bg-white p-5 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleToday}
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
            >
              Today
            </button>
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    1,
                  ),
                )
              }
              className="rounded-md bg-green-500 px-3 py-2 text-white transition duration-300 hover:bg-green-600"
            >
              &lt;
            </button>
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    1,
                  ),
                )
              }
              className="rounded-md bg-green-500 px-3 py-2 text-white transition duration-300 hover:bg-green-600"
            >
              &gt;
            </button>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Schedule Pelatihan
          </h2>
          <select className="cursor-pointer rounded-md border bg-gray-50 px-3 py-2 shadow-sm transition duration-300 hover:shadow-md">
            <option>Month</option>
            <option>Week</option>
            <option>Day</option>
            <option>Agenda</option>
          </select>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-5 shadow-md">
        <Calendar
          localizer={localizer}
          events={events}
          defaultView="month"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "auto", minHeight: "70vh", border: "none" }}
          date={currentDate}
          onNavigate={setCurrentDate}
          dayPropGetter={dayPropGetter}
          eventPropGetter={(event) => ({
            className: `${getEventColor(event)} text-white rounded-md shadow-sm transition duration-300`,
            style: { borderRadius: "5px", height: "20px" },
          })}
        />
      </div>

      {showPopover && selectedEvent && (
        <EventSummaryPopover
          event={selectedEvent}
          onClose={() => setShowPopover(false)}
          onDelete={handleDeleteEvent}
        />
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Tambahkan Event Baru</h3>
            <input
              type="text"
              placeholder="Judul Event"
              value={newEvent.title || ""}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="mb-4 w-full rounded border border-gray-300 p-2"
            />
            <textarea
              placeholder="Deskripsi"
              value={newEvent.description || ""}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="mb-4 w-full rounded border border-gray-300 p-2"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tanggal Mulai
              </label>
              <input
                type="text"
                value={
                  newEvent.start
                    ? moment(newEvent.start).format("YYYY-MM-DD HH:mm")
                    : ""
                }
                readOnly
                className="w-full rounded border border-gray-300 bg-gray-100 p-2 text-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tanggal Akhir
              </label>
              <input
                type="text"
                value={
                  newEvent.end
                    ? moment(newEvent.end).format("YYYY-MM-DD HH:mm")
                    : ""
                }
                readOnly
                className="w-full rounded border border-gray-300 bg-gray-100 p-2 text-gray-600"
              />
            </div>
            <div className="flex justify-between space-x-2">
              {IsUploaded ? (
                <div>
                  <p className="mb-4 text-lg font-semibold text-green-500 ">
                    Event berhasil ditambahkan
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded bg-gray-300 px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEvent}
                    className="rounded bg-blue-600 px-4 py-2 text-white"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <p>{""}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => setShowModal(false)}
                      className="rounded bg-gray-300 px-4 py-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEvent}
                      className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                      Save
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
