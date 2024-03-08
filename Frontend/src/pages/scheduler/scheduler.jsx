import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./scheduler.css";

function Scheduler() {
  const userId = sessionStorage.getItem('userId');

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/scheduler/events/${userId}`);
        if (response.ok) {
          const fetchedEvents = await response.json();
          const transformedEvents = fetchedEvents.map((event) => ({
            title: event.title,
            startRecur: event.start_recur,
            endRecur: event.end_recur,
            startTime: "9:00:00",
            dosage: event.dosage,
          }));
          setEvents(transformedEvents);
        } else {
          throw new Error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
  
    fetchEvents();
  }, [userId]);

  function renderEventContent(eventInfo) {
    return (
      <>
        <div>
          <b>9:00am: {eventInfo.event.title}</b>
        </div>
        <div>Dosage: {eventInfo.event.extendedProps.dosage} pill(s)</div>
      </>
    );
  }

  return (
    <div>
      <h1>
        <b>Scheduler</b>
      </h1>
      <FullCalendar
        plugins={[dayGridPlugin]} 
        selectable={false}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
}

export default Scheduler;
