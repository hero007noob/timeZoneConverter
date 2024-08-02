import React, { useState } from "react";
import { format, toZonedTime, fromZonedTime } from "date-fns-tz";

const TimeZoneConverter = () => {
  const [inputTime, setInputTime] = useState("");
  const [fromZone, setFromZone] = useState("UTC");
  const [toZone, setToZone] = useState("Asia/Kolkata");
  const [convertedTime, setConvertedTime] = useState("");

  const handleConversion = () => {
    try {
      const utcDate = fromZonedTime(inputTime, fromZone);

      const zonedDate = toZonedTime(utcDate, toZone);

      const formattedDate = format(zonedDate, "yyyy-MM-dd HH:mm:ssXXX", {
        timeZone: toZone,
      });
      setConvertedTime(formattedDate);
    } catch (error) {
      setConvertedTime("Invalid input");
    }
  };

  return (
    <div>
      <h2>Time Zone Converter</h2>
      <input
        type="datetime-local"
        value={inputTime}
        onChange={(e) => {
          setInputTime(e.target.value);
        }}
      />
      <select value={fromZone} onChange={(e) => setFromZone(e.target.value)}>
        <option value="UTC">UTC</option>
        <option value="Asia/Kolkata">IST</option>
        <option value="America/New_York">ET</option>
      </select>
      <select value={toZone} onChange={(e) => setToZone(e.target.value)}>
        <option value="UTC">UTC</option>
        <option value="Asia/Kolkata">IST</option>
        <option value="America/New_York">ET</option>
      </select>
      <button onClick={handleConversion}>Convert</button>
      <p>Converted Time: {convertedTime}</p>
    </div>
  );
};

export default TimeZoneConverter;
