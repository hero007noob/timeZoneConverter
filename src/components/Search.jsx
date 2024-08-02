import React, { useState, useEffect, useCallback } from "react";

import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import Dropdown from "./dropdown/Dropdown";

function SearchBox() {
  const [query, setQuery] = useState("");

  const clearInput = () => {
    setQuery("");
  };
  return (
    <Box position="relative">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.500"
          fontSize="1.2em">
          <Search2Icon />
        </InputLeftElement>
        <Input
          style={{ width: "unset" }}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Add Time Zone, City or Town"
        />
        <InputRightElement>
          <Button colorScheme="blue" variant="filled">
            <AddIcon color="#0098CA" />
          </Button>
        </InputRightElement>
      </InputGroup>

      <Dropdown query={query} clearInput={clearInput} />
    </Box>
  );
}

export default SearchBox;
