// App.jsx
import React, { useState } from "react";
import { Box, Text, Button, useColorMode } from "@chakra-ui/react";
import TimeZoneConverter from "./Tzc";
import SearchBox from "./components/Search";
import "./styles.less";
import TopBar from "./components/TopBar";
import Slider from "./components/slider/Slider";
import TimeZone from "./components/timeZones/TimeZone";
function App() {
  const [reverse, setReverse] = useState(false);
  return (
    <Box p={4}>
      {/* <TimeZoneConverter /> */}
      <TopBar setReverse={setReverse} />
      <TimeZone reverse={reverse} />
      {/* <Slider /> */}
    </Box>
  );
}

export default App;
