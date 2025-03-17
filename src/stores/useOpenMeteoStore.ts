import { create } from "zustand";
import { devtools } from "zustand/middleware";
import openMeteoService from "../services/openMeteoService";
import useLoadingStore from "./useLoadingStore";
import { IMeteoDaily, IMeteoHourly } from "../models/IMeteo";

type TStatus = "idle" | "loading" | "succeeded" | "failed";

type TStoreProps = {
  getAllStatus: TStatus;
  getAllError: string | null;
  getMeteoDaily: (
    lat: number,
    lng: number,
    days: number
  ) => Promise<IMeteoDaily | null>;
  getMeteoHourly: (
    lat: number,
    lng: number,
    days: number
  ) => Promise<IMeteoHourly | null>;
};

const useOpenMeteoStore = create<TStoreProps>()(
  devtools((set) => ({
    status: "idle",
    lastUpdate: null,
    error: null,
    getMeteoHourly: async (
      lat: number,
      lng: number,
      days: number
    ): Promise<IMeteoHourly | null> => {
      const { startLoading, stopLoading } = useLoadingStore.getState();

      startLoading();
      try {
        set({ getAllStatus: "loading" });
        const response = await openMeteoService.getMeteoHourly(lat, lng, days);
        console.log("response", response);

        set({ getAllStatus: "succeeded" });

        return response;
      } catch (error) {
        console.error(error);
        set({
          getAllStatus: "failed",
          getAllError:
            error instanceof Error ? error.message : "An error occurred.",
        });
        return null;
      } finally {
        stopLoading();
      }
    },
    getMeteoDaily: async (
      lat: number,
      lng: number,
      days: number
    ): Promise<IMeteoDaily | null> => {
      const { startLoading, stopLoading } = useLoadingStore.getState();

      startLoading();
      try {
        set({ getAllStatus: "loading" });
        const response = await openMeteoService.getMeteoDaily(lat, lng, days);
        // console.log('response', response);

        set({ getAllStatus: "succeeded" });

        return response;
      } catch (error) {
        console.error(error);
        set({
          getAllStatus: "failed",
          getAllError:
            error instanceof Error ? error.message : "An error occurred.",
        });
        return null;
      } finally {
        stopLoading();
      }
    },
  }))
);

export default useOpenMeteoStore;
