import React, { useEffect } from "react";
import { Box, Flex, Text, Input, IconButton } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Slider from "../slider/Slider";
import { CloseIcon } from "@chakra-ui/icons";
import moment from "moment-timezone";
import "./styles.css";

const TimeCard = ({
  zone,
  description,
  gmtOffset,
  id,
  onDelete,
  timeZone,
  selectedDate,
  setSelectedTime,
  selectedTime,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const handleChange = (e) => {
    const newTime = e.target.value;
    const date = moment(selectedTime);
    const [newHours, newMinutes] = newTime.split(":");
    date.set({ hour: newHours, minute: newMinutes, second: 0, millisecond: 0 });
    const updatedDateISO = date.toISOString();
    setSelectedTime(updatedDateISO);
  };

  const handleUpdateTime = (time) => {
    setSelectedTime(time);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    const currentTime = new Date();
    setSelectedTime(currentTime);
  }, []);

  const date = moment(selectedTime);
  const newDate = date.tz(timeZone);
  const formattedNewDate = newDate.format("MMMM Do YYYY, h:mm:ss a");

  return (
    <Box className="time-card" ref={setNodeRef} style={style}>
      <Flex justify="space-between" align="center" className="time-card-header">
        <Flex
          gap={"10px"}
          alignItems={"center"}
          w={"300px"}
          overflow={"hidden"}>
          <IconButton
            {...attributes}
            {...listeners}
            height={100}
            icon={
              <svg
                viewBox="0 0 16 128"
                style={{
                  display: "flex",
                  width: "20px",
                  height: "80px",
                  overflow: "hidden",
                }}>
                <rect x="4" y="4" width="4" height="4"></rect>
                <rect x="4" y="12" width="4" height="4"></rect>
                <rect x="4" y="20" width="4" height="4"></rect>
                <rect x="4" y="28" width="4" height="4"></rect>
                <rect x="4" y="36" width="4" height="4"></rect>
                <rect x="4" y="44" width="4" height="4"></rect>
                <rect x="4" y="52" width="4" height="4"></rect>
                <rect x="4" y="60" width="4" height="4"></rect>
                <rect x="4" y="68" width="4" height="4"></rect>
                <rect x="4" y="76" width="4" height="4"></rect>
                <rect x="4" y="84" width="4" height="4"></rect>
                <rect x="4" y="92" width="4" height="4"></rect>
                <rect x="4" y="100" width="4" height="4"></rect>
                <rect x="4" y="108" width="4" height="4"></rect>
                <rect x="4" y="116" width="4" height="4"></rect>
                <rect x="4" y="124" width="4" height="4"></rect>
                <rect x="12" y="4" width="4" height="4"></rect>
                <rect x="12" y="12" width="4" height="4"></rect>
                <rect x="12" y="20" width="4" height="4"></rect>
                <rect x="12" y="28" width="4" height="4"></rect>
                <rect x="12" y="36" width="4" height="4"></rect>
                <rect x="12" y="44" width="4" height="4"></rect>
                <rect x="12" y="52" width="4" height="4"></rect>
                <rect x="12" y="60" width="4" height="4"></rect>
                <rect x="12" y="68" width="4" height="4"></rect>
                <rect x="12" y="76" width="4" height="4"></rect>
                <rect x="12" y="84" width="4" height="4"></rect>
                <rect x="12" y="92" width="4" height="4"></rect>
                <rect x="12" y="100" width="4" height="4"></rect>
                <rect x="12" y="108" width="4" height="4"></rect>
                <rect x="12" y="116" width="4" height="4"></rect>
                <rect x="12" y="124" width="4" height="4"></rect>
              </svg>
            }
          />
          <Box>
            <Text className="time-card-title">{zone}</Text>
            <Text className="time-card-description">{description}</Text>
          </Box>
        </Flex>
        <Flex gap={"10px"}>
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Input
              type="time"
              value={newDate.format("HH:mm")}
              onChange={handleChange}
              className="time-input"
            />
            <Flex gap={"10px"}>
              <Text className="time-card-gmt">{gmtOffset}</Text>
              <Text className="time-card-date">{formattedNewDate}</Text>
            </Flex>
          </Flex>
          <IconButton
            onClick={() => {
              onDelete(id);
            }}
            alignSelf={"flex-start"}
            icon={<CloseIcon />}
          />
        </Flex>
        {/* <Text className="time-card-time">{newDate.format("h:mm a")}</Text> */}
      </Flex>
      <Slider
        selectedTime={selectedTime}
        selectedDate={selectedDate}
        setSelectedTime={setSelectedTime}
        updateTime={handleUpdateTime}
        timeZone={timeZone}
      />
    </Box>
  );
};

export default TimeCard;
