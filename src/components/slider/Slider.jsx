// src/Slider.js
import React, { useEffect, useRef, useState } from "react";
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
import "./Slider.css";
import { format, toZonedTime } from "date-fns-tz";
import { add } from "date-fns";
import moment from "moment-timezone";

const Slider = ({
  selectedTime,
  selectedDate,
  setSelectedTime,
  updateTime,
  timeZone,
}) => {
  const sliderRef = useRef(null);
  const sliderInstance = useRef(null);
  const [minutes, setMinutes] = useState(0);
  const [time, setTime] = useState("12:00 am");  

  const date = moment(selectedTime);
  const newDate = date.tz(timeZone);
  const formatedNewDate = newDate.format("MMMM Do YYYY, h:mm:ss a");
  useEffect(() => {
    setTime(format(selectedTime, "h:mm aa"));
  }, [selectedTime]);
  useEffect(() => {
    if (sliderRef.current && !sliderInstance.current) {
      sliderInstance.current = noUiSlider.create(sliderRef.current, {
        start: [0],
        range: {
          min: 0,
          max: 1425, // 9pm in minutes (21 * 60)
        },
        step: 15,
        tooltips: {
          to: (value) => {
            const hours = Math.floor(value / 60);
            const minutes = value % 60;
            const period = hours >= 12 ? "pm" : "am";
            const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            return `${formattedHours}:${formattedMinutes} ${period}`;
          },
          from: (value) => {
            const [time, period] = value.split(" ");
            const [hours, minutes] = time.split(":").map(Number);
            return (
              (period === "pm" ? (hours % 12) + 12 : hours % 12) * 60 + minutes
            );
          },
        },
        pips: {
          mode: "values",
          values: [0, 180, 360, 540, 720, 900, 1080, 1260],
          density: 4,
          format: {
            to: (value) => {
              const hours = Math.floor(value / 60);
              const period = hours >= 12 ? "pm" : "am";
              const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
              return `${formattedHours}${period}`;
            },
          },
        },
      });

      sliderInstance.current.on("change", (values, handle) => {
        handleUpdateTime(values[handle]);
      });
    }

    if (sliderInstance.current) {
      const newTimeInMinutes = calculateTimeInMinutes(selectedTime, timeZone);
      sliderInstance.current.set(newTimeInMinutes);
    }
    return () => {
      if (sliderInstance.current) {
        sliderInstance.current.destroy();
        sliderInstance.current = null;
      }
    };
  }, [selectedTime]);
  const calculateTimeInMinutes = (selectedTime, timeZone) => {
    const date = moment(selectedTime).tz(timeZone);

    const hours = date.hours();
    const minutes = date.minutes();

    return hours * 60 + minutes;
  };
  const handleUpdateTime = (minutes) => {
    const newDate = new Date(selectedDate);
    const startOfDay = new Date(newDate.setHours(0, 0, 0, 0));
    const updatedTime = getTimeAfterMinutes(startOfDay, minutes, timeZone);
    const formattedTime = format(updatedTime, "hh:mm a", { timeZone });
    setTime(formattedTime);
    const utcDateString = convertToUTC(updatedTime.toISOString());
    setSelectedTime(utcDateString);
  };
  const convertToUTC = (isoDateString) => {
    const date = moment(isoDateString);

    const utcDate = date.utc();

    return utcDate.format();
  };
  const getTimeAfterMinutes = (startTime, minutes, timeZone) => {
    const zonedTime = toZonedTime(startTime, timeZone);
    const updatedTime = add(zonedTime, { minutes });
    return updatedTime;
  };
  return (
    <div className="Slider">
      <div ref={sliderRef} className="slider"></div> 
    </div>
  );
};

export default Slider;
