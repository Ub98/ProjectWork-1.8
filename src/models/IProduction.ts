export interface IProduction {
  id: number;
  product: string;
  resourcesUsed: { resource: string; quantity: number; unit: string }[];
  productionDate: string;
  quantityProduced: number;
  unit: string;
}

export interface IMonthlyProduction {
  month: string;
  totalProduced: number;
}
