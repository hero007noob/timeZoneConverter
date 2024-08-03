import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import TimeCard from "./TimeCard";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addTimezone, deleteTimezone } from "../timezoneSlice";
import { addTimeZoneAct, getPlaceSuggestions } from "../services";

const updateUrl = (data) => {
  const { selectedDate, timezones } = data;
  let paramString = timezones
    .map((timezone) => timezone.formattedString)
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
    const urlParams = new URLSearchParams(queryString);
    const queryValue = urlParams.get("info");
    const decodedString = decodeURIComponent(queryValue);
    const locations = decodedString.split(" + ");
    const date = locations.pop();

    const fetchAllData = async () => {
      try {
        const results = await Promise.all(
          locations.map((location) => getPlaceSuggestions(location))
        );
        const data = results.map((result) => result[0]);
        for (const result of data) {
          await addTimeZoneAct(result, date, dispatch, addTimezone);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    updateQueryParam("info", updateUrl(data));
    setTimeZones(data.timezones);
    setSelectedDate(data.selectedDate);
    setSelectedTime(data.selectedDate);
  }, [data]);

  const handleDragStart = () => {};

  useEffect(() => {
    const updatedTimeZones = reverse
      ? [...data.timezones].reverse()
      : [...data.timezones];
    setTimeZones(updatedTimeZones);
  }, [reverse]);

  const handleDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id) {
      setTimeZones((timeZones) => {
        const oldIdx = timeZones.findIndex((item) => item.id === active.id);
        const newIdx = timeZones.findIndex((item) => item.id === over.id);
        return arrayMove(timeZones, oldIdx, newIdx);
      });
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTimezone(id));
  };

  const handleSetSelectedTime = (date) => {
    setSelectedTime(date);
  };

  return (
    <Flex direction="column" align="center" padding="4">
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}>
        <SortableContext items={timeZones}>
          {timeZones.map((tz) => (
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
