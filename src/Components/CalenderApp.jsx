import { useState } from "react";

const CalenderApp = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventText, setEventText] = useState("");

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const nextMonth = () => {
    setCurrentMonth((nextMonth) => (nextMonth === 11 ? 0 : nextMonth + 1));
    setCurrentYear((nextYear) =>
      currentMonth === 11 ? nextYear + 1 : nextYear
    );
  };

  const isSameDate = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleDayClick = (day) => {
    const clickedDay = new Date(currentYear, currentMonth, day);
    const today = new Date();

    if (clickedDay >= today || isSameDate(clickedDay, today)) {
      setSelectedDate(clickedDay);
      setShowEventPopup(true);
      setEventTime({ hours: "00", minutes: "00" });
      setEventText("");
    }
  };

  const handleEventSubmit = () => {
    const newEvent = {
      date: selectedDate,
      time: `${eventTime.hours.padStart(2, "0")} : ${eventTime.minutes.padStart(
        2,
        "0"
      )}`,
      text: eventText,
    };

    setEvents([...events, newEvent]);
    setEventTime({ hours: "00", minutes: "00" });
    setEventText("");
    setShowEventPopup(false);
  };

  return (
    <div className="calender-app">
      <div className="calender">
        <h1 className="heading">Calender</h1>
        <div className="navigate-date">
          <h2 className="month">{monthsOfYear[currentMonth]}, </h2>
          <h2 className="year">{currentYear}</h2>
          <div className="buttons">
            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
            <i className="bx bx-chevron-right" onClick={nextMonth}></i>
          </div>
        </div>
        <div className="week">
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="days">
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span
              key={day + 1}
              className={
                currentDate.getDate() === day + 1 &&
                currentDate.getMonth() === currentMonth &&
                currentDate.getFullYear() === currentYear
                  ? "current-day"
                  : ""
              }
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>
      <div className="events">
        {showEventPopup && (
          <div className="event-popup">
            <div className="time-input">
              <div className="event-popup-time">Time</div>
              <input
                type="number"
                name="hours"
                min={0}
                max={24}
                className="hours"
                value={eventTime.hours}
                onChange={(e) =>
                  setEventTime({ ...eventTime, hours: e.target.value })
                }
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={60}
                className="minutes"
                value={eventTime.minutes}
                onChange={(e) =>
                  setEventTime({ ...eventTime, minutes: e.target.value })
                }
              />
            </div>
            <textarea
              placeholder="Enter Event Text (Maximum 60 Characters)"
              value={eventText}
              onChange={(e) =>
                e.target.value.length <= 60 && setEventText(e.target.value)
              }
            ></textarea>
            <button className="event-popup-btn">Add Event</button>
            <button
              className="close-event-popup"
              onClick={() => setShowEventPopup(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
        )}
        <div className="event">
          <div className="event-date-wrapper">
            <div className="event-date">Jan 13, 2021</div>
            <div className="event-time">10:45</div>
          </div>
          <div className="event-text">Dhrishan Dutta's Birthday</div>
          <div className="event-buttons">
            <i className="bx bxs-edit-alt"></i>
            <i className="bx bxs-message-alt-x"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalenderApp;
