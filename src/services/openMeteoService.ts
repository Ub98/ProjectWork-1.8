import { IMeteoDaily, IMeteoHourly } from "../models/IMeteo";
import { instanceOpenMeteo } from "./axios";

const openMetoService = {
  getMeteoHourly: async (
    lat: number,
    lng: number,
    days: number
  ): Promise<IMeteoHourly> => {
    try {
      const res = await instanceOpenMeteo.get<IMeteoHourly>(
        `forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,precipitation_probability&forecast_days=${days}`
      );

      return res.data;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  },

  getMeteoDaily: async (
    lat: number,
    lng: number,
    days: number
  ): Promise<IMeteoDaily> => {
    try {
      const res = await instanceOpenMeteo.get<IMeteoDaily>(
        `forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FBerlin&forecast_days=${days}`
      );

      return res.data;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  },
};

export default openMetoService;
