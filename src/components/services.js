import axios from 'axios';
import moment from "moment-timezone";
import { v4 as uuidv4 } from "uuid";

const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY;
const GEO_BASE_URL = 'https://api.opencagedata.com/geocode/v1/json';
const TIMEZONE_API_KEY = import.meta.env.VITE_TIMEZONE_API_KEY;
const TIMEZONE_BASE_URL = 'http://api.timezonedb.com/v2.1/get-time-zone';

export const getPlaceSuggestions = async (query) => {
  try {
    const response = await axios.get(GEO_BASE_URL, {
      params: {
        q: query,
        key: GEO_API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching place suggestions:', error);
    return [];
  }
};
export const fetchTimeZone = async (lat, long) => {
  try {
    const response = await axios.get(TIMEZONE_BASE_URL, {
      params: {
        key: TIMEZONE_API_KEY,
        format: 'json',
        by: 'position',
        lat: lat,
        lng: long,
      },
    });
    return response.data;
  } catch (error) {
    setError(error);
  }
};

export const addTimeZoneAct = async (place, datestr, dispatch, addTimezone) => {
  const date = moment(datestr);
  const newDate = date.tz(place.annotations.timezone.name);
  const formattedNewDate = newDate.format("MMMM Do YYYY, h:mm:ss a");

  const localTime = moment.tz(datestr, place.annotations.timezone.name);
  const timeZoneAbv = localTime.format("z");
  const zonedDate = localTime.format();

  const data = {
    id: uuidv4(),
    zone: timeZoneAbv,
    description: `${place.components.state} ${place.components.country}`,
    time: formattedNewDate,
    gmtOffset: `${timeZoneAbv} ${place.annotations.timezone.offset_string}`,
    date: zonedDate,
    timeZone: place.annotations.timezone.name,
    formattedString: place.formatted,
  };

  dispatch(addTimezone(data));
};