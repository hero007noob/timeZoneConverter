import React, { useState, useEffect, useCallback } from "react";
import { Menu, MenuList, MenuItem, Box } from "@chakra-ui/react";
import { addTimeZoneAct, getPlaceSuggestions } from "../services";
import debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import "./styles.less";
import { addTimezone } from "../timezoneSlice";

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

  const handleAddTimezone = async (place) => {
    await addTimeZoneAct(place, timeData.selectedDate, dispatch, addTimezone);
    setSuggestions([]);
    clearInput();
  };

  return (
    <Box p={4} className="menu-container">
      <Menu isOpen={suggestions.length > 0}>
        <MenuList className="menu-list">
          {suggestions.map((place, index) => (
            <MenuItem onClick={() => handleAddTimezone(place)} key={index}>
              {place.formatted}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
}

export default Dropdown;
