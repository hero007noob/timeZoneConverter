import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns-tz";
// format(new Date(), 'h:mm aa')
// format(new Date(), 'EEE, MMM d')
export const timezoneSlice = createSlice({
  name: "timezone",
  initialState: {
    selectedTime: new Date().toISOString(),
    selectedDate: new Date().toISOString(),
    timezones: [],
  },
  reducers: {
    addTimezone: (state, action) => {
      state.timezones.push(action.payload);
    },
    deleteTimezone: (state, action) => {
      state.timezones = state.timezones.filter((timezone) => {
        return timezone.id != action.payload;
      });
    },
    updateTime: (state, action) => {
      state.selectedTime = action.payload;
    },
    updateDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { addTimezone, updateTime, updateDate, deleteTimezone } =
  timezoneSlice.actions;

export default timezoneSlice.reducer;
