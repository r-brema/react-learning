import React, { useRef } from "react";
import moment from "moment";
const AddEvent = ({ event, onAddEvent, onClose }) => {
  console.log(event);
  const nameRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  const startDate = moment(event.start);
  const endDate = moment(event.end);
  const generateId = () => (Math.floor(Math.random() * 10000) + 1).toString();
  function handleSubmit() {
    const title = nameRef.current.value;
    const start = startTimeRef.current.value;
    const end = endTimeRef.current.value;
    console.log(`name: ${title}, start time: ${start}, end time: ${end}`);

    const [startHours, startMinutes] = start.split(":");
    const [endHours, endMinutes] = end.split(":");
    const eventObj = {
      id: generateId(),
      start: startDate
        .set({
          hour: startHours,
          minute: startMinutes,
        })
        .toDate(),
      end: endDate.set({ hour: endHours, minute: endMinutes }).toDate(),
      title: nameRef.current.value,
    };
    console.log(eventObj);
    onAddEvent(eventObj);
  }
  return (
    <div className="add-event">
      <div className="row title">Add Event</div>
      <div className="row">
        <label htmlFor="eventName">Event Name:</label>
        <input
          type="text"
          id="eventName"
          name="eventName"
          defaultValue={event.title}
          ref={nameRef}
        />
      </div>

      <div className="row">
        <label htmlFor="startTime">Start Time:</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          defaultValue={startDate.format("HH:mm")}
          ref={startTimeRef}
        />
      </div>
      <div className="row">
        <label htmlFor="startTime">End Time:</label>
        <input
          type="time"
          name="startTime"
          id="startTime"
          defaultValue={endDate.format("HH:mm")}
          ref={endTimeRef}
        />
      </div>
      <div className="row action">
        <button className="btn secondary" onClick={onClose}>
          Cancel
        </button>
        <button className="btn primary" onClick={handleSubmit}>
          Create Event
        </button>
      </div>
    </div>
  );
};

export default AddEvent;
