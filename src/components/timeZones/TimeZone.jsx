// TimeZones.js
import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import TimeCard from "./TimeCard";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns-tz";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteTimezone } from "../timezoneSlice";
import moment from "moment-timezone";

const updateUrl = (data) => {
  const { selectedDate, timezones } = data;
  let paramString = timezones
    .map((timezone, i) => {
      return timezone.formattedString;
    })
    .join(" + ");
  if (paramString) paramString += " + ";
  paramString += selectedDate;
  return paramString;
};
const useUpdateQueryParam = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (key, value) => {
    const params = new URLSearchParams(location.search);
    params.set(key, encodeURIComponent(value));

    navigate(`${location.pathname}?${params.toString()}`);
  };
};
const TimeZone = ({ reverse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.timezone);
  const [timeZones, setTimeZones] = useState(data.timezones);
  const updateQueryParam = useUpdateQueryParam();
  const [selectedDate, setSelectedDate] = useState(data.selectedDate);
  const [selectedTime, setSelectedTime] = useState(selectedDate);
  useEffect(() => {
    const queryString = location.search;
    updateQueryParam("info", updateUrl(data));
    setTimeZones(data.timezones);
    setSelectedDate(data.selectedDate);
    setSelectedTime(data.selectedDate);
  }, [data]);
  const handleDragStart = (props) => {
    console.log(props);
  };
  useEffect(() => {
    const updatedTimeZones = reverse
      ? [...data.timezones].reverse()
      : [...data.timezones];

    setTimeZones(updatedTimeZones);
  }, [reverse]);
  const handleDragEnd = ({ active, over }) => {
    console.log(active, over);
    if (over && active.id !== over.id)
      setTimeZones((timeZones) => {
        let oldIdx = timeZones.findIndex((item) => item.id === active.id);
        let newIdx = timeZones.findIndex((item) => item.id === over.id);
        console.log(oldIdx, newIdx);
        let x = arrayMove(timeZones, oldIdx, newIdx);
        console.log(x);
        return x;
      });
  };
  const handleDelete = (id) => {
    dispatch(deleteTimezone(id));
  };
  useEffect(() => {
    const queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    const value = urlParams.get("info");
    console.log("en", value);
    const decodedString = decodeURIComponent(value);
    console.log("dec", decodedString);
  }, [location]);
  const handleSetSelectedTime = (date) => {
    console.log("here");
    setSelectedTime(date);
  };
  return (
    <Flex direction="column" align="center" padding="4">
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}>
        <SortableContext items={timeZones}>
          {timeZones.map((tz, index) => (
            <TimeCard
              id={tz.id}
              key={tz.id}
              zone={tz.zone}
              description={tz.description}
              time={tz.time}
              gmtOffset={tz.gmtOffset}
              date={tz.date}
              timeZone={tz.timeZone}
              selectedDate={selectedDate}
              onDelete={handleDelete}
              setSelectedTime={handleSetSelectedTime}
              selectedTime={selectedTime}
            />
          ))}
        </SortableContext>
      </DndContext>
    </Flex>
  );
};

export default TimeZone;
