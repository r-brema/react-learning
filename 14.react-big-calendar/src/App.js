import React, { useMemo, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Calendar,
  Views,
  momentLocalizer,
  timeSlotWrapper,
  DateLocalizer,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import Layout from "react-tackle-box/Layout";
import AddEvent from "./AddEvent";
import ViewEvent from "./ViewEvent";
import ModalBox from "./ModalBox";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./index.css";

require("globalize/lib/cultures/globalize.culture.en-GB");
require("globalize/lib/cultures/globalize.culture.fr");
require("globalize/lib/cultures/globalize.culture.ar-AE");

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar); //HOC

const cultures = ["en", "en-GB", "fr", "ar-AE"];
const lang = {
  en: null,
  "en-GB": null,
  fr: {
    week: "La semaine",
    work_week: "Semaine de travail",
    day: "Jour",
    month: "Mois",
    previous: "Antérieur",
    next: "Prochain",
    today: `Aujourd'hui`,
    agenda: "Ordre du jour",
    showMore: (total) => `+${total} plus`,
  },
  "ar-AE": {
    week: "أسبوع",
    work_week: "أسبوع العمل",
    day: "يوم",
    month: "شهر",
    previous: "سابق",
    next: "التالي",
    today: "اليوم",
    agenda: "جدول أعمال",
    showMore: (total) => `+${total} إضافي`,
  },
};

const calendarInitialState = [
  {
    id: 1,
    start: moment().toDate(),
    end: moment().add(1, "days").toDate(),
    title: "Some title!!!",
  },
  {
    id: 2,
    title: "Meeting",
    start: new Date(2024, 8, 25, 10, 0), // Adjust the date and time as needed
    end: new Date(2024, 8, 25, 11, 0),
  },
  {
    id: 3,
    title: "Conference",
    start: new Date(2024, 8, 27, 12, 0),
    end: new Date(2024, 8, 27, 13, 0),
  },
  {
    id: 4,
    title: "Meeting 4",
    start: new Date(2024, 8, 25, 10, 0), // Adjust the date and time as needed
    end: new Date(2024, 8, 25, 11, 0),
  },
  {
    id: 5,
    title: "Meeting 5",
    start: new Date(2024, 8, 25, 10, 0), // Adjust the date and time as needed
    end: new Date(2024, 8, 25, 11, 0),
  },
  {
    id: 6,
    title: "Meeting 6",
    start: new Date(2024, 8, 25, 10, 0), // Adjust the date and time as needed
    end: new Date(2024, 8, 25, 11, 0),
  },
  {
    id: 7,
    title: "Meeting 7",
    start: new Date(2024, 8, 25, 10, 0), // Adjust the date and time as needed
    end: new Date(2024, 8, 25, 11, 0),
  },
  {
    id: 8,
    title: "Meeting 8",
    start: new Date(2024, 8, 25, 10, 0), // Adjust the date and time as needed
    end: new Date(2024, 8, 25, 11, 0),
  },
  {
    id: 9,
    title: "Meeting 9",
    start: new Date(2024, 8, 25, 10, 0), // Adjust the date and time as needed
    end: new Date(2024, 8, 25, 11, 0),
  },
];

const ColoredDateCellWrapper = ({ children }) => {
  return React.cloneElement(children, {
    style: {
      ...children.props.style,
      backgroundColor: "lightbule",
    },
  });
};
function App() {
  const [events, setEvents] = useState(calendarInitialState);
  const [currentEvent, setCurrentEvent] = useState();
  const [showModal, setShowModal] = useState(null);
  const [culture, setCulture] = useState("fr");
  const [rightToLeft, setRightToLeft] = useState(false);

  //To avoid re-rendering every subcomponent that relies upon defaultDate

  const { components, defaultDate, views, messages } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      messages: lang[culture],
      defaultDate: new Date(),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    [culture]
  );

  const cultureOnClick = useCallback(
    ({ target: { value } }) => {
      setCulture(value);
      setRightToLeft(value === "ar-AE");
    },
    [setCulture]
  );

  const handleSelectSlot = ({ start, end }) => {
    setShowModal("add");
    setCurrentEvent({ start, end, title: "Some title" });
  };
  const AddEvents = (event) => {
    console.log("add event funtions");
    console.log(event);
    setEvents((prev) => [...prev, { ...event }]);
    setShowModal(null);
  };
  const handleDelete = (id) => {
    console.log("id: " + id);
    setEvents((prev) => prev.filter((event) => id !== event.id));
    setShowModal(null);
  };
  const handleSelectEvent = useCallback((event) => {
    console.log(event);
    setShowModal("view");
    setCurrentEvent(event);
  }, []);

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }
      if (allDay && !droppedOnAllDaySlot) {
        event.allDay = false;
      }

      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay: event.allDay }];
      });
    },
    [setEvents]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setEvents]
  );

  return (
    <div className="App">
      <h1>Calendar demo</h1>
      <Layout direction="column" align="center">
        <label>Select a Culture</label>{" "}
        <select
          className="form-control"
          style={{ width: 200, display: "inline-block" }}
          defaultValue={"fr"}
          onChange={cultureOnClick}
        >
          {cultures.map((c, idx) => (
            <option key={idx} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Layout>

      <div style={{ height: "100vh" }}>
        <DragAndDropCalendar
          components={components}
          messages={messages}
          culture={culture}
          localizer={localizer}
          defaultDate={defaultDate}
          defaultView="week"
          events={events}
          style={{ height: "100%" }}
          selectable
          showMultiDayTimes
          startAccessor="start"
          endAccessor="end"
          step={15}
          views={views}
          timeslots={4}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          rtl={rightToLeft}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          resizable
          popup
        />
      </div>
      {showModal === "add" &&
        createPortal(
          <ModalBox onClose={() => setShowModal(null)}>
            <AddEvent
              event={currentEvent}
              onAddEvent={AddEvents}
              onClose={() => setShowModal(null)}
            />
          </ModalBox>,
          document.getElementById("modal-container")
        )}
      {showModal === "view" &&
        createPortal(
          <ModalBox onClose={() => setShowModal(null)}>
            <ViewEvent
              event={currentEvent}
              onClose={() => setShowModal(null)}
              onDelete={handleDelete}
            />
          </ModalBox>,
          document.getElementById("modal-container")
        )}
    </div>
  );
}

export default App;
