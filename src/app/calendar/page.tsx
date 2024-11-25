"use client";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventSummaryPopover from "@/components/event-summary-popover";
import { colorsBarCalendar, Event } from "@/types/dashboar-tipe";
import { deleteEvent, getEventDataCalendar, postEvent } from "@/service/dashboard";
import EventPostPopover from "@/components/event-post-popover";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function MyCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({});
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [IsUploaded, setIsUploaded] = useState<boolean>(false);

  const {userData} = useAuth();

  const featchAllEvent = async () => {
    try {
      // get data event from API
      const response = await getEventDataCalendar();
      setEvents(response);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowPopover(true);
  };

  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    if(userData?.role !== "admin") return;
    setNewEvent({ start, end });
    setShowModal(true);
  };

  const handleSaveEvent = async () => {
    try {
      if (newEvent.title) {
        const formattedEvent = {
          title: newEvent.title,
          description: newEvent.description,
          dateStart: moment(newEvent.start).format("YYYY-MM-DD"),
          dateEnd: moment(newEvent.end).format("YYYY-MM-DD"),
          color : newEvent.color
        };
  
        // Send the event to the backend
        await postEvent(formattedEvent);
        setIsUploaded(true);
  
        // Update the events state with the new event
        setEvents((prevEvents) => [...prevEvents, newEvent as Event]);
        setNewEvent({});
      }
    } catch (error) {
      setIsUploaded(false);
      console.error("Error saving event:", error);
    } finally {
      setShowModal(false);
      setIsUploaded(false);
    }
   
  };
  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      try {
        const evenId = Number(selectedEvent.id);
        await deleteEvent(evenId);
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

  const handleCloseEvenSummaryPopover = () => {
    setIsUploaded(false);
    setShowModal(false);
  }

  useEffect(() => {
    featchAllEvent();
  }, []);
  return (
    <ProtectedRoute>
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
          style={{ height: "auto", minHeight: "70vh", border: "none", fontSize: "14px",  }}
          date={currentDate}
          onNavigate={setCurrentDate}
          dayPropGetter={dayPropGetter}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.color || "#87CEEB  ",
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
        <EventSummaryPopover
          event={selectedEvent}
          onClose={()=> setShowPopover(false)}
          onDelete={handleDeleteEvent}
        />
      )}

      {showModal && (
       <EventPostPopover
       newEvent={newEvent}
       onChange={(updatedEvent) => setNewEvent(updatedEvent)}
       onSave={handleSaveEvent}
       onClose={handleCloseEvenSummaryPopover}
       isUploaded={IsUploaded}
     />
      )}
    </div>
    </ProtectedRoute>
  );
}