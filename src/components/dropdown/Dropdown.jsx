// Dropdown.js
import React, { useState, useEffect, useCallback } from "react";
import { Menu, MenuList, MenuItem, Box } from "@chakra-ui/react";
import { getPlaceSuggestions } from "../services";
import debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import "./styles.less";
import { addTimezone } from "../timezoneSlice";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";

function Dropdown({ query, clearInput }) {
  const [suggestions, setSuggestions] = useState([]);
  const timeData = useSelector((state) => state.timezone);
  const dispatch = useDispatch();

  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (query) {
        const results = await getPlaceSuggestions(query);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    }, 500),
    []
  );
  useEffect(() => {
    fetchSuggestions(query);
  }, [query, fetchSuggestions]);

  const addTimeZoneAct = async (place) => {
    const date = moment(timeData.selectedDate);
    const newDate = date.tz(place.annotations.timezone.name);
    const formatedNewDate = newDate.format("MMMM Do YYYY, h:mm:ss a");

    const localTime = moment.tz(
      timeData.selectedDate,
      place.annotations.timezone.name
    );

    const timeZoneAbv = localTime.format("z");
    const zonedDate = localTime.format();

    const data = {
      id: uuidv4(),
      zone: timeZoneAbv,
      description: `${place.components.state} ${place.components.country}`,
      time: timeData.selectedTime,
      gmtOffset: `${timeZoneAbv} ${place.annotations.timezone.offset_string}`,
      date: zonedDate,
      timeZone: place.annotations.timezone.name,
      formattedString: place.formatted,
    };

    dispatch(addTimezone(data));
    setSuggestions([]);
    clearInput();
  };
  return (
    <Box p={4} className="menu-container">
      <Menu isOpen={suggestions.length > 0}>
        <MenuList className="menu-list">
          {suggestions.map((place, index) => (
            <MenuItem
              onClick={() => {
                addTimeZoneAct(place);
              }}
              key={index}>
              {place.formatted}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
}

export default Dropdown;
