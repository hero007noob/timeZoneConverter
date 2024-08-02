// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      900: "#1a202c",
      800: "#2d3748",
      700: "#4a5568",
    },
  },
  styles: {
    global: {
      "html, body": {
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      },
      ".time-input": {
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        padding: "5px 10px",
        fontSize: "26px",
        textAlign: "center",
        width: "100%",
        boxSizing: "border-box",
        borderRadius: "4px",
        outline: "none",
        "&:focus": {
          borderColor: "#888",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
);
