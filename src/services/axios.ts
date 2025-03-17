import axios from "axios";

export const instanceOpenMeteo = axios.create({
  baseURL: import.meta.env.VITE_API_URL_OPEN_METEO,
});

export const instanceWorldBank = axios.create({
  baseURL: import.meta.env.VITE_API_URL_WORLD_BANK,
});