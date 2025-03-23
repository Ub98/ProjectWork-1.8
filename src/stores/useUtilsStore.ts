import { create } from "zustand";
import { ICoordinates } from "../models/ICoordinates";
import { IProduct } from "../models/IProduct";
import { generateProductData } from "../services/productService";
import { IMonthlyProduction, IProduction } from "../models/IProduction";
import { generateMonthlyProductionData, generateProductions } from "../services/productionService";
import { IResource } from "../models/IResource";
import { generateRandomResources } from "../services/resourceService";
import { ISustainability } from "../models/ISustainability";
import { generateSustainabilityDataForAll } from "../services/sustainabilityService";

interface UtilsStrore {
  coordinates: ICoordinates;
  setCoordinates: (coordinates: ICoordinates) => void;
  days: number;
  setDays: (days: number) => void;
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
  production: IProduction[];
  setProduction: ( production: IProduction[]) => void;
  resources: IResource[];
  setResources: (   resources: IResource[]) => void;
  monthlyProduction: IMonthlyProduction[];
  setMonthlyProduction: (monthlyProduction: IMonthlyProduction[]) => void;
  sustainability: ISustainability[];
  setSustainability: ( sustainability: ISustainability[]) => void;
}

const productions = generateProductions(10);

const useUtilsStore = create<UtilsStrore>((set) => ({
  coordinates: { lat: 40.8580807, lng: 14.2818627, name: "Italia" },
  setCoordinates: (coordinates) => set({ coordinates }),
  days: 7,
  setDays: (days) => set({ days }),
  products: generateProductData(),
  setProducts: (products) => set({products}),
  production: productions,
  setProduction: ( production: IProduction[]) => set({production}),
  resources: generateRandomResources(15),
  setResources: (   resources: IResource[]) => set({resources}),
  monthlyProduction: generateMonthlyProductionData(),
  setMonthlyProduction: (monthlyProduction: IMonthlyProduction[]) => set({monthlyProduction}),
  sustainability: generateSustainabilityDataForAll(productions),
  setSustainability: (sustainability: ISustainability[]) => set({sustainability}),

}));

export default useUtilsStore;
