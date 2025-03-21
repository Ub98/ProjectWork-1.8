import { IProduction } from "../models/IProduction";
import { ISustainability } from "../models/ISustainability";

// Dati di fattori di sostenibilità per ogni prodotto
const sustainabilityFactors: Record<
  string,
  { emissionFactor: number; waterFactor: number; energyFactor: number }
> = {
  'Grano': { emissionFactor: 0.25, waterFactor: 100, energyFactor: 0.5 },
  'Mais': { emissionFactor: 0.35, waterFactor: 120, energyFactor: 0.6 },
  'Riso': { emissionFactor: 0.45, waterFactor: 150, energyFactor: 0.7 },
  'Orzo': { emissionFactor: 0.3, waterFactor: 110, energyFactor: 0.55 },
  'Patate': { emissionFactor: 0.2, waterFactor: 90, energyFactor: 0.4 },
  "Fertilizzante Azotato": {
    emissionFactor: 0.5,
    waterFactor: 60,
    energyFactor: 0.8,
  },
  "Pesticida Organico": {
    emissionFactor: 0.4,
    waterFactor: 50,
    energyFactor: 0.7,
  },
};

// Funzione per calcolare il punteggio di sostenibilità (più basso è migliore)
const calculateSustainabilityScore = (
  emissions: number,
  waterUsage: number,
  energyConsumption: number
): number => {
  const totalImpact = emissions + waterUsage + energyConsumption;
  const sustainabilityScore = Math.max(0, 100 - totalImpact / 100);
  return Number(sustainabilityScore.toFixed(2));
};

// Funzione principale per generare i dati di sostenibilità
export const generateSustainabilityData = (
  product: string,
  quantity: number
): ISustainability => {
  const factors = sustainabilityFactors[product];

  // Calcolo delle emissioni, dell'uso dell'acqua e del consumo energetico
  const emissions = Number((factors.emissionFactor * quantity).toFixed(2)); // Emissioni in kg di CO2
  const waterUsage = Number((factors.waterFactor * quantity).toFixed(2)); // Uso dell'acqua in litri
  const energyConsumption = Number((factors.energyFactor * quantity).toFixed(2)); // Consumo energetico in kWh

  // Calcoliamo il punteggio di sostenibilità
  const sustainabilityScore = calculateSustainabilityScore(
    emissions,
    waterUsage,
    energyConsumption
  );

  // Restituiamo i dati di sostenibilità
  return {
    product,
    emissions,
    waterUsage,
    energyConsumption,
    sustainabilityScore,
  };
};

export const generateSustainabilityDataForAll = (
  productsData: IProduction[]
): ISustainability[] => {
  return productsData.map(({ product, quantityProduced }) => {
    return generateSustainabilityData(product, quantityProduced);
  });
};

export const calculateGeneralSustainabilityPercentage = (
  productsData: IProduction[]
): number => {
  let totalSustainabilityScore = 0;
  let totalProducts = 0;

  // Iteriamo su tutti i prodotti
  productsData.forEach(({ product, quantityProduced }) => {
    const sustainabilityData = generateSustainabilityData(
      product,
      quantityProduced
    ); // Ottieni i dati di sostenibilità per ogni prodotto
    totalSustainabilityScore += sustainabilityData.sustainabilityScore; // Sommiamo il punteggio di sostenibilità
    totalProducts++; // Contiamo i prodotti
  });

  // Calcoliamo la media dei punteggi di sostenibilità
  const averageSustainabilityScore = totalSustainabilityScore / totalProducts;

  // La percentuale di sostenibilità generale è inversamente proporzionale al punteggio (più basso è meglio)
  const sustainabilityPercentage = Math.max(
    0,
    Math.min(100, averageSustainabilityScore * 100)
  ); // Punteggio tra 0 e 100

  return sustainabilityPercentage;
};
