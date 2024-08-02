import axios from 'axios';

const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY; // Replace with your API key
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