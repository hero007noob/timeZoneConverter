import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  Flex,
  Input,
  Button,
  IconButton,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { CalendarIcon, LinkIcon, MoonIcon } from "@chakra-ui/icons";
import { format, toZonedTime } from "date-fns-tz";
import SearchBox from "./Search";
import { useDispatch } from "react-redux";
import { updateDate } from "./timezoneSlice";

const TopBar = ({ setReverse }) => {
  const toast = useToast();
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const handleDateChange = (date) => {
    dispatch(updateDate(date.toISOString()));
    setStartDate(date);
  };
  const ExampleCustomInput = forwardRef(
    ({ value, onClick, className }, ref) => (
      <IconButton
        style={{ background: "transparent" }}
        className={className}
        onClick={onClick}
        ref={ref}
        size="sm"
        icon={
          <svg
            class="icon svg-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 26 24">
            <path
              fill="#0098CA"
              d="M8 21.5v-3c0-0.281-0.219-0.5-0.5-0.5h-5c-0.281 0-0.5 0.219-0.5 0.5v3c0 0.281 0.219 0.5 0.5 0.5h5c0.281 0 0.5-0.219 0.5-0.5zM8 15.5v-3c0-0.281-0.219-0.5-0.5-0.5h-5c-0.281 0-0.5 0.219-0.5 0.5v3c0 0.281 0.219 0.5 0.5 0.5h5c0.281 0 0.5-0.219 0.5-0.5zM16 21.5v-3c0-0.281-0.219-0.5-0.5-0.5h-5c-0.281 0-0.5 0.219-0.5 0.5v3c0 0.281 0.219 0.5 0.5 0.5h5c0.281 0 0.5-0.219 0.5-0.5zM8 9.5v-3c0-0.281-0.219-0.5-0.5-0.5h-5c-0.281 0-0.5 0.219-0.5 0.5v3c0 0.281 0.219 0.5 0.5 0.5h5c0.281 0 0.5-0.219 0.5-0.5zM16 15.5v-3c0-0.281-0.219-0.5-0.5-0.5h-5c-0.281 0-0.5 0.219-0.5 0.5v3c0 0.281 0.219 0.5 0.5 0.5h5c0.281 0 0.5-0.219 0.5-0.5zM24 21.5v-3c0-0.281-0.219-0.5-0.5-0.5h-5c-0.281 0-0.5 0.219-0.5 0.5v3c0 0.281 0.219 0.5 0.5 0.5h5c0.281 0 0.5-0.219 0.5-0.5zM16 9.5v-3c0-0.281-0.219-0.5-0.5-0.5h-5c-0.281 0-0.5 0.219-0.5 0.5v3c0 0.281 0.219 0.5 0.5 0.5h5c0.281 0 0.5-0.219 0.5-0.5zM24 15.5v-3c0-0.281-0.219-0.5-0.5-0.5h-5c-0.281 0-0.5 0.219-0.5 0.5v3c0 0.281 0.219 0.5 0.5 0.5h5c0.281 0 0.5-0.219 0.5-0.5zM24 9.5v-3c0-0.281-0.219-0.5-0.5-0.5h-5c-0.281 0-0.5 0.219-0.5 0.5v3c0 0.281 0.219 0.5 0.5 0.5h5c0.281 0 0.5-0.219 0.5-0.5zM26 4.5v17c0 1.375-1.125 2.5-2.5 2.5h-21c-1.375 0-2.5-1.125-2.5-2.5v-17c0-1.375 1.125-2.5 2.5-2.5h21c1.375 0 2.5 1.125 2.5 2.5z"></path>
          </svg>
        }>
        {value}
      </IconButton>
    )
  );
  const { colorMode, toggleColorMode } = useColorMode();
  const formatDate = (date) => {
    const timeZone = "Asia/Kolkata";
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, "MMM d, yyyy");
  };
  return (
    <Box p={4} boxShadow="sm" bg={colorMode == "light" ? "white" : "brand-900"}>
      <Flex alignItems="center" gap={2}>
        <SearchBox />

        <InputGroup>
          <Input type="text" value={formatDate(startDate)} readOnly />

          <InputRightElement>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                handleDateChange(date);
              }}
              customInput={
                <ExampleCustomInput className="example-custom-input" />
              }
            />
          </InputRightElement>
        </InputGroup>

        <Flex gap={2}>
          <IconButton
            onClick={() => {
              window.open(
                "https://calendar.google.com/calendar/u/0/r/eventedit",
                "_blank"
              );
            }}
            aria-label="Calendar"
            color={"#0098CA"}
            icon={<CalendarIcon />}
          />
          <IconButton
            aria-label="Sync"
            onClick={() => {
              setReverse((prev) => !prev);
            }}
            icon={
              <svg
                fill="#0098CA"
                class="icon svg-icon"
                width={"20px"}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18">
                <path d="M11.893 0h1.929c0.171 0 0.321 0.151 0.321 0.321v13.821h1.929c0.171 0 0.321 0.141 0.321 0.321 0 0.090-0.040 0.171-0.1 0.241l-3.214 3.204c-0.060 0.060-0.141 0.090-0.221 0.090-0.090 0-0.171-0.030-0.231-0.090l-3.214-3.214c-0.060-0.060-0.090-0.151-0.090-0.231 0-0.171 0.141-0.321 0.321-0.321h1.929v-13.821c0-0.171 0.141-0.321 0.321-0.321zM6.429 0c0.080 0 0.171 0.030 0.231 0.090l3.214 3.214c0.060 0.060 0.090 0.151 0.090 0.231 0 0.171-0.151 0.321-0.321 0.321h-1.929v13.821c0 0.171-0.151 0.321-0.321 0.321h-1.929c-0.171 0-0.321-0.151-0.321-0.321v-13.821h-1.929c-0.181 0-0.321-0.141-0.321-0.321 0-0.090 0.040-0.171 0.1-0.241l3.204-3.204c0.060-0.060 0.151-0.090 0.231-0.090z"></path>
              </svg>
            }
          />
          <IconButton
            aria-label="Link"
            color={"#0098CA"}
            onClick={() => {
              const url = window.location.href;
              try {
                navigator.clipboard.writeText(url);
                toast({ title: "Link Copied" });
              } catch (error) {
                toast({ title: "Link Copy Failed" });
              }
            }}
            icon={<LinkIcon />}
          />
          <IconButton
            aria-label="Moon"
            color={"#0098CA"}
            onClick={toggleColorMode}
            icon={<MoonIcon />}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default TopBar;
