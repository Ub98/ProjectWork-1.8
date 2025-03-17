import { addDays, format } from "date-fns";
import { create } from "zustand";
import { IRangeDate } from "../models/IRangeDate";
import { ICoordinates } from "../models/ICoordinates";



interface UtilsStrore {
  coordinates: ICoordinates;
  setCoordinates: (coordinates: ICoordinates) => void;
  rangeDate: IRangeDate;
  setRangeDate: (rangeDate: IRangeDate) => void;
  days: number;
  setDays: (days: number) => void;
}

const useUtilsStore = create<UtilsStrore>((set) => ({
  coordinates: { lat: 40.8580807, lng: 14.2818627, name: "Italia" },
  setCoordinates: (coordinates) => set({ coordinates }),
  rangeDate: {
    from: format(new Date(), "yyyy-MM-dd"),
    to: format(addDays(new Date(), 15), "yyyy-MM-dd"),
  },
  setRangeDate: (rangeDate) => set({ rangeDate }),
  days: 7,
  setDays: (days) => set({ days }),
}));

export default useUtilsStore;
