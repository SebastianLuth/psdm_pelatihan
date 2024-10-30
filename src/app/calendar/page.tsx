// app/calendar/page.tsx

"use client";

import { useState } from "react";
import { Calendar, dateFnsLocalizer, Views, SlotInfo } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";

// Buat tipe event dengan title bertipe string
interface CustomEvent {
  title: string;
  start: Date;
  end: Date;
}

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date()),
  getDay,
  locales,
});

export default function CalendarPage() {
  const [events, setEvents] = useState<CustomEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<CustomEvent | null>(null);

  // Fungsi untuk menangani pembukaan modal ketika event di-drag
  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setNewEvent({ start: slotInfo.start, end: slotInfo.end, title: "" });
    setIsModalOpen(true);
  };

  // Fungsi untuk menambahkan event
  const addEvent = () => {
    if (newEvent?.title) {
      setEvents([...events, newEvent]);
    }
    setIsModalOpen(false);
  };

  // Fungsi untuk mengatur style event
  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: "#4F46E5", // Warna ungu
        color: "white",
        borderRadius: "4px",
        border: "none",
      },
    };
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: 600 }}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]} // Menambahkan opsi tampilan
        defaultView={Views.MONTH} // Tampilan default bulan
        eventPropGetter={eventStyleGetter} // Menambahkan fungsi gaya event
        toolbar={true} // Menampilkan toolbar navigasi
        popup={true} // Menampilkan detail event dalam popup
      />

      {isModalOpen && newEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Tambah Event</h2>
            <input
              type="text"
              className="border p-2 mb-4 w-full"
              placeholder="Nama Event"
              value={newEvent.title || ""}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Batal
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2"
                onClick={addEvent}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
